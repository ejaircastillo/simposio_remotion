# Event Data Management Specification

## Purpose

This specification defines the requirements for managing event data in the Remotion video project. The system SHALL use `evento.json` as the single source of truth for all event-related information, eliminating hardcoded data in TypeScript files.

## Requirements

### Requirement: JSON Data Structure

The system SHALL load event data from a JSON file named `evento.json` located in the project root directory.

#### Scenario: Successful JSON loading

- GIVEN a valid `evento.json` file exists in the project root
- WHEN the application loads
- THEN the event data SHALL be parsed and made available to all video components
- AND the application SHALL render without errors

#### Scenario: Missing JSON file

- GIVEN the `evento.json` file does not exist
- WHEN the application attempts to load event data
- THEN the system SHALL provide sensible default values for all required fields
- AND the application SHALL log a warning about the missing file
- AND the application SHALL continue to render with default data

#### Scenario: Invalid JSON syntax

- GIVEN the `evento.json` file contains invalid JSON syntax
- WHEN the application attempts to parse the file
- THEN the system SHALL catch the parsing error
- AND the system SHALL provide sensible default values for all required fields
- AND the application SHALL log an error with the parsing failure details
- AND the application SHALL continue to render with default data

### Requirement: TypeScript Type Safety

The system SHALL provide comprehensive TypeScript interfaces that define the structure of event data.

#### Scenario: Type definition creation

- GIVEN the `evento.json` structure with event details, speakers, moderators, and schedule blocks
- WHEN TypeScript interfaces are created
- THEN they SHALL include all fields present in the JSON structure
- AND they SHALL include optional modifiers for non-essential fields
- AND they SHALL provide sensible default values for optional fields

#### Scenario: Type compatibility

- GIVEN existing hardcoded data structures in `Video.tsx`
- WHEN creating TypeScript interfaces for JSON data
- THEN the interfaces SHALL be compatible with existing component prop types
- AND migration from hardcoded data SHALL require minimal component refactoring

### Requirement: Data Loading Mechanism

The system SHALL implement a utility function to load and validate event data.

#### Scenario: Runtime loading in development

- GIVEN the application is running in development mode
- WHEN event data is requested by components
- THEN the system SHALL load `evento.json` from the filesystem at runtime
- AND the data SHALL be validated against TypeScript interfaces
- AND invalid data SHALL be corrected with sensible defaults

#### Scenario: Build-time loading for production

- GIVEN the application is being built for production
- WHEN the video is rendered
- THEN the event data SHALL be bundled at build time
- AND the bundled data SHALL be immutable during rendering
- AND the rendering SHALL not depend on filesystem access

#### Scenario: Data caching

- GIVEN event data has been loaded successfully
- WHEN the same data is requested multiple times
- THEN the system SHALL return cached data
- AND the system SHALL not re-read the JSON file unnecessarily

### Requirement: Component Data Integration

The system SHALL replace all hardcoded event data in `Video.tsx` with data loaded from `evento.json`.

#### Scenario: Event details replacement

- GIVEN the `DETAIL_ROWS` constant in `Video.tsx` contains hardcoded event details
- WHEN migrating to JSON data
- THEN the system SHALL derive `DETAIL_ROWS` from `evento.json` fields (`fechas`, `horario`, `ubicacion`, `web`)
- AND the system SHALL add an "Entrada" field with value "Actividad no arancelada"
- AND the visual rendering SHALL remain identical to the current version

#### Scenario: Thursday speakers replacement

- GIVEN the `JUEVES` array in `Video.tsx` contains hardcoded speaker data
- WHEN migrating to JSON data
- THEN the system SHALL create speaker arrays from `bloques_jueves.disertantes` filenames
- AND the system SHALL map filenames to display names using a mapping mechanism
- AND the visual rendering SHALL remain identical to the current version

#### Scenario: Friday speakers replacement

- GIVEN the `VIERNES` array in `Video.tsx` contains hardcoded speaker data
- WHEN migrating to JSON data
- THEN the system SHALL create speaker arrays from `bloques_viernes.disertantes` filenames
- AND the system SHALL map filenames to display names using a mapping mechanism
- AND the visual rendering SHALL remain identical to the current version

#### Scenario: Moderators replacement

- GIVEN the `MODS` array in `Video.tsx` contains hardcoded moderator data
- WHEN migrating to JSON data
- THEN the system SHALL use the `moderadores` array from `evento.json`
- AND the system SHALL maintain the same structure (`archivo`, `nombre`)
- AND the visual rendering SHALL remain identical to the current version

#### Scenario: Event title and subtitle

- GIVEN the `Intro` component displays hardcoded event title and subtitle
- WHEN migrating to JSON data
- THEN the system SHALL use `evento` and `subtitulo` fields from `evento.json`
- AND the visual rendering SHALL remain identical to the current version

#### Scenario: Logo assets

- GIVEN logo files are referenced directly in components
- WHEN migrating to JSON data
- THEN the system SHALL use `assets_globales` fields from `evento.json` for logo file names
- AND the visual rendering SHALL remain identical to the current version

### Requirement: Filename-to-Name Mapping

The system SHALL implement a mechanism to map speaker filenames to display names.

#### Scenario: Filename mapping for Thursday speakers

- GIVEN `bloques_jueves.disertantes` contains only filenames
- AND `oradores_principales` contains `archivo` and `nombre` mappings
- WHEN creating the `JUEVES` speaker array
- THEN the system SHALL look up each filename in available mappings
- AND if a mapping exists, the system SHALL use the mapped display name
- AND if no mapping exists, the system SHALL use a default name derived from the filename

#### Scenario: Filename mapping for Friday speakers

- GIVEN `bloques_viernes.disertantes` contains only filenames
- AND `oradores_principales` contains `archivo` and `nombre` mappings
- WHEN creating the `VIERNES` speaker array
- THEN the system SHALL look up each filename in available mappings
- AND if a mapping exists, the system SHALL use the mapped display name
- AND if no mapping exists, the system SHALL use a default name derived from the filename

### Requirement: Backward Compatibility

The system SHALL maintain backward compatibility with current video rendering output.

#### Scenario: Visual parity verification

- GIVEN the current video renders with hardcoded data
- WHEN the video renders with JSON data
- THEN the visual output SHALL be identical in all aspects:
  - Text content and formatting
  - Image display and positioning
  - Animation timings and sequences
  - Color schemes and styling
  - Layout and spacing

#### Scenario: Performance parity

- GIVEN the current video renders with a certain performance profile
- WHEN the video renders with JSON data
- THEN there SHALL be no significant performance regression
- AND the rendering time SHALL remain within acceptable limits

### Requirement: Error Resilience

The system SHALL handle missing or invalid data gracefully.

#### Scenario: Missing optional fields

- GIVEN `evento.json` is missing optional fields
- WHEN the application loads the data
- THEN the system SHALL provide sensible default values for missing fields
- AND the application SHALL continue to function normally

#### Scenario: Missing required fields

- GIVEN `evento.json` is missing required fields
- WHEN the application loads the data
- THEN the system SHALL provide sensible default values for missing fields
- AND the application SHALL log a warning about the missing data
- AND the application SHALL continue to function with default values

#### Scenario: Malformed data types

- GIVEN `evento.json` contains fields with incorrect data types
- WHEN the application validates the data
- THEN the system SHALL attempt to convert or coerce the data to correct types
- AND if conversion fails, the system SHALL use sensible defaults
- AND the application SHALL log a warning about the data type issue

### Requirement: Development Experience

The system SHALL provide a good development experience when working with event data.

#### Scenario: TypeScript autocompletion

- GIVEN TypeScript interfaces are defined for event data
- WHEN developers edit components that use event data
- THEN TypeScript SHALL provide autocompletion for event data fields
- AND TypeScript SHALL provide type checking for event data usage

#### Scenario: JSON schema validation

- GIVEN a JSON schema is available for `evento.json`
- WHEN developers edit the JSON file
- THEN their editor SHALL provide validation and autocompletion
- AND validation errors SHALL be caught before runtime

#### Scenario: Hot reloading

- GIVEN the application is running in development mode
- WHEN `evento.json` is modified
- THEN the application SHALL reload the updated data
- AND the video preview SHALL update to reflect changes
- AND no application restart SHALL be required

### Requirement: File Structure Consistency

The JSON structure SHALL be consistent and well-organized.

#### Scenario: Structural consistency

- GIVEN the current `evento.json` has inconsistent structures for speakers
- WHEN defining the final JSON structure
- THEN all speaker-related arrays SHALL have consistent field names
- AND all arrays SHALL use the same structure for similar data types
- AND the structure SHALL be intuitive for non-technical users to edit