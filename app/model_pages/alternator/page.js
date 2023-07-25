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
import { useControls, folder, button } from "leva";
// import { proxy, useSnapshot } from "valtio";
import ProgressLoader from "@/components/ProgressLoader";
import Pick from "@/components/Pick";
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
const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/Alternator.glb`;

function Model({ ...props }) {
  const group = useRef();
  // const snap = useSnapshot(state);
  const [hover, set] = useState(null);
  const BackCover = useRef();
  const FrontCover = useRef();
  const YK = useRef();
  const dt = useRef();
  const cd = useRef();
  const cf = useRef();
  const rp = useRef();
  const sc = useRef();
  const { nodes, materials } = useGLTF(glbFileURL);

  const {
    Back_Cover,
    Back_Cover_Visibility,
    Front_Cover,
    Front_Cover_Visibility,
    Yoke,
    Yoke_Visibility,
    Stator_Core,
    Stator_Core_Visibility,
    Carbon_Brush_Holder,
    Carbon_Brush_Holder_Visibility,
    Rotor_Pole,
    Rotor_Pole_Visibility,
    Coil_Former,
    Coil_Former_Visibility,
    Distribution_BoxCover_Visibility,
  } = useGroupControlsWithReset("Alternator Parts", {
    "Back Cover": {
      Back_Cover: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Back_Cover_Visibility: true,
    },
    "Front Cover": {
      Front_Cover: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Front_Cover_Visibility: true,
    },
    "Yoke ": {
      Yoke: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Yoke_Visibility: true,
    },
    "Satar Core": {
      Stator_Core: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Stator_Core_Visibility: true,
    },
    "Carbon Brush Holder": {
      Carbon_Brush_Holder: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Carbon_Brush_Holder_Visibility: true,
    },
    "Rotor Pole": {
      Rotor_Pole: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Rotor_Pole_Visibility: true,
    },
    "Coil Former": {
      Coil_Former: {
        value: 0,
        min: 0,
        max: 85,
        step: 0.1,
      },
      Coil_Former_Visibility: true,
    },
    "Distribution BoxCover": {
      Distribution_BoxCover_Visibility: true,
    },
  });

  useEffect(() => {
    if (Back_Cover_Visibility == false) {
      BackCover.current.position.z = 9000000;
    } else BackCover.current.position.z = -43.77 + Back_Cover;
    if (Front_Cover_Visibility == false) {
      FrontCover.current.position.z = 9000000;
    } else FrontCover.current.position.z = -68.42 - Front_Cover;
    if (Yoke_Visibility == false) {
      YK.current.position.y = 9000000;
    } else if (Yoke_Visibility == true) YK.current.position.y = 6.45 + Yoke;
    if (Distribution_BoxCover_Visibility == false) {
      dt.current.position.y = 9000000;
    } else dt.current.position.y = 18.49;
    if (Carbon_Brush_Holder_Visibility == false) {
      cd.current.position.z = 9000000;
    } else cd.current.position.z = -44.5 + Carbon_Brush_Holder;
    if (Coil_Former_Visibility == false) {
      cf.current.position.x = 9000000;
    } else cf.current.position.x = 11.98 + Coil_Former;
    if (Stator_Core_Visibility == false) {
      sc.current.position.y = 9000000;
    } else if (Stator_Core_Visibility == true)
      sc.current.position.y = 6.78 + Stator_Core;
    if (Rotor_Pole_Visibility == false) {
      rp.current.position.y = 9000000;
    } else rp.current.position.y = 6.81 + Rotor_Pole;
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
        //state.current = e.object.material.name;
        // props.dispatch({ id: state.current });
        //console.log(state.current);
      }}
      onPointerMissed={(e) => {
        //state.current = null;
      }}
    >
      <group
        ref={BackCover}
        position={[11.96, 6.76, -43.77 + Back_Cover]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.17}
        visible={Back_Cover_Visibility}
      >
        <Select enabled={highlightedParts[0].highlight}>
          <mesh
            geometry={nodes["a_-_BackCover-1_1"].geometry}
            material={materials["B ack_Cover"]}
          />
        </Select>

        <Select enabled={highlightedParts[1].highlight}>
          <mesh
            geometry={nodes["a_-_BackCover-1_2"].geometry}
            material={materials.Bolt}
          />
        </Select>
      </group>

      <Select enabled={highlightedParts[2].highlight}>
        <mesh
          geometry={nodes["a_-_Brush1-1"].geometry}
          material={materials.Brush}
          position={[15.35, 8.27, -46.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[3].highlight}>
        <mesh
          geometry={nodes["a_-_Brush5-1"].geometry}
          material={materials.Brush}
          position={[8.6, 8.27, -46.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[4].highlight}>
        <mesh
          geometry={nodes["a_-_Combine11-1"].geometry}
          material={materials.Bolt}
          position={[9.76, 9, -46.26]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[5].highlight}>
        <mesh
          geometry={nodes["a_-_ConnectingWire1-1"].geometry}
          material={materials.Connecting_Wire}
          position={[9.16, 18.37, -50.37]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[6].highlight}>
        <mesh
          geometry={nodes["a_-_DistributionBoxBase-1"].geometry}
          material={materials.DistributionBox_Base}
          position={[9.69, 17.26, -51.81]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[7].highlight}>
        <mesh
          geometry={nodes["a_-_E_SocketContact3-1"].geometry}
          material={materials.Electrical_Socket}
          position={[8.01, 18.25, -49.1]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[8].highlight}>
        <mesh
          geometry={nodes["a_-_SlipRing1-1"].geometry}
          material={materials.Slip_Ring}
          position={[12.07, 7.34, -46.53]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[9].highlight}>
        <mesh
          geometry={nodes["a_-_Spring1-1"].geometry}
          material={materials.Spring}
          position={[14.76, 9.12, -44.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[10].highlight}>
        <mesh
          geometry={nodes["a_-_StatorCoil2-1"].geometry}
          material={materials.Stator_Coil}
          position={[11.98, 6.79, -57.78]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <group
        ref={YK}
        position={[11.92, 6.45 + Yoke, -56.18]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.17}
        visible={Yoke_Visibility}
      >
        <Select enabled={highlightedParts[11].highlight}>
          <mesh
            geometry={nodes["a_-_Yoke-1_1"].geometry}
            material={materials.Yoke}
          />
        </Select>

        <Select enabled={highlightedParts[12].highlight}>
          <mesh
            geometry={nodes["a_-_Yoke-1_2"].geometry}
            material={materials.Bolt}
          />
        </Select>
      </group>

      <Select enabled={highlightedParts[13].highlight}>
        <mesh
          geometry={nodes["a_-_AVR-1"].geometry}
          material={materials.AVR}
          position={[13.47, 17.42, -55.33]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[14].highlight}>
        <mesh
          geometry={nodes["a_-_Brush2-1"].geometry}
          material={materials.Brush}
          position={[15.35, 8.28, -44.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[15].highlight}>
        <mesh
          geometry={nodes["a_-_Brush3-1"].geometry}
          material={materials.Brush_Holder}
          position={[14.88, 8.19, -46.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[16].highlight}>
        <mesh
          geometry={nodes["a_-_Brush4-1"].geometry}
          material={materials.Brush}
          position={[8.6, 8.28, -44.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[17].highlight}>
        <mesh
          geometry={nodes["a_-_BrushHolder1-1"].geometry}
          material={materials.Brush_Holder}
          position={[14.88, 8.19, -44.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[18].highlight}>
        <mesh
          geometry={nodes["a_-_BrushHolder2-1"].geometry}
          material={materials.Brush_Holder}
          position={[9.07, 8.19, -44.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[19].highlight}>
        <mesh
          geometry={nodes["a_-_BrushHolder3-1"].geometry}
          material={materials.Brush_Holder}
          position={[9.07, 8.19, -46.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[20].highlight}>
        <mesh
          geometry={nodes["a_-_BrushHolderArm1-1"].geometry}
          material={materials.Brush_holderArm}
          position={[14.53, 8.73, -44.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[21].highlight}>
        <mesh
          geometry={nodes["a_-_BrushHolderArm2-1"].geometry}
          material={materials.Brush_holderArm}
          position={[14.53, 8.73, -46.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[22].highlight}>
        <mesh
          geometry={nodes["a_-_BrushHolderArm3-1"].geometry}
          material={materials.Brush_holderArm}
          position={[9.42, 8.73, -44.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[23].highlight}>
        <mesh
          geometry={nodes["a_-_BrushHolderArm4-1"].geometry}
          material={materials.Brush_holderArm}
          position={[9.42, 8.73, -46.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[24].highlight}>
        <mesh
          ref={cd}
          geometry={nodes["a_-_CarbonBushHolderBody-1"].geometry}
          material={materials.Carbon_brush_holder}
          position={[11.97, 8.07, -44.5 + Carbon_Brush_Holder]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
          visible={Carbon_Brush_Holder_Visibility}
        />
      </Select>

      <Select enabled={highlightedParts[25].highlight}>
        <mesh
          ref={cf}
          geometry={nodes["a_-_CoilFormer2-1"].geometry}
          material={materials.Coil_Former}
          position={[11.98 + Coil_Former, 6.79, -57.77]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
          visible={Coil_Former_Visibility}
        />
      </Select>

      <Select enabled={highlightedParts[26].highlight}>
        <mesh
          geometry={nodes["a_-_Combine10-1"].geometry}
          material={materials.Bolt}
          position={[14.19, 9, -46.26]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[27].highlight}>
        <mesh
          geometry={nodes["a_-_Combine13-1"].geometry}
          material={materials.Bolt}
          position={[11.98, 15.88, -51.82]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[28].highlight}>
        <mesh
          ref={dt}
          geometry={nodes["a_-_DistributionBoxCover-1"].geometry}
          material={materials.Distribution_BoxCover}
          position={[8.74, 18.49, -51.85]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
          visible={Distribution_BoxCover_Visibility}
        />
      </Select>

      <Select enabled={highlightedParts[29].highlight}>
        <mesh
          geometry={nodes["a_-_ElectricalSocket-1"].geometry}
          material={materials.Electrical_Socket}
          position={[7.89, 18.24, -49.09]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[30].highlight}>
        <mesh
          geometry={nodes["a_-_Fan-1"].geometry}
          material={materials.Fan}
          position={[11.97, 6.79, -68.79]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[31].highlight}>
        <mesh
          ref={FrontCover}
          geometry={nodes["a_-_FrontCover-1"].geometry}
          material={materials.Front_Cover}
          position={[11.98, 6.66, -68.42 - Front_Cover]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
          visible={Front_Cover_Visibility}
        />
      </Select>

      <group
        position={[1.68, 6.74, -68.61]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.17}
      >
        <Select enabled={highlightedParts[32].highlight}>
          <mesh
            geometry={nodes["a_-_MeshPlate1-1_1"].geometry}
            material={materials.Mesh_Plate}
          />
        </Select>

        <Select enabled={highlightedParts[33].highlight}>
          <mesh
            geometry={nodes["a_-_MeshPlate1-1_2"].geometry}
            material={materials.Bolt}
          />
        </Select>
      </group>
      <group
        position={[22.27, 6.63, -68.61]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.17}
      >
        <Select enabled={highlightedParts[34].highlight}>
          <mesh
            geometry={nodes["a_-_MeshPlate2-1_1"].geometry}
            material={materials.Mesh_Plate}
          />
        </Select>

        <Select enabled={highlightedParts[35].highlight}>
          <mesh
            geometry={nodes["a_-_MeshPlate2-1_2"].geometry}
            material={materials.Bolt}
          />
        </Select>
      </group>

      <Select enabled={highlightedParts[36].highlight}>
        <mesh
          geometry={nodes["a_-_Mirror24-1"].geometry}
          material={materials.Bolt}
          position={[11.98, 6.79, -66.59]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[37].highlight}>
        <mesh
          geometry={nodes["a_-_Mirror172-1"].geometry}
          material={materials.Bolt}
          position={[8.07, 18.21, -51.82]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <group
        ref={rp}
        position={[11.98, 6.81 + Rotor_Pole, -57.77]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.17}
        visible={Rotor_Pole_Visibility}
      >
        <Select enabled={highlightedParts[38].highlight}>
          <mesh
            geometry={nodes["a_-_RotorPole1-1_1"].geometry}
            material={materials.Rotor_Pole}
          />
        </Select>

        <Select enabled={highlightedParts[39].highlight}>
          <mesh
            geometry={nodes["a_-_RotorPole1-1_2"].geometry}
            material={materials.Bolt}
          />
        </Select>
      </group>

      <Select enabled={highlightedParts[40].highlight}>
        <mesh
          geometry={nodes["a_-_RotorWinding-1"].geometry}
          material={materials.Rotor_Winding}
          position={[11.97, 6.79, -57.2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[41].highlight}>
        <mesh
          geometry={nodes["a_-_Shaft-1"].geometry}
          material={materials.Shaft}
          position={[11.98, 6.8, -58.33]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[42].highlight}>
        <mesh
          geometry={nodes["a_-_SlipRing2-1"].geometry}
          material={materials.Slip_Ring}
          position={[12.29, 7.11, -45.27]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[43].highlight}>
        <mesh
          geometry={nodes["a_-_SlipRIngHolder-1"].geometry}
          material={materials.SlipRing_Holder}
          position={[12.13, 7.13, -45.8]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[44].highlight}>
        <mesh
          geometry={nodes["a_-_Spring2-1"].geometry}
          material={materials.Spring}
          position={[9.19, 9.12, -46.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[45].highlight}>
        <mesh
          geometry={nodes["a_-_Spring3-1"].geometry}
          material={materials.Spring}
          position={[9.19, 9.12, -44.86]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[46].highlight}>
        <mesh
          geometry={nodes["a_-_Spring4-1"].geometry}
          material={materials.Spring}
          position={[14.76, 9.12, -46.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[47].highlight}>
        <mesh
          geometry={nodes["a_-_StatorCoil1-1"].geometry}
          material={materials.Stator_Coil}
          position={[11.99, 7.2, -57.49]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[48].highlight}>
        <mesh
          ref={sc}
          geometry={nodes["a_-_StatorCore-1"].geometry}
          material={materials.Stator_Core}
          position={[11.98, 6.78 + Stator_Core, -57.89]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
          visible={Stator_Core_Visibility}
        />
      </Select>

      <Select enabled={highlightedParts[49].highlight}>
        <mesh
          geometry={nodes["a_-_Sweep11-1"].geometry}
          material={materials.Wire}
          position={[11.64, 11.15, -47.52]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[50].highlight}>
        <mesh
          geometry={nodes["a_-_Sweep12-1"].geometry}
          material={materials.Wire}
          position={[11.29, 11.66, -46.51]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[51].highlight}>
        <mesh
          geometry={nodes["a_-_Switch-1"].geometry}
          material={materials.Switch}
          position={[7.51, 18.19, -51.5]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[52].highlight}>
        <mesh
          geometry={nodes["a_-_VoltMeterBody-1"].geometry}
          material={materials.Voltmeter}
          position={[7.7, 18.44, -54.37]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[53].highlight}>
        <mesh
          geometry={nodes["a_-_VoltMeterIndicator-1"].geometry}
          material={materials.Indicater}
          position={[7.45, 18.25, -54.37]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[54].highlight}>
        <mesh
          geometry={nodes["a_-_VoltMeterPlate-1"].geometry}
          material={materials.Voltmeter_Plate}
          position={[7.51, 18.89, -54.37]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.17}
        />
      </Select>

      <Select enabled={highlightedParts[55].highlight}>
        <mesh
          geometry={nodes.Text.geometry}
          material={materials.ON}
          position={[7.5, 19.51, -51.49]}
          rotation={[1.63, 0, Math.PI / 2]}
          scale={0.33}
        />
      </Select>

      <Select enabled={highlightedParts[56].highlight}>
        <mesh
          geometry={nodes.Text001.geometry}
          material={materials.Black}
          position={[7.5, 16.66, -51.94]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={0.38}
        />
      </Select>

      <Select enabled={highlightedParts[57].highlight}>
        <mesh
          geometry={nodes.Text002.geometry}
          material={materials.Positive}
          position={[11.93, 16.8, -54.04]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.42}
        />
      </Select>

      <Select enabled={highlightedParts[58].highlight}>
        <mesh
          geometry={nodes.Text003.geometry}
          material={materials.Negetive}
          position={[12.69, 16.82, -54.03]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Select>
    </group>
  );
}

useGLTF.preload(glbFileURL);

export default function DcShunt() {
  const { X, Y, Z } = useControlsWithReset("Alternator Position", {
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
    { id: "B ack_Cover", name: "Back Cover", description: "Back Cover" },

    //1
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //2
    { id: "Brush", name: "Brush", description: "Brush" },

    //3
    { id: "Brush", name: "Brush", description: "Brush" },

    //4
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //5
    {
      id: "Connecting_Wire",
      name: "Connecting_Wire",
      description: "Connecting_Wire",
    },

    //6
    {
      id: "DistributionBox_Base",
      name: "DistributionBox_Base",
      description: "DistributionBox_Base",
    },

    //7
    {
      id: "Electrical_Socket",
      name: "Electrical_Socket",
      description: "Electrical_Socket",
    },

    //8
    { id: "Slip_Ring", name: "Slip_Ring", description: "Slip_Ring" },

    //9
    { id: "Spring", name: "Spring", description: "Spring" },

    //10
    { id: "Stator_Coil", name: "Stator_Coil", description: "Stator_Coil" },

    //11
    { id: "Yoke", name: "Yoke", description: "Yoke" },

    //12
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //13
    { id: "AVR", name: "AVR", description: "AVR" },

    //14
    { id: "Brush", name: "Brush", description: "Brush" },

    //15
    { id: "Brush_Holder", name: "Brush_Holder", description: "Brush_Holder" },

    //16
    { id: "Brush", name: "Brush", description: "Brush" },

    //17
    { id: "Brush_Holder", name: "Brush_Holder", description: "Brush_Holder" },

    //18
    { id: "Brush_Holder", name: "Brush_Holder", description: "Brush_Holder" },

    //19
    { id: "Brush_Holder", name: "Brush_Holder", description: "Brush_Holder" },

    //20
    {
      id: "Brush_holderArm",
      name: "Brush_holderArm",
      description: "Brush_holderArm",
    },

    //21
    {
      id: "Brush_holderArm",
      name: "Brush_holderArm",
      description: "Brush_holderArm",
    },

    //22
    {
      id: "Brush_holderArm",
      name: "Brush_holderArm",
      description: "Brush_holderArm",
    },

    //23
    {
      id: "Brush_holderArm",
      name: "Brush_holderArm",
      description: "Brush_holderArm",
    },

    //24
    {
      id: "Carbon_brush_holder",
      name: "Carbon_brush_holder",
      description: "Carbon_brush_holder",
    },

    //25
    { id: "Coil_Former", name: "Coil_Former", description: "Coil_Former" },

    //26
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //27
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //28
    {
      id: "Distribution_BoxCover",
      name: "Distribution_BoxCover",
      description: "Distribution_BoxCover",
    },

    //29
    {
      id: "Electrical_Socket",
      name: "Electrical_Socket",
      description: "Electrical_Socket",
    },

    //30
    { id: "Fan", name: "Fan", description: "Fan" },

    //31
    { id: "Front_Cover", name: "Front_Cover", description: "Front_Cover" },

    //32
    { id: "Mesh_Plate", name: "Mesh_Plate", description: "Mesh_Plate" },

    //33
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //34
    { id: "Mesh_Plate", name: "Mesh_Plate", description: "Mesh_Plate" },

    //35
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //36
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //37
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //38
    { id: "Rotor_Pole", name: "Rotor_Pole", description: "Rotor_Pole" },

    //39
    { id: "Bolt", name: "Bolt", description: "Bolt" },

    //40
    {
      id: "Rotor_Winding",
      name: "Rotor_Winding",
      description: "Rotor_Winding",
    },

    //41
    { id: "Shaft", name: "Shaft", description: "Shaft" },

    //42
    { id: "Slip_Ring", name: "Slip_Ring", description: "Slip_Ring" },

    //43
    {
      id: "SlipRing_Holder",
      name: "SlipRing_Holder",
      description: "SlipRing_Holder",
    },

    //44
    { id: "Spring", name: "Spring", description: "Spring" },

    //45
    { id: "Spring", name: "Spring", description: "Spring" },

    //46
    { id: "Spring", name: "Spring", description: "Spring" },

    //47
    { id: "Stator_Coil", name: "Stator_Coil", description: "Stator_Coil" },

    //48
    { id: "Stator_Core", name: "Stator_Core", description: "Stator_Core" },

    //49
    { id: "Wire", name: "Wire", description: "Wire" },

    //50
    { id: "Wire", name: "Wire", description: "Wire" },

    //51
    { id: "Switch", name: "Switch", description: "Switch" },

    //52
    { id: "Voltmeter", name: "Voltmeter", description: "Voltmeter" },

    //53
    { id: "Indicater", name: "Indicater", description: "Indicater" },

    //54
    {
      id: "Voltmeter_Plate",
      name: "Voltmeter_Plate",
      description: "Voltmeter_Plate",
    },

    //55
    { id: "ON", name: "ON", description: "ON" },

    //56
    { id: "Black", name: "Black", description: "Black" },

    //57
    { id: "Positive", name: "Positive", description: "Positive" },

    //58
    { id: "Negetive", name: "Negetive", description: "Negetive" },
  ];
  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);
  const camera = { position: [-15, 15, 25], fov: 69 };
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 0.4, position: [0, 5, -25] },
    { intensity: 1, position: [0, 5, 25] },
    { intensity: 1, position: [0, -5, 0] },
    { intensity: 1, position: [-5, 18.25, -54.37] },
  ];
  const { isLoginCountDownComplete, setLoginCountDownComplete, loggedIn } =
    useContext(AppContext);
  return (
    <ModelJSXGenerator
      camera={camera}
      directionalLight={directionalLight}
      bgcolor="#050511"
    >
      <Model
        position={[0 + X, 0 + Y, 0 + Z]}
        dispatch={dispatch}
        highlightedParts={highlightState}
      />
    </ModelJSXGenerator>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       <Pick state={state} />
  //       <Canvas camera={{ position: [-15, 15, 25], fov: 69 }}>
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
