# Resumen de Migración - Día de Trabajo

## Archivos Principales Modificados

### 1. `src/Video.tsx`
- **Antes**: Datos hardcodeados directamente en el componente (logos, oradores, moderadores, etc.)
- **Después**: Carga datos dinámicamente desde `evento.json` via `evento-loader.ts`
- **Cambios clave**:
  - Importa `getCachedEventoData`, `createDetailRows`, `createModerators`, `createThursdaySpeakers`, `createFridaySpeakers`
  - Reemplazó arrays hardcodeados por `useMemo` que leen del JSON
  - Agregó manejo de errores con fallbacks a valores por defecto

### 2. `evento.json`
- **Archivo nuevo** que sirve como fuente de datos principal
- Contiene toda la información del evento:
  - Datos generales (nombre, fechas, ubicación, web)
  - `assets_globales`: rutas de logos
  - `oradores_principales`: 4 oradores principales
  - `moderadores`: 2 moderadores
  - `bloques_jueves` y `bloques_viernes`: paneles con disertantes

### 3. `src/utils/evento-loader.ts`
- **Archivo nuevo** que centraliza la carga y transformación de datos
- Funciones principales:
  - `loadEventoData()`: carga y valida el JSON
  - `getCachedEventoData()`: retorna datos en cache
  - `createDetailRows()`: transforma datos para sección Detalles
  - `createThursdaySpeakers()` / `createFridaySpeakers()`: extrae oradores únicos
  - `createModerators()`: formatea moderadores
  - `mapFilenameToName()`: mapea filenames a nombres
- Incluye `DEFAULT_EVENTO_DATA` como fallback

---

## Beneficios de la Migración
- **Separación de datos y presentación**: Los datos ahora viven en JSON, no en código
- **Mantenibilidad**: Actualizar info del evento solo requiere editar `evento.json`
- **Validación**: Schema Zod asegura que el JSON tenga la estructura correcta
- **Fallbacks**: Si el JSON falla, usa datos por defecto hardcodeados
- **Escalabilidad**: Easy agregar nuevos oradores/bloques sin tocar código React
