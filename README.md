# Simposio Remotion Video

Video promocional del Primer Simposio Americano y Europeo de Victimología Penal creado con [Remotion](https://www.remotion.dev/).

## Configuración Rápida

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar entorno de desarrollo:**
   ```bash
   npm start
   ```

3. **Renderizar video:**
   ```bash
   npm run render
   ```

## Configuración de Evento

### Archivo `evento.json`

El video utiliza datos externos desde `evento.json` en la raíz del proyecto. Este archivo contiene:

- Información del evento (título, fechas, horario, ubicación)
- Logos y assets globales
- Oradores principales y moderadores
- Bloques de sesiones para jueves y viernes

### Estructura del JSON

Ver `docs/evento-json-migration.md` para la especificación completa.

### Validación

Para validar el archivo `evento.json`:
```bash
node scripts/validate-evento.js
```

## Variables de Entorno

- `USE_EVENTO_JSON` - Controla la fuente de datos (por defecto: `true`)
  - `true`: Usa datos de `evento.json`
  - `false`: Usa datos codificados (solo para emergencias)

Ejemplo:
```bash
USE_EVENTO_JSON=false npm start  # Usar datos codificados
```

## Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

## Estructura del Proyecto

```
simposio_remotion/
├── src/
│   ├── Video.tsx              # Video principal
│   ├── Root.tsx               # Componente raíz
│   ├── types/evento.ts        # Interfaces TypeScript
│   └── utils/
│       ├── evento-loader.ts   # Carga y transformación de datos
│       ├── evento-schema.ts   # Validación Zod
│       ├── evento-data.ts     # Importación en tiempo de build
│       └── feature-flags.ts   # Configuración de entorno
├── evento.json                # Datos del evento
├── public/                    # Assets estáticos
│   └── Oradores/             # Imágenes de oradores
├── docs/                     # Documentación
├── scripts/                  # Scripts de utilidad
└── openspec/                 # Especificaciones y planificación
```

## Desarrollo

### Migración de Datos

El proyecto migró de datos codificados en `Video.tsx` a configuración externa en `evento.json`. Para detalles técnicos, ver:

- `docs/evento-json-migration.md` - Documentación completa
- `openspec/changes/integrate-event-json/` - Planificación y seguimiento

### Transformación de Datos

El sistema incluye transformaciones inteligentes:

1. **Mapeo de nombres de oradores:** Convierte nombres de archivo a nombres para mostrar
2. **Formateo de ubicación:** Extrae información CPACF y formatea con saltos de línea
3. **Formateo de URL:** Remueve protocolos para mostrar limpiamente

### Caching y Performance

- **Desarrollo:** Carga dinámica con `require()` para hot reload
- **Producción:** Importación en tiempo de build para eliminar dependencias del filesystem
- **Caching:** Singleton con caché en memoria para múltiples accesos

## Troubleshooting

### Problemas Comunes

1. **Errores de validación JSON:**
   - Ejecutar `node scripts/validate-evento.js`
   - Verificar campos requeridos en `docs/evento-json-migration.md`

2. **Imágenes no cargan:**
   - Verificar que los nombres de archivo en JSON coincidan con archivos en `public/Oradores/`
   - Verificar extensiones (debe ser `.webp`)

3. **Errores en producción:**
   - Verificar que `evento.json` exista en la raíz del proyecto
   - Ejecutar `npx tsc --noEmit` para verificar compilación TypeScript

### Rollback de Emergencia

Si hay problemas críticos:
```bash
USE_EVENTO_JSON=false npm start
```

Esto usará los datos codificados como respaldo.

## Licencia

Proyecto interno para el Primer Simposio Americano y Europeo de Victimología Penal.