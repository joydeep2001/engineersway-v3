"use client";
import React, {
  Suspense,
  useRef,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import {
  OrbitControls,
  useAnimations,
  PerspectiveCamera,
  useGLTF,
  useProgress,
  Html,
  Stage,
  Environment,
  Grid,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls, folder } from "leva";
// import { proxy, useSnapshot } from "valtio";
import ProgressLoader from "@/components/ProgressLoader";
import Pick from "@/components/Pick";
import ModelJSXGenerator from "@/components/ModelJSXGenerator";
import { Select, EffectComposer, Bloom } from "@react-three/postprocessing";
import { reducer } from "@/reducers/model_highlight";
import {
  useControlsWithReset,
  useGroupControlsWithReset,
} from "@/hooks/useControlsCustom";
import PartViewer from "@/components/PartViewer";
import AppContextProvider, { AppContext } from "@/context/AppContext";
// const state = proxy({
//   current: null,
// });

const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/transformer.glb`;

function Model({ ...props }) {
  const group = useRef();
  // const snap = useSnapshot(state);
  const Tank_Cover = useRef();
  const T_Cover = useRef();
  const HV_Coil = useRef();
  const Insulator = useRef();
  const [hover, set] = useState(null);
  const { nodes, materials } = useGLTF(glbFileURL);
  // const { setGltfInfo } = useContext(AppContext);
  // setGltfInfo({ nodes: nodes, materials: materials });

  const {
    TopCover,
    Cover_Visible,
    Tank,
    Tank_Visibility,
    Coreformer,
    Core,
    HV,
    HV_Coilvisibility,
    Paper_Insulator,
    Insulator_visibility,
  } = useGroupControlsWithReset("Transformer", {
    TopCover: {
      TopCover: {
        value: 0,
        min: 0,
        max: 25,
        step: 0.1,
      },
      Cover_Visible: true,
    },
    Tank: {
      Tank: {
        value: 0,
        min: 0,
        max: 25,
        step: 0.1,
      },
      Tank_Visibility: true,
    },
    Coreformer: {
      Coreformer: {
        value: 0,
        min: 0,
        max: 25,
        step: 0.1,
      },
    },
    Core: {
      Core: {
        value: 0,
        min: 0,
        max: 25,
        step: 0.1,
      },
    },
    HV_Coil: {
      HV: {
        value: 0,
        min: 0,
        max: 25,
        step: 0.1,
      },
      HV_Coilvisibility: true,
    },
    Paper_Insulator: {
      Paper_Insulator: {
        value: 0,
        min: 0,
        max: 25,
        step: 0.1,
      },
      Insulator_visibility: true,
    },
  });

  useEffect(() => {
    if (Cover_Visible == false) {
      T_Cover.current.position.y = 800;
    } else {
      T_Cover.current.position.y = 9.44 + TopCover;
    }
    if (Tank_Visibility == false) {
      Tank_Cover.current.position.y = 800;
    } else {
      Tank_Cover.current.position.y = 7.15 - Tank;
    }
    if (HV_Coilvisibility == false) {
      HV_Coil.current.position.z = 800;
    } else {
      HV_Coil.current.position.z = -9.07 - HV;
    }
    if (Insulator_visibility == false) {
      Insulator.current.position.x = 800;
    } else {
      Insulator.current.position.x = 12.23 + Paper_Insulator;
    }
  });
  const { highlightedParts, setPart } = props;
  // return (
  //   <group
  //     ref={group}
  //     {...props}
  //     dispose={null}
  //     onPointerOver={(e) => {
  //       // e.stopPropagation(), set(e.object.material.name);
  //     }}
  //     onPointerOut={(e) => {
  //       e.intersections.length === 0 && set(null);
  //     }}
  //     onClick={(e) => {
  //       e.stopPropagation();
  //       console.log("click");
  //       // state.current = e.object.material.name;
  //       // props.dispatch({ id: state.current });
  //       // console.log(state.current);
  //     }}
  //     onPointerMissed={(e) => {
  //       // state.current = null;
  //     }}
  //     onDoubleClick={(e) => {
  //       console.log("double", e.object);
  //       setPart((prevState) => ({
  //         visible: !prevState.visible,
  //         meshObject: e.object,
  //       }));
  //     }}
  //   >
  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_Boss-Extrude2111-1"].geometry}
  //       visible={Insulator_visibility}
  //       ref={Insulator}
  //       material={materials.Paper_Insulator}
  //       position={[, 4.96, -6.55]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_BreatherBody-1"].geometry}
  //       material={materials.BreatherBody}
  //       position={[19.58, 13.25, -8.7]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_BreatherSilicaGel-1"].geometry}
  //       material={materials.SilikaGel}
  //       position={[19.57, 13.04, -8.7]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_BuchholzRelay-1"].geometry}
  //       material={materials.Buchholz_Relay}
  //       position={[14.42, 11.65, -5.41]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_CoreFormer-1"].geometry}
  //       material={materials.coreformer}
  //       position={[6.86, 3.59, -8.95 + Coreformer]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_CorrugatedTank-1"].geometry}
  //       ref={Tank_Cover}
  //       visible={Tank_Visibility}
  //       material={materials.CorrugatedTank}
  //       position={[6.33, 7.15 - Tank, -8.03]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_HV_Bus1-1"].geometry}
  //       material={materials.HV_Bus}
  //       position={[11.16, 10.03, -9.34]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_HV_Coil-1"].geometry}
  //       ref={HV_Coil}
  //       visible={HV_Coilvisibility}
  //       material={materials.HV_Coil}
  //       position={[6.9, 4.16, -9.07 - HV]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LPattern133-1"].geometry}
  //       material={materials.Lv_coil}
  //       position={[7.91, 8.42, -6.11]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LV_Bushing2-1"].geometry}
  //       material={materials.LV_Bushing}
  //       position={[5.34, 9.18, -7.26]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LV_Bushing3-1"].geometry}
  //       material={materials.LV_Bushing}
  //       position={[6.63, 9.18, -6.69]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LV_Bushing4-1"].geometry}
  //       material={materials.LV_Bushing}
  //       position={[7.91, 9.18, -6.12]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LV_Insulator2-1"].geometry}
  //       material={materials.LV_Insulator}
  //       position={[5.36, 9.73, -7.31]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LV_Insulator4-1"].geometry}
  //       material={materials.LV_Insulator}
  //       position={[7.93, 9.73, -6.16]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_Mirror1211-1"].geometry}
  //       material={materials.Bolt}
  //       position={[15.01, 11.1, -5.31]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_RingConnector3-1"].geometry}
  //       material={materials.Ring_Connector}
  //       position={[11.11, 8.54, -9.22]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_TopCover-1"].geometry}
  //       visible={Cover_Visible}
  //       ref={T_Cover}
  //       material={materials.TopCover}
  //       position={[8.11, 9.44 + TopCover, -8.69]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_YPhaseInsulator-1"].geometry}
  //       material={materials.YPhase_Insulator}
  //       position={[11.16, 10.93, -9.34]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_BPhaseInsulator-1"].geometry}
  //       material={materials.BPhase_Insulator}
  //       position={[7.72, 10.93, -10.87]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_Conservator-1"].geometry}
  //       material={materials.Conservater}
  //       position={[16.68, 12.62, -5.86]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_ConservatorTankCap-1"].geometry}
  //       material={materials.ConservatorTankCap}
  //       position={[17.6, 14.36, -4.27]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_Core-1"].geometry}
  //       material={materials.Core}
  //       position={[6.86 + Core, 4.25, -8.95]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_HV_Bus2-1"].geometry}
  //       material={materials.HV_Bus}
  //       position={[7.72, 10.03, -10.87]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_HV_Bus3-1"].geometry}
  //       material={materials.HV_Bus}
  //       position={[4.28, 10.03, -12.41]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LPattern88-1"].geometry}
  //       material={materials.Bolt}
  //       position={[4.49, 9.87, -12.87]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LV_Bushing1-1"].geometry}
  //       material={materials.LV_Bushing}
  //       position={[4.06, 9.18, -7.84]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LV_Insulator1-1"].geometry}
  //       material={materials.LV_Insulator}
  //       position={[4.08, 9.73, -7.88]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_LV_Insulator3-1"].geometry}
  //       material={materials.LV_Insulator}
  //       position={[6.65, 9.73, -6.73]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_RingConnector1-1"].geometry}
  //       material={materials.Ring_Connector}
  //       position={[4.23, 8.54, -12.28]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_RingConnector2-1"].geometry}
  //       material={materials.Ring_Connector}
  //       position={[7.67, 8.54, -10.75]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_RPhaseInsulator-1"].geometry}
  //       material={materials.RPhase_Insulator}
  //       position={[4.28, 10.93, -12.41]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_YPhaseInsulator-1001"].geometry}
  //       material={materials.YPhase_Insulator}
  //       position={[11.16, 10.93, -9.34]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_BPhaseInsulator-1001"].geometry}
  //       material={materials.BPhase_Insulator}
  //       position={[7.72, 10.93, -10.87]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />

  //     <mesh castShadow receiveShadow
  //       castShadow
  //       receiveShadow
  //       geometry={nodes["a_-_RPhaseInsulator-1001"].geometry}
  //       material={materials.RPhase_Insulator}
  //       position={[4.28, 10.93, -12.41]}
  //       rotation={[-Math.PI / 2, 0, -0.42]}
  //       scale={0.05}
  //     />
  //   </group>
  // );
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(e) => {
        // e.stopPropagation(), set(e.object.material.name);
      }}
      onPointerOut={(e) => {
        e.intersections.length === 0 && set(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        console.log("click");
        // state.current = e.object.material.name;
        // props.dispatch({ id: state.current });
        // console.log(state.current);
      }}
      onPointerMissed={(e) => {
        // state.current = null;
      }}
      onDoubleClick={(e) => {
        console.log("double", e.object);
        setPart((prevState) => ({
          visible: !prevState.visible,
          meshObject: e.object,
        }));
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_Boss-Extrude2111-1"].geometry}
        material={materials.Paper_Insulator}
        position={[12.232, 4.963, -6.554]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
        visible={Insulator_visibility}
        ref={Insulator}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_BreatherBody-1"].geometry}
        material={materials.BreatherBody}
        position={[19.575, 13.245, -8.698]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_BreatherSilicaGel-1"].geometry}
        material={materials.SilikaGel}
        position={[19.575, 13.038, -8.697]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_BuchholzRelay-1"].geometry}
        material={materials.Buchholz_Relay}
        position={[14.417, 11.653, -5.411]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_CoreFormer-1"].geometry}
        material={materials.coreformer}
        position={[6.864, 3.59, -8.947]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_CorrugatedTank-1"].geometry}
        material={materials.CorrugatedTank}
        position={[6.332, 7.152 - Tank, -8.027]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
        ref={Tank_Cover}
        visible={Tank_Visibility}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_HV_Bus1-1"].geometry}
        material={materials.HV_Bus}
        position={[11.164, 10.033, -9.339]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_HV_Coil-1"].geometry}
        material={materials.HV_Coil}
        position={[6.897, 4.164, -9.066 - HV]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
        ref={HV_Coil}
        visible={HV_Coilvisibility}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LPattern133-1"].geometry}
        material={materials.Lv_coil}
        position={[7.909, 8.422, -6.108]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LV_Bushing2-1"].geometry}
        material={materials.LV_Bushing}
        position={[5.344, 9.178, -7.263]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LV_Bushing3-1"].geometry}
        material={materials.LV_Bushing}
        position={[6.628, 9.178, -6.69]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LV_Bushing4-1"].geometry}
        material={materials.LV_Bushing}
        position={[7.913, 9.178, -6.118]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LV_Insulator2-1"].geometry}
        material={materials.LV_Insulator}
        position={[5.364, 9.732, -7.306]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LV_Insulator4-1"].geometry}
        material={materials.LV_Insulator}
        position={[7.933, 9.732, -6.161]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_Mirror1211-1"].geometry}
        material={materials.Bolt}
        position={[15.014, 11.099, -5.314]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_RingConnector3-1"].geometry}
        material={materials.Ring_Connector}
        position={[11.109, 8.538, -9.216]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_TopCover-1"].geometry}
        material={materials.TopCover}
        position={[8.113, 9.435 + TopCover, -8.686]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
        visible={Cover_Visible}
        ref={T_Cover}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_YPhaseInsulator-1"].geometry}
        material={materials.YPhase_Insulator}
        position={[11.164, 10.93, -9.339]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_BPhaseInsulator-1"].geometry}
        material={materials.BPhase_Insulator}
        position={[7.724, 10.93, -10.873]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_Conservator-1"].geometry}
        material={materials.Conservater}
        position={[16.685, 12.623, -5.86]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_ConservatorTankCap-1"].geometry}
        material={materials.ConservatorTankCap}
        position={[17.602, 14.361, -4.27]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_Core-1"].geometry}
        material={materials.Core}
        position={[6.865 + Core, 4.25, -8.946]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_HV_Bus2-1"].geometry}
        material={materials.HV_Bus}
        position={[7.724, 10.033, -10.873]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_HV_Bus3-1"].geometry}
        material={materials.HV_Bus}
        position={[4.283, 10.033, -12.407]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LPattern88-1"].geometry}
        material={materials.Bolt}
        position={[4.488, 9.874, -12.866]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LV_Bushing1-1"].geometry}
        material={materials.LV_Bushing}
        position={[4.06, 9.178, -7.835]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LV_Insulator1-1"].geometry}
        material={materials.LV_Insulator}
        position={[4.079, 9.732, -7.879]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_LV_Insulator3-1"].geometry}
        material={materials.LV_Insulator}
        position={[6.648, 9.732, -6.734]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_RingConnector1-1"].geometry}
        material={materials.Ring_Connector}
        position={[4.228, 8.538, -12.284]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_RingConnector2-1"].geometry}
        material={materials.Ring_Connector}
        position={[7.668, 8.538, -10.75]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_RPhaseInsulator-1"].geometry}
        material={materials.RPhase_Insulator}
        position={[4.283, 10.93, -12.406]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_YPhaseInsulator-1001"].geometry}
        material={materials.YPhase_Insulator}
        position={[11.164, 10.93, -9.339]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_BPhaseInsulator-1001"].geometry}
        material={materials.BPhase_Insulator}
        position={[7.724, 10.93, -10.873]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["a_-_RPhaseInsulator-1001"].geometry}
        material={materials.RPhase_Insulator}
        position={[4.283, 10.93, -12.406]}
        rotation={[-Math.PI / 2, 0, -0.419]}
        scale={0.05}
      />
    </group>
  );
}

useGLTF.preload(glbFileURL);

export default function DcShunt() {
  const { PositionX, PositionY } = useControlsWithReset("Transformer", {
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
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 0.4, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
  ];
  const camera = { position: [3, 30, -35], fov: 45 };

  const highlightedParts = [
    //0
    {
      id: "Paper_Insulator",
      material: "Paper_Insulator",
      geometry: "a_-_Boss-Extrude2111-1",
      name: "Paper_Insulator",
      description: "Paper_Insulator",
      highlight: false,
    },
    //1
    {
      id: "BreatherBody",
      name: "BreatherBody",
      description: "BreatherBody",
      hightlight: false,
    },
    //2
    {
      id: "SilikaGel",
      name: "SilikaGel",
      description: "SilikaGel",
      highlight: false,
    },
    //3
    {
      id: "Buchholz_Relay",
      name: "Buchholz_Relay",
      description: "Buchholz_Relay",
      highlight: false,
    },
    //4
    {
      id: "coreformer",
      name: "coreformer",
      description: "coreformer",
      highlight: false,
    },
    //5
    {
      id: "CorrugatedTank",
      name: "CorrugatedTank",
      description: "CorrugatedTank",
      highlight: false,
    },
    //6
    {
      id: "HV_Bus",
      name: "HV_Bus",
      description: "HV_Bus",
      highlight: false,
    },
    //7
    {
      id: "HV_Coil",
      name: "HV_Coil",
      description: "HV_Coil",
      highlight: false,
    },
    //8
    {
      id: "Lv_coil",
      name: "Lv_coil",
      description: "Lv_coil",
      highlight: false,
    },
    //9
    {
      id: "LV_Bushing",
      name: "LV_Bushing",
      description: "LV_Bushing",
      highlight: false,
    },
    //10
    {
      id: "LV_Insulator",
      name: "LV_Insulator",
      description: "LV_Insulator",
      highlight: false,
    },
    //11
    {
      id: "Bolt",
      name: "Bolt",
      description: "Bolt",
      highlight: false,
    },
    //12
    {
      id: "Ring_Connector",
      name: "Ring_Connector",
      description: "Ring_Connector",
      highlight: false,
    },
    //13
    {
      id: "TopCover",
      name: "TopCover",
      description: "TopCover",
      highlight: false,
    },
    //14
    {
      id: "YPhase_Insulator",
      name: "YPhase_Insulator",
      description: "YPhase_Insulator",
      highlight: false,
    },
    //15
    {
      id: "BPhase_Insulator",
      name: "BPhase_Insulator",
      description: "BPhase_Insulator",
      highlight: false,
    },
    //16
    {
      id: "Conservater",
      name: "Conservater",
      description: "Conservater",
      highlight: false,
    },
    //17
    {
      id: "ConservatorTankCap",
      name: "ConservatorTankCap",
      description: "ConservatorTankCap",
      highlight: false,
    },
    //18
    {
      id: "Core",
      name: "Core",
      description: "Core",
      highlight: false,
    },
    //19
    {
      id: "RPhase_Insulator",
      name: "RPhase_Insulator",
      description: "RPhase_Insulator",
      highlight: false,
    },
  ];
  const [part, setPart] = useState({ visible: false, meshObject: null });
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);

  // return (
  //   <>
  //     <div style={{ height: 100 + "vh" }}>
  //       {/* <fog attach="fog" args={['black', 15, 21.5]} /> */}
  //       <Canvas
  //         gl={{ logarithmicDepthBuffer: true }}
  //         shadows
  //         camera={{ position: [-15, 25, 30], fov: 45 }}
  //       >
  //         <color attach="background" args={["#0d1117"]} />
  //         {/* <directionalLight intensity={1} /> */}
  //         <pointLight
  //           position={[-0.564129, 12.0037, 2.08061]}
  //           intensity={0.1}
  //         />
  //         {/* <directionalLight intensity={1}  /> */}
  //         {/* <directionalLight intensity={0.4} position={[0, 5, 25]} />
  //         <directionalLight intensity={1} position={[0, -5, 0]} /> */}

  //         <Stage
  //           intensity={0.5}
  //           environment={null}
  //           shadows={{ type: "accumulative", bias: -0.001 }}
  //           adjustCamera={false}
  //         >
  //           <Model
  //             highlightedParts={highlightedParts}
  //             rotation={[0, Math.PI, 0]}
  //           />
  //         </Stage>

  //         <OrbitControls
  //           enableZoom={true}
  //           makeDefault
  //           minPolarAngle={Math.PI / 2}
  //           maxPolarAngle={Math.PI / 2}
  //         />
  //         {/* <Environment background preset="forest" blur={0.9} /> */}
  //         <GizmoHelper
  //           alignment="bottom-right"
  //           margin={[80, 80]}
  //           renderPriority={-1}
  //         >
  //           <GizmoViewport axisColors={["hotpink", "aquamarine", "#3498DB"]} />
  //         </GizmoHelper>

  //         {/* <ArcballControls  makeDefault /> */}
  //       </Canvas>
  //     </div>
  //   </>
  // );

  return (
    <>
      <ModelJSXGenerator
        camera={camera}
        directionalLight={directionalLight}
        bgcolor="#050511"
        highlightedParts={highlightedParts}
      >
        <Model
          rotation={[0, Math.PI, 0]}
          position={[0 + PositionX, 0 + PositionY, 0]}
          dispatch={dispatch}
          highlightedParts={highlightState}
        />
      </ModelJSXGenerator>
    </>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       {/* <Pick state={state} /> */}
  //       <Canvas gl={{ logarithmicDepthBuffer: true }} shadows camera={camera}>
  //         <fog attach="fog" args={["black", 15, 21.5]} />
  //         {/* <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[5, 5, -25]} />
  //         <directionalLight intensity={1} position={[-5, 5, 25]} /> */}
  //         <Stage
  //           intensity={0.5}
  //           environment={null}
  //           shadows={{ type: "accumulative", bias: -0.001 }}
  //           adjustCamera={false}
  //         >
  //           <Model
  //             highlightedParts={highlightedParts}
  //             rotation={[0, Math.PI, 0]}
  //             position={[0, 0, 0]}
  //           />
  //         </Stage>
  //         <Grid
  //           renderOrder={-1}
  //           position={[0, -1.85, 0]}
  //           infiniteGrid
  //           cellSize={0.6}
  //           cellThickness={0.6}
  //           sectionSize={3.3}
  //           sectionThickness={1.5}
  //           sectionColor={[0.5, 0.5, 10]}
  //           fadeDistance={30}
  //         />
  //         <OrbitControls
  //           autoRotate
  //           autoRotateSpeed={0.05}
  //           enableZoom={false}
  //           makeDefault
  //           minPolarAngle={Math.PI / 2}
  //           maxPolarAngle={Math.PI / 2}
  //         />
  //         <EffectComposer disableNormalPass>
  //           <Bloom luminanceThreshold={1} mipmapBlur />
  //         </EffectComposer>
  //         {/* <Environment background preset="sunset" blur={0.8} /> */}
  //       </Canvas>
  //       <div className="absolute z-10">
  //         <div className="">View Parts</div>
  //       </div>
  //     </div>
  //   </>
  // );
}
