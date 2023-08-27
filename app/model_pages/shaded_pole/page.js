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
//import { proxy, useSnapshot } from "valtio";
import {
  useControlsWithReset,
  useGroupControlsWithReset,
} from "@/hooks/useControlsCustom";
// import Box from "../Loader";
import ModelJSXGenerator from "@/components/ModelJSXGenerator";

// const state = proxy({
//   current: null,
// });
const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/shadedpole.glb`;
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="bg-black-bg text-white">{progress} % loaded</div>
    </Html>
  );
}

// function Model({ ...props }) {
//   const group = useRef();
//   // const snap = useSnapshot(state);
//   const Stator_Core = useRef();
//   const Stator_Coil = useRef();
//   const Rotor_Core = useRef();
//   const Rotor_Cage = useRef();
//   const {
//     CoreX,
//     CoreY,
//     CoreZ,
//     Scale_Stator_Core,
//     Core_Visible,
//     CoilX,
//     CoilY,
//     CoilZ,
//     Scale_stator_coil,
//     Coil_Visible,
//     Rotor_CoreX,
//     Rotor_CoreY,
//     Rotor_CoreZ,
//     Scale_Rotor_Core,
//     Rotor_Core_Visible,
//     CageX,
//     CageY,
//     CageZ,
//     Scale_Cage,
//     Cage_Visible,
//   } = useGroupControlsWithReset("Shaded Pole", {
//     Stator_Core: {
//       CoreX: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       CoreY: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       CoreZ: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       Scale_Stator_Core: {
//         value: 0,
//         min: 0,
//         max: 25,
//         step: 0.1,
//       },
//       Core_Visible: true,
//     },
//     Stator_Coil: {
//       CoilX: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       CoilY: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       CoilZ: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       Scale_stator_coil: {
//         value: 0,
//         min: 0,
//         max: 25,
//         step: 0.1,
//       },
//       Coil_Visible: true,
//     },
//     Rotor_Core: {
//       Rotor_CoreX: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       Rotor_CoreY: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       Rotor_CoreZ: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       Scale_Rotor_Core: {
//         value: 0,
//         min: 0,
//         max: 100,
//         step: 0.1,
//       },
//       Rotor_Core_Visible: true,
//     },
//     Cage: {
//       CageX: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       CageY: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       CageZ: {
//         value: 0,
//         min: -25,
//         max: 25,
//         step: 0.1,
//       },
//       Scale_Cage: {
//         value: 0,
//         min: 0,
//         max: 100,
//         step: 0.1,
//       },
//       Cage_Visible: true,
//     },
//   });

//   useEffect(() => {
//     if (Core_Visible == false) {
//       Stator_Core.current.position.y = 80000000;
//     } else {
//       Stator_Core.current.position.y = 0 + CoreY;
//     }
//   });

//   useEffect(() => {
//     if (Coil_Visible == false) {
//       Stator_Coil.current.position.y = 80000000;
//     } else {
//       Stator_Coil.current.position.y = 0 + CoilY;
//     }
//   });
//   useEffect(() => {
//     if (Rotor_Core_Visible == false) {
//       Rotor_Core.current.position.y = 800000000;
//     } else {
//       Rotor_Core.current.position.y = 0 + Rotor_CoreY;
//     }
//   });
//   useEffect(() => {
//     if (Cage_Visible == false) {
//       Rotor_Cage.current.position.y = 800000000;
//     } else {
//       Rotor_Cage.current.position.y = CageY;
//     }
//   });
//   const [hover, set] = useState(null);

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
//         e.stopPropagation(), (state.current = e.object.material.name);
//       }}
//       onPointerMissed={(e) => {
//         //state.current = null;
//       }}
//     >
//       <mesh
//         geometry={nodes["a_-_HoldingBracket1-1"].geometry}
//         material={materials.Holding_Bracket}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_pan_cross_head_am-3"].geometry}
//         material={materials.Screw}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_pan_cross_head_am-4"].geometry}
//         material={materials.Screw}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_RotorCore-1"].geometry}
//         material={materials.Rotor_Core}
//         position={[0 + Rotor_CoreX, 0 + Rotor_CoreY, 0 + Rotor_CoreZ]}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4 + Scale_Rotor_Core}
//         ref={Rotor_Core}
//       />
//       <mesh
//         geometry={nodes["a_-_ShadingCoil1-1"].geometry}
//         material={materials.Shading_Coil}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_Shaft-1"].geometry}
//         material={materials.wire}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_StatorCoil-1"].geometry}
//         material={materials.Stator_Coil}
//         position={[0 + CoilX, 0 + CoilY, 0 + CoilZ]}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4 + Scale_stator_coil}
//         ref={Stator_Coil}
//       />
//       <mesh
//         geometry={nodes["a_-_WireInsulation1-1"].geometry}
//         material={materials.Wire_Insulation}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_WireInsulation2-1"].geometry}
//         material={materials.Wire_Insulation}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_WireInsulation3-1"].geometry}
//         material={materials.Wire_Insulation}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_BrassBushing2-1"].geometry}
//         material={materials.Brush_Bushing}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_BrassBusing1-1"].geometry}
//         material={materials.Brush_Bushing}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_CoilFormer1-1"].geometry}
//         material={materials.CoiFormer}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_CoilFormer2-1"].geometry}
//         material={materials.CoiFormer}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_HoldingBracket2-1"].geometry}
//         material={materials.Holding_Bracket}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_pan_cross_head_am-2"].geometry}
//         material={materials.Screw}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_pan_cross_head_am-5"].geometry}
//         material={materials.Screw}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_RotorCage-1"].geometry}
//         material={materials.Rotor_Cage}
//         position={[0 + CageX, 0 + CageY, 0 + CageZ]}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4 + Scale_Cage}
//         ref={Rotor_Cage}
//       />
//       <mesh
//         geometry={nodes["a_-_ShadingCoil2-1"].geometry}
//         material={materials.Shading_Coil}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4}
//       />
//       <mesh
//         geometry={nodes["a_-_StatorCore-1"].geometry}
//         material={materials.Stator_Core}
//         position={[0 + CoreX, 0 + CoreY, 0 + CoreZ]}
//         rotation={[Math.PI / 2, 0, -0.51]}
//         scale={29.4 + Scale_Stator_Core}
//         ref={Stator_Core}
//       />
//     </group>
//   );
// }
export function Model({ ...props }) {
  const { nodes, materials } = useGLTF(glbFileURL);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_HoldingBracket1-1"].geometry}
        material={materials.Holding_Bracket}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_pan_cross_head_am-3"].geometry}
        material={materials.Screw}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_pan_cross_head_am-4"].geometry}
        material={materials.Screw}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_RotorCore-1"].geometry}
        material={materials["Rotor Core"]}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_ShadingCoil1-1"].geometry}
        material={materials.Brush_Bushing}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_Shaft-1"].geometry}
        material={materials.Shaft}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_StatorCoil-1"].geometry}
        material={materials["Material.001"]}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_WireInsulation1-1"].geometry}
        material={materials["Wire Insulation"]}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_WireInsulation2-1"].geometry}
        material={materials["Wire Insulation"]}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_WireInsulation3-1"].geometry}
        material={materials["Material.002"]}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_BrassBushing2-1"].geometry}
        material={materials.Brush_Bushing}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_BrassBusing1-1"].geometry}
        material={materials.Brush_Bushing}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_CoilFormer1-1"].geometry}
        material={materials.CoiFormer}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_CoilFormer2-1"].geometry}
        material={materials.CoiFormer}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_HoldingBracket2-1"].geometry}
        material={materials.Holding_Bracket}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_pan_cross_head_am-2"].geometry}
        material={materials.Screw}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_pan_cross_head_am-5"].geometry}
        material={materials.Screw}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_RotorCage-1"].geometry}
        material={materials.Rotor_Cage}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_ShadingCoil2-1"].geometry}
        material={materials.Brush_Bushing}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_StatorCore-1"].geometry}
        material={materials.Stator_Core}
        rotation={[Math.PI / 2, 0, -0.505]}
        scale={29.401}
      />
    </group>
  );
}
useGLTF.preload(glbFileURL);

function Pick() {
  //const snap = useSnapshot(state);
  return (
    <div className="w-screen h-16 bg-black-bg text-yellow-400 lg:text-4xl">
      {snap.current}
    </div>
  );
}

export default function Shadedpole() {
  const { PositionX, PositionY, PositionZ } = useControlsWithReset(
    "Shaded_Pole_Motor",
    {
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
      PositionZ: {
        value: 0,
        min: -25,
        max: 25,
        step: 0.1,
      },
    }
  );

  const directionalLight = [
    { intensity: 0.5, position: null },
    { intensity: 0.4, position: [0, 5, -25] },
    { intensity: 0.4, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
  ];
  const camera = { position: [-6, 5, -10], fov: 69 };

  return (
    <ModelJSXGenerator
      // state={state}
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#050525"
    >
      <Model position={[0 + PositionX, 0 + PositionY, 0 + PositionZ]} />
    </ModelJSXGenerator>
  );
}

// export default function Shadedpole() {
//   const { PositionX, PositionY, PositionZ } = useControls("Shaded_Pole_Motor", {
//     PositionX: {
//       value: 0,
//       min: -25,
//       max: 25,
//       step: 0.1,
//     },
//     PositionY: {
//       value: 0,
//       min: -25,
//       max: 25,
//       step: 0.1,
//     },
//     PositionZ: {
//       value: 0,
//       min: -25,
//       max: 25,
//       step: 0.1,
//     },
//   });
//   return (
//     <>
//       <div className="w-screen h-screen">
//         <Pick />
//         <Canvas camera={{ position: [-6, 5, -10], fov: 69 }}>
//           <color attach="background" args={["#050525"]} />
//           <directionalLight intensity={0.5} />
//           <directionalLight intensity={0.4} position={[0, 5, -25]} />
//           <directionalLight intensity={0.4} position={[0, 5, 25]} />
//           <directionalLight intensity={1} position={[0, -5, 0]} />
//           <OrbitControls />
//           {/* <Suspense fallback={<Box />}> */}
//           <Suspense fallback={<Loader />}>
//             <Model position={[0 + PositionX, 0 + PositionY, 0 + PositionZ]} />
//           </Suspense>
//         </Canvas>
//       </div>
//     </>
//   );
// }
