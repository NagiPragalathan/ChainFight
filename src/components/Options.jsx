import React from 'react'
import { Experience } from './OptionHome/Experience'
import { Canvas } from "@react-three/fiber";

const Options = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <Experience/>
    </Canvas>
  )
}

export default Options
