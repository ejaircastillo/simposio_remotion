# Design: Integrate evento.json with Video.tsx

## Technical Approach

The system will implement a data loading architecture that reads `evento.json` at build time (for production rendering) and runtime (for development/preview), transforming the JSON structure into TypeScript interfaces that replace all hardcoded data in `Video.tsx`. The design follows a conservative migration strategy with comprehensive fallback mechanisms to ensure visual parity and zero rendering regressions.

## Architecture Decisions

### Decision: Build-Time Data Bundling over Runtime File System Access

**Choice**: Use Remotion's bundler to import JSON at build time for production renders
**Alternatives considered**: 
1. Runtime `fs.readFileSync` in Node.js environment - creates dependency on filesystem during render
2. Dynamic `fetch()` from public directory - requires web server and adds async complexity
3. Environment variable injection - requires build system changes
**Rationale**: Remotion's bundler already handles static asset imports. By using `import` statements with TypeScript, we get type safety, tree-shaking, and guaranteed availability during render without filesystem dependencies. Development mode will use dynamic loading for hot reload benefits.

### Decision: Centralized Data Loader with Caching over Component-Level Loading

**Choice**: Create `src/utils/eventoLoader.ts` that exports a singleton `getEventoData()` function
**Alternatives considered**:
1. Each component imports JSON directly - creates multiple imports and no central validation
2. React Context provider - overkill for static data that doesn't change during render
3. Redux/state management - unnecessary complexity for read-only configuration data
**Rationale**: A centralized loader provides single-point validation, caching, and error handling. The data is static for the duration of a render, so a singleton pattern is sufficient and simpler than React Context.

### Decision: Progressive Migration with Feature Flag

**Choice**: Implement dual data loading (JSON + hardcoded) with environment variable toggles
**Alternatives considered**:
1. Big-bang replacement - higher risk of breaking rendering
2. Component-by-component without fallback - partial failures break entire video
3. Separate branch with complete rewrite - longer development time, merge conflicts
**Rationale**: Progressive migration allows testing each component independently while maintaining the ability to roll back instantly. Feature flags provide controlled rollout and A/B testing capability.

### Decision: Schema Validation with Zod over Manual Type Guards

**Choice**: Use Zod for runtime validation of JSON data structure
**Alternatives considered**:
1. Manual `typeof` checks - error-prone and verbose
2. TypeScript type assertions (`as`) - unsafe, bypasses runtime checks
3. JSON Schema validator - heavier dependency, less TypeScript integration
**Rationale**: Zod provides excellent TypeScript integration, concise schema definitions, and detailed error messages. It's lightweight and specifically designed for TypeScript validation scenarios.

### Decision: Filename-to-Name Mapping Algorithm

**Choice**: Three-tier fallback: exact match → filename-based generation → placeholder
**Alternatives considered**:
1. Require complete mapping in JSON - creates maintenance burden
2. Skip unmappable speakers - breaks visual layout
3. Always generate from filename - loses proper name formatting
**Rationale**: The three-tier approach maximizes compatibility: exact matches preserve proper names, filename generation provides reasonable defaults, and placeholders prevent crashes.

## Data Flow

```
evento.json ──┐
               ├─→ eventoLoader.ts (load, validate, cache) ──→ getEventoData()
types/evento.ts ─┘
                                │
                                ↓
                    Video.tsx components (via props/import)
                                │
                                ↓
                    Transformed data structures:
                    - DETAIL_ROWS ← fechas, horario, ubicacion, web
                    - JUEVES ← bloques_jueves.disertantes + mapping
                    - VIERNES ← bloques_viernes.disertantes + mapping
                    - MODS ← moderadores
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/types/evento.ts` | Create | TypeScript interfaces matching JSON structure and component needs |
| `src/utils/eventoLoader.ts` | Create | Main data loading, validation, caching, and transformation logic |
| `src/utils/eventoLoader.test.ts` | Create | Unit tests for data loading and transformation |
| `src/Video.tsx` | Modify | Replace hardcoded constants with `getEventoData()` calls |
| `evento.schema.json` | Create | JSON Schema for editor validation and autocomplete |
| `tsconfig.json` | Modify | Add `"resolveJsonModule": true` for JSON imports |
| `remotion.config.ts` | Potentially Modify | May need adjustment for static asset handling |
| `src/Root.tsx` | Potentially Modify | May need to pass data via props if composition approach changes |

## Interfaces / Contracts

```typescript
// src/types/evento.ts
export interface EventoData {
  evento: string;
  subtitulo: string;
  fechas: string;
  horario: string;
  ubicacion: string;
  web: string;
  assets_globales: AssetsGlobales;
  oradores_principales: OradorPrincipal[];
  moderadores: Moderador[];
  bloques_jueves: BloqueEvento[];
  bloques_viernes: BloqueEvento[];
}

export interface AssetsGlobales {
  logo_usina: string;
  logo_ivujus: string;
  logo_colegio: string;
  favicon: string;
}

export interface OradorPrincipal {
  nombre: string;
  pais: string;
  archivo: string;
}

export interface Moderador {
  nombre: string;
  archivo: string;
}

export interface BloqueEvento {
  hora: string;
  tema: string;
  disertantes: string[];
}

// Component-specific transformations
export interface DetailRow {
  label: string;
  value: string;
}

export interface SpeakerInfo {
  archivo: string;
  nombre: string;
}
```

```typescript
// src/utils/eventoLoader.ts
export function getEventoData(): EventoData;
export function getDetailRows(): DetailRow[];
export function getThursdaySpeakers(): SpeakerInfo[];
export function getFridaySpeakers(): SpeakerInfo[];
export function getModerators(): Moderador[];
export function getMainSpeakers(): OradorPrincipal[];
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `eventoLoader` validation logic | Jest tests with mocked JSON files, invalid data scenarios |
| Unit | Transformation functions (filename → name) | Jest tests for all three mapping tiers |
| Integration | Component rendering with JSON data | Remotion test renderer to verify visual parity |
| Integration | Error handling and fallbacks | Tests for missing file, invalid JSON, missing fields |
| E2E | Full video rendering output | Compare frames from JSON vs hardcoded versions |

## Migration / Rollout

### Phase 1: Infrastructure
1. Create TypeScript interfaces (`src/types/evento.ts`)
2. Create JSON Schema (`evento.schema.json`)
3. Create data loader skeleton with hardcoded fallback (`src/utils/eventoLoader.ts`)

### Phase 2: Basic Data Loading
1. Implement `getEventoData()` with Zod validation
2. Add environment variable `USE_EVENTO_JSON=false` (default: use hardcoded)
3. Test loading with current `evento.json`

### Phase 3: Component Migration (ordered by complexity)
1. Migrate `DETAIL_ROWS` - simplest transformation
2. Migrate `MODS` - direct mapping from `moderadores`
3. Migrate main speakers in intro - from `oradores_principales`
4. Migrate `JUEVES` speakers - complex mapping from `bloques_jueves.disertantes`
5. Migrate `VIERNES` speakers - complex mapping from `bloques_viernes.disertantes`

### Phase 4: Validation and Rollout
1. Enable `USE_EVENTO_JSON=true` in development
2. Verify visual parity frame-by-frame
3. Create comparison tool to diff rendered frames
4. Enable in production by default
5. Remove hardcoded data and feature flag

### Rollback Plan
1. **Immediate**: Set `USE_EVENTO_JSON=false` environment variable
2. **Code-level**: Revert `Video.tsx` to previous git commit
3. **Data-level**: Keep `evento.json` for manual reference if needed

## Open Questions

- [ ] Should we add a build step that validates `evento.json` against schema during `npm run render`?
- [ ] How to handle speaker image files that exist in JSON but not in `public/Oradores/` directory?
- [ ] Should we create a backup of the current hardcoded data as a fallback JSON file?
- [ ] What performance impact does Zod validation have on render startup time?