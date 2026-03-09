/**
 * Zod schema validation for evento.json structure
 * 
 * Provides runtime validation for the evento.json data structure.
 * This schema ensures data integrity and provides helpful error messages.
 */

import { z } from 'zod';
import type {
  AssetsGlobales,
  OradorPrincipal,
  Moderador,
  BloqueEvento,
  EventoData
} from '../types/evento';

// Schema for global assets
const AssetsGlobalesSchema = z.object({
  logo_usina: z.string().min(1, 'logo_usina is required'),
  logo_ivujus: z.string().min(1, 'logo_ivujus is required'),
  logo_colegio: z.string().min(1, 'logo_colegio is required'),
  favicon: z.string().min(1, 'favicon is required'),
});

// Schema for main speakers
const OradorPrincipalSchema = z.object({
  nombre: z.string().min(1, 'nombre is required'),
  pais: z.string().min(1, 'pais is required'),
  archivo: z.string().min(1, 'archivo is required'),
});

// Schema for moderators
const ModeradorSchema = z.object({
  nombre: z.string().min(1, 'nombre is required'),
  archivo: z.string().min(1, 'archivo is required'),
});

// Schema for event blocks
const BloqueEventoSchema = z.object({
  hora: z.string().min(1, 'hora is required'),
  tema: z.string().min(1, 'tema is required'),
  disertantes: z.array(z.string().min(1, 'disertante filename is required')).min(1, 'At least one disertante is required'),
});

// Main event data schema
export const EventoDataSchema = z.object({
  evento: z.string().min(1, 'evento is required'),
  subtitulo: z.string().min(1, 'subtitulo is required'),
  fechas: z.string().min(1, 'fechas is required'),
  horario: z.string().min(1, 'horario is required'),
  ubicacion: z.string().min(1, 'ubicacion is required'),
  web: z.string().min(1, 'web is required'),
  assets_globales: AssetsGlobalesSchema,
  oradores_principales: z.array(OradorPrincipalSchema).min(1, 'At least one orador_principal is required'),
  moderadores: z.array(ModeradorSchema).min(1, 'At least one moderador is required'),
  bloques_jueves: z.array(BloqueEventoSchema).min(1, 'At least one bloque_jueves is required'),
  bloques_viernes: z.array(BloqueEventoSchema).min(1, 'At least one bloque_viernes is required'),
});

// Export type inference from schema for runtime validation
export type EventoDataSchemaType = z.infer<typeof EventoDataSchema>;
export type AssetsGlobalesSchemaType = z.infer<typeof AssetsGlobalesSchema>;
export type OradorPrincipalSchemaType = z.infer<typeof OradorPrincipalSchema>;
export type ModeradorSchemaType = z.infer<typeof ModeradorSchema>;
export type BloqueEventoSchemaType = z.infer<typeof BloqueEventoSchema>;