"use client";

import React, { Suspense, useContext, useState } from "react";
import ProgressLoader from "@/components/ProgressLoader";
import { Canvas, useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  useAnimations,
  PerspectiveCamera,
  useGLTF,
  useProgress,
  Stage,
  Environment,
  Html,
} from "@react-three/drei";

import AppContextProvider, { AppContext } from "@/context/AppContext";
import {
  EffectComposer,
  SSAO,
  SMAA,
  Outline,
  Selection,
} from "@react-three/postprocessing";
import {
  Bounds,
  GizmoHelper,
  GizmoViewport,
  Lightformer,
  ArcballControls,
} from "@react-three/drei";

console.log(EffectComposer, SSAO, SMAA, Outline);
export default function ModelJSXGenerator({ params }) {
  console.log(params);
  const gltf = useGLTF(`/models/${[params.slug]}.glb`);

  const { loggedIn, setLoginCountDownComplete, isLoginCountDownComplete } =
    useContext(AppContext);
  const [casing, setCasing] = useState(false);
  const hightlightCasing = () => {
    setCasing(true);
  };
  const [toggleMenu, setToggleMenu] = useState();
  const handleToggleMenu = () => {
    setToggleMenu((prevState) => setToggleMenu(!prevState));
  };
  const [popup, showPopup] = useState({ visibility: false, partDetails: {} });
  const [showSinglePart, setShowSinglePart] = useState(false);

  return (
    <>
      <AppContextProvider>
        <div className="w-screen h-screen">
          {/* {isLoginCountDownComplete && !loggedIn ? <Login /> : null}
          <SideMenu
            showPopup={showPopup}
            toggle={toggleMenu}
            items={highlightedParts}
          /> */}
          {/* <Pick handleToggleMenu={handleToggleMenu} state={state} /> */}
          <Canvas
            gl={{ logarithmicDepthBuffer: true }}
            shadows
            camera={{ position: [-15, 25, 30], fov: 45 }}
          >
            <color attach="background" args={["grey"]} />
            {/* {directionalLight?.map(({ intensity, position }, index) => {
              return (
                <directionalLight
                  key={index}
                  intensity={intensity}
                  position={position}
                />
              );
            })} */}
            <pointLight
              position={[-0.564129, 12.0037, 2.08061]}
              intensity={0.1}
            />

            <OrbitControls enableDamping={false} />

            <Suspense
              fallback={
                <ProgressLoader
                  setLoginCountDownComplete={setLoginCountDownComplete}
                  loggedIn={loggedIn}
                />
              }
            >
              {/* {React.cloneElement(children, { reducer: reducer })} */}
              <Stage
                intensity={0.5}
                environment={null}
                shadows={{ type: "accumulative", bias: -0.001 }}
                adjustCamera={false}
              >
                <primitive castShadow receiveShadow object={gltf.scene} />
              </Stage>
            </Suspense>
            {/* <GizmoHelper
              alignment="top-left"
              margin={[80, 80]}
              renderPriority={2}
            >
              <GizmoViewport
                axisColors={["hotpink", "aquamarine", "#3498DB"]}
                labelColor="black"
              />
            </GizmoHelper> */}
            {/* <Environment background preset="sunset" blur={0.8} /> */}
            {/* <ProgressLoader /> */}
          </Canvas>
        </div>
      </AppContextProvider>
    </>
  );
}
