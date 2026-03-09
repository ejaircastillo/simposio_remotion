/**
 * Event data loader for evento.json integration
 * 
 * Provides centralized loading, validation, caching, and transformation
 * of event data from evento.json file with comprehensive fallback mechanisms.
 */

import type { EventoData, DetailRow, SpeakerInfo, OradorPrincipal, Moderador, EventoLoadResult } from '../types/evento';
import { EventoDataSchema } from './evento-schema';
import { getDataSourceConfig, isEventoJsonEnabled as isEventoJsonEnabledFromFlags } from './feature-flags';

// Re-export feature flag check for convenience
export { isEventoJsonEnabledFromFlags as isEventoJsonEnabled };

// ─── Default Event Data (Fallback) ──────────────────────────────────────────────

export const DEFAULT_EVENTO_DATA: EventoData = {
  evento: "PRIMER SIMPOSIO AMERICANO Y EUROPEO DE VICTIMOLOGÍA PENAL",
  subtitulo: "Las víctimas de homicidio en contexto de inseguridad",
  fechas: "Jueves 9 y viernes 10 de abril de 2026",
  horario: "15:00 a 19:00 hs",
  ubicacion: "Auditorio del Colegio Público de la Abogacía de Capital Federal (CPACF), Av. Corrientes 1441, CABA",
  web: "www.simposiousinadejusticia.org.ar",
  assets_globales: {
    logo_usina: "logo-usina.png",
    logo_ivujus: "IVUJUS.png",
    logo_colegio: "Colegio_Abogados.png",
    favicon: "favicon_usina.png"
  },
  oradores_principales: [
    { nombre: "IRVIN WALLER", pais: "Canadá", archivo: "waller.webp" },
    { nombre: "MARÍA DE LA LUZ LIMA MALVIDO", pais: "México", archivo: "malvido.webp" },
    { nombre: "MARCELO AEBI", pais: "Argentina-Suiza", archivo: "aebi.webp" },
    { nombre: "DARÍO SOLÍS", pais: "Panamá", archivo: "Dario Solis.webp" }
  ],
  moderadores: [
    { nombre: "MARIANA ROMANO", archivo: "romano.webp" },
    { nombre: "GUSTAVO TOPIC", archivo: "topic.webp" }
  ],
  bloques_jueves: [
    { hora: "15:00", tema: "Apertura", disertantes: ["Ricardo-Gil-lavedra.webp", "Diana_hd.webp", "console.webp", "jimena_1.webp"] },
    { hora: "15:20", tema: "Panel I: Políticas Públicas", disertantes: ["malvido.webp"] },
    { hora: "16:05", tema: "Panel II: Derecho Penal", disertantes: ["castex.webp", "console.webp"] },
    { hora: "16:35", tema: "Panel III: La Ciencia", disertantes: ["roggero.webp", "juarez.webp"] },
    { hora: "17:15", tema: "Panel IV: Datos Genéticos", disertantes: ["slotolow.webp", "bargna.webp"] },
    { hora: "18:00", tema: "Panel V: Defensor de Víctima", disertantes: ["Dario Solis.webp"] }
  ],
  bloques_viernes: [
    { hora: "14:50", tema: "Apertura", disertantes: ["quintana.webp"] },
    { hora: "15:00", tema: "Panel I: Derechos de las Víctimas", disertantes: ["waller.webp"] },
    { hora: "15:45", tema: "Panel II: Política Criminal", disertantes: ["garavano.webp", "casares.webp"] },
    { hora: "16:15", tema: "Panel III: Juicio en Ausencia", disertantes: ["fiumara.webp", "soto.webp"] },
    { hora: "17:10", tema: "Panel IV: Etapa de Ejecución", disertantes: ["peluzzi.webp"] },
    { hora: "17:20", tema: "Panel V: Abolicionismo Penal", disertantes: ["pascua.webp", "jimena_1.webp"] },
    { hora: "17:40", tema: "Panel VI: Criminología Crítica", disertantes: ["aebi.webp"] }
  ]
};

// ─── Runtime Cache ──────────────────────────────────────────────────────────────

let cachedData: EventoData | null = null;
let loadAttempted = false;

// ─── Core Loading Functions ─────────────────────────────────────────────────────

/**
 * Load evento.json data with validation and caching
 * 
 * This function attempts to load and validate data from evento.json file.
 * If the JSON data source is disabled, invalid, or cannot be loaded,
 * it falls back to hardcoded default data.
 * 
 * @returns EventoLoadResult containing success status, data (if successful),
 *          error message (if failed), and data source information
 */
export function loadEventoData(): EventoLoadResult {
  const config = getDataSourceConfig();
  
  // Check if JSON data source is enabled
  if (!config.useEventoJson) {
    cachedData = DEFAULT_EVENTO_DATA;
    loadAttempted = true;
    return {
      success: true,
      data: DEFAULT_EVENTO_DATA,
      source: 'default'
    };
  }
  
  try {
    // Attempt to load evento.json using dynamic import
    // This works in both development and production modes
    // In development: allows hot reload of JSON file
    // In production: JSON is bundled at build time via require
    try {
      // Use dynamic require to load the JSON file
      // The path is relative to the project root where package.json is located
      // In production builds with bundlers like Webpack/Vite, this will be
      // resolved at build time and bundled into the output
      const jsonModule = require('../../evento.json');
      
      // Validate the loaded data against our schema
      const validationResult = EventoDataSchema.safeParse(jsonModule);
      
      if (!validationResult.success) {
        const issues = validationResult.error.issues;
        console.error('JSON validation failed:', issues);
        cachedData = DEFAULT_EVENTO_DATA;
        loadAttempted = true;
        return {
          success: false,
          error: `JSON validation failed: ${issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ')}`,
          source: 'error'
        };
      }
      
      // Data is valid, cache it and return
      cachedData = validationResult.data;
      loadAttempted = true;
      return {
        success: true,
        data: validationResult.data,
        source: 'json'
      };
      
    } catch (importError) {
      console.error('Failed to load evento.json:', importError);
      cachedData = DEFAULT_EVENTO_DATA;
      loadAttempted = true;
      return {
        success: false,
        error: `Failed to load JSON file: ${importError instanceof Error ? importError.message : String(importError)}`,
        source: 'error'
      };
    }
  } catch (error) {
    console.error('Unexpected error loading event data:', error);
    cachedData = DEFAULT_EVENTO_DATA;
    loadAttempted = true;
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
      source: 'error'
    };
  }
}

/**
 * Get cached event data, loading if necessary
 * 
 * Returns the cached event data. If no data is cached yet, it triggers
 * a load operation. If the load fails, it returns the default fallback data.
 * 
 * @returns EventoData - The loaded or default event data
 */
export function getCachedEventoData(): EventoData {
  if (!cachedData) {
    const result = loadEventoData();
    if (result.success && result.data) {
      cachedData = result.data;
    } else {
      // Fallback to defaults
      cachedData = DEFAULT_EVENTO_DATA;
    }
  }
  return cachedData;
}

// ─── Data Transformation Functions ──────────────────────────────────────────────

/**
 * Create detail rows for Detalles component
 * 
 * Transforms EventoData into the DetailRow[] structure used by the Detalles component.
 * Extracts dates, schedule, location, and website information and formats them
 * for display in the video details section.
 * 
 * @param data - EventoData object containing event information
 * @returns Array of DetailRow objects formatted for display
 */
export function createDetailRows(data: EventoData): DetailRow[] {
  return [
    { label: 'Fechas', value: data.fechas },
    { label: 'Horario', value: data.horario },
    { label: 'Lugar', value: formatLocation(data.ubicacion) },
    { label: 'Web', value: formatWeb(data.web) },
    { label: 'Entrada', value: 'Actividad no arancelada' }
  ];
}

/**
 * Create Thursday speakers array for DayGrid component
 * 
 * Extracts all unique speaker filenames from Thursday event blocks and maps them
 * to SpeakerInfo objects using the filename-to-name mapping algorithm.
 * 
 * @param data - EventoData object containing event information
 * @returns Array of SpeakerInfo objects for Thursday speakers
 */
export function createThursdaySpeakers(data: EventoData): SpeakerInfo[] {
  // Extract all unique filenames from bloques_jueves.disertantes
  const uniqueFilenames = new Set<string>();
  data.bloques_jueves.forEach(bloque => {
    bloque.disertantes.forEach(filename => {
      uniqueFilenames.add(filename);
    });
  });
  
  // Convert to array and map to SpeakerInfo objects
  return Array.from(uniqueFilenames).map(filename => {
    const nombre = mapFilenameToName(filename, data.oradores_principales);
    return {
      archivo: filename,
      nombre
    };
  });
}

/**
 * Create Friday speakers array for DayGrid component
 * 
 * Extracts all unique speaker filenames from Friday event blocks and maps them
 * to SpeakerInfo objects using the filename-to-name mapping algorithm.
 * 
 * @param data - EventoData object containing event information
 * @returns Array of SpeakerInfo objects for Friday speakers
 */
export function createFridaySpeakers(data: EventoData): SpeakerInfo[] {
  // Extract all unique filenames from bloques_viernes.disertantes
  const uniqueFilenames = new Set<string>();
  data.bloques_viernes.forEach(bloque => {
    bloque.disertantes.forEach(filename => {
      uniqueFilenames.add(filename);
    });
  });
  
  // Convert to array and map to SpeakerInfo objects
  return Array.from(uniqueFilenames).map(filename => {
    const nombre = mapFilenameToName(filename, data.oradores_principales);
    return {
      archivo: filename,
      nombre
    };
  });
}

/**
 * Create moderators array for Moderadores component
 * 
 * Transforms moderators from JSON format to the format used in Video.tsx,
 * including formatting names with newlines for proper display.
 * 
 * @param data - EventoData object containing event information
 * @returns Array of Moderador objects formatted for display
 */
export function createModerators(data: EventoData): Moderador[] {
  // Map moderadores from JSON to the format used in Video.tsx
  // The transformation needs to:
  // 1. Preserve the archivo field unchanged
  // 2. Transform nombre from "FIRST LAST" to "FIRST\nLAST" format
  return data.moderadores.map(moderador => {
    // Split the name by spaces and join with newline
    // This transforms "MARIANA ROMANO" to "MARIANA\nROMANO"
    const formattedNombre = moderador.nombre.replace(/\s+/g, '\n');
    
    return {
      archivo: moderador.archivo,
      nombre: formattedNombre
    };
  });
}

// ─── Helper Functions ───────────────────────────────────────────────────────────

/**
 * Format location string for display
 * 
 * Converts the full location string to the display format used in the Detalles component.
 * Attempts to extract CPACF reference and format address with newlines.
 * 
 * @param ubicacion - Full location string from evento.json
 * @returns Formatted location string for display
 */
export function formatLocation(ubicacion: string): string {
  // The current hardcoded value in Video.tsx is:
  // 'Auditorio CPACF\nAv. Corrientes 1441, CABA'
  // We need to transform the full ubicacion string to match this format
  
  // Try to extract CPACF reference and address
  if (ubicacion.includes('CPACF')) {
    // Already contains CPACF, try to split at comma
    const parts = ubicacion.split(',');
    if (parts.length >= 2) {
      // First part: "Auditorio del Colegio Público de la Abogacía de Capital Federal (CPACF)"
      // Extract just "Auditorio CPACF"
      const firstPart = parts[0].trim();
      const cpacfMatch = firstPart.match(/\((CPACF)\)/);
      if (cpacfMatch) {
        // Return formatted as in hardcoded version
        return `Auditorio ${cpacfMatch[1]}\n${parts.slice(1).join(',').trim()}`;
      }
    }
  }
  
  // Fallback: return as-is, but replace commas with newlines where appropriate
  return ubicacion.replace(/,\s*/g, '\n');
}

/**
 * Format web URL for display
 * 
 * Removes protocol and www. prefix for cleaner display in the video.
 * 
 * @param web - Website URL from evento.json
 * @returns Cleaned URL string for display
 */
export function formatWeb(web: string): string {
  // Remove http://, https://, www.
  let formatted = web.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  
  // Ensure it matches the hardcoded format
  // Current hardcoded value: 'simposiousinadejusticia.org.ar'
  return formatted;
}

/**
 * Map speaker filename to display name using three-tier fallback algorithm
 * 
 * 1. Exact match in oradoresPrincipales array
 * 2. Generate name from filename (uppercase, replace underscores/hyphens with spaces)
 * 3. Fallback to generic placeholder "Orador Jueves"
 * 
 * @param filename - Speaker image filename (e.g., "waller.webp")
 * @param oradoresPrincipales - Array of main speakers from evento.json
 * @returns Display name for the speaker
 */
export function mapFilenameToName(filename: string, oradoresPrincipales: OradorPrincipal[]): string {
  // Three-tier filename-to-name mapping:
  
  // 1. Exact match in oradoresPrincipales
  const exactMatch = oradoresPrincipales.find(
    orador => orador.archivo === filename
  );
  if (exactMatch) {
    return exactMatch.nombre;
  }
  
  // 2. Generate name from filename
  // Remove file extension, replace underscores/hyphens with spaces, convert to uppercase
  const baseName = filename.replace(/\.[^/.]+$/, ''); // Remove extension
  const generatedName = baseName
    .replace(/[-_]/g, ' ')  // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize first letter of each word
    .toUpperCase(); // Convert to uppercase
  
  // 3. Fallback to placeholder if generated name is empty
  if (!generatedName || generatedName.trim() === '') {
    return 'Orador Jueves'; // Generic placeholder
  }
  
  return generatedName;
}