import React from 'react';
import { Composition } from 'remotion';
import { SimposioPromo, TOTAL_FRAMES as PROMO_FRAMES, FPS, WIDTH, HEIGHT } from './Video';
import { OradorVideo, TOTAL_FRAMES as ORADOR_FRAMES, OradorVideoSchema } from './OradorVideo';

export const Root: React.FC = () => (
  <>
    <Composition
      id="SimposioPromo"
      component={SimposioPromo}
      durationInFrames={PROMO_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />

    <Composition id="OradorAebi" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'marcelo-aebi', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorMariaJimenaMolina" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'maria-jimena-molina', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorDianaCohenAgrest" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'diana-cohen-agrest', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorIrvinWaller" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'irvin-waller', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorRicardoGilLavedra" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'ricardo-gil-lavedra', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorJoseConsole" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'jose-console', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: -150, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorMarianaRomano" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'mariana-romano', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorGustavoTopic" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'gustavo-topic', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorMariaDeLaLuzLimaMalvido" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'maria-de-la-luz-lima-malvido', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorFranciscoCastex" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'francisco-castex', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorDanielRoggero" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'daniel-roggero', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: -150, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorNoeliaMarelynJuarez" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'noelia-marelyn-juarez', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorRaquelSlotolow" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'raquel-slotolow', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorGuillermoBargna" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'guillermo-bargna', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorDarioSolis" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'dario-solis', dias: 'JUEVES 9 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorFranciscoQuintana" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'francisco-quintana', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorGermanGaravano" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'german-garavano', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorMartinCasares" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'martin-casares', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorFrancoFiumara" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'franco-fiumara', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorFernandoSoto" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'fernando-soto', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorMarceloPeluzzi" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'marcelo-peluzzi', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
    <Composition id="OradorFranciscoJavierPascua" component={OradorVideo} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} schema={OradorVideoSchema} defaultProps={{ speakerId: 'francisco-javier-pascua', dias: 'VIERNES 10 DE ABRIL', imageOffsetX: 0, imageOffsetY: 0, imageZoom: 100, imageFade: 70, cvFontSize: 36 }} />
  </>
);