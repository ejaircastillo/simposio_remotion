import React from 'react';
import { Composition } from 'remotion';
import { SimposioPromo, TOTAL_FRAMES as PROMO_FRAMES, FPS, WIDTH, HEIGHT } from './Video';
import { OradorVideo, TOTAL_FRAMES as ORADOR_FRAMES } from './OradorVideo';

const OradorAebiWrap: React.FC = () => (
  <OradorVideo speakerId="marcelo-aebi" dias="VIERNES 10 DE ABRIL" />
);

const OradorMariaJimenaMolinaWrap: React.FC = () => (
  <OradorVideo speakerId="maria-jimena-molina" dias="JUEVES 9 DE ABRIL" />
);

const OradorDianaCohenAgrestWrap: React.FC = () => (
  <OradorVideo speakerId="diana-cohen-agrest" dias="JUEVES 9 DE ABRIL" />
);

const OradorIrvinWallerWrap: React.FC = () => (
  <OradorVideo speakerId="irvin-waller" dias="VIERNES 10 DE ABRIL" />
);

const OradorRicardoGilLavedraWrap: React.FC = () => (
  <OradorVideo speakerId="ricardo-gil-lavedra" dias="JUEVES 9 DE ABRIL" />
);

const OradorJoseConsoleWrap: React.FC = () => (
  <OradorVideo speakerId="jose-console" dias="JUEVES 9 DE ABRIL" />
);

const OradorMarianaRomanoWrap: React.FC = () => (
  <OradorVideo speakerId="mariana-romano" dias="VIERNES 10 DE ABRIL" />
);

const OradorGustavoTopicWrap: React.FC = () => (
  <OradorVideo speakerId="gustavo-topic" dias="VIERNES 10 DE ABRIL" />
);

const OradorMariaDeLaLuzLimaMalvidoWrap: React.FC = () => (
  <OradorVideo speakerId="maria-de-la-luz-lima-malvido" dias="JUEVES 9 DE ABRIL" />
);

const OradorFranciscoCastexWrap: React.FC = () => (
  <OradorVideo speakerId="francisco-castex" dias="JUEVES 9 DE ABRIL" />
);

const OradorDanielRoggeroWrap: React.FC = () => (
  <OradorVideo speakerId="daniel-roggero" dias="JUEVES 9 DE ABRIL" />
);

const OradorNoeliaMarelynJuarezWrap: React.FC = () => (
  <OradorVideo speakerId="noelia-marelyn-juarez" dias="JUEVES 9 DE ABRIL" />
);

const OradorRaquelSlotolowWrap: React.FC = () => (
  <OradorVideo speakerId="raquel-slotolow" dias="JUEVES 9 DE ABRIL" />
);

const OradorGuillermoBargnaWrap: React.FC = () => (
  <OradorVideo speakerId="guillermo-bargna" dias="JUEVES 9 DE ABRIL" />
);

const OradorDarioSolisWrap: React.FC = () => (
  <OradorVideo speakerId="dario-solis" dias="JUEVES 9 DE ABRIL" />
);

const OradorFranciscoQuintanaWrap: React.FC = () => (
  <OradorVideo speakerId="francisco-quintana" dias="VIERNES 10 DE ABRIL" />
);

const OradorGermanGaravanoWrap: React.FC = () => (
  <OradorVideo speakerId="german-garavano" dias="VIERNES 10 DE ABRIL" />
);

const OradorMartinCasaresWrap: React.FC = () => (
  <OradorVideo speakerId="martin-casares" dias="VIERNES 10 DE ABRIL" />
);

const OradorFrancoFiumaraWrap: React.FC = () => (
  <OradorVideo speakerId="franco-fiumara" dias="VIERNES 10 DE ABRIL" />
);

const OradorFernandoSotoWrap: React.FC = () => (
  <OradorVideo speakerId="fernando-soto" dias="VIERNES 10 DE ABRIL" />
);

const OradorMarceloPeluzziWrap: React.FC = () => (
  <OradorVideo speakerId="marcelo-peluzzi" dias="VIERNES 10 DE ABRIL" />
);

const OradorFranciscoJavierPascuaWrap: React.FC = () => (
  <OradorVideo speakerId="francisco-javier-pascua" dias="VIERNES 10 DE ABRIL" />
);

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

    <Composition id="OradorAebi" component={OradorAebiWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorMariaJimenaMolina" component={OradorMariaJimenaMolinaWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorDianaCohenAgrest" component={OradorDianaCohenAgrestWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorIrvinWaller" component={OradorIrvinWallerWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorRicardoGilLavedra" component={OradorRicardoGilLavedraWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorJoseConsole" component={OradorJoseConsoleWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorMarianaRomano" component={OradorMarianaRomanoWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorGustavoTopic" component={OradorGustavoTopicWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorMariaDeLaLuzLimaMalvido" component={OradorMariaDeLaLuzLimaMalvidoWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorFranciscoCastex" component={OradorFranciscoCastexWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorDanielRoggero" component={OradorDanielRoggeroWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorNoeliaMarelynJuarez" component={OradorNoeliaMarelynJuarezWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorRaquelSlotolow" component={OradorRaquelSlotolowWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorGuillermoBargna" component={OradorGuillermoBargnaWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorDarioSolis" component={OradorDarioSolisWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorFranciscoQuintana" component={OradorFranciscoQuintanaWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorGermanGaravano" component={OradorGermanGaravanoWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorMartinCasares" component={OradorMartinCasaresWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorFrancoFiumara" component={OradorFrancoFiumaraWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorFernandoSoto" component={OradorFernandoSotoWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorMarceloPeluzzi" component={OradorMarceloPeluzziWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="OradorFranciscoJavierPascua" component={OradorFranciscoJavierPascuaWrap} durationInFrames={ORADOR_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
  </>
);