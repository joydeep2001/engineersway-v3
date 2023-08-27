"use client";
import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useContext,
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

import ProgressLoader from "@/components/ProgressLoader";
import Pick from "@/components/Pick";
import Login from "@/components/Login";
import { AppContext } from "@/context/AppContext";
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

const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/fuse.glb`;

// function Model({ ...props }) {
//   const group = useRef();
//   // const snap = useSnapshot(state);
//   const [hover, set] = useState(null);
//   const { nodes, materials } = useGLTF(glbFileURL);
//   const { posX, posY, Rotation } = useControlsWithReset("Fuse Position", {
//     posX: {
//       value: 0,
//       min: 0,
//       max: 2,
//       step: 0.1,
//     },
//     posY: {
//       value: 0,
//       min: 0,
//       max: 2,
//       step: 0.1,
//     },
//     Rotation: {
//       value: 0,
//       min: 0,
//       max: 5,
//       step: 0.01,
//     },
//   });
//   const { highlightedParts } = props;
//   return (
//     <group
//       ref={group}
//       position={[-1.2, -1, 0]}
//       dispose={null}
//       {...props}
//       onPointerOver={(e) => {
//         e.stopPropagation(), set(e.object.material.name);
//       }}
//       onPointerOut={(e) => {
//         e.intersections.length === 0 && set(null);
//       }}
//       onClick={(e) => {
//         e.stopPropagation();
//         // state.current = e.object.material.name;
//         // props.dispatch({ id: state.current });
//         // console.log(state.current);
//       }}
//       onPointerMissed={(e) => {
//         // state.current = null;
//       }}
//     >
//       <group position={[0, 3.52, 0]}>
//         {/* <pointLight intensity={0.5} decay={2} rotation={[-Math.PI / 2, 0, 0]} />
//       </group>
//       <group position={[3.13, 2.09, 2.29]}>
//         <pointLight intensity={0.8} decay={2} rotation={[-Math.PI / 2, 0, 0]} />
//       </group>
//       <group position={[2.12, 2.27, 3.19]}>
//         <pointLight intensity={0.7} decay={2} rotation={[-Math.PI / 2, 0, 0]} />
//       </group>
//       <group position={[2.51, 2.25, 2.79]}>
//         <pointLight intensity={0.7} decay={2} rotation={[-Math.PI / 2, 0, 0]} /> */}
//       </group>
//       <Select enabled={highlightedParts[0].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Assem1_-_pan_slot_head_am-5"].geometry}
//           material={nodes["Assem1_-_pan_slot_head_am-5"].material}
//           position={[2.41, 1.24, 2.11]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.01}
//         />
//       </Select>

//       <Select enabled={highlightedParts[1].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Assem1_-_pan_slot_head_am-6"].geometry}
//           material={nodes["Assem1_-_pan_slot_head_am-6"].material}
//           position={[2.43, 1.08, 2.11]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.01}
//         />
//       </Select>

//       <Select enabled={highlightedParts[2].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Assem1_-_pan_slot_head_am-7"].geometry}
//           material={nodes["Assem1_-_pan_slot_head_am-7"].material}
//           position={[1.63, 1.08, 2.11]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.01}
//         />
//       </Select>
//       <Select enabled={highlightedParts[6].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Fuse_Bridge.geometry}
//           material={materials.Fuse_Bridge}
//           position={[2.03 + posX, 1.48 + posY, 2.11]}
//           rotation={[Math.PI / 2 + Rotation, 0, 0]}
//           scale={0.01}
//         >
//           <Select enabled={highlightedParts[3].highlight}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes["Assem1_-_pan_slot_head_am-5"].geometry}
//               material={nodes["Assem1_-_pan_slot_head_am-5"].material}
//               position={[2.41, 1.24, 2.11]}
//               rotation={[Math.PI / 2, 0, 0]}
//               scale={0.01}
//             />
//           </Select>

//           <Select enabled={highlightedParts[4].highlight}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes["Assem1_-_pan_slot_head_am-6"].geometry}
//               material={nodes["Assem1_-_pan_slot_head_am-6"].material}
//               position={[2.43, 1.08, 2.11]}
//               rotation={[Math.PI / 2, 0, 0]}
//               scale={0.01}
//             />
//           </Select>

//           <Select enabled={highlightedParts[5].highlight}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes["Assem1_-_pan_slot_head_am-7"].geometry}
//               material={nodes["Assem1_-_pan_slot_head_am-7"].material}
//               position={[1.63, 1.08, 2.11]}
//               rotation={[Math.PI / 2, 0, 0]}
//               scale={0.01}
//             />
//           </Select>
//         </mesh>
//       </Select>

//       <Select enabled={highlightedParts[7].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Assem1_-_pan_slot_head_am-2"].geometry}
//           material={nodes["Assem1_-_pan_slot_head_am-2"].material}
//           position={[1.75, 1.24, 2.11]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.01}
//         />
//       </Select>

//       <Select enabled={highlightedParts[8].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Assem1_-_PART3-1"].geometry}
//           material={materials.Base}
//           position={[2.02, 1.18, 2.11]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.01}
//         />
//       </Select>

//       <Select enabled={highlightedParts[9].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Assem1_-_part4-1"].geometry}
//           material-color="#b87300"
//           material={materials.Contact_Point}
//           position={[2.03, 1.22, 2.11]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.01}
//         />
//       </Select>

//       <Select enabled={highlightedParts[10].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Assem1_-_pan_slot_head_am-3"].geometry}
//           material={nodes["Assem1_-_pan_slot_head_am-3"].material}
//           position={[1.65, 1.24, 2.11]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.01}
//         />
//       </Select>

//       <Select enabled={highlightedParts[11].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Assem1_-_pan_slot_head_am-4"].geometry}
//           material={nodes["Assem1_-_pan_slot_head_am-4"].material}
//           position={[2.31, 1.24, 2.11]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.01}
//         />
//       </Select>

//       <Select enabled={highlightedParts[12].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Plane.geometry}
//           material={materials.Plane}
//           position={[1.76, 1.02, 1.91]}
//           scale={1.83}
//         />
//       </Select>
//     </group>
//   );
// }
function Model({ ...props }) {
  const { nodes, materials } = useGLTF(glbFileURL);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Assem1_-_pan_slot_head_am-5"].geometry}
        material={materials.Screws}
        position={[2.491, 1.235, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Assem1_-_pan_slot_head_am-6"].geometry}
        material={nodes["Assem1_-_pan_slot_head_am-6"].material}
        position={[2.431, 1.077, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Assem1_-_pan_slot_head_am-7"].geometry}
        material={nodes["Assem1_-_pan_slot_head_am-7"].material}
        position={[1.631, 1.077, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fuse_Bridge.geometry}
        material={materials.Fuse_Bridge}
        position={[2.029, 1.805, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Contacts.geometry}
          material={materials.Contacts}
          position={[0.277, 0.066, 17.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Fuse_Wire.geometry}
          material={materials.Fuse_Wire}
          position={[-12.59, -8.388, 18.746]}
          scale={24.306}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Screw_up1.geometry}
          material={materials.Screws}
          position={[-32.724, -4.561, 18.71]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Screw_up_2.geometry}
          material={materials.Screws}
          position={[33.277, 4.519, 18.751]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Assem1_-_pan_slot_head_am-2"].geometry}
        material={materials.Screws}
        position={[1.691, 1.235, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Assem1_-_PART3-1"].geometry}
        material={materials.Base}
        position={[2.024, 1.184, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Assem1_-_part4-1"].geometry}
        material={materials.Contact_Point}
        position={[2.031, 1.221, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Assem1_-_pan_slot_head_am-3"].geometry}
        material={materials.Screws}
        position={[1.57, 1.235, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Assem1_-_pan_slot_head_am-4"].geometry}
        material={materials.Screws}
        position={[2.37, 1.235, 2.108]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.Plane}
        position={[1.765, 1.016, 1.211]}
        scale={1.827}
      />
    </group>
  );
}
useGLTF.preload(glbFileURL);

export default function Fuse() {
  const { isLoginCountDownComplete, setLoginCountDownComplete, loggedIn } =
    useContext(AppContext);

  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 1, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, -25] },
    { intensity: 1, position: [-5, 18.25, -54.37] },
  ];
  const highlightedParts = [
    //0
    {
      id: "INVALID0",
      name: "INVALID0",
      description: "INVALID0",
      highlight: false,
    },

    //1
    {
      id: "INVALID1",
      name: "INVALID1",
      description: "INVALID1",
      highlight: false,
    },

    //2
    {
      id: "INVALID2",
      name: "INVALID2",
      description: "INVALID2",
      highlight: false,
    },
    //3
    {
      id: "INVALID0",
      name: "INVALID0",
      description: "INVALID0",
      highlight: false,
    },

    //4
    {
      id: "INVALID1",
      name: "INVALID1",
      description: "INVALID1",
      highlight: false,
    },

    //5
    {
      id: "INVALID2",
      name: "INVALID2",
      description: "INVALID2",
      highlight: false,
    },
    //6
    {
      id: "INVALID2",
      name: "INVALID2",
      description: "INVALID2",
      highlight: false,
    },

    //7
    {
      id: "INVALID0",
      name: "INVALID0",
      description: "INVALID0",
      highlight: false,
    },

    //8
    { id: "Base", name: "Base", description: "Base", highlight: false },

    //9
    {
      id: "Contact_Point",
      name: "Contact_Point",
      description: "Contact_Point",
      highlight: false,
    },

    //10
    {
      id: "INVALID3",
      name: "INVALID3",
      description: "INVALID3",
      highlight: false,
    },

    //11
    {
      id: "INVALID4",
      name: "INVALID4",
      description: "INVALID4",
      highlight: false,
    },

    //12
    { id: "Plane", name: "Plane", description: "Plane", highlight: false },
  ];
  const { cX, cY, cZ } = useControlsWithReset("Camera", {
    cX: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
    cY: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
    cZ: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
  });
  const camera = { position: [5 + cX, 2 + cY, 5 + cZ], fov: 30 };
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);
  return (
    <ModelJSXGenerator
      //state={state}
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#050505"
    >
      <Model
        rotation={[0, Math.PI, 0]}
        dispatch={dispatch}
        highlightedParts={highlightState}
      />
    </ModelJSXGenerator>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       {isLoginCountDownComplete ? <Login /> : null}
  //       <Pick state={state} />
  //       <Canvas camera={{ position: [5, 2, 5], fov: 69 }}>
  //         <color attach="background" args={["#050505"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[0, 5, -25]} />
  //         <directionalLight intensity={1} position={[0, 5, 25]} />
  //         <directionalLight intensity={1} position={[0, -5, -25]} />
  //         <OrbitControls />
  //         <Suspense
  //           fallback={
  //             <ProgressLoader
  //               setLoginCountDownComplete={setLoginCountDownComplete}
  //               loggedIn={loggedIn}
  //             />
  //           }
  //         >
  //           <Model />
  //         </Suspense>
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
