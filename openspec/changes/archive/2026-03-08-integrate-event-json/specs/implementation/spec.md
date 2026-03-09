# Implementation Components Specification

## Purpose

This specification defines the implementation components required to integrate JSON event data into the Remotion video project. It covers the TypeScript interfaces, data loading utility, and component refactoring.

## Requirements

### Requirement: TypeScript Interface Files

The system SHALL create TypeScript interface files that define the event data structure.

#### File: `src/types/evento.ts`

```typescript
// Core event data interfaces
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

// Component data interfaces (matching current Video.tsx structures)
export interface DetailRow {
  label: string;
  value: string;
}

export interface SpeakerInfo {
  archivo: string;
  nombre: string;
}

// Data loading result interface
export interface EventoLoadResult {
  data: EventoData;
  error?: string;
  warnings: string[];
}
```

#### Scenario: Interface creation

- GIVEN the `src/types/` directory exists or can be created
- WHEN creating the TypeScript interface file
- THEN it SHALL be placed at `src/types/evento.ts`
- AND it SHALL export all interfaces for use throughout the application
- AND interfaces SHALL be documented with JSDoc comments

### Requirement: Data Loading Utility

The system SHALL implement a utility function to load and validate event data.

#### File: `src/utils/eventoLoader.ts`

```typescript
import { EventoData, EventoLoadResult } from '../types/evento';

// Default event data for fallback scenarios
const DEFAULT_EVENTO_DATA: EventoData = {
  evento: 'EVENTO SIMPOSIO',
  subtitulo: 'Subtítulo del evento',
  fechas: 'Fecha por definir',
  horario: 'Horario por definir',
  ubicacion: 'Lugar por definir',
  web: 'sitiodelvento.org',
  assets_globales: {
    logo_usina: 'logo-usina.png',
    logo_ivujus: 'IVUJUS.png',
    logo_colegio: 'Colegio_Abogados.png',
    favicon: 'favicon_usina.png',
  },
  oradores_principales: [],
  moderadores: [],
  bloques_jueves: [],
  bloques_viernes: [],
};

// Runtime cache for loaded data
let cachedData: EventoData | null = null;

/**
 * Loads and validates evento.json data
 * @returns Promise resolving to EventoLoadResult
 */
export async function loadEventoData(): Promise<EventoLoadResult> {
  // Implementation details...
}

/**
 * Get cached event data (for production/static builds)
 */
export function getCachedEventoData(): EventoData {
  // Implementation details...
}

// Helper functions for data transformation
export function createDetailRows(data: EventoData): DetailRow[] {
  // Implementation details...
}

export function createThursdaySpeakers(data: EventoData): SpeakerInfo[] {
  // Implementation details...
}

export function createFridaySpeakers(data: EventoData): SpeakerInfo[] {
  // Implementation details...
}

export function createModerators(data: EventoData): SpeakerInfo[] {
  // Implementation details...
}
```

#### Scenario: Loading function implementation

- GIVEN the `loadEventoData()` function is called
- WHEN in development mode
- THEN it SHALL:
  1. Attempt to read `evento.json` from the filesystem
  2. Parse the JSON content
  3. Validate against the `EventoData` interface
  4. Merge with defaults for missing fields
  5. Cache the result for subsequent calls
  6. Return `EventoLoadResult` with data and any warnings

- WHEN in production/build mode
- THEN it SHALL:
  1. Use pre-bundled/cached data
  2. Not attempt filesystem access
  3. Return cached data immediately

#### Scenario: Error handling

- GIVEN `evento.json` cannot be read or parsed
- WHEN `loadEventoData()` is called
- THEN it SHALL:
  1. Catch the error
  2. Log the error details
  3. Return default event data
  4. Include error message in `EventoLoadResult.error`

### Requirement: Video.tsx Refactoring

The system SHALL refactor `Video.tsx` to use JSON data instead of hardcoded constants.

#### Current hardcoded constants to replace:

1. `DETAIL_ROWS` constant → `createDetailRows(eventoData)`
2. `JUEVES` constant → `createThursdaySpeakers(eventoData)`
3. `VIERNES` constant → `createFridaySpeakers(eventoData)`
4. `MODS` constant → `createModerators(eventoData)`
5. Event title in `Intro` component → `eventoData.evento`
6. Event subtitle in `Intro` component → `eventoData.subtitulo`
7. Logo file references → `eventoData.assets_globales.*`

#### Scenario: Data loading in Video component

- GIVEN the `SimposioPromo` component is the main video composition
- WHEN refactoring to use JSON data
- THEN it SHALL:
  1. Load event data once at component level
  2. Pass data as props to child components
  3. Maintain all existing animations and styling
  4. Handle loading/error states gracefully

#### Updated Video.tsx structure:

```typescript
// Import data loading utilities
import { loadEventoData, createDetailRows, createThursdaySpeakers, createFridaySpeakers, createModerators } from './utils/eventoLoader';
import { EventoData } from './types/evento';

// Remove hardcoded constants:
// const DETAIL_ROWS = [...];
// const JUEVES = [...];
// const VIERNES = [...];
// const MODS = [...];

// Update Detalles component to receive data as prop
interface DetallesProps {
  detailRows: DetailRow[];
  logos: AssetsGlobales;
}

const Detalles: React.FC<DetallesProps> = ({ detailRows, logos }) => {
  // Use detailRows prop instead of DETAIL_ROWS constant
  // Use logos prop for logo files
};

// Update DayGrid component to receive speakers as prop
interface DayGridProps {
  dayLabel: string;
  accentColor: string;
  speakers: SpeakerInfo[]; // Already has this prop
}

// Update Moderadores component to receive moderators as prop
interface ModeradoresProps {
  moderators: SpeakerInfo[];
}

// Update SimposioPromo component to load and distribute data
export const SimposioPromo: React.FC = () => {
  const [eventoData, setEventoData] = React.useState<EventoData | null>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    loadEventoData().then(result => {
      setEventoData(result.data);
      setLoading(false);
    });
  }, []);
  
  if (loading || !eventoData) {
    // Return loading state or fallback
    return <LoadingFallback />;
  }
  
  // Create component data from eventoData
  const detailRows = createDetailRows(eventoData);
  const juevesSpeakers = createThursdaySpeakers(eventoData);
  const viernesSpeakers = createFridaySpeakers(eventoData);
  const moderators = createModerators(eventoData);
  
  return (
    <AbsoluteFill>
      <Sequence from={T.intro.from} durationInFrames={T.intro.dur}>
        <Intro 
          title={eventoData.evento}
          subtitle={eventoData.subtitulo}
          logos={eventoData.assets_globales}
        />
      </Sequence>
      <Sequence from={T.detalles.from} durationInFrames={T.detalles.dur}>
        <Detalles 
          detailRows={detailRows}
          logos={eventoData.assets_globales}
        />
      </Sequence>
      {/* ... other sequences with data props ... */}
    </AbsoluteFill>
  );
};
```

#### Scenario: Progressive migration support

- GIVEN we want to migrate incrementally
- WHEN implementing the refactoring
- THEN the system SHALL support:
  1. Feature flag to toggle between JSON and hardcoded data
  2. Fallback to hardcoded data if JSON loading fails
  3. Side-by-side comparison of outputs
  4. Gradual component-by-component migration

### Requirement: Data Transformation Functions

The system SHALL implement specific functions to transform JSON data into component-ready formats.

#### Function: `createDetailRows()`

- Input: `EventoData`
- Output: `DetailRow[]`
- Transformation logic:
  1. Extract `fechas` → `{ label: 'Fechas', value: data.fechas }`
  2. Extract `horario` → `{ label: 'Horario', value: data.horario }`
  3. Format `ubicacion` → `{ label: 'Lugar', value: formatLocation(data.ubicacion) }`
  4. Format `web` → `{ label: 'Web', value: formatWeb(data.web) }`
  5. Add constant → `{ label: 'Entrada', value: 'Actividad no arancelada' }`

#### Function: `createThursdaySpeakers()`

- Input: `EventoData`
- Output: `SpeakerInfo[]`
- Transformation logic:
  1. Extract all unique filenames from `bloques_jueves[*].disertantes`
  2. For each filename, look up in `oradores_principales[*].archivo`
  3. If found, use `oradores_principales[*].nombre`
  4. If not found, generate name from filename (uppercase, replace underscores with spaces)
  5. Preserve original order from `JUEVES` constant if possible

#### Function: `createFridaySpeakers()`

- Input: `EventoData`
- Output: `SpeakerInfo[]`
- Transformation logic: Same as Thursday but using `bloques_viernes`

#### Function: `createModerators()`

- Input: `EventoData`
- Output: `SpeakerInfo[]`
- Transformation logic:
  1. Map `moderadores[*]` to `SpeakerInfo[*]`
  2. Preserve `archivo` field
  3. Preserve `nombre` field (may need formatting for line breaks)

### Requirement: Build Configuration

The system SHALL configure the build process to handle JSON data appropriately.

#### Scenario: Production build with bundled data

- GIVEN we're building for production
- WHEN the build process runs
- THEN:
  - `evento.json` SHALL be read at build time
  - Data SHALL be validated and bundled
  - Bundled data SHALL be included in the output
  - No runtime filesystem access SHALL be required

#### Scenario: Development hot reload

- GIVEN we're in development mode
- WHEN `evento.json` is modified
- THEN:
  - The application SHALL detect the file change
  - Event data SHALL be reloaded
  - Video preview SHALL update automatically
  - No manual refresh SHALL be required

### Requirement: Testing Strategy

The system SHALL include testing for data loading and transformation.

#### Scenario: Unit tests for data transformation

- GIVEN test files for data utilities
- WHEN running tests
- THEN they SHALL verify:
  - `createDetailRows()` produces correct structure
  - `createThursdaySpeakers()` correctly maps filenames to names
  - `createFridaySpeakers()` correctly maps filenames to names
  - `createModerators()` preserves moderator data
  - Error handling provides sensible defaults

#### Scenario: Integration tests for component rendering

- GIVEN tests for video components
- WHEN running tests with JSON data
- THEN they SHALL verify:
  - Components render correctly with JSON data
  - Output matches hardcoded data rendering
  - Error states are handled gracefully
  - Performance is within acceptable limits