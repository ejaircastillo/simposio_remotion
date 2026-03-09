import React from 'react';
import { Composition } from 'remotion';
import { SimposioPromo, TOTAL_FRAMES, FPS, WIDTH, HEIGHT } from './Video';

export const Root: React.FC = () => (
  <Composition
    id="SimposioPromo"
    component={SimposioPromo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
