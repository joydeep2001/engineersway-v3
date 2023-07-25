"use client";
import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useReducer,
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
//import { proxy, useSnapshot } from "valtio";
import ProgressLoader from "@/components/ProgressLoader";
import Pick from "@/components/Pick";
import ModelJSXGenerator from "@/components/ModelJSXGenerator";
import { reducer } from "@/reducers/model_highlight";
import { Select } from "@react-three/postprocessing";
import {
  useControlsWithReset,
  useGroupControlsWithReset,
} from "@/hooks/useControlsCustom";

// const state = proxy({
//   current: null,
// });

const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/elementry.glb`;

function Model({ ...props }) {
  const group = useRef();
  //const snap = useSnapshot(state);
  const Battery = useRef();
  const cmt = useRef();
  const [hover, set] = useState(null);
  const { on, Rotate_Battery, Show } = useGroupControlsWithReset("Elementry", {
    Controls: {
      on: {
        value: false,
      },
      "Rotate Battery": {
        value: false,
      },
    },
    "Magnteic field": {
      Show: {
        value: false,
      },
    },
  });

  useFrame(() => {
    if (on == true && Rotate_Battery == false) {
      cmt.current.rotation.x -= 0.1;
    }
    if (on == true && Rotate_Battery == true) {
      cmt.current.rotation.x += 0.1;
      Battery.current.rotation.x = Math.PI / 2;
      Battery.current.position.z = 0.74;
    } else if (on == false && Rotate_Battery == true) {
      Battery.current.rotation.x = Math.PI / 2;
      Battery.current.position.z = 0.74;
    } else {
      Battery.current.rotation.x = -Math.PI / 2;
      Battery.current.position.z = -0.74;
    }
  });
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
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.North_Pole}
          position={[0, 0, 5.21]}
          scale={[1.64, 1, 2.08]}
        />
      </Select>
      <Select enabled={highlightedParts[1].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.South_Pole}
          position={[0, 0, -5.21]}
          rotation={[-Math.PI, 0, 0]}
          scale={[1.64, 1, 2.08]}
        />
      </Select>
      <Select enabled={highlightedParts[2].highlight}>
        <mesh
          castShadow
          receiveShadow
          ref={cmt}
          geometry={nodes.BezierCircle001.geometry}
          material={materials.Commutator}
          position={[5.6, 0, 0]}
          rotation={[-1.71, 0, -Math.PI / 2]}
          scale={0.51}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Vert001.geometry}
            material={materials.Wire}
            rotation={[-Math.PI, 0.03, -Math.PI / 2]}
            scale={1.96}
          />
        </mesh>
      </Select>
      <Select enabled={highlightedParts[3].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BezierCircle002.geometry}
          material={materials.Brush}
          position={[5.6, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.51}
        />
      </Select>
      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          castShadow
          receiveShadow
          ref={Battery}
          geometry={nodes.Cylinder001.geometry}
          material={materials.Battery}
          position={[8.09, 0, -0.74]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.27}
        />
      </Select>
      <Select enabled={highlightedParts[5].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Vert002.geometry}
          material={materials.Wire}
          position={[8.09, 0, 0.48]}
          rotation={[-Math.PI, 0, 0]}
        />
      </Select>
      <Select enabled={highlightedParts[6].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone001.geometry}
          material={materials.Magnteic_field}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.22}
          visible={Show}
        />
      </Select>
    </group>
  );
}

useGLTF.preload(glbFileURL);

export default function ElementryMotor() {
  const { PositionX, PositionY } = useControlsWithReset("Position", {
    PositionX: {
      value: 0,
      min: -25,
      max: 25,
      step: 0.1,
    },
    PositionY: {
      value: 0,
      min: -25,
      max: 25,
      step: 0.1,
    },
  });
  const camera = { position: [3, 30, -35], fov: 69 };
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 0.4, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
  ];
  const highlightedParts = [
    //0
    {
      id: "North_Pole",
      name: "North_Pole",
      description: "North_Pole",
    },
    //1
    {
      id: "South_Pole",
      name: "South_Pole",
      description: "South_Pole",
    },
    //2
    {
      id: "Commutator",
      name: "Commutator",
      description: "Commutator",
    },
    //3
    {
      id: "Brush",
      name: "Brush",
      description: "Brush",
    },
    //4
    {
      id: "Battery",
      name: "Battery",
      description: "Battery",
    },
    //5
    {
      id: "Battery",
      name: "Battery",
      description: "Battery",
    },
    //6
    {
      id: "Magnteic_field",
      name: "Magnteic_field",
      description: "Magnteic_field",
    },
  ];
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);
  return (
    <ModelJSXGenerator
      // state={state}
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="white"
    >
      <Model
        dispatch={dispatch}
        highlightedParts={highlightState}
        position={[0 + PositionX, 0 + PositionY, 0]}
      />
    </ModelJSXGenerator>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       <Pick state={state} />
  //       <Canvas camera={{ position: [3, 30, -35], fov: 69 }}>
  //         <color attach="background" args={["white"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[0, 5, -25]} />
  //         <directionalLight intensity={0.4} position={[0, 5, 25]} />
  //         <directionalLight intensity={1} position={[0, -5, 0]} />
  //         <OrbitControls enableDamping={false} />
  //         {/* <Suspense fallback={<Box />}> */}
  //         <Suspense fallback={<ProgressLoader />}>
  //           <Model position={[0 + PositionX, 0 + PositionY, 0]} />
  //         </Suspense>
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
