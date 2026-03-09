/**
 * TypeScript types for evento.json integration with Video.tsx
 * 
 * Core interfaces are defined here for use throughout the application.
 * Component-specific types are also defined for transformation functions.
 */

/**
 * Global assets configuration
 * @property logo_usina - Usina de Justicia logo filename
 * @property logo_ivujus - IVUJUS logo filename
 * @property logo_colegio - Colegio de Abogados logo filename
 * @property favicon - Favicon filename
 */
export interface AssetsGlobales {
  logo_usina: string;
  logo_ivujus: string;
  logo_colegio: string;
  favicon: string;
}

/**
 * Main speaker/orator information
 * @property nombre - Speaker's full name
 * @property pais - Speaker's country
 * @property archivo - Speaker image filename
 */
export interface OradorPrincipal {
  nombre: string;
  pais: string;
  archivo: string;
}

/**
 * Moderator information
 * @property nombre - Moderator's full name
 * @property archivo - Moderator image filename
 */
export interface Moderador {
  nombre: string;
  archivo: string;
}

/**
 * Event block/session information
 * @property hora - Time of the block (e.g., "15:00")
 * @property tema - Topic/title of the block
 * @property disertantes - Array of speaker filenames for this block
 */
export interface BloqueEvento {
  hora: string;
  tema: string;
  disertantes: string[];
}

/**
 * Complete event data structure matching evento.json format
 * @property evento - Main event title
 * @property subtitulo - Event subtitle
 * @property fechas - Event dates string
 * @property horario - Event schedule/timing
 * @property ubicacion - Event location
 * @property web - Event website URL
 * @property assets_globales - Global assets configuration
 * @property oradores_principales - Array of main speakers
 * @property moderadores - Array of moderators
 * @property bloques_jueves - Array of Thursday event blocks
 * @property bloques_viernes - Array of Friday event blocks
 */
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

/**
 * Represents a detail row in the Detalles component
 * @property label - The label/title of the detail (e.g., "Fechas", "Horario")
 * @property value - The value/content of the detail
 */
export interface DetailRow {
  label: string;
  value: string;
}

/**
 * Represents a speaker information object used in DayGrid components
 * @property archivo - Speaker image filename (e.g., "waller.webp")
 * @property nombre - Speaker display name (may contain newlines for formatting)
 */
export interface SpeakerInfo {
  archivo: string;
  nombre: string;
}

/**
 * Result of loading event data from JSON or fallback
 * @property success - Whether the data was loaded successfully
 * @property data - The loaded event data (if successful)
 * @property error - Error message (if failed)
 * @property source - Source of the data: 'json' (from evento.json), 'default' (fallback), or 'error'
 */
export interface EventoLoadResult {
  success: boolean;
  data?: EventoData;
  error?: string;
  source: 'json' | 'default' | 'error';
}

// Type alias for consistency (backward compatibility)
export type EventData = EventoData;