"use client";
import React, {
  useReducer,
  Suspense,
  useRef,
  useEffect,
  useState,
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
import ModelJSXGenerator from "@/components/ModelJSXGenerator";
import { reducer } from "@/reducers/model_highlight";
import { Select } from "@react-three/postprocessing";
import { useControlsWithReset } from "@/hooks/useControlsCustom";

// const state = proxy({
//   current: null,
// });

const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/ShuntMotor.glb`;

function Model({ ...props }) {
  const group = useRef();
  const northpole = useRef();
  const southpole = useRef();
  const crosscurr = useRef();
  const dotcurr = useRef();
  const battery = useRef();
  const commutator = useRef();
  useFrame(() => {
    if (on == true) {
      commutator.current.rotation.x -= 0.05;
    }
    if (Rotate_Battery == true && on == true) {
      southpole.current.rotation.x = Math.PI / 2;
      northpole.current.rotation.x = 0;
      dotcurr.current.rotation.x = Math.PI / 2;
      crosscurr.current.rotation.x = 0;
      battery.current.rotation.z = Math.PI / 2;
    } else {
      southpole.current.rotation.x = 0;
      northpole.current.rotation.x = -Math.PI / 2;
      dotcurr.current.rotation.x = 0;
      crosscurr.current.rotation.x = Math.PI / 2;
      battery.current.rotation.z = -Math.PI / 2;
    }
  });
  const { on, Rotate_Battery } = useControlsWithReset("Controls", {
    on: {
      value: false,
    },
    Rotate_Battery: {
      value: false,
    },
  });
  //const snap = useSnapshot(state);
  const [hover, set] = useState(null);
  const { nodes, materials } = useGLTF(glbFileURL);
  const { highlightedParts } = props;
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation(), set(e.object.material.name);
      }}
      onPointerOut={(e) => {
        e.intersections.length === 0 && set(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        // state.current = e.object.material.name;
        // props.dispatch({ id: state.current });
        // console.log(state.current);
      }}
      onPointerMissed={(e) => {
        //state.current = null;
      }}
    >
      <Select enabled={highlightedParts[0].highlight}>
        <mesh
          geometry={nodes.Stator_Winding.geometry}
          material={materials.Stator_Windining_and_Terminals}
          position={[1.91, 6.58, 2.79]}
        />
      </Select>

      <Select enabled={highlightedParts[1].highlight}>
        <mesh
          ref={battery}
          geometry={nodes.Battery.geometry}
          material={materials.Battery}
          position={[1.35, 7.79, 3.09]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.11}
        />
      </Select>

      <Select enabled={highlightedParts[2].highlight}>
        <mesh
          ref={southpole}
          geometry={nodes.SouthPole.geometry}
          material={materials.South_Pole}
          position={[1.29, 4.6, 0.06]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.86}
        />
      </Select>

      <Select enabled={highlightedParts[3].highlight}>
        <mesh
          ref={northpole}
          geometry={nodes.NORTHPOLE.geometry}
          material={materials.North_Pole}
          position={[1.29, 4.6, 0.06]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.86}
        />
      </Select>

      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          ref={crosscurr}
          geometry={nodes.cross_current.geometry}
          material={materials.Cross_Current}
          position={[1.29, 4.6, 0.06]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={-0.17}
        />
      </Select>

      <Select enabled={highlightedParts[5].highlight}>
        <mesh
          geometry={nodes.STATOR_CORE.geometry}
          material={materials.Stator_Core}
          position={[1.43, 4.62, 0.01]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={4.11}
        />
      </Select>

      <Select enabled={highlightedParts[6].highlight}>
        <mesh
          geometry={nodes.Battery_Box.geometry}
          material={materials.Battery_Box}
          position={[1.34, 7.46, 3.19]}
          rotation={[-0.72, 0, 0]}
          scale={[0.58, 0.58, 0.2]}
        />
      </Select>

      <Select enabled={highlightedParts[7].highlight}>
        <mesh
          ref={dotcurr}
          geometry={nodes.dot_current.geometry}
          material={materials.Dot_Current}
          position={[1.29, 4.6, 0.06]}
          rotation={[3.12, 0, -Math.PI / 2]}
          scale={-0.17}
        />
      </Select>
      <Select enabled={highlightedParts[12].highlight}>
        <mesh
          ref={commutator}
          geometry={nodes.Commutator.geometry}
          material={materials.Commutatot}
          position={[1.29, 4.6, 0.06]}
          rotation={[0.22, 0, 0]}
          scale={[0.13, 0.13, 0.13]}
        >
          <Select enabled={highlightedParts[8].highlight}>
            <mesh
              geometry={nodes.ARMATURE.geometry}
              material={materials.Armature}
              rotation={[2.32, 0, -Math.PI / 2]}
              scale={[6.55, 6.55, 6.55]}
            />
          </Select>

          <Select enabled={highlightedParts[9].highlight}>
            <mesh
              geometry={nodes.Armaturewire.geometry}
              material={materials.Armature_Wire}
              rotation={[-0.61, 0, 0]}
              scale={[1.15, 1.15, 1.15]}
            />
          </Select>

          <Select enabled={highlightedParts[10].highlight}>
            <mesh
              geometry={nodes.CommutatorSupport.geometry}
              material={materials["commutator support"]}
              position={[-20.09, 0, 0]}
              rotation={[-0.22, 0, -Math.PI / 2]}
              scale={[4.11, 4.11, 4.11]}
            />
          </Select>
        </mesh>
      </Select>
      <Select enabled={highlightedParts[11].highlight}>
        <mesh
          geometry={nodes.BRUSH.geometry}
          material={materials.Brush}
          position={[0.92, 4.6, 0.06]}
          rotation={[2.34, 0, 0]}
          scale={0.06}
        />
      </Select>
    </group>
  );
}

useGLTF.preload(glbFileURL);

export default function Shunt() {
  const camera = { position: [3, 30, -35], fov: 69 };
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [5, 5, -25] },
    { intensity: 0.4, position: [-5, 5, 25] },
  ];
  const highlightedParts = [
    //0
    {
      id: "Stator_Windining_and_Terminals",
      name: "Stator_Windining_and_Terminals",
      description: "Stator_Windining_and_Terminals",
      highlight: false,
    },

    //1
    {
      id: "Battery",
      name: "Battery",
      description: "Battery",
      highlight: false,
    },

    //2
    {
      id: "South_Pole",
      name: "South_Pole",
      description: "South_Pole",
      highlight: false,
    },

    //3
    {
      id: "North_Pole",
      name: "North_Pole",
      description: "North_Pole",
      highlight: false,
    },

    //4
    {
      id: "Cross_Current",
      name: "Cross_Current",
      description: "Cross_Current",
      highlight: false,
    },

    //5
    {
      id: "Stator_Core",
      name: "Stator_Core",
      description: "Stator_Core",
      highlight: false,
    },

    //6
    {
      id: "Battery_Box",
      name: "Battery_Box",
      description: "Battery_Box",
      highlight: false,
    },

    //7
    {
      id: "Dot_Current",
      name: "Dot_Current",
      description: "Dot_Current",
      highlight: false,
    },
    //8
    {
      id: "Armature",
      name: "Armature",
      description: "Armature",
      highlight: false,
    },

    //9
    {
      id: "Armature_Wire",
      name: "Armature_Wire",
      description: "Armature_Wire",
      highlight: false,
    },

    //10
    {
      id: "INVALID2",
      name: "INVALID2",
      description: "INVALID2",
      highlight: false,
    },
    //11
    {
      id: "Brush",
      name: "Brush",
      description: "Brush",
      highlight: false,
    },

    //12
    {
      id: "Commutatot",
      name: "Commutatot",
      description: "Commutatot",
      highlight: false,
    },
  ];
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);
  return (
    <ModelJSXGenerator
      //state={state}
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#020505"
    >
      <Model
        dispatch={dispatch}
        rotation={[0, Math.PI, 0]}
        highlightedParts={highlightState}
        position={[0, -3, 0]}
      />
    </ModelJSXGenerator>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       <Pick state={state} />
  //       <Canvas camera={{ position: [3, 30, -35], fov: 69 }}>
  //         <color attach="background" args={["#020505"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[5, 5, -25]} />
  //         <directionalLight intensity={1} position={[-5, 5, 25]} />
  //         <OrbitControls />
  //         <Suspense fallback={<ProgressLoader />}>
  //           <Model position={[0, -3, 0]} />
  //         </Suspense>
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
