import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from 'remotion';
import { SpeakerData } from '../utils/speakers';

const C = {
  bg: '#0d1b2a',
  panel: '#1a2744',
  gold: '#c9a84c',
  aqua: '#5bb8d4',
  white: '#ffffff',
  muted: '#8899aa',
  deepBlue: '#0a1628',
};

const ci = (f: number, [s, e]: [number, number], [a, b]: [number, number]) =>
  interpolate(f, [s, e], [a, b], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const GradienteAnimado: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const offset = Math.cos(frame * 0.02) * 20;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(${135 + offset}deg, ${C.deepBlue} 0%, ${C.bg} 30%, ${C.panel} 60%, ${C.deepBlue} 100%)`,
      }}
    >
      {children}
    </div>
  );
};

const LogoBox: React.FC<{ file: string; h?: number }> = ({ file, h = 60 }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 10,
      padding: '10px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.50)',
    }}
  >
    <Img src={staticFile(file)} style={{ height: h, objectFit: 'contain' }} />
  </div>
);

const EventLogos: React.FC = () => {
  const f = useCurrentFrame();
  const opacity = ci(f, [0, 22], [0, 1]);

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', opacity }}>
      <LogoBox file="IVUJUS.png" h={80} />
      <LogoBox file="logo-usina.png" h={80} />
      <LogoBox file="Colegio_Abogados.png" h={80} />
    </div>
  );
};

const Bar: React.FC<{ w?: number; color?: string }> = ({ w = 80, color = C.gold }) => (
  <div style={{ width: w, height: 3, background: color, borderRadius: 2 }} />
);

interface OradorProfileProps {
  speaker: SpeakerData;
  diasEvento: string;
  nombreEvento: string;
  lugarEvento: string;
  webEvento: string;
}

export const OradorProfile: React.FC<OradorProfileProps> = ({
  speaker,
  diasEvento,
  nombreEvento,
  lugarEvento,
  webEvento,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const POSTER_FRAME_DURATION = 30; // 1 segundo a 30fps
  const POSTER_FRAME_TARGET = 300; // Frame donde todo está visible
  const displayFrame = frame < POSTER_FRAME_DURATION ? POSTER_FRAME_TARGET : frame - POSTER_FRAME_DURATION;

  const ACT1_END = 210;  // 7 segundos
  const ACT2_START = 210;
  const BOTON_START = 540;  // Aparece más cerca del final (ajustado por offset de 30 frames)

  const isAct1 = displayFrame < ACT1_END;
  const isAct2 = displayFrame >= ACT1_END;

  const act1Exit = ci(displayFrame, [170, 210], [0, 1]);
  const act2Enter = ci(displayFrame, [210, 240], [0, 1]);

  const logoOpacity = ci(displayFrame, [0, 22], [0, 1]);
  const barOpacity = ci(displayFrame, [18, 36], [0, 1]);
  const primerOpacity = ci(displayFrame, [28, 46], [0, 1]);
  const tituloOpacity = ci(displayFrame, [42, 68], [0, 1]);
  const tituloY = ci(displayFrame, [42, 68], [40, 0]);
  const citaOpacity = ci(displayFrame, [62, 86], [0, 1]);
  const declaradoOpacity = ci(displayFrame, [90, 120], [0, 1]);
  const declaradoY = ci(displayFrame, [90, 120], [20, 0]);

  const fotoScale = spring({ frame: Math.max(0, displayFrame - ACT1_END), fps, config: { damping: 16, stiffness: 100 } });
  const fotoOpacity = ci(displayFrame, [ACT1_END, ACT1_END + 30], [0, 1]);

  const conLaParticipacionOpacity = ci(displayFrame, [180, 200], [0, 1]);
  const conLaParticipacionY = ci(displayFrame, [180, 200], [-30, 0]);

  const nombreOpacity = ci(displayFrame, [ACT1_END + 30, ACT1_END + 60], [0, 1]);
  const nombreY = ci(displayFrame, [ACT1_END + 30, ACT1_END + 60], [40, 0]);

  const tituloOradorOpacity = ci(displayFrame, [ACT1_END + 50, ACT1_END + 80], [0, 1]);

  const cvScroll = ci(displayFrame, [ACT1_END + 80, ACT1_END + 150], [0, -80]);

  const botonOpacity = ci(displayFrame, [BOTON_START, BOTON_START + 30], [0, 1]);

  return (
    <AbsoluteFill>
      <GradienteAnimado>
        {isAct1 && (
          <AbsoluteFill
            style={{
              opacity: 1 - act1Exit,
              transform: `translateY(${-act1Exit * 50}px)`,
            }}
          >
            <AbsoluteFill
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '170px 64px 270px',
                gap: 36,
              }}
            >
              <EventLogos />

              <div style={{ opacity: barOpacity }}>
                <Bar w={110} />
              </div>

              <div
                style={{
                  opacity: primerOpacity,
                  color: C.gold,
                  fontSize: 30,
                  letterSpacing: 10,
                  textTransform: 'uppercase',
                }}
              >
                PRIMER
              </div>

              <div
                style={{
                  opacity: tituloOpacity,
                  transform: `translateY(${tituloY}px)`,
                  textAlign: 'center',
                }}
              >
                <h1
                  style={{
                    color: C.white,
                    fontSize: 72,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    lineHeight: 1.15,
                    margin: 0,
                    letterSpacing: 2,
                  }}
                >
                  SIMPOSIO
                  <br />AMERICANO Y
                  <br />EUROPEO DE
                  <br /><span style={{ color: C.gold }}>VICTIMOLOGÍA</span>
                  <br /><span style={{ color: C.gold }}>PENAL</span>
                </h1>
              </div>

              <div
                style={{
                  opacity: citaOpacity,
                  color: C.muted,
                  fontSize: 32,
                  fontStyle: 'italic',
                  textAlign: 'center',
                  lineHeight: 1.55,
                }}
              >
                "Las víctimas de homicidio
                <br />en contexto de inseguridad"
              </div>

              <div
                style={{
                  opacity: declaradoOpacity,
                  transform: `translateY(${declaradoY}px)`,
                  background: 'rgba(255,255,255,0.1)',
                  border: `1px solid ${C.gold}`,
                  padding: '12px 24px',
                  borderRadius: 8,
                }}
              >
                <div style={{ color: C.gold, fontSize: 28, fontWeight: 500, letterSpacing: 1, textAlign: 'center' }}>
                  Declarado de interés jurídico por la Legislatura de la Ciudad Autónoma de Buenos Aires
                </div>
              </div>
            </AbsoluteFill>
          </AbsoluteFill>
        )}

        {isAct2 && (
          <AbsoluteFill style={{ opacity: act2Enter }}>
            <div
              style={{
                position: 'absolute',
                top: 220,
                left: 516,
                zIndex: 20,
                opacity: conLaParticipacionOpacity,
                transform: `translateY(${conLaParticipacionY}px)`,
              }}
            >
              <div
                style={{
                  color: C.gold,
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  textAlign: 'right',
                }}
              >
                Con la Participación de
              </div>
            </div>

            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
              <div style={{ width: '45%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: fotoOpacity,
                    backgroundImage: `url('${staticFile(`Oradores/${speaker.archivo}`)}')`,
                    backgroundSize: `${speaker.imageZoom || 100}%`,
                    backgroundPosition: `calc(50% + ${speaker.imageOffsetX || 0}px) calc(50% + ${speaker.imageOffsetY || 0}px)`,
                    backgroundRepeat: 'no-repeat',
                    maskImage: `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${speaker.imageFade ?? 70}%, rgba(0,0,0,0) 100%)`,
                    WebkitMaskImage: `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${speaker.imageFade ?? 70}%, rgba(0,0,0,0) 100%)`,
                    transform: `scale(${fotoScale})`,
                  }}
                />
              </div>

              <div
                style={{
                  width: '55%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '60px 30px',
                  transform: `translateY(${cvScroll}px)`,
                }}
              >
                <div style={{ opacity: nombreOpacity, transform: `translateY(${nombreY}px)` }}>
                  <div
                    style={{
                      color: C.white,
                      fontSize: 72,
                      fontWeight: 900,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      lineHeight: 1.1,
                      marginBottom: 16,
                    }}
                  >
                    {speaker.nombre}
                  </div>
                </div>

                <div
                  style={{
                    opacity: tituloOradorOpacity,
                    color: C.gold,
                    fontSize: 40,
                    fontWeight: 600,
                    letterSpacing: 1,
                    marginBottom: 40,
                  }}
                >
                  {speaker.titulo}
                </div>

                <div style={{ color: C.white, fontSize: speaker.cvFontSize || 36, lineHeight: 1.6 }}>
                  {speaker.cv}
                </div>

                <div
                  style={{
                    opacity: botonOpacity,
                    marginTop: 60,
                    color: C.gold,
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: 2,
                  }}
                >
                  ✦ INSCRIBITE AQUÍ ✦
                </div>
                <div
                  style={{
                    opacity: botonOpacity,
                    marginTop: 12,
                    color: C.aqua,
                    fontSize: 32,
                    fontWeight: 600,
                    letterSpacing: 1,
                    alignSelf: 'flex-start',
                  }}
                >
                  www.simposiousinadejusticia.org.ar
                </div>
              </div>
            </div>
          </AbsoluteFill>
        )}
      </GradienteAnimado>
    </AbsoluteFill>
  );
};