"use client";
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
  BakeShadows,
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
import ToolBar from "@/components/ToolBar";
import { Leva, useControls } from "leva";
import useFetch from "@/hooks/useFetch";
import { usePathname } from "next/navigation";

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

  const [popup, showPopup] = useState({ visibility: false, selected: 0 });
  const pathname = usePathname();
  const modelId = pathname.split("/").slice(-1);
  const { data: partDetails } = useFetch(`/api/model_parts/${modelId}`, {
    method: "GET",
  });
  function handleShowPartDetails(i) {
    showPopup({ visibility: true, selected: i });
  }
  const { color } = useControls({
    color: "#bababa",
  });
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
            dpr={[1, 2]}
            gl={{ logarithmicDepthBuffer: true }}
            shadows
            camera={camera}
          >
            <color attach="background" args={[color]} />
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

            <OrbitControls makeDefault enableDamping={false} />

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
                shadows={{ type: "accumulative", bias: -0.003 }}
                adjustCamera={false}
              >
                {children}
                {/* <BakeShadows /> */}
              </Stage>
              {/* <Environment resolution={256}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  <Lightformer
                    intensity={4}
                    rotation-x={Math.PI / 2}
                    position={[0, 5, -9]}
                    scale={[10, 10, 1]}
                  />
                  {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
                    <Lightformer
                      key={i}
                      form="circle"
                      intensity={4}
                      rotation={[Math.PI / 2, 0, 0]}
                      position={[x, 4, i * 4]}
                      scale={[4, 1, 1]}
                    />
                  ))}
                  <Lightformer
                    intensity={2}
                    rotation-y={Math.PI / 2}
                    position={[-5, 1, -1]}
                    scale={[50, 2, 1]}
                  />
                  <Lightformer
                    intensity={2}
                    rotation-y={Math.PI / 2}
                    position={[-5, -1, -1]}
                    scale={[50, 2, 1]}
                  />
                  <Lightformer
                    intensity={2}
                    rotation-y={-Math.PI / 2}
                    position={[10, 1, 0]}
                    scale={[50, 2, 1]}
                  />
                </group>
              </Environment> */}
            </Suspense>
            <GizmoHelper
              alignment="top-left"
              margin={[80, 80]}
              renderPriority={1}
            >
              <GizmoViewport
                axisColors={["hotpink", "aquamarine", "#3498DB"]}
                labelColor="black"
              />
            </GizmoHelper>
            {/* <ArcballControls makeDefault /> */}
            {/* <Environment background preset="sunset" blur={0.8} /> */}
            {/* <ProgressLoader /> */}
          </Canvas>
          {popup.visibility ? (
            <PartDetailsView
              showPopup={showPopup}
              partDetails={partDetails[popup.selected]}
            />
          ) : (
            <ToolBar
              onPartCardClick={handleShowPartDetails}
              partDetails={partDetails}
            />
          )}
        </div>
        <Leva hidden={popup.visibility} />
      </AppContextProvider>
    </>
  );
}
