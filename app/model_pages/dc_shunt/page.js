"use client";
import React, { Suspense, useRef, useEffect, useState } from "react";
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
import {
  useControlsWithReset,
  useGroupControlsWithReset,
} from "@/hooks/useControlsCustom";

// const state = proxy({
//   current: null,
// });
const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/dcshunt.glb`;

// function Model({ ...props }) {
// const group = useRef();
//   //const snap = useSnapshot(state);
//   const [hover, set] = useState(null);
//   const yoke = useRef();
//   const cover = useRef();
//   const backcover = useRef();
//   const terminalcap = useRef();
//   const bs_holder = useRef();
//   const r_core = useRef();
//   const {
//     Yoke,
//     Yoke_Visibility,
//     EndCap,
//     EndCap_Visibility,
//     Backcover,
//     Backcover_Visibility,
//     Brushshaft_Visibility,
//     Rotor,
//     Rotor_Visibility,
//     Brush,
//     BrushHolder,
//     Brush_Cap,
//   } = useGroupControlsWithReset("DC Shunt Motor", {
//     Yoke: {
//       Yoke: {
//         value: 0,
//         min: 0,
//         max: 85,
//         step: 0.1,
//       },
//       Yoke_Visibility: true,
//     },
//     EndCap: {
//       EndCap: {
//         value: 0,
//         min: 0,
//         max: 85,
//         step: 0.1,
//       },
//       EndCap_Visibility: true,
//     },
//     Backcover: {
//       Backcover: {
//         value: 0,
//         min: 0,
//         max: 85,
//         step: 0.1,
//       },
//       Backcover_Visibility: true,
//     },
//     Brushshaft: {
//       Brushshaft_Visibility: true,
//     },
//     Rotor: {
//       Rotor: {
//         value: 0,
//         min: 0,
//         max: 85,
//         step: 0.1,
//       },
//       Rotor_Visibility: true,
//     },
//     "Brush Details": {
//       Brush: {
//         value: 0,
//         min: 0,
//         max: 85,
//         step: 0.1,
//       },
//       BrushHolder: {
//         value: 0,
//         min: 0,
//         max: 85,
//         step: 0.1,
//       },
//       Brush_Cap: {
//         value: 0,
//         min: 0,
//         max: 85,
//         step: 0.1,
//       },
//     },
//   });
//   useEffect(() => {
//     if (Yoke_Visibility == false) {
//       yoke.current.position.y = 200000000;
//     } else {
//       yoke.current.position.y = 10.19 + Yoke;
//     }
//     if (EndCap_Visibility == false) {
//       cover.current.position.z = 200000000;
//     } else {
//       cover.current.position.z = 14.56 + EndCap;
//     }
//     if (Backcover_Visibility == false) {
//       backcover.current.position.z = 200000000;
//     } else {
//       backcover.current.position.z = -7.67 - Backcover;
//     }
//     if (Rotor_Visibility == false) {
//       r_core.current.position.z = 200000000;
//     } else {
//       r_core.current.position.z = 11.77 - Rotor;
//     }
//     if (Brushshaft_Visibility == false) {
//       bs_holder.current.position.z = 200000000;
//     } else {
//       bs_holder.current.position.z = -4.47;
//     }
//   });
//   const { nodes, materials } = useGLTF(glbFileURL);
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
//         // e.stopPropagation(), (state.current = e.object.material.name);
//       }}
//       onPointerMissed={(e) => {
//         // state.current = null;
//       }}
//     >
//       <mesh
//         geometry={nodes.EndCap.geometry}
//         material={materials.EndCap}
//         position={[0.1, 11.83, 14.56 + EndCap]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//         visible={EndCap_Visibility}
//         ref={cover}
//       />
//       <mesh
//         geometry={nodes.Brush1.geometry}
//         material={materials.Brush1}
//         position={[-3.23 - Brush, 11.83, -4.49]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.Brush2.geometry}
//         material={materials.Brush2}
//         position={[3.43 + Brush, 11.83, -4.49]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.BrushHolder2.geometry}
//         material={materials.Brush_Holder2}
//         position={[-4.85 - BrushHolder, 11.83, -4.46]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.BrushHolder.geometry}
//         material={materials.Brush_holder}
//         position={[5.05 + BrushHolder, 11.83, -4.46]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.BrushHolderAndTerminal1.geometry}
//         material={materials.BrushHolder_and_Terminal1}
//         position={[-0.26, 20, -0.95]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.BrushHolderAndTerminal2.geometry}
//         material={materials.BrushHolder_and_Terminal2}
//         position={[1.79, 19.85, -1.51]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.BrushHolderCap1.geometry}
//         material={materials.Brush_HolderCap1}
//         position={[-6.07 - Brush_Cap, 11.83, -4.48]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.BrushHolderCap2.geometry}
//         material={materials.Brush_HolderCap2}
//         position={[6.27 + Brush_Cap, 11.83, -4.48]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.Terminal_Cap.geometry}
//         material={materials.Terminal_Cap}
//         position={[0.1, 21.58, -0.44]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.DrivingShaft.geometry}
//         material={materials.Shaft}
//         position={[0.21, 12.04, 11.77 - Rotor]}
//         rotation={[Math.PI / 2, 1.08, 0]}
//         scale={0.06}
//         visible={Rotor_Visibility}
//         ref={r_core}
//       >
//         <mesh
//           geometry={nodes.ArmatureCoilAndCommutatorSegment.geometry}
//           material={materials.ArmatureCoil_and_Cummutator}
//           position={[-4.06, -190.05, 0]}
//         />
//         <mesh
//           geometry={nodes.ArmatureLamination.geometry}
//           material={materials.Armature_Lamination}
//           position={[-4.09, -120.29, -0.01]}
//         />
//         <mesh
//           geometry={nodes.CommutatorSegmentHolder.geometry}
//           material={materials.Commutator_Segment_Holder}
//           position={[-4.35, -263.22, 0]}
//         />
//       </mesh>
//       <mesh
//         geometry={nodes.EndCap_2.geometry}
//         material={materials.EndCap}
//         position={[0.1, 11.83, -7.67 - Backcover]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//         visible={Backcover_Visibility}
//         ref={backcover}
//       />
//       <mesh
//         geometry={nodes.Field_Lamination.geometry}
//         material={materials.Field_Lamination}
//         position={[0.1, 11.83, 4.84]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.Brush_Spring2.geometry}
//         material={materials.Brush_Spring2}
//         position={[-5.06, 11.83, -4.49]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.Brush_Spring.geometry}
//         material={materials.Brush_Spring1}
//         position={[5.26, 11.83, -4.49]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.Stator_Wire.geometry}
//         material={materials.Stator_Wire}
//         position={[0.03, 12.37, 4.04]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.TerminalHolder.geometry}
//         material={materials.Terminal_Holder}
//         position={[0.1, 20.84, -0.13]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.Brush_ShaftHolder.geometry}
//         material={materials.Brush_Shaft_Holder}
//         position={[0.08, 11.84, -4.47]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//         visible={Brushshaft_Visibility}
//         ref={bs_holder}
//       />
//       <mesh
//         geometry={nodes.hex_bolt.geometry}
//         material={materials.Screw}
//         position={[-0.44, 11.32, 2.52]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.pan_head_tapping_screw.geometry}
//         material={materials.Screw}
//         position={[1.3, 20.16, 1.45]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//       />
//       <mesh
//         geometry={nodes.Yoke.geometry}
//         material={materials.Yoke}
//         position={[0.09, 10.19 + Yoke, 3.04]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.06}
//         visible={Yoke_Visibility}
//         ref={yoke}
//       />
//     </group>
//   );
// }
function Model({ ...props }) {
  const group = useRef();
  // const { EndCap } = useGroupControlsWithReset("DC Shunt Motor", {
  //   EndCap: {
  //     EndCap: {
  //       value: 0,
  //       min: 0,
  //       max: 85,
  //       step: 0.1,
  //     },
  //   },
  // });
  const { nodes, materials } = useGLTF(glbFileURL);
  const yoke = useRef();
  const cover = useRef();
  const backcover = useRef();
  const terminalcap = useRef();
  const bs_holder = useRef();
  const r_core = useRef();
  const {
    Yoke,
    Yoke_Visibility,
    EndCap,
    EndCap_Visibility,
    Backcover,
    Backcover_Visibility,
    Brushshaft_Visibility,
    Rotor,
    Rotor_Visibility,
    Brush,
    BrushHolder,
    Brush_Cap,
  } = useGroupControlsWithReset("DC Shunt Motor", {
    Yoke: {
      Yoke: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Yoke_Visibility: true,
    },
    EndCap: {
      EndCap: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      EndCap_Visibility: true,
    },
    Backcover: {
      Backcover: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Backcover_Visibility: true,
    },
    Brushshaft: {
      Brushshaft_Visibility: true,
    },
    Rotor: {
      Rotor: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Rotor_Visibility: true,
    },
    "Brush Details": {
      Brush: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      BrushHolder: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Brush_Cap: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
    },
  });
  useEffect(() => {
    if (Yoke_Visibility == false) {
      yoke.current.position.y = 200000000;
    } else {
      yoke.current.position.y = 10.19 + Yoke;
    }
    if (EndCap_Visibility == false) {
      cover.current.position.z = 200000000;
    } else {
      cover.current.position.z = 14.56 + EndCap;
    }
    if (Backcover_Visibility == false) {
      backcover.current.position.z = 200000000;
    } else {
      backcover.current.position.z = -7.67 - Backcover;
    }
    if (Rotor_Visibility == false) {
      r_core.current.position.z = 200000000;
    } else {
      r_core.current.position.z = 11.77 - Rotor;
    }
    if (Brushshaft_Visibility == false) {
      bs_holder.current.position.z = 200000000;
    } else {
      bs_holder.current.position.z = -4.47;
    }
  });
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(e) => {
        // e.stopPropagation(), set(e.object.material.name);
      }}
      onPointerOut={(e) => {
        // e.intersections.length === 0 && set(null);
      }}
      onClick={(e) => {
        // e.stopPropagation();
        // state.current = e.object.material.name;
        // props.dispatch({ id: state.current });
        // console.log(state.current);
      }}
      onPointerMissed={(e) => {
        // state.current = null;
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EndCap.geometry}
        ref={cover}
        material={materials.EndCap}
        visible={EndCap_Visibility}
        position={[0.097, 11.832, 14.555 + EndCap]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Brush1.geometry}
        material={materials.Brush1}
        position={[-3.226, 11.829, -4.487]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Brush2.geometry}
        material={materials.Brush2}
        position={[3.425, 11.829, -4.487]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BrushHolder2.geometry}
        material={materials.Brush_Holder2}
        position={[-4.852 - BrushHolder, 11.829, -4.464]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BrushHolder.geometry}
        material={materials.Brush_holder}
        position={[5.052 + BrushHolder, 11.829, -4.464]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BrushHolderAndTerminal1.geometry}
        material={materials.BrushHolder_and_Terminal1}
        position={[-0.256, 19.598 + Brush, -1.036]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BrushHolderAndTerminal2.geometry}
        material={materials.BrushHolder_and_Terminal2}
        position={[1.795, 19.535, -1.605]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BrushHolderCap1.geometry}
        material={materials.Brush_HolderCap1}
        position={[-6.071 - Brush_Cap, 11.829, -4.479]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BrushHolderCap2.geometry}
        material={materials.Brush_HolderCap2}
        position={[6.271 + Brush_Cap, 11.829, -4.479]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Terminal_Cap.geometry}
        material={materials.Terminal_Cap}
        position={[0.1, 21.58, -0.44]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DrivingShaft.geometry}
        material={materials.Shaft}
        visible={Rotor_Visibility}
        position={[0.21, 12.04, 11.77 - Rotor]}
        rotation={[Math.PI / 2, 1.084, 0]}
        scale={0.058}
        ref={r_core}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ArmatureCoilAndCommutatorSegment.geometry}
          material={materials.ArmatureCoil_and_Cummutator}
          position={[-4.065, -190.049, 0.003]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ArmatureLamination.geometry}
          material={materials.Armature_Lamination}
          position={[-4.093, -120.287, -0.01]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CommutatorSegmentHolder.geometry}
          material={materials.Commutator_Segment_Holder}
          position={[-4.349, -263.224, 0]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EndCap_2.geometry}
        material={materials.EndCap}
        position={[0.1, 11.829, -7.485 - Backcover]}
        rotation={[Math.PI / 2, 0, 0]}
        ref={backcover}
        visible={Backcover_Visibility}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Field_Lamination.geometry}
        material={materials.Field_Lamination}
        position={[0.102, 11.826, 4.844]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Brush_Spring2.geometry}
        material={materials.Brush_Spring2}
        position={[-5.055, 11.83, -4.487]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Brush_Spring.geometry}
        material={materials.Brush_Spring1}
        position={[5.255, 11.829, -4.487]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stator_Wire.geometry}
        material={materials.Stator_Wire}
        position={[0.028, 12.366, 4.044]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TerminalHolder.geometry}
        material={materials.Terminal_Holder}
        position={[0.1, 20.84, -0.133]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Brush_ShaftHolder.geometry}
        material={materials.Brush_Shaft_Holder}
        position={[0.079, 11.838, -4.466]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
        visible={Brushshaft_Visibility}
        ref={bs_holder}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hex_bolt.geometry}
        material={materials.Screw}
        position={[-0.44, 11.316, 2.52]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pan_head_tapping_screw.geometry}
        material={materials.Screw}
        position={[1.296, 20.162, 1.447]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Yoke.geometry}
        material={materials.Yoke}
        ref={yoke}
        visible={Yoke_Visibility}
        position={[0.086, 10.189 + Yoke, 3.042]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.058}
      />
    </group>
  );
}
useGLTF.preload(glbFileURL);

export default function DcShunt() {
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
  const camera = { position: [-15, 25, 25], fov: 69 };
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 0.4, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
    { intensity: 1, position: [-5, 18.25, -54.37] },
  ];
  return (
    <ModelJSXGenerator
      //state={state}
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#d1a470"
    >
      <Model position={[0 + X, 0 + Y, 0 + Z]} />
    </ModelJSXGenerator>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       <Pick state={state} />
  //       <Canvas camera={{ position: [-15, 25, 25], fov: 69 }}>
  //         <color attach="background" args={["#050511"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[0, 5, -25]} />
  //         <directionalLight intensity={0.4} position={[0, 5, 25]} />
  //         <directionalLight intensity={1} position={[0, -5, 0]} />
  //         <directionalLight intensity={1} position={[-5, 18.25, -54.37]} />
  //         <OrbitControls enableDamping={false} />
  //         <Suspense fallback={<ProgressLoader />}>
  //           <Model position={[0 + X, 0 + Y, 0 + Z]} />
  //         </Suspense>
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
