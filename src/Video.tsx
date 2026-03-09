import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from 'remotion';
import { getCachedEventoData, createDetailRows, createModerators, createThursdaySpeakers, createFridaySpeakers } from './utils/evento-loader';

// ─── Configuration ─────────────────────────────────────────────────────────────
export const FPS    = 30;
export const WIDTH  = 1080;
export const HEIGHT = 1920;

const T = {
  intro:       { from:    0, dur: 270 }, // 9 s (aumentado por la sección de oradores principales)
  detalles:    { from:  270, dur: 210 }, // 7 s
  jueves:      { from:  480, dur: 300 }, // 10 s
  viernes:     { from:  780, dur: 300 }, // 10 s
  moderadores: { from: 1080, dur: 180 }, // 6 s
  cierre:      { from: 1260, dur: 270 }, // 9 s
};
export const TOTAL_FRAMES = 1530; // 51 s (aumentado de 49s a 51s)

// ─── Palette ───────────────────────────────────────────────────────────────────
const C = {
  bg:    '#0d1b2a',
  panel: '#1a2744',
  gold:  '#c9a84c',
  aqua:  '#5bb8d4',
  white: '#ffffff',
  muted: '#8899aa',
  card:  'rgba(255,255,255,0.06)',
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
const ci = (f: number, [s, e]: [number, number], [a, b]: [number, number]) =>
  interpolate(f, [s, e], [a, b], {
    extrapolateLeft:  'clamp',
    extrapolateRight: 'clamp',
  });

// ─── Shared components ─────────────────────────────────────────────────────────
const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(175deg, ${C.bg} 0%, ${C.panel} 100%)`,
      fontFamily: 'Georgia, "Times New Roman", serif',
      overflow: 'hidden',
    }}
  >
    {children}
  </AbsoluteFill>
);

/** White box behind every logo so it's visible on the dark background */
const LogoBox: React.FC<{ file: string; h?: number }> = ({ file, h = 80 }) => (
  <div
    style={{
      background:     '#fff',
      borderRadius:   12,
      padding:        '12px 22px',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      boxShadow:      '0 4px 20px rgba(0,0,0,0.50)',
    }}
  >
    <Img src={staticFile(file)} style={{ height: h, objectFit: 'contain' }} />
  </div>
);

/** Component to display event logos from JSON data */
const EventLogos: React.FC<{ size?: number; opacityFrame?: number }> = ({ size = 80, opacityFrame = 0 }) => {
  const f = useCurrentFrame();
  
  // Load logos from JSON data with fallback
  const logos = React.useMemo(() => {
    try {
      const eventData = getCachedEventoData();
      return [
        eventData.assets_globales.logo_ivujus,
        eventData.assets_globales.logo_usina,
        eventData.assets_globales.logo_colegio
      ];
    } catch (error) {
      console.error('Failed to load logos from JSON:', error);
      return ['IVUJUS.png', 'logo-usina.png', 'Colegio_Abogados.png'];
    }
  }, []);

  return (
    <div
      style={{
        opacity:        ci(f, [opacityFrame, opacityFrame + 22], [0, 1]),
        display:        'flex',
        gap:            16,
        flexWrap:       'wrap',
        justifyContent: 'center',
      }}
    >
      {logos.map((logoFile, index) => (
        <LogoBox key={index} file={logoFile} h={size} />
      ))}
    </div>
  );
};

const Bar: React.FC<{ w?: number; color?: string }> = ({ w = 80, color = C.gold }) => (
  <div style={{ width: w, height: 3, background: color, borderRadius: 2 }} />
);

// ─── Scene 1 · Intro ───────────────────────────────────────────────────────────
const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <Page>
      <AbsoluteFill
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '170px 64px 270px',
          gap:            36,
        }}
      >
        <EventLogos opacityFrame={0} />

        <div style={{ opacity: ci(f, [18, 36], [0, 1]) }}>
          <Bar w={110} />
        </div>

        <div
          style={{
            opacity:       ci(f, [28, 46], [0, 1]),
            color:         C.gold,
            fontSize:      30,
            letterSpacing: 10,
            textTransform: 'uppercase',
          }}
        >
          PRIMER
        </div>

        <div
          style={{
            opacity:   ci(f, [42, 68], [0, 1]),
            transform: `translateY(${ci(f, [42, 68], [40, 0])}px)`,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color:         C.white,
              fontSize:      92,
              fontWeight:    900,
              textTransform: 'uppercase',
              lineHeight:    1.15,
              margin:        0,
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
            opacity:    ci(f, [62, 86], [0, 1]),
            color:      C.muted,
            fontSize:   36,
            fontStyle:  'italic',
            textAlign:  'center',
            lineHeight: 1.55,
          }}
        >
          "Las víctimas de homicidio
          <br />en contexto de inseguridad"
        </div>

        <div
          style={{
            opacity:       ci(f, [140, 160], [0, 1]),
            transform:     `translateY(${ci(f, [140, 160], [20, 0])}px)`,
            background:    'rgba(255,255,255,0.1)',
            border:        `1px solid ${C.gold}`,
            padding:       '12px 24px',
            borderRadius:  8,
          }}
        >
          <div style={{ color: C.gold, fontSize: 30, fontWeight: 500, letterSpacing: 1, textAlign: 'center' }}>
            Declarado de interés jurídico por la Legislatura de la Ciudad Autónoma de Buenos Aires
          </div>
        </div>
      </AbsoluteFill>
    </Page>
  );
};

// ─── Scene 2 · Detalles ────────────────────────────────────────────────────────

const Detalles: React.FC = () => {
  const f = useCurrentFrame();
  
  // Load detail rows from JSON data
  const detailRows = React.useMemo(() => {
    const eventData = getCachedEventoData();
    return createDetailRows(eventData);
  }, []);

  return (
    <Page>
      <AbsoluteFill
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '170px 64px 270px',
          gap:            28,
        }}
      >
        <div
          style={{
            opacity:       ci(f, [0, 18], [0, 1]),
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           14,
          }}
        >
          <div style={{ color: C.gold, fontSize: 24, letterSpacing: 7, textTransform: 'uppercase' }}>
            INFORMACIÓN DEL EVENTO
          </div>
          <Bar />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
          {detailRows.map(({ label, value }, i) => {
            const s = 12 + i * 14;
            return (
              <div
                key={label}
                style={{
                  opacity:      ci(f, [s, s + 20], [0, 1]),
                  transform:    `translateX(${ci(f, [s, s + 20], [-55, 0])}px)`,
                  background:   C.card,
                  borderRadius: 12,
                  padding:      '22px 28px',
                  borderLeft:   `4px solid ${C.gold}`,
                }}
              >
                <div style={{ color: C.gold, fontSize: 18, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 10 }}>
                  {label}
                </div>
                <div style={{ color: C.white, fontSize: 34, whiteSpace: 'pre-line', lineHeight: 1.4 }}>
                  {value}
                </div>
              </div>
            );
          })}
        </div>

        <EventLogos size={80} opacityFrame={100} />
      </AbsoluteFill>
    </Page>
  );
};

// ─── Scenes 3 & 4 · Day grids ──────────────────────────────────────────────────
// Import type for speakers
import { SpeakerInfo } from './types/evento';

// Speakers arrays will be loaded from JSON data
// These are fallback arrays in case JSON loading fails
const H_PAD      = 56;
const COL_GAP    = 20;
const COLS       = 3;
const PHOTO_SIZE = 210;
const GRID_WIDTH = WIDTH - H_PAD * 2; // 968 px

interface DayGridProps {
  dayLabel:    string;
  accentColor: string;
  dayType:     'jueves' | 'viernes';
}

const DayGrid: React.FC<DayGridProps> = ({ dayLabel, accentColor, dayType }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Load speakers from JSON data based on day type
  const speakers = React.useMemo(() => {
    const eventData = getCachedEventoData();
    if (dayType === 'jueves') {
      return createThursdaySpeakers(eventData);
    } else {
      return createFridaySpeakers(eventData);
    }
  }, [dayType]);

  return (
    <Page>
      <AbsoluteFill
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        `170px ${H_PAD}px 270px`,
        }}
      >
        {/* Day header */}
        <div
          style={{
            opacity:       ci(f, [0, 20], [0, 1]),
            transform:     `translateY(${ci(f, [0, 20], [28, 0])}px)`,
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           14,
            marginBottom:  40,
          }}
        >
          <div style={{ color: accentColor, fontSize: 36, letterSpacing: 6, textTransform: 'uppercase', fontWeight: 700 }}>
            {dayLabel}
          </div>
          <Bar w={90} color={accentColor} />
          <div style={{ color: C.muted, fontSize: 24, letterSpacing: 4, textTransform: 'uppercase' }}>
            DISERTANTES
          </div>
        </div>

        {/* Speaker grid */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap:                 `28px ${COL_GAP}px`,
            width:               GRID_WIDTH,
          }}
        >
          {speakers.map(({ archivo, nombre }, i) => {
            const delay = 14 + i * 12;
            const op    = ci(f, [delay, delay + 22], [0, 1]);
            const sc    = spring({
              frame:  Math.max(0, f - delay),
              fps,
              config: { damping: 18, stiffness: 100, mass: 0.7 },
            });
            return (
              <div
                key={archivo}
                style={{
                  opacity:       op,
                  transform:     `scale(${sc})`,
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           12,
                }}
              >
                <div
                  style={{
                    width:        PHOTO_SIZE,
                    height:       PHOTO_SIZE,
                    borderRadius: '50%',
                    overflow:     'hidden',
                    border:       `3px solid ${accentColor}`,
                    boxShadow:    `0 0 20px ${accentColor}55`,
                    flexShrink:   0,
                  }}
                >
                  <Img
                    src={staticFile(`Oradores/${archivo}`)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <div
                  style={{
                    color:         C.white,
                    fontSize:      22,
                    fontWeight:    700,
                    textTransform: 'uppercase',
                    textAlign:     'center',
                    lineHeight:    1.3,
                    whiteSpace:    'pre-line',
                  }}
                >
                  {nombre}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Page>
  );
};

// ─── Scene 5 · Moderadores ─────────────────────────────────────────────────────
// Hardcoded moderators as fallback
const Moderadores: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Load moderators from JSON data
  const moderators = React.useMemo(() => {
    const eventData = getCachedEventoData();
    return createModerators(eventData);
  }, []);
  
  return (
    <Page>
      <AbsoluteFill
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '170px 64px 270px',
          gap:            52,
        }}
      >
        <div
          style={{
            opacity:       ci(f, [0, 20], [0, 1]),
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           14,
          }}
        >
          <div style={{ color: C.gold, fontSize: 30, letterSpacing: 10, textTransform: 'uppercase' }}>
            MODERADORES
          </div>
          <Bar />
        </div>

        <div style={{ display: 'flex', gap: 60, justifyContent: 'center' }}>
          {moderators.map(({ archivo, nombre }, i) => {
            const delay = 14 + i * 24;
            const op    = ci(f, [delay, delay + 20], [0, 1]);
            const sc    = spring({ frame: Math.max(0, f - delay), fps, config: { damping: 16, stiffness: 70 } });
            return (
              <div
                key={nombre}
                style={{
                  opacity:       op,
                  transform:     `scale(${sc})`,
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           22,
                }}
              >
                <div
                  style={{
                    width:        330,
                    height:       330,
                    borderRadius: '50%',
                    overflow:     'hidden',
                    border:       `5px solid ${C.gold}`,
                    boxShadow:    `0 0 50px ${C.gold}44`,
                  }}
                >
                  <Img
                    src={staticFile(`Oradores/${archivo}`)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <div
                  style={{
                    color:         C.white,
                    fontSize:      36,
                    fontWeight:    700,
                    textTransform: 'uppercase',
                    textAlign:     'center',
                    lineHeight:    1.3,
                    whiteSpace:    'pre-line',
                  }}
                >
                  {nombre}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Page>
  );
};

// ─── Scene 6 · Cierre ──────────────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Page>
      <AbsoluteFill
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '170px 64px 270px',
          gap:            44,
        }}
      >
        <EventLogos size={100} opacityFrame={0} />

        <div style={{ opacity: ci(f, [22, 38], [0, 1]) }}>
          <Bar w={500} />
        </div>

        <div
          style={{
            opacity:   ci(f, [36, 58], [0, 1]),
            transform: `translateY(${ci(f, [36, 58], [24, 0])}px)`,
            textAlign: 'center',
          }}
        >
          <div style={{ color: C.white, fontSize: 56, fontWeight: 700 }}>
            9 y 10 de abril de 2026
          </div>
          <div style={{ color: C.muted, fontSize: 34, marginTop: 14, lineHeight: 1.5 }}>
            Auditorio CPACF
            <br />Av. Corrientes 1441, CABA
          </div>
        </div>

        <div
          style={{
            opacity:       ci(f, [56, 76], [0, 1]),
            color:         C.gold,
            fontSize:      30,
            fontWeight:    700,
            letterSpacing: 2,
            textAlign:     'center',
          }}
        >
          Actividad no arancelada
        </div>

        <div
          style={{
            opacity:      ci(f, [72, 94], [0, 1]),
            background:   C.gold,
            padding:      '22px 52px',
            borderRadius: 14,
          }}
        >
          <div style={{ color: C.bg, fontSize: 26, fontWeight: 700, letterSpacing: 1, textAlign: 'center', lineHeight: 1.5 }}>
            Inscribite en
            <br />www.simposiousinadejusticia.org.ar
          </div>
        </div>
      </AbsoluteFill>
    </Page>
  );
};

// ─── Main composition ──────────────────────────────────────────────────────────
export const SimposioPromo: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={T.intro.from}       durationInFrames={T.intro.dur}>
      <Intro />
    </Sequence>
    <Sequence from={T.detalles.from}    durationInFrames={T.detalles.dur}>
      <Detalles />
    </Sequence>
    <Sequence from={T.jueves.from}      durationInFrames={T.jueves.dur}>
      <DayGrid dayLabel="JUEVES 9 DE ABRIL"    accentColor={C.gold} dayType="jueves" />
    </Sequence>
    <Sequence from={T.viernes.from}     durationInFrames={T.viernes.dur}>
      <DayGrid dayLabel="VIERNES 10 DE ABRIL"  accentColor={C.aqua} dayType="viernes" />
    </Sequence>
    <Sequence from={T.moderadores.from} durationInFrames={T.moderadores.dur}>
      <Moderadores />
    </Sequence>
    <Sequence from={T.cierre.from}      durationInFrames={T.cierre.dur}>
      <Cierre />
    </Sequence>
  </AbsoluteFill>
);
