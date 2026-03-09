# Evento.json Migration Documentation

## Overview

This document describes the migration from hardcoded event data in `Video.tsx` to external JSON configuration via `evento.json`. The migration enables dynamic content updates without code changes and provides better separation of content from presentation logic.

## Architecture

### Data Flow
```
evento.json ──┐
              ├─→ evento-loader.ts (load, validate, cache) ──→ getCachedEventoData()
types/evento.ts ─┘
                          │
                          ↓
              Video.tsx components (via props/import)
```

### Key Components

1. **`src/types/evento.ts`** - TypeScript interfaces for data structure
2. **`src/utils/evento-schema.ts`** - Zod validation schemas
3. **`src/utils/evento-loader.ts`** - Core loading, caching, and transformation logic
4. **`src/utils/evento-data.ts`** - Build-time JSON import module
5. **`src/utils/feature-flags.ts`** - Environment-based feature toggles

## JSON Schema

The `evento.json` file must adhere to the following structure:

```json
{
  "evento": "Event title",
  "subtitulo": "Event subtitle",
  "fechas": "Event dates string",
  "horario": "Event schedule",
  "ubicacion": "Event location",
  "web": "Event website URL",
  "assets_globales": {
    "logo_usina": "logo-usina.png",
    "logo_ivujus": "IVUJUS.png",
    "logo_colegio": "Colegio_Abogados.png",
    "favicon": "favicon_usina.png"
  },
  "oradores_principales": [
    {
      "nombre": "Speaker full name",
      "pais": "Speaker country",
      "archivo": "speaker-image.webp"
    }
  ],
  "moderadores": [
    {
      "nombre": "Moderator full name",
      "archivo": "moderator-image.webp"
    }
  ],
  "bloques_jueves": [
    {
      "hora": "15:00",
      "tema": "Session topic",
      "disertantes": ["speaker1.webp", "speaker2.webp"]
    }
  ],
  "bloques_viernes": [
    {
      "hora": "15:00",
      "tema": "Session topic",
      "disertantes": ["speaker1.webp"]
    }
  ]
}
```

## Data Transformation

### Detail Rows
Transforms event metadata into display-ready detail rows:
- Dates, schedule, location, website
- Location formatting with CPACF extraction
- Website URL cleaning (removes protocol/www)

### Speaker Mapping
Three-tier filename-to-name mapping algorithm:
1. **Exact match** - Find speaker in `oradores_principales` by filename
2. **Generated name** - Convert filename to uppercase name (e.g., `Ricardo-Gil-lavedra.webp` → `RICARDO GIL LAVEDRA`)
3. **Placeholder** - Fallback to "Orador Jueves" if generation fails

### Moderator Formatting
Transforms moderator names with newline formatting:
- `"MARIANA ROMANO"` → `"MARIANA\nROMANO"`
- Preserves multi-part names with proper line breaks

## Environment Configuration

### Feature Flags
- `USE_EVENTO_JSON` environment variable controls data source
- Default: `true` (uses JSON data)
- Set to `false` to use hardcoded fallback (for emergencies)

### Build Modes
- **Development**: Dynamic `require()` for hot reload
- **Production**: Build-time import via `evento-data.ts` module

## Usage

### Basic Usage
```typescript
import { getCachedEventoData } from './utils/evento-loader';

// Get all event data
const eventData = getCachedEventoData();

// Use transformation functions
import { createDetailRows, createThursdaySpeakers } from './utils/evento-loader';
const detailRows = createDetailRows(eventData);
const thursdaySpeakers = createThursdaySpeakers(eventData);
```

### Environment Variables
```bash
# Use JSON data (default)
USE_EVENTO_JSON=true npm start

# Use hardcoded fallback (emergency)
USE_EVENTO_JSON=false npm start
```

## Testing

### Unit Tests
Run tests with:
```bash
npm test
npm run test:watch
npm run test:coverage
```

### Test Coverage
Tests cover:
- Data transformation functions
- Filename-to-name mapping algorithm
- Location and URL formatting
- Error handling and validation

## Migration Status

### Completed
- ✅ TypeScript interfaces and Zod validation
- ✅ Data loading with caching
- ✅ Transformation functions for all components
- ✅ Feature flag system
- ✅ Build-time JSON import for production
- ✅ Removal of hardcoded fallback data
- ✅ Basic unit test structure

### Pending (Future Enhancements)
- JSON Schema file for editor validation
- Performance optimization with memoization
- Integration tests for component rendering
- Visual comparison tests

## Troubleshooting

### Common Issues

1. **JSON validation errors**
   - Check all required fields are present
   - Verify field types match schema
   - Run `npm test` to validate against schema

2. **Speaker images not loading**
   - Verify filenames in JSON match actual files in `public/Oradores/`
   - Check filename extensions (`.webp` required)

3. **Build errors in production**
   - Ensure `evento.json` exists at project root
   - Verify TypeScript compilation passes: `npx tsc --noEmit`

### Rollback Procedure
In case of critical issues:
1. Set `USE_EVENTO_JSON=false` environment variable
2. Restart development server or rebuild
3. System will use hardcoded default data

## Version History

- **v1.0** - Initial migration completed
  - All video components use JSON data
  - Comprehensive validation and error handling
  - Build-time bundling for production
  - Feature flag for emergency rollback

## Future Enhancements

1. **JSON Schema Generation**
   - Create `evento.schema.json` for editor autocomplete
   - Add build-time validation

2. **Performance Optimizations**
   - Memoization for transformation functions
   - Lazy loading for image paths
   - Production bundle optimization

3. **Extended Testing**
   - Integration tests for component rendering
   - Visual regression testing
   - Performance benchmarking