import React, { Suspense, useContext, useState } from "react";
import ProgressLoader from "./ProgressLoader";
import Pick from "./Pick";
import { Canvas, useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";

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
import Login from "./Login";
import AppContextProvider, { AppContext } from "../context/AppContext";
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

import SideMenu from "./SideMenu";
import PartDetailsView from "./PartDetailsView";
import PartViewer from "./PartViewer";

console.log(EffectComposer, SSAO, SMAA, Outline);
export default function ModelJSXGenerator({
  state,
  directionalLight,
  camera,
  bgcolor,
  children,
  highlightedParts,
}) {
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
          <Canvas gl={{ logarithmicDepthBuffer: true }} shadows camera={camera}>
            <color attach="background" args={[bgcolor]} />
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
                {children}
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
