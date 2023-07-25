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
const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/single_phase.glb`;
function Model({ ...props }) {
  const group = useRef();
  //const snap = useSnapshot(state);
  const [hover, set] = useState(null);
  const { nodes, materials } = useGLTF(glbFileURL);
  const yoke = useRef();
  const endcap1 = useRef();
  const endcap2 = useRef();
  const stator = useRef();
  const rotor = useRef();
  const paper = useRef();
  const startingcoil = useRef();
  const runningcoil = useRef();
  const shaft = useRef();

  const {
    Yoke,
    Yoke_Visibility,
    EndCap1,
    EndCap1_Visibility,
    EndCap2,
    EndCap2_Visibility,
    Stator,
    Stator_Visibility,
    Rotor,
    Rotor_Visibility,
    Paper,
    Paper_Visibility,
    Starting_Coil,
    Starting_Coil_Visibility,
    Running_Coil,
    Running_Coil_Visibility,
    Shaft,
    Shaft_Visibility,
  } = useGroupControlsWithReset("Single Phase Motor", {
    Yoke: {
      Yoke: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      Yoke_Visibility: true,
    },
    Endcap: {
      EndCap1: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      EndCap1_Visibility: true,
    },
    Endcap: {
      EndCap2: {
        value: 0,
        min: 0,
        max: 55,
        step: 0.1,
      },
      EndCap2_Visibility: true,
    },
    Stator: {
      Stator: {
        value: 0,
        min: -55,
        max: 55,
        step: 0.1,
      },
      Stator_Visibility: true,
    },
    Rotor: {
      Rotor: {
        value: 0,
        min: -55,
        max: 55,
        step: 0.1,
      },
      Rotor_Visibility: true,
    },
    Paper: {
      Paper: {
        value: 0,
        min: -55,
        max: 55,
        step: 0.1,
      },
      Paper_Visibility: true,
    },
    Starting_Coil: {
      Starting_Coil: {
        value: 0,
        min: -55,
        max: 55,
        step: 0.1,
      },
      Starting_Coil_Visibility: true,
    },
    Running_Coil: {
      Running_Coil: {
        value: 0,
        min: -55,
        max: 55,
        step: 0.1,
      },
      Running_Coil_Visibility: true,
    },
    Shaft: {
      Shaft: {
        value: 0,
        min: -55,
        max: 55,
        step: 0.1,
      },
      Shaft_Visibility: true,
    },
  });

  useEffect(() => {
    if (Yoke_Visibility == false) {
      yoke.current.position.x = 5000000000000;
    } else {
      yoke.current.position.x = -3.93 + Yoke;
    }
  });
  useEffect(() => {
    if (EndCap1_Visibility == false) {
      endcap1.current.position.z = 5000000000000;
    } else {
      endcap1.current.position.z = 6.56 + EndCap1;
    }
  });
  useEffect(() => {
    if (EndCap2_Visibility == false) {
      endcap2.current.position.z = -5000000000000;
    } else {
      endcap2.current.position.z = -4.44 - EndCap2;
    }
  });
  useEffect(() => {
    if (Stator_Visibility == false) {
      stator.current.position.x = -5000000000000;
    } else {
      stator.current.position.x = -3.87 + Stator;
    }
  });
  useEffect(() => {
    if (Rotor_Visibility == false) {
      rotor.current.position.x = -5000000000000;
    } else {
      rotor.current.position.x = -3.87 + Rotor;
    }
  });
  useEffect(() => {
    if (Paper_Visibility == false) {
      paper.current.position.x = -5000000000000;
    } else {
      paper.current.position.x = -3.82 + Paper;
    }
  });
  useEffect(() => {
    if (Starting_Coil_Visibility == false) {
      startingcoil.current.position.x = -5000000000000;
    } else {
      startingcoil.current.position.x = -3.84 + Starting_Coil;
    }
  });
  useEffect(() => {
    if (Running_Coil_Visibility == false) {
      runningcoil.current.position.x = -5000000000000;
    } else {
      runningcoil.current.position.x = -3.85 + Running_Coil;
    }
  });
  useEffect(() => {
    if (Shaft_Visibility == false) {
      shaft.current.position.z = -5000000000000;
    } else {
      shaft.current.position.z = 1.56 + Shaft;
    }
  });
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
        //(state.current = e.object.material.name);
      }}
      onPointerMissed={(e) => {
        //state.current = null;
      }}
    >
      <Select enabled={highlightedParts[0].highlight}>
        <mesh
          geometry={nodes["asm_-_Cage-1"].geometry}
          material={materials.Cage}
          position={[-3.86, 5.39, 1.06]}
          rotation={[Math.PI / 2, -0.01, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[1].highlight}>
        <mesh
          geometry={nodes["asm_-_Capacitor-1"].geometry}
          material={materials.Capacitor}
          position={[-7.73, 9.24, 1.06]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[2].highlight}>
        <mesh
          geometry={nodes["asm_-_CapacitorHolder-1"].geometry}
          material={materials.Capacitor_Holder}
          position={[-7.63, 8.84, 1.06]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[3].highlight}>
        <mesh
          geometry={nodes["asm_-_CapWire1-1"].geometry}
          material={materials.Capwire}
          position={[-4.75, 10.49, -1.33]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          geometry={nodes["asm_-_CapWire2-1"].geometry}
          material={materials.capwire}
          position={[-4.73, 10.52, -0.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <group
        position={[-3.87, 5.39, -4.44 - EndCap2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={27.15}
        visible={EndCap2_Visibility}
        ref={endcap2}
      >
        <Select enabled={highlightedParts[5].highlight}>
          <mesh
            geometry={nodes["asm_-_EndCap1-1_1"].geometry}
            material={materials.EndCap2}
          />
        </Select>

        <Select enabled={highlightedParts[6].highlight}>
          <mesh
            geometry={nodes["asm_-_EndCap1-1_2"].geometry}
            material={materials.Nuts}
          />
        </Select>
      </group>
      <group
        position={[-3.87, 5.39, 6.56 + EndCap1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={27.29}
        visible={EndCap1_Visibility}
        ref={endcap1}
      >
        <Select enabled={highlightedParts[7].highlight}>
          <mesh
            geometry={nodes["asm_-_EndCap2-1"].geometry}
            material={materials.EndCap1}
          />
        </Select>

        <Select enabled={highlightedParts[8].highlight}>
          <mesh
            geometry={nodes["asm_-_EndCap2-1_1"].geometry}
            material={materials.Nuts}
          />
        </Select>
      </group>

      <Select enabled={highlightedParts[9].highlight}>
        <mesh
          geometry={nodes["asm_-_Nut3-1"].geometry}
          material={materials.Z1}
          position={[-4.21, 10.48, -1.54]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[10].highlight}>
        <mesh
          geometry={nodes["asm_-_Nut4-1"].geometry}
          material={materials.Z2}
          position={[-3.53, 10.48, -0.15]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[11].highlight}>
        <mesh
          geometry={nodes["asm_-_Nut5-1"].geometry}
          material={materials.U2}
          position={[-3.53, 10.48, -0.84]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[12].highlight}>
        <mesh
          geometry={nodes["asm_-_Nut6-1"].geometry}
          material={materials.V2}
          position={[-3.53, 10.48, -1.54]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[13].highlight}>
        <mesh
          geometry={nodes["asm_-_pan_cross_head_am-2"].geometry}
          material={materials.Nuts}
          position={[-0.14, 0.1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Select>

      <Select enabled={highlightedParts[14].highlight}>
        <mesh
          geometry={nodes["asm_-_pan_head_tapping_screw_am-2"].geometry}
          material={nodes["asm_-_pan_head_tapping_screw_am-2"].material}
          position={[0, 0.18, -0.06]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Select>

      <Select enabled={highlightedParts[15].highlight}>
        <mesh
          geometry={nodes["asm_-_pan_head_tapping_screw_am-3"].geometry}
          material={nodes["asm_-_pan_head_tapping_screw_am-3"].material}
          position={[0, 0.18, -0.08]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Select>

      <Select enabled={highlightedParts[16].highlight}>
        <mesh
          geometry={nodes["asm_-_pan_head_tapping_screw_am-5"].geometry}
          material={nodes["asm_-_pan_head_tapping_screw_am-5"].material}
          position={[0, 0.01, -0.1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Select>

      <Select enabled={highlightedParts[17].highlight}>
        <mesh
          geometry={nodes["asm_-_radial_ball_bearing_68_am-2"].geometry}
          material={materials.BallBearing}
          position={[0, 0, 0.2]}
          rotation={[Math.PI / 2, 0, 0]}
          visible={false}
        />
      </Select>

      <Select enabled={highlightedParts[18].highlight}>
        <mesh
          geometry={nodes["asm_-_RotorCore-1"].geometry}
          material={materials.Rotor_Core}
          position={[-3.87 + Rotor, 5.39, 1.03]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
          visible={Rotor_Visibility}
          ref={rotor}
        />
      </Select>

      <Select enabled={highlightedParts[19].highlight}>
        <mesh
          geometry={nodes["asm_-_Terminal2-1"].geometry}
          material={materials.V1}
          position={[-4.21, 10.48, -0.84]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <group
        position={[0, 0.22, -0.08]}
        rotation={[Math.PI / 2, 0, 0]}
        visible={false}
      >
        <Select enabled={highlightedParts[20].highlight}>
          <mesh
            geometry={nodes["asm_-_TerminalBoxCap-1_1"].geometry}
            material={materials.Terminal_Cap}
          />
        </Select>

        <Select enabled={highlightedParts[21].highlight}>
          <mesh
            geometry={nodes["asm_-_TerminalBoxCap-1_2"].geometry}
            material={materials.Nuts}
          />
        </Select>
      </group>

      <Select enabled={highlightedParts[22].highlight}>
        <mesh
          geometry={nodes["asm_-_TerminalBridge1-1"].geometry}
          material={materials.Terminal_Bridge}
          position={[-4.21, 10.36, -0.5]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[23].highlight}>
        <mesh
          geometry={nodes["asm_-_TerminalBridge2-1"].geometry}
          material={materials.Terminal_Bridge}
          position={[-3.54, 10.36, -0.5]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[24].highlight}>
        <mesh
          geometry={nodes["asm_-_TerminalHolder-1"].geometry}
          material={materials.Terminal_Holder}
          position={[-3.87, 10.24, -0.84]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[25].highlight}>
        <mesh
          geometry={nodes["asm_-_TerminalLug1-1"].geometry}
          material={materials.TerminalLug}
          position={[-3.87, 10.34, -0.84]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[26].highlight}>
        <mesh
          geometry={nodes["asm_-_WireInsulation-1"].geometry}
          material={materials.WireInsulation}
          position={[-7, 9.92, -1.69]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[27].highlight}>
        <mesh
          geometry={nodes["asm_-_Yoke-1"].geometry}
          material={materials.Yoke}
          position={[-3.93 + Yoke, 6.35, 1.05]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
          ref={yoke}
        />
      </Select>

      <Select enabled={highlightedParts[28].highlight}>
        <mesh
          geometry={nodes["asm_-_DriveShaft-1"].geometry}
          material={materials.DriveShaft}
          position={[-3.87, 5.39, 1.56 + Shaft]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
          visible={Shaft_Visibility}
          ref={shaft}
        />
      </Select>

      <Select enabled={highlightedParts[29].highlight}>
        <mesh
          geometry={nodes["asm_-_hex_bolt_am-4"].geometry}
          material={materials.Nuts}
          position={[-3.87, 1.08, 1.06]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[30].highlight}>
        <mesh
          geometry={nodes["asm_-_Nut1-1"].geometry}
          material={materials.U1}
          position={[-4.21, 10.48, -0.15]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[31].highlight}>
        <mesh
          geometry={nodes.Circle.geometry}
          material={materials.Stator}
          position={[-3.87 + Stator, 5.39, 1.06]}
          scale={27.15}
          visible={Stator_Visibility}
          ref={stator}
        />
      </Select>

      <Select enabled={highlightedParts[32].highlight}>
        <mesh
          geometry={nodes.Paper.geometry}
          material={materials.Paper}
          position={[-3.82 + Paper, 5.4, 1.06]}
          rotation={[0, 0, 0.08]}
          scale={[0.21, 0.23, 2.73]}
          visible={Paper_Visibility}
          ref={paper}
        />
      </Select>

      <Select enabled={highlightedParts[33].highlight}>
        <mesh
          geometry={nodes.Vert001.geometry}
          material={materials.Running_Coil}
          position={[-3.85 + Running_Coil, 5.44, 0.24]}
          rotation={[0, 0, -1.61]}
          scale={18.01}
          visible={Running_Coil_Visibility}
          ref={runningcoil}
        />
      </Select>

      <Select enabled={highlightedParts[34].highlight}>
        <mesh
          geometry={nodes.startingcoil.geometry}
          material={materials.Starting_Coil}
          position={[-3.84 + Starting_Coil, 5.59, -0.22]}
          scale={27.15}
          visible={Starting_Coil_Visibility}
          ref={startingcoil}
        />
      </Select>

      <Select enabled={highlightedParts[35].highlight}>
        <mesh
          geometry={nodes.Vert002.geometry}
          material={materials.Commonwire}
          position={[-3.61, 9.93, -1.3]}
          scale={27.15}
        />
      </Select>

      <Select enabled={highlightedParts[36].highlight}>
        <mesh
          geometry={nodes.Circle001.geometry}
          material={materials["Common_Wire connected to  Z2"]}
          position={[-3.23, 10.34, -0.14]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.04}
        />
      </Select>
    </group>
  );
}

export default function Induction() {
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
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 0.4, position: [0, 5, 25] },
    { intensity: 0.4, position: [0, -5, 0] },
  ];
  const camera = { position: [105, 250, 325], fov: 90 };
  const highlightedParts = [
    //0
    { id: "Cage", name: "Cage", description: "Cage", highlight: false },

    //1
    {
      id: "Capacitor",
      name: "Capacitor",
      description: "Capacitor",
      highlight: false,
    },

    //2
    {
      id: "Capacitor_Holder",
      name: "Capacitor_Holder",
      description: "Capacitor_Holder",
      highlight: false,
    },

    //3
    {
      id: "Capwire",
      name: "Capwire",
      description: "Capwire",
      highlight: false,
    },

    //4
    {
      id: "capwire",
      name: "capwire",
      description: "capwire",
      highlight: false,
    },

    //5
    {
      id: "EndCap2",
      name: "EndCap2",
      description: "EndCap2",
      highlight: false,
    },

    //6
    { id: "Nuts", name: "Nuts", description: "Nuts", highlight: false },

    //7
    {
      id: "EndCap1",
      name: "EndCap1",
      description: "EndCap1",
      highlight: false,
    },

    //8
    { id: "Nuts", name: "Nuts", description: "Nuts", highlight: false },

    //9
    { id: "Z1", name: "Z1", description: "Z1", highlight: false },

    //10
    { id: "Z2", name: "Z2", description: "Z2", highlight: false },

    //11
    { id: "U2", name: "U2", description: "U2", highlight: false },

    //12
    { id: "V2", name: "V2", description: "V2", highlight: false },

    //13
    { id: "Nuts", name: "Nuts", description: "Nuts", highlight: false },

    //14
    {
      id: "INVALID14",
      name: "INVALID14",
      description: "INVALID14",
      highlight: false,
    },

    //15
    {
      id: "INVALID15",
      name: "INVALID15",
      description: "INVALID15",
      highlight: false,
    },

    //16
    {
      id: "INVALID16",
      name: "INVALID16",
      description: "INVALID16",
      highlight: false,
    },

    //17
    {
      id: "BallBearing",
      name: "BallBearing",
      description: "BallBearing",
      highlight: false,
    },

    //18
    {
      id: "Rotor_Core",
      name: "Rotor_Core",
      description: "Rotor_Core",
      highlight: false,
    },

    //19
    { id: "V1", name: "V1", description: "V1", highlight: false },

    //20
    {
      id: "Terminal_Cap",
      name: "Terminal_Cap",
      description: "Terminal_Cap",
      highlight: false,
    },

    //21
    { id: "Nuts", name: "Nuts", description: "Nuts", highlight: false },

    //22
    {
      id: "Terminal_Bridge",
      name: "Terminal_Bridge",
      description: "Terminal_Bridge",
      highlight: false,
    },

    //23
    {
      id: "Terminal_Bridge",
      name: "Terminal_Bridge",
      description: "Terminal_Bridge",
      highlight: false,
    },

    //24
    {
      id: "Terminal_Holder",
      name: "Terminal_Holder",
      description: "Terminal_Holder",
      highlight: false,
    },

    //25
    {
      id: "TerminalLug",
      name: "TerminalLug",
      description: "TerminalLug",
      highlight: false,
    },

    //26
    {
      id: "WireInsulation",
      name: "WireInsulation",
      description: "WireInsulation",
      highlight: false,
    },

    //27
    { id: "Yoke", name: "Yoke", description: "Yoke", highlight: false },

    //28
    {
      id: "DriveShaft",
      name: "DriveShaft",
      description: "DriveShaft",
      highlight: false,
    },

    //29
    { id: "Nuts", name: "Nuts", description: "Nuts", highlight: false },

    //30
    { id: "U1", name: "U1", description: "U1", highlight: false },

    //31
    { id: "Stator", name: "Stator", description: "Stator", highlight: false },

    //32
    { id: "Paper", name: "Paper", description: "Paper", highlight: false },

    //33
    {
      id: "Running_Coil",
      name: "Running_Coil",
      description: "Running_Coil",
      highlight: false,
    },

    //34
    {
      id: "Starting_Coil",
      name: "Starting_Coil",
      description: "Starting_Coil",
      highlight: false,
    },

    //35
    {
      id: "Commonwire",
      name: "Commonwire",
      description: "Commonwire",
      highlight: false,
    },

    //36
    {
      id: "INVALID36",
      name: "INVALID36",
      description: "INVALID36",
      highlight: false,
    },
  ];
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);
  return (
    <ModelJSXGenerator
      // state={state}
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#050511"
    >
      <Model
        dispatch={dispatch}
        highlightedParts={highlightState}
        position={[0 + X, 0 + Y, 0 + Z]}
        scale={15}
      />
    </ModelJSXGenerator>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       <Pick />
  //       <Canvas camera={{ position: [105, 250, 325], fov: 90 }}>
  //         <color attach="background" args={["#050511"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[0, 5, -25]} />
  //         <directionalLight intensity={0.4} position={[0, 5, 25]} />
  //         <directionalLight intensity={1} position={[0, -5, 0]} />
  //         <OrbitControls enableDamping={false} />
  //         {/* <Suspense fallback={<Box />}> */}
  //         <Suspense fallback={<Loader />}>
  //           <Model position={[0 + X, 0 + Y, 0 + Z]} scale={15} />
  //         </Suspense>
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
