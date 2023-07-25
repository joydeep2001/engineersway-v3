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

export function Model(props) {
  const { nodes, materials } = useGLTF("../models/transformer_lite.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["a_-_BreatherBody-1"].geometry}
        material={materials.BreatherBody}
        position={[19.58, 13.25, -8.7]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_BreatherSilicaGel-1"].geometry}
        material={materials.SilikaGel}
        position={[19.57, 13.04, -8.7]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_BuchholzRelay-1"].geometry}
        material={materials.Buchholz_Relay}
        position={[14.42, 11.65, -5.41]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_CorrugatedTank-1"].geometry}
        material={materials.CorrugatedTank}
        position={[6.33, 7.15, -8.03]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_HV_Bus1-1"].geometry}
        material={materials.HV_Bus}
        position={[11.16, 10.03, -9.34]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LV_Bushing2-1"].geometry}
        material={materials.LV_Bushing}
        position={[5.34, 9.18, -7.26]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LV_Bushing3-1"].geometry}
        material={materials.LV_Bushing}
        position={[6.63, 9.18, -6.69]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LV_Bushing4-1"].geometry}
        material={materials.LV_Bushing}
        position={[7.91, 9.18, -6.12]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LV_Insulator2-1"].geometry}
        material={materials.LV_Insulator}
        position={[5.36, 9.73, -7.31]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LV_Insulator4-1"].geometry}
        material={materials.LV_Insulator}
        position={[7.93, 9.73, -6.16]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_Mirror1211-1"].geometry}
        material={materials.Bolt}
        position={[15.01, 11.1, -5.31]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_RingConnector3-1"].geometry}
        material={materials.Ring_Connector}
        position={[11.11, 8.54, -9.22]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_TopCover-1"].geometry}
        material={materials.TopCover}
        position={[8.11, 9.44, -8.69]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_YPhaseInsulator-1"].geometry}
        material={materials.YPhase_Insulator}
        position={[11.16, 10.93, -9.34]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_BPhaseInsulator-1"].geometry}
        material={materials.BPhase_Insulator}
        position={[7.72, 10.93, -10.87]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_Conservator-1"].geometry}
        material={materials.Conservater}
        position={[16.68, 12.62, -5.86]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_ConservatorTankCap-1"].geometry}
        material={materials.ConservatorTankCap}
        position={[17.6, 14.36, -4.27]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_HV_Bus2-1"].geometry}
        material={materials.HV_Bus}
        position={[7.72, 10.03, -10.87]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_HV_Bus3-1"].geometry}
        material={materials.HV_Bus}
        position={[4.28, 10.03, -12.41]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LPattern88-1"].geometry}
        material={materials.Bolt}
        position={[4.49, 9.87, -12.87]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LV_Bushing1-1"].geometry}
        material={materials.LV_Bushing}
        position={[4.06, 9.18, -7.84]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LV_Insulator1-1"].geometry}
        material={materials.LV_Insulator}
        position={[4.08, 9.73, -7.88]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_LV_Insulator3-1"].geometry}
        material={materials.LV_Insulator}
        position={[6.65, 9.73, -6.73]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_RingConnector1-1"].geometry}
        material={materials.Ring_Connector}
        position={[4.23, 8.54, -12.28]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_RingConnector2-1"].geometry}
        material={materials.Ring_Connector}
        position={[7.67, 8.54, -10.75]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_RPhaseInsulator-1"].geometry}
        material={materials.RPhase_Insulator}
        position={[4.28, 10.93, -12.41]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_YPhaseInsulator-1001"].geometry}
        material={materials.YPhase_Insulator}
        position={[11.16, 10.93, -9.34]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_BPhaseInsulator-1001"].geometry}
        material={materials.BPhase_Insulator}
        position={[7.72, 10.93, -10.87]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
      <mesh
        geometry={nodes["a_-_RPhaseInsulator-1001"].geometry}
        material={materials.RPhase_Insulator}
        position={[4.28, 10.93, -12.41]}
        rotation={[-Math.PI / 2, 0, -0.42]}
        scale={0.05}
      />
    </group>
  );
}

useGLTF.preload("../models/transformer_lite.glb");
export default function TransformerLite() {
  const { PositionX, PositionY, rx, ry, rz, cx, cy, cz } = useControls(
    "Transformer",
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
      rx: {
        value: 0,
        min: -25,
        max: 25,
        step: 0.1,
      },
      ry: {
        value: 0,
        min: -25,
        max: 25,
        step: 0.1,
      },
      rz: {
        value: 0,
        min: -25,
        max: 25,
        step: 0.1,
      },
      cx: {
        value: 3,
        min: -100,
        max: 100,
        step: 0.1,
      },
      cy: {
        value: 30,
        min: -100,
        max: 100,
        step: 0.1,
      },
      cz: {
        value: 0,
        min: -100,
        max: 100,
        step: 0.1,
      },
    }
  );
  return (
    <>
      <div>
        <Canvas camera={{ position: [cx, cy, cz], fov: 69 }}>
          <color attach="background" args={["#fff"]} />
          <directionalLight intensity={1} />
          <directionalLight intensity={1} position={[0, 5, -25]} />
          <directionalLight intensity={0.4} position={[0, 5, 25]} />
          <directionalLight intensity={1} position={[0, -5, 0]} />
          <OrbitControls
            enablePan={false}
            // maxAzimuthAngle={Math.PI / 8}
            // minAzimuthAngle={-Math.PI / 4}
            enableRotate
            autoRotate
            target={(1.5, 15, 0)}
          />
          {/* <Suspense fallback={<Box />}> */}
          <Suspense fallback={null}>
            <Model rotation={[rx, ry, rz]} position={[-11.2, -1.6, 20]} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
