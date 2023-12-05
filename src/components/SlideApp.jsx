import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./AssetsShowcase/Experience";
import { Overlay } from "./AssetsShowcase/Overlay";

function SlideApp() {
  return (
    <>
      <Leva hidden />
      <Overlay />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default SlideApp;
