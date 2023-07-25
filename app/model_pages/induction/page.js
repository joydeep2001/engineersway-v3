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
  ArcballControls,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls, folder } from "leva";
//import { proxy, useSnapshot } from "valtio";
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

const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/induction_motor.glb`;

function Model({ ...props }) {
  const group = useRef();
  const star = useRef();
  const delta = useRef();
  // const snap = useSnapshot(state);
  const [hover, set] = useState(null);
  const { nodes, materials } = useGLTF(glbFileURL);
  const {
    TerminalBox,
    StarConnection,
    DeltaConnection,
    EndCap1x,
    EndCap1z,
    EndCap2,
    EndCap2z,
    Fan,
    FanCover,
    Shaft,
    SquirrelCage,
    SquirrelCageY,
    Rotor,
    Rotor_Y,
    StatorLaminationY,
    StatorLaminationX,
  } = useGroupControlsWithReset("Induction Motor", {
    TerminalBox: {
      TerminalBox: {
        value: 0,
        min: 0,
        max: 100,
        step: 0.1,
      },
    },
    Star: {
      StarConnection: false,
    },
    Delta: {
      DeltaConnection: false,
    },
    Covers: {
      EndCap1x: {
        value: 0,
        min: 0,
        max: 600,
        step: 0.1,
      },
      EndCap1z: {
        value: 0,
        min: 0,
        max: 600,
        step: 0.1,
      },
      EndCap2: {
        value: 0,
        min: 0,
        max: 600,
        step: 0.1,
      },
      EndCap2z: {
        value: 0,
        min: 0,
        max: 600,
        step: 0.1,
      },
      FanCover: {
        value: 0,
        min: 0,
        max: 600,
        step: 0.1,
      },
      Fan: {
        value: 0,
        min: 0,
        max: 600,
        step: 0.1,
      },
    },
    Rotor: {
      Shaft: {
        value: 0,
        min: 0,
        max: 500,
        step: 0.1,
      },
      SquirrelCage: {
        value: 0,
        min: 0,
        max: 400,
        step: 0.1,
      },
      SquirrelCageY: {
        value: 0,
        min: 0,
        max: 200,
        step: 0.1,
      },
      Rotor: {
        value: 0,
        min: 0,
        max: 400,
        step: 0.1,
      },
      Rotor_Y: {
        value: 0,
        min: 0,
        max: 200,
        step: 0.1,
      },
    },
    Stator: {
      StatorLaminationY: {
        value: 0,
        min: 0,
        max: 200,
        step: 0.1,
      },
      StatorLaminationX: {
        value: 0,
        min: 0,
        max: 400,
        step: 0.1,
      },
    },
  });
  useEffect(() => {
    if (StarConnection == false && DeltaConnection == false) {
      star.current.position.y = 8000000;
      delta.current.position.y = 8000000;
    } else {
      star.current.position.y = 184.78;

      delta.current.position.y = 185.07;
    }
    if (StarConnection == true) {
      delta.current.visible = false;
      star.current.visible = true;
      delta.current.position.y = 8000000;
    }
    if (DeltaConnection == true) {
      star.current.visible = false;
      delta.current.visible = true;
      star.current.position.y = 80000000;
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
        // state.current = e.object.material.name;
        // props.dispatch({ id: state.current });
        // console.log(state.current);
      }}
      onPointerMissed={(e) => {
        // state.current = null;
      }}
    >
      <Select enabled={highlightedParts[0].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.EndCap2.geometry}
          material={materials.End_Cap2}
          position={[1.44 - EndCap2, 90.16, -140.41 - EndCap2z]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.screw2.geometry}
            material={nodes.screw2.material}
            position={[-0.25, 11.78, -0.13]}
          />
        </mesh>
      </Select>
      <Select enabled={highlightedParts[1].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FanCover.geometry}
          material={materials.Fan_Cover}
          position={[1.39, 90.15, -201.73 - FanCover]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Screw.geometry}
            material={materials.Screw}
            position={[-0.05, 131.89, 0]}
          />
        </mesh>
      </Select>
      <Select enabled={highlightedParts[2].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SquirrelCage.geometry}
          material={materials.Squirrel_Cage}
          position={[1.41, 90.03 + SquirrelCageY, -35.47 + SquirrelCage]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[3].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.StatorLamination.geometry}
          material={materials.Stator_Lamination}
          position={[
            1.25 + StatorLaminationX,
            90.02 + StatorLaminationY,
            -20.44,
          ]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Terminal3.geometry}
          material={materials.Terminal}
          position={[14.78, 182.2, 22.67]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Terminal4.geometry}
          material={materials.Terminal}
          position={[-12.05, 182.2, 50.57]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Terminal5.geometry}
          material={materials.Terminal}
          position={[-12.05, 182.2, 36.62]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[5].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Coil2.geometry}
          material={materials.Coil_2}
          position={[1.06, 101.54, -1.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[6].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Coil-3"].geometry}
          material={materials.Coil_3}
          position={[0.96, 101.66, -0.75]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[7].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CoolingFan.geometry}
          material={materials.Cooling_Fan}
          position={[1.44, 90.15, -175.23 - Fan]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[8].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.EndCap1.geometry}
          material={materials.EndCap1}
          position={[1.43 + EndCap1x, 90.16, 99.07 + EndCap1z]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bolt.geometry}
            material={materials.SCREW}
            position={[-0.24, -13.25, -0.13]}
          />
        </mesh>
      </Select>
      <Select enabled={highlightedParts[9].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RotorLamination.geometry}
          material={materials.Rotor_Lamination}
          position={[1.36, 90.15 + Rotor_Y, -20.14 + Rotor]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[10].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shaft.geometry}
          material={materials.Shaft}
          position={[3.25, 90.15, -20.61 + Shaft]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[11].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TerminalHolder.geometry}
          material={materials.Terminal_Holder}
          position={[1.3, 174.76, 37.32]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Terminal1.geometry}
          material={materials.Terminal}
          position={[14.78, 182.2, 50.57]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Terminal2.geometry}
          material={materials.Terminal}
          position={[14.78, 182.2, 36.62]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Terminal6.geometry}
          material={materials.Terminal}
          position={[-12.05, 182.2, 22.67]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[12].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes._Yoke.geometry}
          material={materials.Yoke}
          position={[0.19, 98.2, -15.24]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[13].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Coil1.geometry}
          material={materials.Coil_1}
          position={[1.96, 101.57, 0.49]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        />
      </Select>
      <Select enabled={highlightedParts[14].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Terminal_box.geometry}
          material={materials.Terminal_Box}
          position={[1.33, 197.68 + TerminalBox, 38.48]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.54}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Terminal_Box_Bolt.geometry}
            material={materials.Screw}
            position={[0.22, 0.38, -0.62]}
          />
        </mesh>
      </Select>
      <Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={materials.W2}
          position={[-21.75, 181.05, 22.56]}
          scale={2.24}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={nodes.Cube.material}
            position={[-0.65, -0.61, 0.05]}
            scale={0.6}
          />
        </mesh>
      </Select>
      <Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text001.geometry}
          material={materials.W1}
          position={[20.68, 181.06, 50.26]}
          scale={2.81}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={nodes.Cube005.material}
            position={[0.08, -0.49, 0.03]}
            scale={0.48}
          />
        </mesh>
      </Select>
      <Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text002.geometry}
          material={materials.U2}
          position={[-20.54, 181.08, 36.32]}
          scale={2.77}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={nodes.Cube001.material}
            position={[-0.29, -0.51, 0.09]}
            scale={0.49}
          />
        </mesh>
      </Select>
      <Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text003.geometry}
          material={materials.U1}
          position={[19.63, 185.11, 23.26]}
          scale={3.25}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={nodes.Cube003.material}
            position={[0.15, -0.46, -0.18]}
            scale={0.41}
          />
        </mesh>
      </Select>
      <Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text004.geometry}
          material={materials.V2}
          position={[-17.96, 181.13, 50.26]}
          scale={2.8}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={nodes.Cube002.material}
            position={[-0.54, -0.52, 0.14]}
            scale={0.48}
          />
        </mesh>
      </Select>
      <Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text005.geometry}
          material={materials.V1}
          position={[19.54, 186.1, 36.74]}
          scale={2.53}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004.geometry}
            material={nodes.Cube004.material}
            position={[0.02, -0.64, -0.01]}
            scale={0.53}
          />
        </mesh>
      </Select>
      <Select enabled={highlightedParts[15].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Star.geometry}
          material={materials.STAR_CONNECTION}
          position={[-25, 184.78, 36.69]}
          scale={19.87}
          visible={StarConnection}
          ref={star}
        />
      </Select>
      <Select enabled={highlightedParts[16].highlight}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Delta.geometry}
          material={materials.Delta_Connection}
          position={[0.4, 185.07, 36.8]}
          scale={5.22}
          visible={DeltaConnection}
          ref={delta}
        />
      </Select>
    </group>
  );
}

useGLTF.preload(glbFileURL);

export default function Induction() {
  const { PositionX, PositionY } = useControlsWithReset(
    "Induction Motor Position",
    {
      PositionX: {
        value: 0,
        min: -100,
        max: 100,
        step: 0.1,
      },
      PositionY: {
        value: 0,
        min: -100,
        max: 100,
        step: 0.1,
      },
    }
  );
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 0.4, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
  ];
  const camera = { position: [105, 250, 325], fov: 90 };
  const highlightedParts = [
    //0
    {
      id: "End_Cap2",
      name: "End_Cap2",
      description: "End_Cap2",
      highlight: false,
    },
    //1
    {
      id: "Fan_Cover",
      name: "Fan_Cover",
      description: "Fan_Cover",
      hightlight: false,
    },
    //2
    {
      id: "Squirrel_Cage",
      name: "Squirrel_Cage",
      description: "Squirrel_Cage",
      highlight: false,
    },
    //3
    {
      id: "Stator_Lamination",
      name: "Stator_Lamination",
      description: "Stator_Lamination",
      highlight: false,
    },
    //4
    {
      id: "Terminal",
      name: "Terminal",
      description: "Terminal",
      highlight: false,
    },
    //5
    {
      id: "Coil_2",
      name: "Coil_2",
      description: "Coil_2",
      highlight: false,
    },
    //6
    {
      id: "Coil_3",
      name: "Coil_3",
      description: "Coil_3",
      highlight: false,
    },
    //7
    {
      id: "Cooling_Fan",
      name: "Cooling_Fan",
      description: "Cooling_Fan",
      highlight: false,
    },
    //8
    {
      id: "EndCap1",
      name: "EndCap1",
      description: "EndCap1",
      highlight: false,
    },
    //9
    {
      id: "Rotor_Lamination",
      name: "Rotor_Lamination",
      description: "Rotor_Lamination",
      highlight: false,
    },
    //10
    {
      id: "Shaft",
      name: "Shaft",
      description: "Shaft",
      highlight: false,
    },
    //11
    {
      id: "Terminal_Holder",
      name: "Terminal_Holder",
      description: "Terminal_Holder",
      highlight: false,
    },
    //12
    {
      id: "Yoke",
      name: "Yoke",
      description: "Yoke",
      highlight: false,
    },
    //13
    {
      id: "Coil_1",
      name: "Coil_1",
      description: "Coil_1",
      highlight: false,
    },
    //14
    {
      id: "Terminal_Box",
      name: "Terminal_Box",
      description: "Terminal_Box",
      highlight: false,
    },
    //15
    {
      id: "STAR_CONNECTION",
      name: "STAR_CONNECTION",
      description: "STAR_CONNECTION",
      highlight: false,
    },
    //16
    {
      id: "Delta_Connection",
      name: "Delta_Connection",
      description: "Delta_Connection",
      highlight: false,
    },
  ];
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);

  return (
    <ModelJSXGenerator
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#050511"
    >
      <Model
        dispatch={dispatch}
        highlightedParts={highlightState}
        rotation={[0, Math.PI, 0]}
        position={[0 + PositionX, 0 + PositionY, 0]}
      />
    </ModelJSXGenerator>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       {/* <Pick state={state} /> */}
  //       <Canvas camera={{ position: [105, 250, 325], fov: 90 }}>
  //         <color attach="background" args={["#050511"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[0, 5, -25]} />
  //         <directionalLight intensity={0.4} position={[0, 5, 25]} />
  //         <directionalLight intensity={1} position={[0, -5, 0]} />
  //         <OrbitControls />
  //         <Suspense fallback={<ProgressLoader />}>
  //           <Model
  //             dispatch={dispatch}
  //             highlightedParts={highlightState}
  //             position={[0 + PositionX, 0 + PositionY, 0]}
  //             rotation={[0, Math.PI, 0]}
  //           />
  //         </Suspense>
  //         {/* <GizmoHelper alignment="top-left" margin={[80, 80]} renderPriority={2}>
  //           <GizmoViewport axisColors={["hotpink", "aquamarine", "#3498DB"]} labelColor="black" />
  //         </GizmoHelper> */}
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
