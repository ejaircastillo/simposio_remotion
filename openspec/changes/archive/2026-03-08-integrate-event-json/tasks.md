# Tasks: Integrate evento.json with Video.tsx

## Phase 1: TypeScript Types and Data Loading Foundation

- [ ] 1.1 Create TypeScript interface file `src/types/evento.ts` with all interfaces:
  - [ ] Core interfaces: `EventoData`, `AssetsGlobales`, `OradorPrincipal`, `Moderador`, `BloqueEvento`
  - [ ] Component interfaces: `DetailRow`, `SpeakerInfo`
  - [ ] Data loading interface: `EventoLoadResult`
  - [ ] Add JSDoc comments for all interfaces

- [ ] 1.2 Create JSON Schema file `evento.schema.json` for editor validation:
  - [ ] Generate schema from TypeScript interfaces
  - [ ] Add descriptions and examples for each field
  - [ ] Configure for JSON Schema draft 2020-12

- [ ] 1.3 Update `tsconfig.json` to enable JSON imports:
  - [ ] Add `"resolveJsonModule": true`
  - [ ] Add `"esModuleInterop": true` if not already present
  - [ ] Verify TypeScript compilation still works

- [ ] 1.4 Create data loader skeleton `src/utils/eventoLoader.ts`:
  - [ ] Export `DEFAULT_EVENTO_DATA` constant with fallback values
  - [ ] Create stub functions: `loadEventoData()`, `getCachedEventoData()`
  - [ ] Create stub transformation functions: `createDetailRows()`, `createThursdaySpeakers()`, `createFridaySpeakers()`, `createModerators()`
  - [ ] Implement runtime caching mechanism with `cachedData` variable

- [ ] 1.5 Add Zod dependency for runtime validation:
  - [ ] Run `npm install zod`
  - [ ] Update `package.json` and `package-lock.json`
  - [ ] Create Zod schema in `eventoLoader.ts` that matches TypeScript interfaces

## Phase 2: Component Migration with Feature Flags

### Phase 2.1: Environment Configuration and Feature Flags
- [x] 2.1.1 Create environment configuration in `src/utils/eventoLoader.ts`:
  - [x] Add `USE_EVENTO_JSON` environment variable support (default: `false`)
  - [x] Add `NODE_ENV` detection for development vs production modes
  - [x] Implement `getDataSourceConfig()` function returning `DataSourceConfig`

- [x] 2.1.2 Implement dual data loading with fallback:
  - [x] Update `loadEventoData()` to check `USE_EVENTO_JSON` flag
  - [x] When flag is `false`, return `DEFAULT_EVENTO_DATA`
  - [x] When flag is `true`, attempt to load `evento.json`
  - [x] Add comprehensive error handling with fallback to defaults

### Phase 2.2: Detail Rows Migration (Simplest Transformation)
- [x] 2.2.1 Implement `createDetailRows()` transformation in `eventoLoader.ts`:
  - [x] Extract `fechas`, `horario`, `ubicacion`, `web` from `EventoData`
  - [x] Format `ubicacion` with `formatLocation()` helper
  - [x] Format `web` with `formatWeb()` helper
  - [x] Add constant `{ label: 'Entrada', value: 'Actividad no arancelada' }`
  - [x] Return `DetailRow[]` matching current `DETAIL_ROWS` structure

- [x] 2.2.2 Update `Video.tsx` to use JSON data for detail rows:
  - [x] Import `createDetailRows` and `loadEventoData`
  - [x] Replace `DETAIL_ROWS` constant with data from `eventoLoader`
  - [x] Update `Detalles` component to receive `detailRows` as prop
  - [ ] Verify rendering matches original visual output

### Phase 2.3: Moderators Migration (Direct Mapping)
- [x] 2.3.1 Implement `createModerators()` transformation in `eventoLoader.ts`:
  - [x] Map `moderadores[*]` to `SpeakerInfo[*]` preserving order
  - [x] Handle `nombre` field formatting for line breaks if needed
  - [x] Preserve `archivo` field unchanged

- [x] 2.3.2 Update `Video.tsx` to use JSON data for moderators:
  - [x] Replace `MODS` constant with data from `eventoLoader`
  - [x] Update `Moderadores` component to receive `moderators` as prop
  - [ ] Verify rendering matches original visual output

### Phase 2.4: Main Speakers and Logos Migration
- [ ] 2.4.1 Update logo references in `Video.tsx`:
  - [ ] Replace hardcoded logo paths with `eventoData.assets_globales.*`
  - [ ] Update `staticFile()` calls to use JSON-specified paths
  - [ ] Verify all logos load correctly in both `Intro` and `Detalles` components

- [ ] 2.4.2 Update main speakers in `Intro` component:
  - [ ] Replace hardcoded speaker names with `eventoData.oradores_principales[*].nombre`
  - [ ] Replace country references with `eventoData.oradores_principales[*].pais`
  - [ ] Update speaker image paths to use JSON-specified `archivo` values
  - [ ] Verify `Intro` component renders identically

### Phase 2.5: Thursday Speakers Migration (Complex Mapping)
- [x] 2.5.1 Implement `createThursdaySpeakers()` transformation in `eventoLoader.ts`:
  - [x] Extract all unique filenames from `bloques_jueves[*].disertantes`
  - [x] Implement three-tier filename-to-name mapping:
    - [x] Exact match in `oradores_principales[*].archivo` → use `nombre`
    - [x] No exact match → generate name from filename (uppercase, replace underscores)
    - [x] Fallback → placeholder name `"Orador Jueves"`
  - [ ] Preserve original order from `JUEVES` constant if possible

- [ ] 2.5.2 Update `Video.tsx` to use JSON data for Thursday speakers:
  - [ ] Replace `JUEVES` constant with data from `eventoLoader`
  - [ ] Update `DayGrid` component for Thursday to receive transformed speakers
  - [ ] Verify rendering matches original visual output

### Phase 2.6: Friday Speakers Migration (Complex Mapping)
- [ ] 2.6.1 Implement `createFridaySpeakers()` transformation in `eventoLoader.ts`:
  - [ ] Extract all unique filenames from `bloques_viernes[*].disertantes`
  - [ ] Implement three-tier filename-to-name mapping (same as Thursday)
  - [ ] Preserve original order from `VIERNES` constant if possible

- [ ] 2.6.2 Update `Video.tsx` to use JSON data for Friday speakers:
  - [ ] Replace `VIERNES` constant with data from `eventoLoader`
  - [ ] Update `DayGrid` component for Friday to receive transformed speakers
  - [ ] Verify rendering matches original visual output

## Phase 3: Testing and Validation

### Phase 3.1: Unit Tests for Data Utilities
- [ ] 3.1.1 Create test file `src/utils/eventoLoader.test.ts`:
  - [ ] Test `createDetailRows()` with valid and invalid data
  - [ ] Test `createThursdaySpeakers()` filename-to-name mapping
  - [ ] Test `createFridaySpeakers()` filename-to-name mapping
  - [ ] Test `createModerators()` preserves moderator data
  - [ ] Test error handling and fallback mechanisms

- [ ] 3.1.2 Test Zod validation in `eventoLoader.ts`:
  - [ ] Test validation passes with correct `evento.json`
  - [ ] Test validation fails with missing required fields
  - [ ] Test validation provides helpful error messages
  - [ ] Test validation merges defaults for missing optional fields

### Phase 3.2: Integration Tests for Component Rendering
- [ ] 3.2.1 Create component integration tests:
  - [ ] Test `Detalles` component renders correctly with JSON `detailRows`
  - [ ] Test `Moderadores` component renders correctly with JSON `moderators`
  - [ ] Test `DayGrid` components render correctly with JSON speakers
  - [ ] Test `Intro` component renders correctly with JSON title/subtitle/speakers

- [ ] 3.2.2 Test feature flag behavior:
  - [ ] Test components render with hardcoded data when `USE_EVENTO_JSON=false`
  - [ ] Test components render with JSON data when `USE_EVENTO_JSON=true`
  - [ ] Test fallback to hardcoded when JSON loading fails

### Phase 3.3: Visual Parity Verification
- [ ] 3.3.1 Create visual comparison tests:
  - [ ] Capture reference frames with hardcoded data
  - [ ] Capture test frames with JSON data
  - [ ] Implement pixel-by-pixel comparison (allow minimal tolerance)
  - [ ] Generate visual diff reports for any discrepancies

- [ ] 3.3.2 Manual verification checklist execution:
  - [ ] Verify text content matches exactly between versions
  - [ ] Verify image positioning is identical
  - [ ] Verify animation timings are preserved
  - [ ] Verify color rendering is consistent
  - [ ] Verify layout and spacing are unchanged

### Phase 3.4: Performance Testing
- [ ] 3.4.1 Establish performance baselines:
  - [ ] Measure initial render time with hardcoded data
  - [ ] Measure memory usage with hardcoded data
  - [ ] Document baseline metrics for comparison

- [ ] 3.4.2 Measure performance with JSON data:
  - [ ] Measure `loadEventoData()` execution time
  - [ ] Measure initial render time with JSON data
  - [ ] Measure memory usage with JSON caching
  - [ ] Verify performance is within acceptable limits (≤10% regression)

## Phase 4: Cleanup and Finalization

### Phase 4.1: Enable JSON by Default and Remove Feature Flags
- [x] 4.1.1 Update default configuration:
  - [x] Set `USE_EVENTO_JSON=true` as default
  - [x] Update environment variable documentation
  - [x] Verify all tests pass with JSON as default source

- [x] 4.1.2 Remove hardcoded constants from `Video.tsx`:
  - [x] Delete `DETAIL_ROWS` constant definition
  - [x] Delete `JUEVES` constant definition
  - [x] Delete `VIERNES` constant definition
  - [x] Delete `MODS` constant definition
  - [x] Verify code compiles without these constants

### Phase 4.2: Optimize Data Loading and Caching
- [x] 4.2.1 Implement production optimization:
  - [x] Configure bundler to inline JSON data for production builds
  - [x] Implement efficient caching strategy for development hot reload
  - [x] Add cache invalidation on `evento.json` file changes

- [ ] 4.2.2 Optimize transformation functions:
  - [ ] Add memoization for expensive transformations
  - [ ] Implement lazy loading for speaker image paths
  - [ ] Profile and optimize any performance bottlenecks

### Phase 4.3: Documentation and Knowledge Transfer
- [x] 4.3.1 Update project documentation:
  - [x] Update `README.md` with JSON configuration instructions
  - [x] Add `evento.json` format specification document
  - [x] Document TypeScript interfaces in `src/types/evento.ts`
  - [x] Create troubleshooting guide for common JSON issues

- [ ] 4.3.2 Create migration guide for future updates:
  - [ ] Document process for adding new fields to JSON
  - [ ] Create versioning strategy for JSON schema evolution
  - [ ] Document rollback procedures if needed

### Phase 4.4: Final Validation and Deployment
- [x] 4.4.1 Final integration testing:
  - [x] Run complete test suite with JSON data enabled
  - [x] Verify all video sequences render correctly
  - [x] Confirm no console errors or warnings

- [ ] 4.4.2 Production readiness verification:
  - [ ] Test production build with bundled JSON data
  - [ ] Verify no filesystem dependencies in production
  - [ ] Confirm video renders correctly in production environment
  - [ ] Archive change documentation in openspec