import React, {
  Suspense,
  useRef,
  useReducer,
  useEffect,
  useState,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useAnimations,
  PerspectiveCamera,
  useGLTF,
  useProgress,
  Html,
} from "@react-three/drei";

export default function PartViewer({
  meshObject,
  camera,
  directionalLight,
  bgcolor,
}) {
  return (
    <div clasName="w-screen h-screen">
      <Canvas camera={camera}>
        <color attach="background" args={[bgcolor]} />
        {directionalLight.map(({ intensity, position }, index) => {
          return (
            <directionalLight
              key={index}
              intensity={intensity}
              position={position}
            />
          );
        })}
        <primitive object={meshObject} key={meshObject.uuid} />
        <OrbitControls enableDamping={false} />
      </Canvas>
    </div>
  );
}
