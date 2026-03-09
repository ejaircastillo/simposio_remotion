import React from 'react';
import { AbsoluteFill } from 'remotion';
import { OradorProfile } from './components/OradorProfile';
import { getSpeakerById, SpeakerData } from './utils/speakers';

const FPS = 30;
export const TOTAL_FRAMES = 450;

interface OradorVideoProps {
  speakerId: string;
  dias: string;
}

const EVENTO_INFO = {
  nombre: 'PRIMER SIMPOSIO AMERICANO Y EUROPEO DE VICTIMOLOGÍA PENAL',
  lugar: 'Auditorio CPACF - Av. Corrientes 1441, CABA',
  web: 'www.simposiousinadejusticia.org.ar',
};

export const OradorVideo: React.FC<OradorVideoProps> = ({ speakerId, dias }) => {
  const speaker = getSpeakerById(speakerId);

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
        speaker={speaker}
        diasEvento={dias}
        nombreEvento={EVENTO_INFO.nombre}
        lugarEvento={EVENTO_INFO.lugar}
        webEvento={EVENTO_INFO.web}
      />
    </AbsoluteFill>
  );
};