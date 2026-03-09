# Event Data Schema Specification

## Purpose

This specification defines the exact JSON structure and TypeScript interfaces for event data. The schema SHALL serve as the contract between the JSON configuration file and the TypeScript application code.

## Requirements

### Requirement: JSON File Location and Naming

The system SHALL expect the event data file to be named `evento.json` and located in the project root directory.

#### Scenario: Standard file location

- GIVEN the application needs to load event data
- WHEN looking for the event data file
- THEN it SHALL look for `evento.json` in the project root directory
- AND it SHALL NOT search for the file in other locations

### Requirement: Root Event Data Structure

The root event data object SHALL contain all event information in a structured format.

```typescript
interface EventoData {
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
```

#### Scenario: Required root fields

- GIVEN the `EventoData` interface
- THEN the following fields SHALL be required:
  - `evento`: string - Main event title
  - `subtitulo`: string - Event subtitle
  - `fechas`: string - Event dates as display text
  - `horario`: string - Event schedule as display text
  - `ubicacion`: string - Event location as display text
  - `web`: string - Event website URL
  - `assets_globales`: AssetsGlobales - Global asset references
  - `oradores_principales`: OradorPrincipal[] - List of main speakers
  - `moderadores`: Moderador[] - List of moderators
  - `bloques_jueves`: BloqueEvento[] - Thursday event blocks
  - `bloques_viernes`: BloqueEvento[] - Friday event blocks

### Requirement: Global Assets Structure

The system SHALL define a structure for global asset references used throughout the application.

```typescript
interface AssetsGlobales {
  logo_usina: string;
  logo_ivujus: string;
  logo_colegio: string;
  favicon: string;
}
```

#### Scenario: Asset file names

- GIVEN the `AssetsGlobales` interface
- THEN each field SHALL contain a filename string
- AND the filenames SHALL reference files in the `public/` directory
- AND the filenames SHALL include file extensions

### Requirement: Speaker Structures

The system SHALL define consistent structures for different types of speakers.

#### Main Speaker Structure

```typescript
interface OradorPrincipal {
  nombre: string;
  pais: string;
  archivo: string;
}
```

#### Scenario: Main speaker data

- GIVEN an `OradorPrincipal` object
- THEN it SHALL contain:
  - `nombre`: string - Full name of the speaker
  - `pais`: string - Country of origin
  - `archivo`: string - Image filename without path

#### Moderator Structure

```typescript
interface Moderador {
  nombre: string;
  archivo: string;
}
```

#### Scenario: Moderator data

- GIVEN a `Moderador` object
- THEN it SHALL contain:
  - `nombre`: string - Full name of the moderator
  - `archivo`: string - Image filename without path

### Requirement: Event Block Structure

The system SHALL define a structure for time-blocked event segments.

```typescript
interface BloqueEvento {
  hora: string;
  tema: string;
  disertantes: string[];
}
```

#### Scenario: Event block data

- GIVEN a `BloqueEvento` object
- THEN it SHALL contain:
  - `hora`: string - Time of the block (e.g., "15:00")
  - `tema`: string - Topic/title of the block
  - `disertantes`: string[] - Array of speaker image filenames

### Requirement: Component Data Structures

The system SHALL define structures that match current component expectations.

#### Detail Row Structure (for DETAIL_ROWS replacement)

```typescript
interface DetailRow {
  label: string;
  value: string;
}
```

#### Scenario: Detail row creation

- GIVEN `EventoData` is loaded
- WHEN creating `DetailRow[]` for the Detalles component
- THEN it SHALL create an array with exactly 5 items:
  1. `{ label: 'Fechas', value: data.fechas }`
  2. `{ label: 'Horario', value: data.horario }`
  3. `{ label: 'Lugar', value: formattedLocation(data.ubicacion) }`
  4. `{ label: 'Web', value: data.web }`
  5. `{ label: 'Entrada', value: 'Actividad no arancelada' }`

#### Speaker Info Structure (for JUEVES/VIERNES replacement)

```typescript
interface SpeakerInfo {
  archivo: string;
  nombre: string;
}
```

#### Scenario: Speaker info creation

- GIVEN `EventoData` is loaded
- WHEN creating `SpeakerInfo[]` for Thursday speakers
- THEN it SHALL:
  - Extract all unique filenames from `bloques_jueves[*].disertantes`
  - Map each filename to a display name using available mappings
  - Create `SpeakerInfo` objects for each unique speaker

### Requirement: Data Transformation Functions

The system SHALL provide functions to transform JSON data into component-ready structures.

#### Scenario: Location formatting

- GIVEN `ubicacion` contains full location text
- WHEN formatting for display in Detalles component
- THEN the system SHALL format it as "Auditorio CPACF\nAv. Corrientes 1441, CABA"
- AND long location strings SHALL be split appropriately

#### Scenario: Speaker filename to name mapping

- GIVEN a speaker image filename (e.g., "waller.webp")
- AND `oradores_principales` contains mapping data
- WHEN looking up the display name
- THEN the system SHALL:
  1. Look for exact match in `oradores_principales[*].archivo`
  2. If found, use `oradores_principales[*].nombre`
  3. If not found, generate name from filename (e.g., "waller" → "WALLER")

#### Scenario: Web URL formatting

- GIVEN `web` may or may not include protocol
- WHEN displaying in components
- THEN the system SHALL:
  - Remove "http://" or "https://" prefixes if present
  - Remove "www." prefix if present
  - Display clean domain name only

### Requirement: Default Values

The system SHALL provide sensible default values for all data fields.

#### Scenario: Default event data

- GIVEN `evento.json` is missing or empty
- WHEN creating default `EventoData`
- THEN it SHALL contain:
  - `evento`: "EVENTO SIMPOSIO"
  - `subtitulo`: "Subtítulo del evento"
  - `fechas`: "Fecha por definir"
  - `horario`: "Horario por definir"
  - `ubicacion`: "Lugar por definir"
  - `web`: "sitiodelvento.org"
  - All arrays SHALL be empty arrays
  - Asset filenames SHALL reference placeholder files

#### Scenario: Partial data with defaults

- GIVEN `evento.json` contains only some fields
- WHEN loading and validating the data
- THEN missing required fields SHALL be filled with defaults
- AND missing optional fields SHALL use empty values (empty string or empty array)

### Requirement: Data Validation

The system SHALL validate loaded data against the schema.

#### Scenario: Type validation

- GIVEN data is loaded from `evento.json`
- WHEN validating against TypeScript interfaces
- THEN:
  - String fields SHALL be validated as strings
  - Array fields SHALL be validated as arrays
  - Object fields SHALL be validated as objects with required properties
  - Invalid types SHALL be coerced or replaced with defaults

#### Scenario: Content validation

- GIVEN data passes type validation
- WHEN validating content
- THEN:
  - Required string fields SHALL not be empty
  - Filename fields SHALL reference existing files (warning only)
  - URLs SHALL be valid format (warning only)

### Requirement: JSON Schema Documentation

The system SHALL provide a JSON Schema file for editor support.

#### Scenario: JSON Schema availability

- GIVEN a `evento.schema.json` file exists
- WHEN editing `evento.json` in a supported editor
- THEN the editor SHALL provide:
  - Autocompletion for field names
  - Validation against the schema
  - Documentation for each field
  - Error highlighting for invalid data