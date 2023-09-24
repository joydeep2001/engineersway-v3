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
  ArcballControls,
  useAnimations,
  PerspectiveCamera,
  useGLTF,
  useProgress,
  Html,
  Tube,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls, folder } from "leva";
// import { proxy, useSnapshot } from "valtio";
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
const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/drill.glb`;
// function Model({ ...props }) {
//   const group = useRef();
//   //const snap = useSnapshot(state);
//   const [hover, set] = useState(null);
//   const cover = useRef();
//   const headassembly = useRef();
//   const tbquil = useRef();
//   const spndl = useRef();
//   const spring = useRef();
//   const hub = useRef();
//   const { nodes, materials } = useGLTF(glbFileURL);

//   const {
//     HeadAssembly,
//     HeadAssembly_Visibility,
//     Hub,
//     Hub_Visibility,
//     TubeQuil,
//     TubeQuil_Visibility,
//     Spindle,
//     Spindle_Visibility,
//     Spring,
//     Spring_Visibility,
//     PulleyGardCover,
//     PulleyGardCover_Visibility,
//   } = useGroupControlsWithReset("Drill", {
//     "Head Assembly": {
//       HeadAssembly: {
//         value: 0,
//         min: 0,
//         max: 55,
//         step: 0.1,
//       },
//       HeadAssembly_Visibility: true,
//     },
//     Hub: {
//       Hub: {
//         value: 0,
//         min: 0,
//         max: 55,
//         step: 0.1,
//       },
//       Hub_Visibility: true,
//     },
//     "Tube Quil": {
//       TubeQuil: {
//         value: 0,
//         min: 0,
//         max: 55,
//         step: 0.1,
//       },
//       TubeQuil_Visibility: true,
//     },
//     Spindle: {
//       Spindle: {
//         value: 0,
//         min: 0,
//         max: 55,
//         step: 0.1,
//       },
//       Spindle_Visibility: true,
//     },
//     Spring: {
//       Spring: {
//         value: 0,
//         min: 0,
//         max: 55,
//         step: 0.1,
//       },
//       Spring_Visibility: true,
//     },
//     "Pulley Gard Cover": {
//       PulleyGardCover: {
//         value: 0,
//         min: 0,
//         max: 55,
//         step: 0.1,
//       },
//       PulleyGardCover_Visibility: true,
//     },
//   });

//   useEffect(() => {
//     if (PulleyGardCover_Visibility == false) {
//       cover.current.position.y = 20000000000;
//     } else {
//       cover.current.position.y = 71.8 + PulleyGardCover;
//     }
//   });
//   useEffect(() => {
//     if (Spring_Visibility == false) {
//       spring.current.position.x = 20000000000;
//     } else {
//       spring.current.position.x = 1.73 + Spring;
//     }
//   });
//   useEffect(() => {
//     if (Spindle_Visibility == false) {
//       spndl.current.position.x = 20000000000;
//     } else {
//       spndl.current.position.x = 8.03 - Spindle;
//     }
//   });
//   useEffect(() => {
//     if (TubeQuil_Visibility == false) {
//       tbquil.current.position.x = 20000000000;
//     } else {
//       tbquil.current.position.x = 7.97 - TubeQuil;
//     }
//   });
//   useEffect(() => {
//     if (Hub_Visibility == false) {
//       hub.current.position.x = 20000000000;
//     } else {
//       hub.current.position.x = 5.84 + Hub;
//     }
//   });
//   useEffect(() => {
//     if (HeadAssembly_Visibility == false) {
//       headassembly.current.position.x = 20000000000;
//     } else {
//       headassembly.current.position.x = 8.65 + HeadAssembly;
//     }
//   });
//   const { highlightedParts } = props;
//   return (
//     <group
//       ref={group}
//       {...props}
//       dispose={null}
//       onPointerOver={(e) => {
//         e.stopPropagation(), set(e.object.material.name);
//       }}
//       onPointerOut={(e) => {
//         e.intersections.length === 0 && set(null);
//       }}
//       onClick={(e) => {
//         e.stopPropagation();
//         //state.current = e.object.material.name;
//         //props.dispatch({ id: state.current });
//         //console.log(state.current);
//       }}
//       onPointerMissed={(e) => {
//         // state.current = null;
//       }}
//     >
//       <Select enabled={highlightedParts[0].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Arbor-1"].geometry}
//           material={materials.Arbor}
//           position={[8.13, 50.04, -73.41]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[1].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Base-1"].geometry}
//           material={materials.Base}
//           position={[8.2, 9.4, -92.74]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[2].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_BaseTable-1"].geometry}
//           material={materials.Base_Table}
//           position={[8.15, 5.65, -71.21]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[3].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Boss-Extrude47-1"].geometry}
//           material={materials.Shaft}
//           position={[8.15, 72.38, -73.44]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[4].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_CapSpring-1"].geometry}
//           material={materials["Material.001"]}
//           position={[1.38, 60.06, -76.67]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[5].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_ChuckBody-1"].geometry}
//           material={materials.ChuckBody}
//           position={[8.15, 46.93, -73.41]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[6].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_ChuckGear-1"].geometry}
//           material={materials.ChuckGear}
//           position={[8.15, 47.51, -73.41]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[7].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_ChuckJaw1-1"].geometry}
//           material={materials.ChuckJaw}
//           position={[8.15, 46.07, -73.04]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[8].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_ChuckJaw2-1"].geometry}
//           material={materials.ChuckJaw}
//           position={[8.47, 46.07, -73.59]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[9].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_ChuckJaw3-1"].geometry}
//           material={materials.ChuckJaw}
//           position={[7.83, 46.07, -73.59]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[10].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_ChuckLock-1"].geometry}
//           material={nodes["ass_-_ChuckLock-1"].material}
//           position={[7.3, 56.63, -73.42]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[11].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_ChuckSleeve-1"].geometry}
//           material={materials.ChuckSleeve}
//           position={[8.15, 49.07, -73.41]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[12].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Column-1"].geometry}
//           material={materials.Column}
//           position={[8.15, 46.89, -88.67]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[13].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Grip1-1"].geometry}
//           material={materials.Grip}
//           position={[18.64, 59.83, -76.64]}
//           rotation={[1.63, -0.2, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[14].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Grip2-1"].geometry}
//           material={materials.Grip}
//           position={[18.64, 60.06, -76.64]}
//           rotation={[Math.PI / 2, 0, -0.16]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[15].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Grip3-1"].geometry}
//           material={materials.Grip}
//           position={[18.49, 60.47, -76.64]}
//           rotation={[1.51, 0.2, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[16].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Handle1-1"].geometry}
//           material={materials.Handle}
//           position={[18.49, 60.47, -76.64]}
//           rotation={[1.51, 0.2, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[17].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Handle2-1"].geometry}
//           material={materials.Handle}
//           position={[18.64, 59.83, -76.64]}
//           rotation={[1.63, -0.2, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[18].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Handle3-1"].geometry}
//           material={materials.Handle}
//           position={[18.64, 60.06, -76.64]}
//           rotation={[Math.PI / 2, 0, -0.16]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[19].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Head_Assembly-1"].geometry}
//           material={materials.Head_Assembly}
//           position={[8.65 + HeadAssembly, 64.23, -80.97]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//           visible={HeadAssembly_Visibility}
//           ref={headassembly}
//         />
//       </Select>

//       <Select enabled={highlightedParts[20].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-1"].geometry}
//           material={materials.Screw}
//           position={[7.73, 71.34, -84.58]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[21].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-2"].geometry}
//           material={materials.Screw}
//           position={[7.73, 71.34, -78.64]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[22].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-3"].geometry}
//           material={materials.Screw}
//           position={[0.29, 65.08, -103.24]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[23].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-4"].geometry}
//           material={materials.Screw}
//           position={[0.29, 58.25, -103.24]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[24].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-5"].geometry}
//           material={materials.Screw}
//           position={[16.01, 65.08, -103.24]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[25].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-6"].geometry}
//           material={nodes["ass_-_hex_flange_machine_screw_am-6"].material}
//           position={[2.93, 55.94, -101.31]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[26].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-7"].geometry}
//           material={materials.Screw}
//           position={[10.69, 67.87, -95.33]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[27].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-8"].geometry}
//           material={materials.Screw}
//           position={[5.49, 67.87, -95.33]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[28].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_hex_flange_machine_screw_am-9"].geometry}
//           material={materials.Screw}
//           position={[16.01, 58.24, -103.24]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[29].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Hub-1"].geometry}
//           material={materials.Hub}
//           position={[5.84 + Hub, 60.06, -76.68]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//           visible={Hub_Visibility}
//           ref={hub}
//         />
//       </Select>

//       <Select enabled={highlightedParts[30].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_LockingNut-1"].geometry}
//           material={materials.LockingNut}
//           position={[8.36, 9.87, -94.04]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[31].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_LockingNutHandle-1"].geometry}
//           material={materials.LockingNutHandle}
//           position={[4.33, 9.87, -94.03]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[32].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_LockingPin-1"].geometry}
//           material={materials.Locking_Pin}
//           position={[8.15, 78.24, -104.34]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[33].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_LockingPin1-1"].geometry}
//           material={materials.Locking_Pin}
//           position={[8.15, 78.24, -74.39]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[34].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Motor-1"].geometry}
//           material={materials.Motor}
//           position={[8.14, 62.02, -104.18]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[35].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_MotorMountingBracket-1"].geometry}
//           material={materials.Motor_mounting_bracket}
//           position={[8.22, 63.12, -100.23]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[36].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_MotorShaft-1"].geometry}
//           material={materials.Motor_Shaft}
//           position={[8.15, 66.95, -103.35]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[37].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Nut1-1"].geometry}
//           material={nodes["ass_-_Nut1-1"].material}
//           position={[0.91, 60.05, -76.67]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[38].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Pully2-1"].geometry}
//           material={materials.Pully}
//           position={[8.15, 75.4, -103.36]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[39].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_PullyBelt-1"].geometry}
//           material={materials.Belt}
//           position={[8.15, 77.21, -81.99]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[40].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_PullyGardBase-1"].geometry}
//           material={materials.PulleyGardBase}
//           position={[8.08, 71.31, -85.48]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[41].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_radial_ball_bearing_68_am-1"].geometry}
//           material={materials.BallBearing}
//           position={[8.15, 72.38, -73.44]}
//           rotation={[Math.PI / 2, -1.57, 0]}
//           scale={2.04}
//         />
//       </Select>

//       <Select enabled={highlightedParts[42].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_SequringPin-1"].geometry}
//           material={materials.SecuringPin}
//           position={[5.67, 9.87, -94.04]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <group
//         position={[0.65, 71.8 + PulleyGardCover, -98.03]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.33}
//         visible={PulleyGardCover_Visibility}
//         ref={cover}
//       >
//         <Select enabled={highlightedParts[43].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={
//               nodes["ass_-_socket_button_head_cap_screw_am-5_1"].geometry
//             }
//             material={materials.Screw}
//           />
//         </Select>

//         <Select enabled={highlightedParts[44].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={
//               nodes["ass_-_socket_button_head_cap_screw_am-5_2"].geometry
//             }
//             material={materials.PulleyGardCover}
//           />
//         </Select>
//       </group>

//       <Select enabled={highlightedParts[45].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_socket_set_screw_cone_point_am-6"].geometry}
//           material={nodes["ass_-_socket_set_screw_cone_point_am-6"].material}
//           position={[8.15, 64.57, -88.75]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[46].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_socket_set_screw_cone_point_am-7"].geometry}
//           material={materials.socketsetscrew}
//           position={[14.33, 63.12, -88.72]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[47].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_socket_set_screw_cone_point_am-8"].geometry}
//           material={materials.socketsetscrew}
//           position={[14.54, 58.31, -88.72]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[48].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Spindle-1"].geometry}
//           material={materials.Spindle}
//           position={[8.03 - Spindle, 58.28, -73.42]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//           visible={Spindle_Visibility}
//           ref={spndl}
//         />
//       </Select>

//       <Select enabled={highlightedParts[49].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Spring-1"].geometry}
//           material={materials.Spring}
//           position={[1.73 + Spring, 60.08, -76.73]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//           visible={Spring_Visibility}
//           ref={spring}
//         />
//       </Select>

//       <Select enabled={highlightedParts[50].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Table-1"].geometry}
//           material={materials.Table}
//           position={[8.15, 25.39, -72.79]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[51].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_TableBase-1"].geometry}
//           material={materials.Table_Base}
//           position={[8.22, 25.01, -92.98]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[52].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_TubeQuill-1"].geometry}
//           material={materials.TubeQuil}
//           position={[7.97 - TubeQuil, 57.24, -73.79]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//           visible={TubeQuil_Visibility}
//           ref={tbquil}
//         />
//       </Select>

//       <Select enabled={highlightedParts[53].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Washer-1"].geometry}
//           material={nodes["ass_-_Washer-1"].material}
//           position={[1.18, 60.05, -76.66]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[54].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Base-1001"].geometry}
//           material={nodes["ass_-_Base-1001"].material}
//           position={[-4.81, 0.99, -113.77]}
//           rotation={[-Math.PI, 0, -Math.PI]}
//           scale={0}
//         />
//       </Select>

//       <Select enabled={highlightedParts[55].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_LockingNut-1001"].geometry}
//           material={materials.LockingNut}
//           position={[8.36, 25.12, -93.87]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[56].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_LockingNutHandle-1001"].geometry}
//           material={materials.LockingNutHandle}
//           position={[4.33, 25.11, -93.87]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[57].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_SequringPin-1001"].geometry}
//           material={materials.SecuringPin}
//           position={[5.67, 25.11, -93.87]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.43}
//         />
//       </Select>

//       <Select enabled={highlightedParts[58].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_radial_ball_bearing_68_am-1001"].geometry}
//           material={materials.BallBearing}
//           position={[8.15, 63.85, -73.44]}
//           rotation={[Math.PI / 2, -1.57, 0]}
//           scale={1.64}
//         />
//       </Select>

//       <Select enabled={highlightedParts[59].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_radial_ball_bearing_68_am-1002"].geometry}
//           material={materials.BallBearing}
//           position={[8.15, 54.13, -73.44]}
//           rotation={[Math.PI / 2, -1.57, 0]}
//           scale={1.64}
//         />
//       </Select>

//       <Select enabled={highlightedParts[60].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["ass_-_Pully2-1001"].geometry}
//           material={materials.Pully}
//           position={[8.15, 75.68, -73.44]}
//           rotation={[-Math.PI / 2, 0, -Math.PI]}
//           scale={0.51}
//         />
//       </Select>
//     </group>
//   );
// }
function Model({ ...props }) {
  const { nodes, materials } = useGLTF(glbFileURL);
  const group = useRef();
  //const snap = useSnapshot(state);

  const cover = useRef();
  const headassembly = useRef();
  const tbquil = useRef();
  const spndl = useRef();
  const spring = useRef();
  const hub = useRef();
  const {
    HeadAssembly,
    HeadAssembly_Visibility,
    Hub,
    Hub_Visibility,
    TubeQuil,
    TubeQuil_Visibility,
    Spindle,
    Spindle_Visibility,
    Spring,
    Spring_Visibility,
    PulleyGardCover,
    PulleyGardCover_Visibility,
  } = useGroupControlsWithReset("Drill", {
    "Head Assembly": {
      HeadAssembly: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      HeadAssembly_Visibility: true,
    },
    Hub: {
      Hub: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      Hub_Visibility: true,
    },
    "Tube Quil": {
      TubeQuil: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      TubeQuil_Visibility: true,
    },
    Spindle: {
      Spindle: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      Spindle_Visibility: true,
    },
    Spring: {
      Spring: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      Spring_Visibility: true,
    },
    "Pulley Gard Cover": {
      PulleyGardCover: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      PulleyGardCover_Visibility: true,
    },
  });

  useEffect(() => {
    if (PulleyGardCover_Visibility == false) {
      cover.current.position.y = 20000000000;
    } else {
      cover.current.position.y = 71.8 + PulleyGardCover;
    }
  });
  useEffect(() => {
    if (Spring_Visibility == false) {
      spring.current.position.x = 20000000000;
    } else {
      spring.current.position.x = 1.73 + Spring;
    }
  });
  useEffect(() => {
    if (Spindle_Visibility == false) {
      spndl.current.position.x = 20000000000;
    } else {
      spndl.current.position.x = 8.03 - Spindle;
    }
  });
  useEffect(() => {
    if (TubeQuil_Visibility == false) {
      tbquil.current.position.x = 20000000000;
    } else {
      tbquil.current.position.x = 7.97 - TubeQuil;
    }
  });
  // useEffect(() => {
  //   if (Hub_Visibility == false) {
  //     hub.current.position.x = 20000000000;
  //   } else {
  //     hub.current.position.x = 5.84 + Hub;
  //   }
  // });
  useEffect(() => {
    if (HeadAssembly_Visibility == false) {
      headassembly.current.position.x = 20000000000;
    } else {
      headassembly.current.position.x = 8.65 + HeadAssembly;
    }
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Arbor-1"].geometry}
        material={materials.Arbor}
        position={[8.125, 50.041, -73.413]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Base-1"].geometry}
        material={materials.Base}
        position={[8.204, 9.403, -92.738]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_BaseTable-1"].geometry}
        material={materials.Base_Table}
        position={[8.151, 5.646, -71.21]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Boss-Extrude47-1"].geometry}
        material={materials.BallBearing}
        position={[8.151, 72.384, -73.436]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_CapSpring-1"].geometry}
        material={materials["Material.001"]}
        position={[1.379, 60.057, -76.671]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_ChuckBody-1"].geometry}
        material={materials.Handle}
        position={[8.151, 46.933, -73.407]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_ChuckGear-1"].geometry}
        material={materials.Handle}
        position={[8.15, 47.508, -73.412]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_ChuckJaw1-1"].geometry}
        material={materials.Handle}
        position={[8.151, 46.068, -73.039]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_ChuckJaw2-1"].geometry}
        material={materials.Handle}
        position={[8.469, 46.068, -73.59]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_ChuckJaw3-1"].geometry}
        material={materials.Handle}
        position={[7.833, 46.068, -73.59]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_ChuckLock-1"].geometry}
        material={nodes["ass_-_ChuckLock-1"].material}
        position={[7.295, 56.628, -73.418]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_ChuckSleeve-1"].geometry}
        material={materials.Handle}
        position={[8.15, 49.065, -73.407]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Column-1"].geometry}
        material={materials.Table}
        position={[8.151, 46.89, -88.669]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Grip1-1"].geometry}
        material={materials.Grip}
        position={[18.636, 59.831, -76.639]}
        rotation={[1.631, -0.199, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Grip2-1"].geometry}
        material={materials.Grip}
        position={[18.643, 60.059, -76.639]}
        rotation={[Math.PI / 2, 0, -0.163]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Grip3-1"].geometry}
        material={materials.Grip}
        position={[18.491, 60.47, -76.639]}
        rotation={[1.511, 0.197, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Handle1-1"].geometry}
        material={materials.Handle}
        position={[18.491, 60.47, -76.639]}
        rotation={[1.511, 0.197, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Handle2-1"].geometry}
        material={materials.Handle}
        position={[18.636, 59.831, -76.639]}
        rotation={[1.631, -0.199, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Handle3-1"].geometry}
        material={materials.Handle}
        position={[18.643, 60.059, -76.639]}
        rotation={[Math.PI / 2, 0, -0.163]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Head_Assembly-1"].geometry}
        material={materials.Head_Assembly}
        position={[-61.791 + HeadAssembly, 64.231, -80.968]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
        visible={HeadAssembly_Visibility}
        ref={headassembly}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-1"].geometry}
        material={materials.Screw}
        position={[7.732, 71.338, -84.576]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-2"].geometry}
        material={materials.Screw}
        position={[7.732, 71.338, -78.643]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-3"].geometry}
        material={materials.Screw}
        position={[0.288, 65.083, -103.243]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-4"].geometry}
        material={materials.Screw}
        position={[0.288, 58.245, -103.243]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-5"].geometry}
        material={materials.Screw}
        position={[16.014, 65.082, -103.242]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-6"].geometry}
        material={materials.Screw}
        position={[2.929, 55.945, -101.314]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-7"].geometry}
        material={materials.Screw}
        position={[10.687, 67.869, -95.333]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-8"].geometry}
        material={materials.Screw}
        position={[5.486, 67.869, -95.333]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_hex_flange_machine_screw_am-9"].geometry}
        material={materials.Screw}
        position={[16.014, 58.244, -103.242]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Hub-1"].geometry}
        material={materials.Table}
        position={[5.838, 60.059, -76.682]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_LockingNut-1"].geometry}
        material={materials.Screw}
        position={[8.359, 9.869, -94.038]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_LockingNutHandle-1"].geometry}
        material={materials.Screw}
        position={[4.329, 9.866, -94.033]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_LockingPin-1"].geometry}
        material={materials.Table}
        position={[8.151, 78.237, -104.343]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_LockingPin1-1"].geometry}
        material={materials.Table}
        position={[8.151, 78.237, -74.39]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Motor-1"].geometry}
        material={materials.Motor}
        position={[8.144, 62.021, -104.18]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_MotorMountingBracket-1"].geometry}
        material={materials.Motor_mounting_bracket}
        position={[8.225, 63.124, -100.227]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_MotorShaft-1"].geometry}
        material={materials.Screw}
        position={[8.15, 66.948, -103.351]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Nut1-1"].geometry}
        material={materials.Table}
        position={[0.913, 60.051, -76.672]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Pully2-1"].geometry}
        material={materials.Table}
        position={[8.151, 75.4, -103.361]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_PullyBelt-1"].geometry}
        material={materials.Belt}
        position={[8.151, 77.212, -81.993]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_PullyGardBase-1"].geometry}
        material={materials.PulleyGardBase}
        position={[8.081, 71.306, -85.484]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_radial_ball_bearing_68_am-1"].geometry}
        material={materials.BallBearing}
        position={[8.151, 72.384, -73.436]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={2.044}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_SequringPin-1"].geometry}
        material={materials.Screw}
        position={[5.667, 9.866, -94.037]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <group
        position={[0.652, 128.061 + PulleyGardCover, -98.03]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.329}
        visible={PulleyGardCover_Visibility}
        ref={cover}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["ass_-_socket_button_head_cap_screw_am-5_1"].geometry}
          material={materials.Screw}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["ass_-_socket_button_head_cap_screw_am-5_2"].geometry}
          material={materials.PulleyGardCover}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_socket_set_screw_cone_point_am-6"].geometry}
        material={materials.Screw}
        position={[8.151, 64.567, -88.752]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_socket_set_screw_cone_point_am-7"].geometry}
        material={materials.socketsetscrew}
        position={[14.325, 63.116, -88.717]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_socket_set_screw_cone_point_am-8"].geometry}
        material={materials.socketsetscrew}
        position={[14.535, 58.313, -88.717]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Spindle-1"].geometry}
        material={materials.Spindle}
        position={[8.034 - Spindle, 58.283, -73.416]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
        visible={Spindle_Visibility}
        ref={spndl}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Spring-1"].geometry}
        material={materials.Handle}
        position={[1.733 + Spring, 60.081, -76.725]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
        visible={Spring_Visibility}
        ref={spring}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Table-1"].geometry}
        material={materials.Table}
        position={[8.151, 25.387, -72.79]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_TableBase-1"].geometry}
        material={materials.Table_Base}
        position={[8.218, 25.007, -92.977]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_TubeQuill-1"].geometry}
        material={materials.TubeQuil}
        position={[7.966 - TubeQuil, 57.24, -73.79]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
        visible={TubeQuil_Visibility}
        ref={tbquil}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Washer-1"].geometry}
        material={materials.Table}
        position={[1.177, 60.051, -76.659]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Base-1001"].geometry}
        material={nodes["ass_-_Base-1001"].material}
        position={[-4.814, 0.985, -113.768]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_LockingNut-1001"].geometry}
        material={materials.Screw}
        position={[8.359, 25.115, -93.875]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_LockingNutHandle-1001"].geometry}
        material={materials.Screw}
        position={[4.329, 25.112, -93.87]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_SequringPin-1001"].geometry}
        material={materials.Screw}
        position={[5.667, 25.112, -93.874]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.428}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_radial_ball_bearing_68_am-1001"].geometry}
        material={materials.BallBearing}
        position={[8.151, 63.849, -73.436]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={1.638}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_radial_ball_bearing_68_am-1002"].geometry}
        material={materials.BallBearing}
        position={[8.151, 54.133, -73.436]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={1.638}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ass_-_Pully2-1001"].geometry}
        material={materials.Table}
        position={[8.151, 75.682, -73.438]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={0.511}
      />
    </group>
  );
}
useGLTF.preload(glbFileURL);

export default function Drill() {
  const { X, Y, Z } = useControlsWithReset("Position", {
    X: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
    Y: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
    Z: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
  });
  const highlightedParts = [
    //0
    { id: "Arbor", name: "Arbor", description: "Arbor" },

    //1
    { id: "Base", name: "Base", description: "Base" },

    //2
    { id: "Base_Table", name: "Base_Table", description: "Base_Table" },

    //3
    { id: "Shaft", name: "Shaft", description: "Shaft" },

    //4
    { id: "Material.001", name: "Material.001", description: "Material.001" },

    //5
    { id: "ChuckBody", name: "ChuckBody", description: "ChuckBody" },

    //6
    { id: "ChuckGear", name: "ChuckGear", description: "ChuckGear" },

    //7
    { id: "ChuckJaw", name: "ChuckJaw", description: "ChuckJaw" },

    //8
    { id: "ChuckJaw", name: "ChuckJaw", description: "ChuckJaw" },

    //9
    { id: "ChuckJaw", name: "ChuckJaw", description: "ChuckJaw" },

    //10
    {
      id: "ass_-_ChuckLock-1",
      name: "ass_-_ChuckLock-1",
      description: "ass_-_ChuckLock-1",
    },

    //11
    { id: "ChuckSleeve", name: "ChuckSleeve", description: "ChuckSleeve" },

    //12
    { id: "Column", name: "Column", description: "Column" },

    //13
    { id: "Grip", name: "Grip", description: "Grip" },

    //14
    { id: "Grip", name: "Grip", description: "Grip" },

    //15
    { id: "Grip", name: "Grip", description: "Grip" },

    //16
    { id: "Handle", name: "Handle", description: "Handle" },

    //17
    { id: "Handle", name: "Handle", description: "Handle" },

    //18
    { id: "Handle", name: "Handle", description: "Handle" },

    //19
    {
      id: "Head_Assembly",
      name: "Head_Assembly",
      description: "Head_Assembly",
    },

    //20
    { id: "Screw", name: "Screw", description: "Screw" },

    //21
    { id: "Screw", name: "Screw", description: "Screw" },

    //22
    { id: "Screw", name: "Screw", description: "Screw" },

    //23
    { id: "Screw", name: "Screw", description: "Screw" },

    //24
    { id: "Screw", name: "Screw", description: "Screw" },

    //25
    { id: "INVALID25", name: "INVALID25", description: "INVALID25" },

    //26
    { id: "Screw", name: "Screw", description: "Screw" },

    //27
    { id: "Screw", name: "Screw", description: "Screw" },

    //28
    { id: "Screw", name: "Screw", description: "Screw" },

    //29
    { id: "Hub", name: "Hub", description: "Hub" },

    //30
    { id: "LockingNut", name: "LockingNut", description: "LockingNut" },

    //31
    {
      id: "LockingNutHandle",
      name: "LockingNutHandle",
      description: "LockingNutHandle",
    },

    //32
    { id: "Locking_Pin", name: "Locking_Pin", description: "Locking_Pin" },

    //33
    { id: "Locking_Pin", name: "Locking_Pin", description: "Locking_Pin" },

    //34
    { id: "Motor", name: "Motor", description: "Motor" },

    //35
    {
      id: "Motor_mounting_bracket",
      name: "Motor_mounting_bracket",
      description: "Motor_mounting_bracket",
    },

    //36
    { id: "Motor_Shaft", name: "Motor_Shaft", description: "Motor_Shaft" },

    //37
    { id: "INVALID37", name: "INVALID37", description: "INVALID37" },

    //38
    { id: "Pully", name: "Pully", description: "Pully" },

    //39
    { id: "Belt", name: "Belt", description: "Belt" },

    //40
    {
      id: "PulleyGardBase",
      name: "PulleyGardBase",
      description: "PulleyGardBase",
    },

    //41
    { id: "BallBearing", name: "BallBearing", description: "BallBearing" },

    //42
    { id: "SecuringPin", name: "SecuringPin", description: "SecuringPin" },

    //43
    { id: "Screw", name: "Screw", description: "Screw" },

    //44
    {
      id: "PulleyGardCover",
      name: "PulleyGardCover",
      description: "PulleyGardCover",
    },

    //45
    { id: "INVALID45", name: "INVALID45", description: "INVALID45" },

    //46
    {
      id: "socketsetscrew",
      name: "socketsetscrew",
      description: "socketsetscrew",
    },

    //47
    {
      id: "socketsetscrew",
      name: "socketsetscrew",
      description: "socketsetscrew",
    },

    //48
    { id: "Spindle", name: "Spindle", description: "Spindle" },

    //49
    { id: "Spring", name: "Spring", description: "Spring" },

    //50
    { id: "Table", name: "Table", description: "Table" },

    //51
    { id: "Table_Base", name: "Table_Base", description: "Table_Base" },

    //52
    { id: "TubeQuil", name: "TubeQuil", description: "TubeQuil" },

    //53
    { id: "INVALID53", name: "INVALID53", description: "INVALID53" },

    //54
    { id: "INVALID54", name: "INVALID54", description: "INVALID54" },

    //55
    { id: "LockingNut", name: "LockingNut", description: "LockingNut" },

    //56
    {
      id: "LockingNutHandle",
      name: "LockingNutHandle",
      description: "LockingNutHandle",
    },

    //57
    { id: "SecuringPin", name: "SecuringPin", description: "SecuringPin" },

    //58
    { id: "BallBearing", name: "BallBearing", description: "BallBearing" },

    //59
    { id: "BallBearing", name: "BallBearing", description: "BallBearing" },

    //60
    { id: "Pully", name: "Pully", description: "Pully" },
  ];
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);
  const camera = { position: [5, 20, 35], fov: 69 };
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 1, position: [10, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
    { intensity: 1, position: [-5, 18.25, -54.37] },
  ];
  return (
    <ModelJSXGenerator
      // state={state}
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#d1a470"
    >
      <Model
        dispatch={dispatch}
        highlightedParts={highlightState}
        position={[0 + X, -76 + Y, 0 + Z]}
      />
    </ModelJSXGenerator>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       <Pick state={state} />
  //       <Canvas camera={{ position: [5, 20, 35], fov: 69 }}>
  //         <color attach="background" args={["#050511"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[0, 5, -25]} />
  //         <directionalLight intensity={1} position={[10, 5, 25]} />
  //         <directionalLight intensity={1} position={[0, -5, 0]} />
  //         <directionalLight intensity={1} position={[-5, 18.25, -54.37]} />
  //         <OrbitControls enableDamping={false} />
  //         {/* <Suspense fallback={<Box />}> */}
  //         <Suspense fallback={<Loader />}>
  //           <Model position={[0 + X, -76 + Y, 0 + Z]} />
  //         </Suspense>
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
