import React from 'react'
import { Experience } from './Store/Experience'
import { Canvas } from "@react-three/fiber";

const StoreOptions = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <Experience/>
    </Canvas>
  )
}

export default StoreOptions
