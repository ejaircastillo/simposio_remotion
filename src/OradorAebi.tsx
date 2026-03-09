import React from 'react';
import { AbsoluteFill } from 'remotion';
import { OradorProfile } from './components/OradorProfile';
import { getSpeakerById } from './utils/speakers';

const FPS = 30;
const DURATION = 15;
export const TOTAL_FRAMES = FPS * DURATION;

const EVENTO_INFO = {
  dias: 'VIERNES 10 DE ABRIL',
  nombre: 'PRIMER SIMPOSIO AMERICANO Y EUROPEO DE VICTIMOLOGÍA PENAL',
  lugar: 'Auditorio CPACF - Av. Corrientes 1441, CABA',
  web: 'www.simposiousinadejusticia.org.ar',
};

export const OradorAebi: React.FC = () => {
  const speaker = getSpeakerById('marcelo-aebi');

  if (!speaker) {
    return (
      <AbsoluteFill style={{ background: '#0d1b2a' }}>
        <div style={{ color: 'white', padding: 50 }}>Speaker no encontrado</div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <OradorProfile
        speaker={speaker}
        diasEvento={EVENTO_INFO.dias}
        nombreEvento={EVENTO_INFO.nombre}
        lugarEvento={EVENTO_INFO.lugar}
        webEvento={EVENTO_INFO.web}
      />
    </AbsoluteFill>
  );
};