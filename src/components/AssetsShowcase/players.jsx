import {
  AccumulativeShadows,
  Environment,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  Sphere,
  useGLTF,
} from "@react-three/drei";
import React, { useEffect, useMemo, useRef } from "react";

import * as THREE from "three";
import { DEG2RAD } from "three/src/math/MathUtils";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { Color, LoopOnce, MeshStandardMaterial } from "three";


export const Players = ({ mainColor, path, ...props }) => {
  const { scene, materials, animations } = useGLTF(
    "/models/Character_Soldier.gltf"
  );
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // useGraph creates two flat object collections for nodes and materials
  const group = useRef();
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
  const playerColorMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color(mainColor),
      }),
    [mainColor]
  );
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
  WEAPONS.forEach((wp) => {
    const isCurrentWeapon = wp === " ";
    nodes[wp].visible = isCurrentWeapon;
    console.log(isCurrentWeapon, "working... change wepon")
  },[]);

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <group {...props} dispose={null}>
        <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
        <OrbitControls
          autoRotate
          enablePan={false}
          maxPolarAngle={DEG2RAD * 75}
          minDistance={6}
          maxDistance={10}
          autoRotateSpeed={0.5}
        />
        <group {...props} dispose={null} ref={group}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Body_1">
            <skinnedMesh
              name="Cube004"
              geometry={nodes.Cube004.geometry}
              material={materials.Skin}
              skeleton={nodes.Cube004.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube004_1"
              geometry={nodes.Cube004_1.geometry}
              material={materials.DarkGrey}
              skeleton={nodes.Cube004_1.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube004_2"
              geometry={nodes.Cube004_2.geometry}
              material={playerColorMaterial}
              skeleton={nodes.Cube004_2.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube004_3"
              geometry={nodes.Cube004_3.geometry}
              material={playerColorMaterial}
              skeleton={nodes.Cube004_3.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube004_4"
              geometry={nodes.Cube004_4.geometry}
              material={materials.Black}
              skeleton={nodes.Cube004_4.skeleton}
              castShadow
            />
          </group>
        </group>
      </group>
    </group>
        <ambientLight intensity={0.1} color="pink" />
        <AccumulativeShadows
          frames={100}
          alphaTest={0.9}
          scale={30}
          position={[0, -0.005, 0]}
          color="pink"
          opacity={0.8}
        >
          <RandomizedLight
            amount={4}
            radius={9}
            intensity={0.8}
            ambient={0.25}
            position={[10, 5, 15]}
          />
          <RandomizedLight
            amount={4}
            radius={5}
            intensity={0.5}
            position={[-5, 5, 15]}
            bias={0.001}
          />
        </AccumulativeShadows>
        <Environment blur={0.8} background>
          <Sphere scale={15}>
            <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
          </Sphere>
          <Lightformer
            position={[5, 0, -5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="red" // (optional = white)
            scale={[3, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[-5, 0, 1]}
            form="circle" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="green" // (optional = white)
            scale={[2, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[0, 5, -2]}
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={0.5} // power level (optional = 1)
            color="orange" // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
          <Lightformer
            position={[0, 0, 5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="purple" // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
        </Environment>
      </group>
    </>
  );
};

useGLTF.preload("/models/cars/cybertruck_scene.glb");
useGLTF.preload("/models/cars/model3_scene.glb");
useGLTF.preload("/models/cars/semi_scene.glb");
