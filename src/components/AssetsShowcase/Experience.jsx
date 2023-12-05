import {
  CameraControls,
  Dodecahedron,
  Environment,
  Grid,
  MeshDistortMaterial,
  RenderTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { slideAtom } from "./Overlay";
import { Scene } from "./Scene";
import { Players } from "./players";
import { Cars } from "./cars";

const WEAPONS = [
  "GrenadeLauncher",
  "AK",
  "Knife_1",
  "Knife_2",
  "Pistol", 
  "Revolver",
  "Revolver_Small",
  "RocketLauncher",
  "ShortCannon",
  "SMG",
  "Shotgun",
  "Shovel",
  "Sniper",
  "Sniper_2",
];

export const scenes = [
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "GrenadeLauncher",
    mainColor: ["#ffe6b3", "#c0e6ff"], // Light colors
    description: "A powerful launcher that hurls explosive grenades.",
    price: "Slow",
    range: "Long",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "AK",
    mainColor: ["#ffb3b3", "#ff9999"], // Light colors
    description: "A reliable assault rifle known for its rapid fire.",
    price: "High",
    range: "Medium",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Knife_1",
    mainColor: ["#ff9999", "#ff6666"], // Light colors
    description: "A basic knife for close-quarters combat.",
    price: "N/A",
    range: "Short",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Knife_2",
    mainColor: ["#ffd699", "#ffb366"], // Light colors
    description: "A serrated blade designed for swift and precise strikes.",
    price: "N/A",
    range: "Short",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Pistol",
    mainColor: ["#cccccc", "#999999"], // Light colors
    description: "Compact sidearm with moderate firepower and versatility.",
    price: "Moderate",
    range: "Medium",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Revolver",
    mainColor: ["#ffcc99", "#cc9966"], // Light colors
    description: "Heavy revolver with high damage but slow reload.",
    price: "Slow",
    range: "Medium",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Revolver_Small",
    mainColor: ["#ffd699", "#ffb366"], // Light colors
    description: "A compact version of the heavy revolver for quick draws.",
    price: "Moderate",
    range: "Medium",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "RocketLauncher",
    mainColor: ["#ff9999", "#ff6666"], // Light colors
    description: "Devastating launcher that fires powerful rockets.",
    price: "Slow",
    range: "Long",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "ShortCannon",
    mainColor: ["#ffd699", "#ffb366"], // Light colors
    description: "Small yet potent cannon for explosive short-range attacks.",
    price: "Slow",
    range: "Short",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "SMG",
    mainColor: ["#ffb3b3", "#ff9999"], // Light colors
    description: "Submachine gun known for its rapid fire and mobility.",
    price: "High",
    range: "Medium",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Shotgun",
    mainColor: ["#ffcc99", "#cc9966"], // Light colors
    description: "Close-range weapon that unleashes a spread of pellets.",
    price: "Moderate",
    range: "Short",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Shovel",
    mainColor: ["#ffd699", "#ffb366"], // Light colors
    description: "Sturdy shovel for melee combat with a crushing impact.",
    price: "N/A",
    range: "Short",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Sniper",
    mainColor: ["#ffb3b3", "#ff9999"], // Light colors
    description: "High-powered sniper rifle for precision long-range shots.",
    price: "Slow",
    range: "Long",
  },
  {
    path: "models/cars/cybertruck_scene.glb",
    name: "Sniper_2",
    mainColor: ["#ffcc99", "#cc9966"], // Light colors
    description: "Advanced sniper rifle with enhanced scope and accuracy.",
    price: "Slow",
    range: "Long",
  },
];


export const players_data = [
  {
    path: "models/cars/cybertruck_scene.glb",
    mainColor: "#ffdec0",
    name: "Gurk🛡️🔱",
    description:
      "Gurk, the indomitable warrior, wields a mighty axe, embodying strength and unwavering resolve.",
    price: 85,
    range: 90,
  },
  {
    path: "models/cars/model3_scene.glb",
    mainColor: "#c0ffe1",
    name: "Gyanlaksmi⚔️🔮",
    description: "Gyanlakshmi, the enigmatic sage, emanates wisdom and mystic energy, adorned with celestial symbols. ",
    price: 95,
    range: 40,
  },
  {
    path: "models/cars/semi_scene.glb",
    mainColor: "#f9c0ff",
    name: "Rohit🥊👊",
    description: "Rohit, the versatile artisan, creates masterpieces with a skilled hand and a heart full of passion",
    price: 60,
    range: 95,
  },
  {
    path: "models/cars/semi_scene.glb",
    mainColor: "#c0ffe1",
    name: "Nagi🌿🌙",
    description: "Nagi, the serene mystic, harnesses the power of nature with a tranquil presence and healing touch. ",
    price: 96,
    range: 20,
  },
  {
    path: "models/cars/semi_scene.glb",
    mainColor: "#ffba70",
    name: "Thiru🥷🪓",
    description: "Thiru, the enigmatic sorcerer, weaves arcane spells with ancient knowledge and a gaze that pierces the ethereal. ",
    price: 100,
    range: 40,
  },
  {
    path: "models/cars/semi_scene.glb",
    mainColor: "#70ffb3",
    name: "Vairam🗡️🌒",
    description: "Vairam, the elusive rogue, navigates shadows with a dagger's grace and a mischievous glint in their eye.  ",
    price: 100,
    range: 95,
  },
  {
    path: "models/cars/semi_scene.glb",
    mainColor: "#ffdb70",
    name: "Prashant",
    description: "Prashant, the wise scholar, imparts knowledge with a quill in hand and an aura of sagacity. 🐉🕊️",
    price: 87,
    range: 96,
  },
];

export const cars = [
  {
    path: "models/cars/cybertruck_scene.glb",
    mainColor: "#f9c0ff",
    name: "Cybertruck",
    description:
      "Better utility than a truck with more performance than a sports car",
    price: 72000,
    range: 660,
  },
  {
    path: "models/cars/model3_scene.glb",
    mainColor: "#c0ffe1",
    name: "Model 3",
    description: "The car of the future",
    price: 29740,
    range: 576,
  },
  {
    path: "models/cars/semi_scene.glb",
    mainColor: "#ffdec0",
    name: "Semi",
    description: "The Future of Trucking",
    price: 150000,
    range: 800,
  },
];


const CameraHandler = ({ slideDistance }) => {
  const viewport = useThree((state) => state.viewport);
  const cameraControls = useRef();
  const [slide] = useAtom(slideAtom);
  const lastSlide = useRef(0);

  const { dollyDistance } = useControls({
    dollyDistance: {
      value: 10,
      min: 0,
      max: 50,
    },
  });

  const moveToSlide = async () => {
    await cameraControls.current.setLookAt(
      lastSlide.current * (viewport.width + slideDistance),
      3,
      dollyDistance,
      lastSlide.current * (viewport.width + slideDistance),
      0,
      0,
      true
    );
    await cameraControls.current.setLookAt(
      (slide + 1) * (viewport.width + slideDistance),
      1,
      dollyDistance,
      slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );

    await cameraControls.current.setLookAt(
      slide * (viewport.width + slideDistance),
      0,
      5,
      slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );
  };

  useEffect(() => {
    // Used to reset the camera position when the viewport changes
    const resetTimeout = setTimeout(() => {
      cameraControls.current.setLookAt(
        slide * (viewport.width + slideDistance),
        0,
        5,
        slide * (viewport.width + slideDistance),
        0,
        0
      );
    }, 200);
    return () => clearTimeout(resetTimeout);
  }, [viewport]);

  useEffect(() => {
    if (lastSlide.current === slide) {
      return;
    }
    moveToSlide();
    lastSlide.current = slide;
  }, [slide]);
  return (
    <CameraControls
      ref={cameraControls}
      touches={{
        one: 0,
        two: 0,
        three: 0,
      }}
      mouseButtons={{
        left: 0,
        middle: 0,
        right: 0,
      }}
    />
  );
};

export const Experience = (props) => {
  console.log(props.data, props.data === '1' )
  var out = scenes;
  const senario = () =>{
    if(props.data === '1'){
      return <Players {...players_data} />
    } else if(props.data === '2'){
      out = scenes;
      return <Scene {...scenes} />
    }else if(props.data === '3'){
      out = cars;
      return <Cars {...cars} />
    }else{
      return <Players {...players_data} />
    }
  }
  const html_content = () =>{
    if(props.data === '1'){
      return  players_data.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
              <Players {...scene} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))
    }
    else if(props.data === '2'){
      return  scenes.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
              <Scene {...scenes} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))
    }
    else if(props.data === '3'){
      return  cars.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
              <Cars {...scene} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))
    }else{
      return  players_data.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
            <Players {...scene} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))
    }
   
  }
  const viewport = useThree((state) => state.viewport);
  const { slideDistance } = useControls({
    slideDistance: {
      value: 1,
      min: 0,
      max: 10,
    },
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment preset={"city"} />
      <CameraHandler slideDistance={slideDistance} />
      {/* MAIN WORLD */}
      <group>
        <mesh position-y={viewport.height / 2 + 1.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial color={scenes[0].mainColor} speed={3} />
        </mesh>

        <mesh
          position-x={viewport.width + slideDistance}
          position-y={viewport.height / 2 + 1.5}
        >
          <boxGeometry />
          <MeshDistortMaterial color={scenes[1].mainColor} speed={3} />
        </mesh>

        <Dodecahedron
          position-x={2 * (viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 1.5}
        >
          <MeshDistortMaterial color={scenes[2].mainColor} speed={3} />
        </Dodecahedron>
      </group>

      <Grid
        position-y={-viewport.height / 2}
        sectionSize={1}
        sectionColor={"purple"}
        sectionThickness={1}
        cellSize={0.5}
        cellColor={"#6f6f6f"}
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
      />
      {html_content()}
    </>
  );
};
