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
import { Select } from "@react-three/postprocessing";
import { reducer } from "@/reducers/model_highlight";
import {
  useControlsWithReset,
  useGroupControlsWithReset,
} from "@/hooks/useControlsCustom";

// const state = proxy({
//   current: null,
// });

const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/Sychronous.glb`;

function Model({ ...props }) {
  const group = useRef();
  //const snap = useSnapshot(state);
  const yoke = useRef();
  const backcover = useRef();
  const frontcover = useRef();
  const t_cap = useRef();
  const s_core = useRef();
  const cage = useRef();
  const r_core = useRef();
  const r_coil = useRef();
  const star = useRef();
  const delta = useRef();
  const [hover, set] = useState(null);
  const { nodes, materials } = useGLTF(glbFileURL);

  const {
    Back_Cover,
    Back_Cover_Visibility,
    Front_Cover,
    Front_Cover_Visibility,
    TerminalCap,
    TerminalCap_Visibility,
    Yoke,
    Yoke_Visibility,
    Stator,
    Stator_Visibility,
    Cage,
    Cage_Visibility,
    Rotor_core,
    Rotor_core_Visibility,
    RotorCoil,
    RotorCoil_Visibility,
    Star,
    Delta,
  } = useGroupControlsWithReset("Synchronous Motor", {
    Back_Cover: {
      Back_Cover: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Back_Cover_Visibility: true,
    },

    Front_Cover: {
      Front_Cover: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Front_Cover_Visibility: true,
    },
    TerminalCap: {
      TerminalCap: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      TerminalCap_Visibility: true,
    },
    Yoke: {
      Yoke: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Yoke_Visibility: true,
    },
    Stator: {
      Stator: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Stator_Visibility: true,
    },
    Rotor: {
      Cage: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      Cage_Visibility: true,
    },
    Rotor: {
      Rotor_core: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Rotor_core_Visibility: true,
    },
    Rotor: {
      RotorCoil: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      RotorCoil_Visibility: true,
    },
    Connection: {
      Star: false,
      Delta: false,
    },
  });

  useEffect(() => {
    if (Rotor_core_Visibility == false) {
      r_core.current.position.x = 5000000000;
    } else {
      r_core.current.position.x = 30.5 - Rotor_core;
    }
  });
  useEffect(() => {
    if (RotorCoil_Visibility == false) {
      r_coil.current.position.x = 5000000000;
    } else {
      r_coil.current.position.x = 30.5 + RotorCoil;
    }
  });
  useEffect(() => {
    if (Yoke_Visibility == false) {
      yoke.current.position.x = 5000000000000000;
    } else {
      yoke.current.position.x = 25.14 + Yoke;
    }
  });
  useEffect(() => {
    if (Cage_Visibility == false) {
      cage.current.position.x = 5000000000000000;
    } else {
      cage.current.position.x = 25.14 - Cage;
    }
  });
  useEffect(() => {
    if (Stator_Visibility == false) {
      s_core.current.position.x = 5000000000000000;
    } else {
      s_core.current.position.x = 25.14 - Stator;
    }
  });
  useEffect(() => {
    if (Back_Cover_Visibility == false) {
      backcover.current.position.Z = 5000000000000000;
    } else {
      backcover.current.position.z = -17.62 - Back_Cover;
    }
  });
  useEffect(() => {
    if (Front_Cover_Visibility == false) {
      frontcover.current.position.z = 5000000000000000;
    } else {
      frontcover.current.position.z = -22.55 + Front_Cover;
    }
  });
  useEffect(() => {
    if (TerminalCap_Visibility == false) {
      t_cap.current.position.y = 5000000000000000;
    } else {
      t_cap.current.position.y = 6.04 + TerminalCap;
    }
  });
  useEffect(() => {
    if (Star == false && Delta == false) {
      star.current.position.y = 8000000;
      delta.current.position.y = 8000000;
    } else {
      star.current.position.y = 17.9;

      delta.current.position.y = 17.94;
    }
    if (Star == true) {
      delta.current.visible = false;
      star.current.visible = true;
      delta.current.position.y = 8000000;
    }
    if (Delta == true) {
      star.current.visible = false;
      delta.current.visible = true;
      star.current.position.y = 80000000;
    }
  });
  const { highlightedParts } = props;
  // return (
  //   <group
  //     ref={group}
  //     {...props}
  //     dispose={null}
  //     onPointerOver={(e) => {
  //       //e.stopPropagation(), set(e.object.material.name);
  //     }}
  //     onPointerOut={(e) => {
  //       e.intersections.length === 0 && set(null);
  //     }}
  //     onClick={(e) => {
  //       e.stopPropagation();
  //       // state.current = e.object.material.name;
  //       // props.dispatch({ id: state.current });
  //       // console.log(state.current);
  //     }}
  //     onPointerMissed={(e) => {
  //       // state.current = null;
  //     }}
  //   >
  //     <Select enabled={highlightedParts[0].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Coil2-1"].geometry}
  //         material={materials.Coil2}
  //         position={[25, 5.76, -22.65]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[1].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_RotorFieldcoil-1"].geometry}
  //         material={materials.Rotor_FieldCoil}
  //         position={[30.5 + RotorCoil, 12.03, -9.02]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //         ref={r_coil}
  //         visible={RotorCoil_Visibility}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[2].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Spring1-1"].geometry}
  //         material={materials.Spring}
  //         position={[31.22, 14.13, -2]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[3].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_BrushHolderArm2-1"].geometry}
  //         material={materials.BrushHolder_Arm}
  //         position={[31.17, 14.01, -2]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[3].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_BrushHolderArm3-1"].geometry}
  //         material={materials.BrushHolder_Arm}
  //         position={[29.84, 14.01, -1.18]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[4].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Coil1-1"].geometry}
  //         material={materials.Coil3}
  //         position={[25, 5.76, -22.58]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <group
  //       position={[30.6, 12.08, -17.62 - Back_Cover]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.16}
  //       ref={backcover}
  //       visible={Back_Cover_Visibility}
  //     >
  //       <Select enabled={highlightedParts[5].highlight}>
  //         <mesh
  //           castShadow
  //           receiveShadow
  //           geometry={nodes["a_-_EndCap2-1_1"].geometry}
  //           material={materials["EndCap.001"]}
  //         />
  //       </Select>

  //       <Select enabled={highlightedParts[6].highlight}>
  //         <mesh
  //           castShadow
  //           receiveShadow
  //           geometry={nodes["a_-_EndCap2-1_2"].geometry}
  //           material={materials.Bolt}
  //         />
  //       </Select>
  //     </group>

  //     <Select enabled={highlightedParts[7].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern42-1"].geometry}
  //         material={nodes["a_-_LPattern42-1"].material}
  //         position={[29.96, 17.05, -1.94]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[8].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern43-1"].geometry}
  //         material={nodes["a_-_LPattern43-1"].material}
  //         position={[28.94, 17.05, -1.94]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[9].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Wire2-1"].geometry}
  //         material={materials.SlipRingWire}
  //         position={[30.29, 15.34, -1.19]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[6].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Boss-Extrude282-1"].geometry}
  //         material={materials.Bolt}
  //         position={[30.14, 14.19, -2.28]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[10].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern32-1"].geometry}
  //         material={materials.Nut}
  //         position={[30.98, 17.12, -3.31]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[10].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern36-1"].geometry}
  //         material={materials.Nut}
  //         position={[30.98, 17.12, -2.06]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[10].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern37-1"].geometry}
  //         material={materials.Nut}
  //         position={[31.99, 17.12, -2.06]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[11].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Rotor-1"].geometry}
  //         material={materials.Rotor}
  //         position={[30.5 - Rotor_core, 12.04, -9.5]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //         ref={r_core}
  //         visible={Rotor_core_Visibility}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[12].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_SlipRingHolder-1"].geometry}
  //         material={materials.Slip_RingHolder}
  //         position={[30.57, 12.22, -1.74]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[13].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_TerminalBoxCap-1"].geometry}
  //         material={materials.Terminalcap}
  //         position={[25.14, 6.04 + TerminalCap, -22.5]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //         ref={t_cap}
  //         visible={TerminalCap_Visibility}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[14].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_TerminalHolder-1"].geometry}
  //         material={materials.Terminal_Holder}
  //         position={[30.46, 17.55, -2.7]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[15].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Boss-Extrude22-1"].geometry}
  //         material={materials.brush_holder}
  //         position={[31.75, 13.53, -1.18]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[6].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Boss-Extrude281-1"].geometry}
  //         material={materials.Bolt}
  //         position={[30.88, 14.19, -2.28]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[10].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Boss-Extrude39-1"].geometry}
  //         material={materials.Nut}
  //         position={[28.94, 17.12, -3.31]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[3].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_BrushHolderArm1-1"].geometry}
  //         material={materials.BrushHolder_Arm}
  //         position={[29.84, 14.01, -2]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[3].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_BrushHolderArm4-1"].geometry}
  //         material={materials.BrushHolder_Arm}
  //         position={[31.17, 14.01, -1.18]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[16].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_BrushHolderBody-1"].geometry}
  //         material={materials.Brush_Holder}
  //         position={[25, 5.89, -22.19]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[17].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Cage-1"].geometry}
  //         material={materials.Cage}
  //         position={[25.14 - Cage, 6.04, -22.35]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //         ref={cage}
  //         visible={Cage_Visibility}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[18].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_CarbonBrush1-1"].geometry}
  //         material={materials.Brush}
  //         position={[31.82, 13.68, -1.18]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[19].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_CarbonBrush2-1"].geometry}
  //         material={nodes["a_-_CarbonBrush2-1"].material}
  //         position={[31.82, 13.68, -2]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[18].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_CarbonBrush3-1"].geometry}
  //         material={materials.Brush}
  //         position={[29.19, 13.68, -1.18]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[18].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_CarbonBrush4-1"].geometry}
  //         material={materials.Brush}
  //         position={[29.19, 13.68, -2]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[20].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Coil3-1"].geometry}
  //         material={materials.Coil1}
  //         position={[24.98, 5.76, -22.62]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[21].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Cut-Extrude18-1"].geometry}
  //         material={nodes["a_-_Cut-Extrude18-1"].material}
  //         position={[31.99, 17.05, -1.94]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[6].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Cut-Extrude21-1"].geometry}
  //         material={materials.Bolt}
  //         position={[30.51, 13.5, 0.96]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[22].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_DriveShaft-1"].geometry}
  //         material={materials.Shaft}
  //         position={[30.51, 12.04, -10.38]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <group
  //       position={[25.14, 6.04, -22.55 + Front_Cover]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.16}
  //       ref={frontcover}
  //       visible={Front_Cover_Visibility}
  //     >
  //       <Select enabled={highlightedParts[23].highlight}>
  //         <mesh
  //           castShadow
  //           receiveShadow
  //           geometry={nodes["a_-_EndCap1-1_1"].geometry}
  //           material={materials.EndCap}
  //         />
  //       </Select>

  //       <Select enabled={highlightedParts[6].highlight}>
  //         <mesh
  //           castShadow
  //           receiveShadow
  //           geometry={nodes["a_-_EndCap1-1_2"].geometry}
  //           material={materials.Bolt}
  //         />
  //       </Select>
  //     </group>

  //     <Select enabled={highlightedParts[10].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern31-1"].geometry}
  //         material={materials.Nut}
  //         position={[29.96, 17.12, -3.31]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[10].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern33-1"].geometry}
  //         material={materials.Nut}
  //         position={[31.99, 17.12, -3.31]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[10].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern34-1"].geometry}
  //         material={materials.Nut}
  //         position={[28.94, 17.12, -2.06]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[10].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern35-1"].geometry}
  //         material={materials.Nut}
  //         position={[29.96, 17.12, -2.06]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[24].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_LPattern41-1"].geometry}
  //         material={nodes["a_-_LPattern41-1"].material}
  //         position={[30.98, 17.05, -1.94]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[18].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Mirror72-1"].geometry}
  //         material={materials.Brush}
  //         position={[31.75, 13.53, -2]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[15].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Mirror82-1"].geometry}
  //         material={materials.brush_holder}
  //         position={[29.26, 13.53, -1.18]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[15].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Mirror85-1"].geometry}
  //         material={materials.brush_holder}
  //         position={[29.26, 13.53, -2]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[25].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Mirror151-1"].geometry}
  //         material={nodes["a_-_Mirror151-1"].material}
  //         position={[30.98, 17.05, -3.43]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[26].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Mirror152-1"].geometry}
  //         material={nodes["a_-_Mirror152-1"].material}
  //         position={[31.99, 17.05, -3.43]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[27].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Mirror153-1"].geometry}
  //         material={nodes["a_-_Mirror153-1"].material}
  //         position={[29.96, 17.05, -3.43]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[28].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Mirror154-1"].geometry}
  //         material={nodes["a_-_Mirror154-1"].material}
  //         position={[28.94, 17.05, -3.43]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[29].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_SlipRing1-1"].geometry}
  //         material={materials.Slip_Ring}
  //         position={[30.86, 12.39, -1.65]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[29].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_SlipRing2-1"].geometry}
  //         material={materials.Slip_Ring}
  //         position={[30.51, 12.64, -2.21]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[2].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Spring2-1"].geometry}
  //         material={materials.Spring}
  //         position={[29.79, 14.13, -1.18]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[2].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Spring3-1"].geometry}
  //         material={materials.Spring}
  //         position={[31.22, 14.13, -1.18]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[2].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Spring4-1"].geometry}
  //         material={materials.Spring}
  //         position={[29.79, 14.13, -2]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[30].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_StatorCore-1"].geometry}
  //         material={materials.Stator_Core}
  //         position={[25.14 - Stator, 6.04, -22.19]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //         ref={s_core}
  //         visible={Stator_Visibility}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[31].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Terminal1-1"].geometry}
  //         material={materials.Terminal}
  //         position={[31.99, 17.64, -2.06]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[31].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Terminal2-1"].geometry}
  //         material={materials.Terminal}
  //         position={[30.98, 17.64, -2.06]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[31].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Terminal3-1"].geometry}
  //         material={materials.Terminal}
  //         position={[29.96, 17.64, -2.06]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[31].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Terminal4-1"].geometry}
  //         material={materials.Terminal}
  //         position={[28.94, 17.64, -2.06]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[31].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Terminal5-1"].geometry}
  //         material={materials.Terminal}
  //         position={[31.99, 17.64, -3.31]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[31].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Terminal6-1"].geometry}
  //         material={materials.Terminal}
  //         position={[30.98, 17.64, -3.31]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[31].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Terminal7-1"].geometry}
  //         material={materials.Terminal}
  //         position={[29.96, 17.64, -3.31]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[31].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Terminal8-1"].geometry}
  //         material={materials.Terminal}
  //         position={[28.94, 17.64, -3.31]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[9].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Wire1-1"].geometry}
  //         material={materials.SlipRingWire}
  //         position={[29.88, 15.6, -2.44]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[32].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes["a_-_Yoke-1"].geometry}
  //         material={materials.Yoke}
  //         position={[25.14 + Yoke, 6.04, -22.55]}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.16}
  //         ref={yoke}
  //         visible={Yoke_Visibility}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[33].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Text.geometry}
  //         material={materials.POSITIVE_TERMINAL}
  //         position={[28.64, 17.64, -3.28]}
  //         scale={0.38}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[34].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Text001.geometry}
  //         material={materials.NEGETIVE_TERMINAL}
  //         position={[28.68, 17.64, -2.06]}
  //         rotation={[0, Math.PI / 2, 0]}
  //         scale={0.67}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[35].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Text002.geometry}
  //         material={materials.W2}
  //         position={[29.81, 17.64, -1.57]}
  //         scale={0.2}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[36].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Text003.geometry}
  //         material={materials.U2}
  //         position={[30.82, 17.64, -1.57]}
  //         scale={0.25}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[37].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Text004.geometry}
  //         material={materials.V2}
  //         position={[31.86, 17.64, -1.58]}
  //         scale={0.27}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[38].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Text005.geometry}
  //         material={materials.U1}
  //         position={[29.8, 17.64, -3.61]}
  //         scale={0.25}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[39].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Text006.geometry}
  //         material={materials.V1}
  //         position={[30.82, 17.64, -3.68]}
  //         scale={0.28}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[40].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Text007.geometry}
  //         material={materials.W1}
  //         position={[31.99, 17.64, -3.72]}
  //         scale={0.24}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[41].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Cube.geometry}
  //         material={materials["STAR CONNECTION"]}
  //         position={[31.34, 17.9, -3.31]}
  //         scale={[1.68, -0.03, 0.21]}
  //         ref={star}
  //         visible={Star}
  //       />
  //     </Select>

  //     <Select enabled={highlightedParts[42].highlight}>
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.Cube003.geometry}
  //         material={materials["Delta Connection"]}
  //         position={[29.94, 17.94, -2.68]}
  //         scale={[0.17, 0.04, 0.82]}
  //         ref={delta}
  //         visible={Delta}
  //       />
  //     </Select>
  //   </group>
  // );
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(e) => {
        //e.stopPropagation(), set(e.object.material.name);
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
        // state.current = null;
      }}
    >
      <mesh
        geometry={nodes["a_-_Coil2-1"].geometry}
        material={materials.Coil2}
        position={[30.523, 27.513, -83.179]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Spring1-1"].geometry}
        material={materials.Spring}
        position={[31.219, 14.134, -75.305]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_BrushHolderArm2-1"].geometry}
        material={materials["Material.002"]}
        position={[31.168, 14.007, -75.304]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_BrushHolderArm3-1"].geometry}
        material={materials["Material.002"]}
        position={[29.844, 14.007, -74.483]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Coil1-1"].geometry}
        material={materials.Coil3}
        position={[30.486, 28.324, -82.712]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <group
        position={[30.505, 12.039, -90.639 + Front_Cover]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
        ref={frontcover}
        visible={Front_Cover_Visibility}
      >
        <mesh
          geometry={nodes["a_-_EndCap2-1_1"].geometry}
          material={materials.EndCap}
        />
        <mesh
          geometry={nodes["a_-_EndCap2-1_2"].geometry}
          material={materials.Bolt}
        />
      </group>
      <mesh
        geometry={nodes["a_-_LPattern42-1"].geometry}
        material={nodes["a_-_LPattern42-1"].material}
        position={[29.959, 17.055, -75.24]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_LPattern43-1"].geometry}
        material={nodes["a_-_LPattern43-1"].material}
        position={[28.944, 17.055, -75.24]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Wire2-1"].geometry}
        material={materials.SlipRingWire}
        position={[30.246, 15.377, -74.491]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Boss-Extrude282-1"].geometry}
        material={materials.Bolt}
        position={[30.135, 14.187, -75.586]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_LPattern32-1"].geometry}
        material={materials.Nut}
        position={[30.975, 17.117, -76.614]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_LPattern36-1"].geometry}
        material={materials.Nut}
        position={[30.975, 17.117, -75.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_LPattern37-1"].geometry}
        material={materials.Nut}
        position={[31.991, 17.117, -75.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_TerminalBoxCap-1"].geometry}
        material={materials.Terminalcap}
        position={[30.51, 32.188 + TerminalCap, -75.933]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
        ref={t_cap}
        visible={TerminalCap_Visibility}
      />
      <mesh
        geometry={nodes["a_-_TerminalHolder-1"].geometry}
        material={materials.Terminal_Holder}
        position={[30.464, 17.551, -75.999]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Boss-Extrude22-1"].geometry}
        material={materials.brush_holder}
        position={[31.749, 13.527, -74.484]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Boss-Extrude281-1"].geometry}
        material={materials.Bolt}
        position={[30.877, 14.187, -75.586]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Boss-Extrude39-1"].geometry}
        material={materials.Nut}
        position={[28.943, 17.117, -76.614]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_BrushHolderArm1-1"].geometry}
        material={materials["Material.002"]}
        position={[29.844, 14.007, -75.304]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_BrushHolderArm4-1"].geometry}
        material={materials["Material.002"]}
        position={[31.168, 14.007, -74.483]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_BrushHolderBody-1"].geometry}
        material={materials.Brush_Holder}
        position={[30.506, 13.893, -74.103]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_CarbonBrush1-1"].geometry}
        material={materials.Brush}
        position={[31.82, 13.684, -74.484]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_CarbonBrush2-1"].geometry}
        material={nodes["a_-_CarbonBrush2-1"].material}
        position={[31.82, 13.684, -75.305]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_CarbonBrush3-1"].geometry}
        material={materials.Brush}
        position={[29.193, 13.684, -74.484]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_CarbonBrush4-1"].geometry}
        material={materials.Brush}
        position={[29.193, 13.684, -75.305]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Coil3-1"].geometry}
        material={materials.Coil1}
        position={[30.526, 30.026, -82.863]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Cut-Extrude18-1"].geometry}
        material={nodes["a_-_Cut-Extrude18-1"].material}
        position={[31.991, 17.055, -75.24]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Cut-Extrude21-1"].geometry}
        material={materials.Bolt}
        position={[30.507, 13.496, -72.341]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_DriveShaft-1"].geometry}
        material={materials.Shaft}
        position={[30.513, 12.038, -83.681]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      >
        <mesh
          geometry={nodes["a_-_Cage-1"].geometry}
          material={materials.Cage}
          position={[-0.119 - Cage, 255.219, 0.01]}
          ref={cage}
          visible={Cage_Visibility}
        />
        <mesh
          geometry={nodes["a_-_Rotor-1"].geometry}
          material={materials.Rotor}
          position={[30.5 - Rotor_core, 12.04, -9.5]} //added
          ref={r_core}
          visible={Rotor_core_Visibility}
        />
        <mesh
          geometry={nodes["a_-_RotorFieldcoil-1"].geometry}
          material={materials.Rotor_FieldCoil}
          position={[30.5 + RotorCoil, 12.03, -9.02]}
          ref={r_coil}
          visible={RotorCoil_Visibility}
        />
        <mesh
          geometry={nodes["a_-_SlipRing1-1"].geometry}
          material={materials.Slip_Ring}
        />
        <mesh
          geometry={nodes["a_-_SlipRing2-1"].geometry}
          material={materials.Slip_Ring}
        />
        <mesh
          geometry={nodes["a_-_SlipRingHolder-1"].geometry}
          material={materials.Slip_RingHolder}
        />
      </mesh>
      <group
        position={[30.507, 12.137, -3.767 - Back_Cover]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
        ref={backcover}
        visible={Back_Cover_Visibility}
      >
        <mesh
          geometry={nodes["a_-_EndCap1-1_1"].geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes["a_-_EndCap1-1_2"].geometry}
          material={materials.Bolt}
        />
      </group>
      <mesh
        geometry={nodes["a_-_LPattern31-1"].geometry}
        material={materials.Nut}
        position={[29.959, 17.117, -76.614]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_LPattern33-1"].geometry}
        material={materials.Nut}
        position={[31.991, 17.117, -76.614]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_LPattern34-1"].geometry}
        material={materials.Nut}
        position={[28.943, 17.117, -75.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_LPattern35-1"].geometry}
        material={materials.Nut}
        position={[29.959, 17.117, -75.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_LPattern41-1"].geometry}
        material={nodes["a_-_LPattern41-1"].material}
        position={[30.975, 17.055, -75.24]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Mirror72-1"].geometry}
        material={materials.Brush}
        position={[31.749, 13.527, -75.305]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Mirror82-1"].geometry}
        material={materials.brush_holder}
        position={[29.264, 13.527, -74.484]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Mirror85-1"].geometry}
        material={materials.brush_holder}
        position={[29.264, 13.527, -75.305]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Mirror151-1"].geometry}
        material={nodes["a_-_Mirror151-1"].material}
        position={[30.975, 17.055, -76.737]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Mirror152-1"].geometry}
        material={nodes["a_-_Mirror152-1"].material}
        position={[31.991, 17.055, -76.737]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Mirror153-1"].geometry}
        material={nodes["a_-_Mirror153-1"].material}
        position={[29.959, 17.055, -76.737]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Mirror154-1"].geometry}
        material={nodes["a_-_Mirror154-1"].material}
        position={[28.944, 17.055, -76.737]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Spring2-1"].geometry}
        material={materials.Spring}
        position={[29.794, 14.134, -74.484]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Spring3-1"].geometry}
        material={materials.Spring}
        position={[31.219, 14.133, -74.484]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Spring4-1"].geometry}
        material={materials.Spring}
        position={[29.794, 14.134, -75.305]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_StatorCore-1"].geometry}
        material={materials.Stator_Core}
        position={[30.502 - Stator, 12.035, -63.927]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
        ref={s_core}
        visible={Stator_Visibility}
      />
      <mesh
        geometry={nodes["a_-_Terminal1-1"].geometry}
        material={materials.Terminal}
        position={[31.991, 17.636, -75.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Terminal2-1"].geometry}
        material={materials.Terminal}
        position={[30.975, 17.636, -75.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Terminal3-1"].geometry}
        material={materials.Terminal}
        position={[29.959, 17.636, -75.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Terminal4-1"].geometry}
        material={materials.Terminal}
        position={[28.943, 17.636, -75.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Terminal5-1"].geometry}
        material={materials.Terminal}
        position={[31.991, 17.636, -76.613]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Terminal6-1"].geometry}
        material={materials.Terminal}
        position={[30.975, 17.636, -76.613]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Terminal7-1"].geometry}
        material={materials.Terminal}
        position={[29.959, 17.636, -76.613]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Terminal8-1"].geometry}
        material={materials.Terminal}
        position={[28.943, 17.636, -76.613]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Wire1-1"].geometry}
        material={materials.SlipRingWire}
        position={[29.876, 15.642, -75.748]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
      />
      <mesh
        geometry={nodes["a_-_Yoke-1"].geometry}
        material={materials.Yoke}
        position={[5.266 + Yoke, 12.983, -79.746]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.156}
        ref={yoke}
        visible={Yoke_Visibility}
      />
      <mesh
        geometry={nodes.Text.geometry}
        material={materials.POSITIVE_TERMINAL}
        position={[28.636, 17.634, -76.58]}
        scale={0.384}
      />
      <mesh
        geometry={nodes.Text001.geometry}
        material={materials.NEGETIVE_TERMINAL}
        position={[28.681, 17.636, -75.361]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.672}
      />
      <mesh
        geometry={nodes.Text002.geometry}
        material={materials.W2}
        position={[30.046, 17.636, -74.961]}
        scale={0.199}
      />
      <mesh
        geometry={nodes.Text003.geometry}
        material={materials.U2}
        position={[30.982, 17.632, -74.947]}
        scale={0.245}
      />
      <mesh
        geometry={nodes.Text004.geometry}
        material={materials.V2}
        position={[32.08, 17.636, -75.007]}
        scale={0.27}
      />
      <mesh
        geometry={nodes.Text005.geometry}
        material={materials.U1}
        position={[29.895, 17.636, -76.961]}
        scale={0.252}
      />
      <mesh
        geometry={nodes.Text006.geometry}
        material={materials.V1}
        position={[30.957, 17.636, -77.096]}
        scale={0.278}
      />
      <mesh
        geometry={nodes.Text007.geometry}
        material={materials.W1}
        position={[32.157, 17.636, -77.108]}
        scale={0.236}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials["STAR CONNECTION"]}
        position={[30.943, 17.902, -76.613]}
        scale={[1.676, -0.032, 0.206]}
        ref={star}
        visible={Star}
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={materials["Delta Connection"]}
        position={[30.964, 25.813, -75.984]}
        scale={[0.173, 0.038, 0.824]}
        ref={delta}
        visible={Delta}
      />
      <mesh
        geometry={nodes.Plane.geometry}
        material={materials.Material}
        position={[342.979, 1.506, -30.046]}
        rotation={[1.594, -0.029, 0.205]}
        scale={53.919}
      />
      <mesh
        geometry={nodes.Plane001.geometry}
        material={materials["Material.003"]}
        position={[-9.851, -97.355, -92.553]}
        rotation={[1.544, -0.026, -1.289]}
        scale={53.919}
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
  const camera = { position: [5, 20, 35], fov: 69 };
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 1, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
    { intensity: 1, position: [-5, 18.25, -54.37] },
  ];
  const highlightedParts = [
    //0
    { id: "Coil2", name: "Coil2", description: "Coil2" },

    //1
    {
      id: "Rotor_FieldCoil",
      name: "Rotor_FieldCoil",
      description: "Rotor_FieldCoil",
    },

    //2
    { id: "Spring", name: "Spring", description: "Spring" },

    //3
    {
      id: "BrushHolder_Arm",
      name: "BrushHolder_Arm",
      description: "BrushHolder_Arm",
    },

    //4
    {
      id: "BrushHolder_Arm",
      name: "BrushHolder_Arm",
      description: "BrushHolder_Arm",
    },

    //5
    { id: "Coil3", name: "Coil3", description: "Coil3" },

    //6
    { id: "INVALID6", name: "INVALID6", description: "INVALID6" },

    //7
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //8
    { id: "INVALID8", name: "INVALID8", description: "INVALID8" },

    //9
    { id: "INVALID9", name: "INVALID9", description: "INVALID9" },

    //10
    { id: "SlipRingWire", name: "SlipRingWire", description: "SlipRingWire" },

    //11
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //12
    { id: "Nut", name: "Nut", description: "Nut" },

    //13
    { id: "Nut", name: "Nut", description: "Nut" },

    //14
    { id: "Nut", name: "Nut", description: "Nut" },

    //15
    { id: "Rotor", name: "Rotor", description: "Rotor" },

    //16
    {
      id: "Slip_RingHolder",
      name: "Slip_RingHolder",
      description: "Slip_RingHolder",
    },

    //17
    { id: "Terminalcap", name: "Terminalcap", description: "Terminalcap" },

    //18
    {
      id: "Terminal_Holder",
      name: "Terminal_Holder",
      description: "Terminal_Holder",
    },

    //19
    { id: "brush_holder", name: "brush_holder", description: "brush_holder" },

    //20
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //21
    { id: "Nut", name: "Nut", description: "Nut" },

    //22
    {
      id: "BrushHolder_Arm",
      name: "BrushHolder_Arm",
      description: "BrushHolder_Arm",
    },

    //23
    {
      id: "BrushHolder_Arm",
      name: "BrushHolder_Arm",
      description: "BrushHolder_Arm",
    },

    //24
    { id: "Brush_Holder", name: "Brush_Holder", description: "Brush_Holder" },

    //25
    { id: "Cage", name: "Cage", description: "Cage" },

    //26
    { id: "Brush", name: "Brush", description: "Brush" },

    //27
    { id: "INVALID27", name: "INVALID27", description: "INVALID27" },

    //28
    { id: "Brush", name: "Brush", description: "Brush" },

    //29
    { id: "Brush", name: "Brush", description: "Brush" },

    //30
    { id: "Coil1", name: "Coil1", description: "Coil1" },

    //31
    { id: "INVALID31", name: "INVALID31", description: "INVALID31" },

    //32
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //33
    { id: "Shaft", name: "Shaft", description: "Shaft" },

    //34
    { id: "EndCap", name: "EndCap", description: "EndCap" },

    //35
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //36
    { id: "Nut", name: "Nut", description: "Nut" },

    //37
    { id: "Nut", name: "Nut", description: "Nut" },

    //38
    { id: "Nut", name: "Nut", description: "Nut" },

    //39
    { id: "Nut", name: "Nut", description: "Nut" },

    //40
    { id: "INVALID40", name: "INVALID40", description: "INVALID40" },

    //41
    { id: "Brush", name: "Brush", description: "Brush" },

    //42
    { id: "brush_holder", name: "brush_holder", description: "brush_holder" },

    //43
    { id: "brush_holder", name: "brush_holder", description: "brush_holder" },

    //44
    { id: "INVALID44", name: "INVALID44", description: "INVALID44" },

    //45
    { id: "INVALID45", name: "INVALID45", description: "INVALID45" },

    //46
    { id: "INVALID46", name: "INVALID46", description: "INVALID46" },

    //47
    { id: "INVALID47", name: "INVALID47", description: "INVALID47" },

    //48
    { id: "Slip_Ring", name: "Slip_Ring", description: "Slip_Ring" },

    //49
    { id: "Slip_Ring", name: "Slip_Ring", description: "Slip_Ring" },

    //50
    { id: "Spring", name: "Spring", description: "Spring" },

    //51
    { id: "Spring", name: "Spring", description: "Spring" },

    //52
    { id: "Spring", name: "Spring", description: "Spring" },

    //53
    { id: "Stator_Core", name: "Stator_Core", description: "Stator_Core" },

    //54
    { id: "Terminal", name: "Terminal", description: "Terminal" },

    //55
    { id: "Terminal", name: "Terminal", description: "Terminal" },

    //56
    { id: "Terminal", name: "Terminal", description: "Terminal" },

    //57
    { id: "Terminal", name: "Terminal", description: "Terminal" },

    //58
    { id: "Terminal", name: "Terminal", description: "Terminal" },

    //59
    { id: "Terminal", name: "Terminal", description: "Terminal" },

    //60
    { id: "Terminal", name: "Terminal", description: "Terminal" },

    //61
    { id: "Terminal", name: "Terminal", description: "Terminal" },

    //62
    { id: "SlipRingWire", name: "SlipRingWire", description: "SlipRingWire" },

    //63
    { id: "Yoke", name: "Yoke", description: "Yoke" },

    //64
    {
      id: "POSITIVE_TERMINAL",
      name: "POSITIVE_TERMINAL",
      description: "POSITIVE_TERMINAL",
    },

    //65
    {
      id: "NEGETIVE_TERMINAL",
      name: "NEGETIVE_TERMINAL",
      description: "NEGETIVE_TERMINAL",
    },

    //66
    { id: "W2", name: "W2", description: "W2" },

    //67
    { id: "U2", name: "U2", description: "U2" },

    //68
    { id: "V2", name: "V2", description: "V2" },

    //69
    { id: "U1", name: "U1", description: "U1" },

    //70
    { id: "V1", name: "V1", description: "V1" },

    //71
    { id: "W1", name: "W1", description: "W1" },

    //72
    { id: "INVALID72", name: "INVALID72", description: "INVALID72" },

    //73
    { id: "INVALID73", name: "INVALID73", description: "INVALID73" },
  ];
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);
  // return (
  //   <ModelJSXGenerator
  //     //state={state}
  //     camera={camera}
  //     directionalLight={directionalLight}
  //     bgcolor="#050511"
  //   >
  //     <Model
  //       dispatch={dispatch}
  //       highlightedParts={highlightState}
  //       position={[0 + X, 0 + Y, 0 + Z]}
  //     />
  //   </ModelJSXGenerator>
  // );
  return (
    <>
      <div className="w-screen h-screen">
        {/* <Pick state={state} /> */}
        <Canvas camera={{ position: [5, 20, 35], fov: 69 }}>
          <color attach="background" args={["#050511"]} />
          <directionalLight intensity={1} />
          <directionalLight intensity={1} position={[0, 5, -25]} />
          <directionalLight intensity={0.4} position={[0, 5, 25]} />
          <directionalLight intensity={1} position={[0, -5, 0]} />
          <directionalLight intensity={1} position={[-5, 18.25, -54.37]} />
          <OrbitControls enableDamping={false} />
          <Suspense fallback={null}>
            <Model
              dispatch={dispatch}
              highlightedParts={highlightState}
              position={[0 + X, 0 + Y, 0 + Z]}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
