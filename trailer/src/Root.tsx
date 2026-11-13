import { Composition } from "remotion";
import { Trailer } from "./Trailer";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "./theme";

export const Root = () => (
  <Composition
    id="Trailer"
    component={Trailer}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
