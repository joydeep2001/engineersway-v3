"use client";
import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import {
  OrbitControls,
  useAnimations,
  PerspectiveCamera,
  useGLTF,
  useProgress,
  Html,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls, folder } from "leva";
// import { proxy, useSnapshot } from "valtio";
import ProgressLoader from "@/components/ProgressLoader";
import Pick from "@/components/Pick";
import { AppContext } from "@/context/AppContext";
import ModelJSXGenerator from "@/components/ModelJSXGenerator";
import { useControlsWithReset } from "@/hooks/useControlsCustom";

// const state = proxy({
//   current: null,
// });

const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/WorkingPrincipleOfInductionMotor.glb`;

function Model({ ...props }) {
  const group = useRef();

  // const snap = useSnapshot(state);
  const squirrelcage = useRef();
  const pole = useRef();
  const [hover, set] = useState(null);
  const { nodes, materials, animations } = useGLTF(glbFileURL);
  const { actions } = useAnimations(animations, group);
  const { On } = useControlsWithReset("On", {
    On: false,
  });
  const { Start } = useControlsWithReset("Rotate", {
    Start: false,
  });

  useEffect(() => {
    if (On == true) {
      actions.BPhase_Out.play();
      actions.B_phasein.play();
      actions.R_PhaseIn.play();
      actions.R_PhaseOut.play();
      actions.YPhase_Out.play();
      actions.YPhase_in.play();
    } else if (On == false) {
      actions.BPhase_Out.stop();
      actions.B_phasein.stop();
      actions.R_PhaseIn.stop();
      actions.R_PhaseOut.stop();
      actions.YPhase_Out.stop();
      actions.YPhase_in.stop();
    }
  });
  useFrame(() => {
    if (Start == true && On == true) {
      pole.current.rotation.x += 0.06;
      squirrelcage.current.rotation.x += 0.03;
      // shaft.current.rotation.x+=0.03
      // rotor.current.rotation.x+=0.03
    }
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          castShadow
          receiveShadow
          ref={squirrelcage}
          name="a_-_cage-1"
          geometry={nodes["a_-_cage-1"].geometry}
          material={materials.Sqiurrel_Cage}
          rotation={[2.85, 0, -Math.PI / 2]}
          scale={0.12}
        >
          <mesh
            castShadow
            receiveShadow
            name="a_-_DriveShaft-1"
            geometry={nodes["a_-_DriveShaft-1"].geometry}
            material={materials.Shaft}
          />
          <mesh
            castShadow
            receiveShadow
            name="a_-_RotorCore-1"
            geometry={nodes["a_-_RotorCore-1"].geometry}
            material={nodes["a_-_RotorCore-1"].material}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          name="a_-_Coil2-1"
          geometry={nodes["a_-_Coil2-1"].geometry}
          material={materials.Y_Phase}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.12}
        />
        <mesh
          castShadow
          receiveShadow
          name="a_-_Coil3-1"
          geometry={nodes["a_-_Coil3-1"].geometry}
          material={materials.B_Phase}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.12}
        />
        <mesh
          castShadow
          receiveShadow
          name="a_-_Coil1-1"
          geometry={nodes["a_-_Coil1-1"].geometry}
          material={materials.R_Phase}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.12}
        />
        <mesh
          castShadow
          receiveShadow
          name="a_-_Stator-1"
          geometry={nodes["a_-_Stator-1"].geometry}
          material={materials.Stator}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.12}
        />
        <mesh
          castShadow
          receiveShadow
          name="a_-_cage-1001"
          geometry={nodes["a_-_cage-1001"].geometry}
          material={materials.Sqiurrel_Cage}
          position={[3.25, 0.13, 9.86]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={0}
        />
        <mesh
          castShadow
          receiveShadow
          name="Cylinder"
          geometry={nodes.Cylinder.geometry}
          material={materials.Direction_Of_Current}
          position={[6.18, 0.44, 3.1]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0}
        />
        <mesh
          castShadow
          receiveShadow
          name="Cylinder001"
          geometry={nodes.Cylinder001.geometry}
          material={materials.Direction_Of_Current}
          position={[6.18, 1.12, 2.85]}
          rotation={[0, 0, Math.PI / 2]}
          scale={0}
        />
        <mesh
          castShadow
          receiveShadow
          name="Cylinder003"
          geometry={nodes.Cylinder003.geometry}
          material={materials.Direction_Of_Current}
          position={[6.33, -1.14, 2.74]}
          rotation={[0, 0, Math.PI / 2]}
          scale={0.01}
        />
        <mesh
          castShadow
          receiveShadow
          name="Cylinder002"
          geometry={nodes.Cylinder002.geometry}
          material={materials.Direction_Of_Current}
          position={[6.27, -1.81, 2.35]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.01}
        />
        <mesh
          castShadow
          receiveShadow
          name="Cylinder005"
          geometry={nodes.Cylinder005.geometry}
          material={materials.Direction_Of_Current}
          position={[5.94, -2.61, 0.35]}
          rotation={[0, 0, Math.PI / 2]}
          scale={0.01}
        />
        <mesh
          castShadow
          receiveShadow
          name="Cylinder006"
          geometry={nodes.Cylinder006.geometry}
          material={materials.Direction_Of_Current}
          position={[5.89, -2.66, -0.36]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.01}
        />
        <group
          ref={pole}
          name="Vert001"
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={0.47}
        >
          <mesh
            castShadow
            receiveShadow
            name="Vert005"
            geometry={nodes.Vert005.geometry}
            material={materials.Magnetic_Field}
          />
          <mesh
            castShadow
            receiveShadow
            name="Vert005_1"
            geometry={nodes.Vert005_1.geometry}
            material={materials.North_pole}
          />
          <mesh
            castShadow
            receiveShadow
            name="Vert005_2"
            geometry={nodes.Vert005_2.geometry}
            material={materials.South_Pole}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(glbFileURL);

export default function Induction() {
  const { isLoginCountDownComplete, setLoginCountDownComplete, loggedIn } =
    useContext(AppContext);
  const { X, Y, Z } = useControlsWithReset("Position", {
    X: {
      value: 0,
      min: -25,
      max: 25,
      step: 0.1,
    },
    Y: {
      value: 0,
      min: -25,
      max: 25,
      step: 0.1,
    },
    Z: {
      value: 0,
      min: -25,
      max: 25,
      step: 0.1,
    },
  });

  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 0.4, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
  ];
  const camera = { position: [3, 30, -35], fov: 69 };

  return (
    <ModelJSXGenerator
      // state={state}
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#111111"
    >
      <Model rotation={[0, Math.PI, 0]} position={[0 + X, 0 + Y, 0 + Z]} />
    </ModelJSXGenerator>
  );

  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       <Pick state={state} />
  //       <Canvas camera={{ position: [3, 30, -35], fov: 69 }}>
  //         <color attach="background" args={["#111111"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[0, 5, -25]} />
  //         <directionalLight intensity={0.4} position={[0, 5, 25]} />
  //         <directionalLight intensity={1} position={[0, -5, 0]} />
  //         <OrbitControls enableDamping={false} />
  //         {/* <Suspense fallback={<Box />}> */}
  //         <Suspense fallback={<ProgressLoader />}>
  //           <Model position={[0 + X, 0 + Y, 0 + Z]} />
  //         </Suspense>
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
