import React from 'react';
import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { OradorProfile } from './components/OradorProfile';
import { getSpeakerById, SpeakerData } from './utils/speakers';

const FPS = 30;
export const TOTAL_FRAMES = 600;

const AVAILABLE_PHOTOS = [
  '',
  'aebi.webp',
  'bargna.webp',
  'casares.webp',
  'castex.webp',
  'console.webp',
  'Dario Solis.webp',
  'Diana_hd.webp',
  'fiumara.webp',
  'Garavano.webp',
  'jimena_1.webp',
  'juarez.webp',
  'malvido.webp',
  'massa.webp',
  'pascua.webp',
  'peluzzi.webp',
  'peluzzi2.webp',
  'quintana.webp',
  'Ricardo-Gil-lavedra.webp',
  'roggero.webp',
  'romano.webp',
  'slotolow.webp',
  'soto.webp',
  'topic.webp',
  'waller.webp',
] as const;

export const OradorVideoSchema = z.object({
  speakerId: z.string(),
  dias: z.string(),
  archivoOverride: z.enum(AVAILABLE_PHOTOS).describe('Foto override (vacío = usar default del orador)'),
  imageOffsetX: z.number().min(-500).max(500).step(5),
  imageOffsetY: z.number().min(-500).max(500).step(5),
  imageZoom: z.number().min(50).max(500).step(5),
  imageFade: z.number().min(0).max(100).step(5),
  cvFontSize: z.number().min(20).max(50).step(1),
});

export type OradorVideoProps = z.infer<typeof OradorVideoSchema>;

const EVENTO_INFO = {
  nombre: 'PRIMER SIMPOSIO AMERICANO Y EUROPEO DE VICTIMOLOGÍA PENAL',
  lugar: 'Auditorio CPACF - Av. Corrientes 1441, CABA',
  web: 'www.simposiousinadejusticia.org.ar',
};

export const OradorVideo: React.FC<OradorVideoProps> = ({ speakerId, dias, archivoOverride = '', imageOffsetX = 0, imageOffsetY = 0, imageZoom = 100, imageFade = 70, cvFontSize = 36 }) => {
  const speaker = getSpeakerById(speakerId);
  const speakerWithPosition = speaker ? {
    ...speaker,
    ...(archivoOverride ? { archivo: archivoOverride } : {}),
    imageOffsetX,
    imageOffsetY,
    imageZoom,
    imageFade,
    cvFontSize,
  } : null;

  if (!speaker) {
    return (
      <AbsoluteFill style={{ background: '#0d1b2a' }}>
        <div style={{ color: 'white', padding: 50, fontSize: 32 }}>
          Speaker no encontrado: {speakerId}
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <OradorProfile
        speaker={speakerWithPosition as SpeakerData}
        diasEvento={dias}
        nombreEvento={EVENTO_INFO.nombre}
        lugarEvento={EVENTO_INFO.lugar}
        webEvento={EVENTO_INFO.web}
      />
    </AbsoluteFill>
  );
};