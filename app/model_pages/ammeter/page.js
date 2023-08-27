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
  useProgress,
  useGLTF,
  Html,
} from "@react-three/drei";
import {
  Bounds,
  GizmoHelper,
  GizmoViewport,
  Lightformer,
  Environment,
  ArcballControls,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useControls, folder } from "leva";
//import { proxy, useSnapshot } from "valtio";
import ProgressLoader from "@/components/ProgressLoader";
import Pick from "@/components/Pick";
import { AppContext } from "@/context/AppContext";
import ModelJSXGenerator from "@/components/ModelJSXGenerator";
import { Select } from "@react-three/postprocessing";
import Script from "next/script";
import { reducer } from "@/reducers/model_highlight";
import {
  useControlsWithReset,
  useGroupControlsWithReset,
} from "@/hooks/useControlsCustom";

// const state = proxy({
//   current: null,
// });

// function Scene() {
//   const gltf = useLoader(
//     GLTFLoader,
//     "https://ew3dmodel.s3.ap-south-1.amazonaws.com/Ammeter.glb"
//   );
//   return (
//     <Suspense fallback={null}>
//       <primitive object={gltf.scene} />
//     </Suspense>
//   );
// }

const glbFileURL = `${process.env.NEXT_PUBLIC_S3_MODEL_BUCKET}/Ammeter.glb`;

// function Model({ ...props }) {
//   const group = useRef();
//   const Lids = useRef();
//   const Casings = useRef();
//   const Pmmc = useRef();
//   const [hover, set] = useState(null);
//   // const snap = useSnapshot(state);
//   // useFrame((state2, delta, xframe) => {
//   //   if (state.current in highlight) {
//   //     highlight[state.current] = true;
//   //     console.log(highlight);
//   //   } else {
//   //     console.log("not found");
//   //   }
//   // });
//   // useEffect(()=>{
//   //   if(Casing==false&&Lid==false&&Permanent_Magnet==false){
//   //     Lids.current.position.y=800
//   //     Casings.current.position.x=800
//   //     Pmmc.current.position.y=800

//   //   }
//   //   else{
//   //     Lids.current.position.y=2.02
//   //     Casings.current.position.y=4.76
//   //     Pmmc.current.position.y=4.71
//   //   }
//   // })
//   const { nodes, materials } = useGLTF(glbFileURL);
//   const {
//     LidZ,
//     LidY,
//     Lid,
//     CasingZ,
//     CasingY,
//     Casing,
//     Permanent_MagnetZ,
//     Permanent_MagnetY,
//     Permanent_Magnet,
//   } = useGroupControlsWithReset("Ammmeter", {
//     Lid: {
//       LidZ: {
//         value: 0,
//         min: 0,
//         max: 25,
//         step: 0.1,
//       },
//       LidY: {
//         value: 0,
//         min: 0,
//         max: 18,
//         step: 0.1,
//       },
//     },
//     Casing: {
//       CasingZ: {
//         value: 0,
//         min: 0,
//         max: 25,
//         step: 0.1,
//       },
//       CasingY: {
//         value: 0,
//         min: 0,
//         max: 18,
//         step: 0.1,
//       },
//     },
//     "Permanent Magnet": {
//       Permanent_MagnetZ: {
//         value: 0,
//         min: 0,
//         max: 18,
//         step: 0.1,
//       },
//       Permanent_MagnetY: {
//         value: 0,
//         min: 0,
//         max: 18,
//         step: 0.1,
//       },
//     },
//   });

//   // const {RotateY}=useControls('Rotate',{
//   //   RotateY:{
//   //     value:0,
//   //     min:0,
//   //     max:25,
//   //     step:0.1
//   //   },
//   // })
//   //useEffect

//   const { highlightedParts } = props;
//   return (
//     <group
//       ref={group}
//       {...props}
//       dispose={null}
//       onPointerOver={(e) => {
//         e.stopPropagation(); //set(e.object.material.name);
//       }}
//       onPointerOut={(e) => {
//         //e.intersections.length === 0 && set(null);
//       }}
//       onClick={(e) => {
//         console.log("event fired");
//         e.stopPropagation();
//         //state.current = e.object.material.name;
//         //set(e.object.material.name);
//         // props.dispatch({ id: state.current });
//         // console.log(state.current);
//       }}
//       onPointerMissed={(e) => {
//         // state.current = null;
//       }}
//     >
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.BindingPostCap1.geometry}
//         material={materials.Cap2}
//         position={[6.59, 2.39, 1.41]}
//         rotation={[Math.PI / 2, 0, 0]}
//         scale={0.11}
//       >
//         <Select enabled={highlightedParts[22].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Asably_-_Pointer-1"].geometry}
//             material={materials.Pointer}
//             position={[-23, -35.8, -23.5]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[21].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Asably_-_Shaft1-1"].geometry}
//             material={nodes["Asably_-_Shaft1-1"].material}
//             position={[-23, -75.42, -14.5]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[21].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Asably_-_Shaft2-1"].geometry}
//             material={nodes["Asably_-_Shaft2-1"].material}
//             position={[-22.99, -34.37, -15.5]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[20].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Asably_-_ShuntResistorBody-1"].geometry}
//             material={materials.Shunt_Resistor_Body}
//             position={[-23, -32.13, 0]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[20].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Asably_-_ShuntResistorLead-1"].geometry}
//             material={materials.Shunt_Resistor_Lead}
//             position={[-23.04, -30.82, 0]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[19].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Asably_-_UperControlSpring-1"].geometry}
//             material={materials.Upper_Control_Spring}
//             position={[-23.46, -34.39, -16.1]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[18].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Asably_-_ZeroAdjust1-1"].geometry}
//             material={nodes["Asably_-_ZeroAdjust1-1"].material}
//             position={[-24, -86.5, -15.5]}
//             rotation={[0, 3.1, 0]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[18].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Asably_-_ZeroAdjust2-1"].geometry}
//             material={nodes["Asably_-_ZeroAdjust2-1"].material}
//             position={[-23.92, -21.51, -16.44]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[16].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.BidingPostBase1.geometry}
//             material={materials.Binding_post_base}
//             position={[0.02, -9.01, 0]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[17].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.BindingPostBase2.geometry}
//             material={materials.Binding_PostBase2}
//             position={[-45.98, -9.01, 0]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[1].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.BindingPostCap2.geometry}
//             material={materials.Cap1}
//             position={[-46, 0, 0]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[15].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.BindingPostHolder1.geometry}
//             material={nodes.BindingPostHolder1.material}
//             position={[-45.97, -11.98, -0.03]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[15].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.BindingPostHolder2.geometry}
//             material={nodes.BindingPostHolder2.material}
//             position={[0.03, -11.98, -0.03]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[4].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Coil-1"].geometry}
//             material={materials.Coil}
//             position={[-22.82, -40.51, -5.4]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[8].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes["Cylinder-1"].geometry}
//             material={materials.Cylinder}
//             position={[-22.85, -53.11, -15.5]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[9].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Former.geometry}
//             material={materials.Former}
//             position={[-23, -54.89, -15.72]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[13].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.hex_nut_jam.geometry}
//             material={nodes.hex_nut_jam.material}
//             position={[-46, -19.47, 0]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[13].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.hex_nut_jam_am.geometry}
//             material={nodes.hex_nut_jam_am.material}
//             position={[0, -19.47, -0.01]}
//           />
//         </Select>
//         <Select enabled={highlightedParts[14].highlight}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.JuelBaring2.geometry}
//             material={nodes.JuelBaring2.material}
//             position={[-22.98, -22.81, -15.5]}
//           />
//         </Select>
//       </mesh>
//       <Select enabled={highlightedParts[0].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Casing-1"].geometry}
//           material={materials.Casing}
//           position={[4.16, 4.76 + CasingY, -6.82 - CasingZ]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[6].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.HoldingPlate1.geometry}
//           material={nodes.HoldingPlate1.material}
//           position={[4.16, 4.03, -7.9]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[6].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.HoldingPlate2.geometry}
//           material={nodes.HoldingPlate2.material}
//           position={[4.16, 4.1, -1.12]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[7].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.InsulatingRod1.geometry}
//           material={nodes.InsulatingRod1.material}
//           position={[2.4, 4.03, -7.02]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[7].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.InsulatingRod2.geometry}
//           material={nodes.InsulatingRod2.material}
//           position={[5.92, 4.03, -7.02]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[7].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.InsulatingRod3.geometry}
//           material={nodes.InsulatingRod3.material}
//           position={[5.92, 4.11, -1.74]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[7].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.InsulatingRod4.geometry}
//           material={nodes.InsulatingRod4.material}
//           position={[2.4, 4.11, -1.74]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[12].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Juelbaring1.geometry}
//           material={nodes.Juelbaring1.material}
//           position={[4.035, 4, -8.1]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[5].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Lid.geometry}
//           material={materials.Lid}
//           position={[4.13, 2.02 + LidY, -0.34 + LidZ]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         >
//           <Select enabled={highlightedParts[12].highlight}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes["Asably_-_oval_head_am-2"].geometry}
//               material={nodes["Asably_-_oval_head_am-2"].material}
//               position={[34.24, 2.88, 12.43]}
//             />
//           </Select>
//           <Select enabled={highlightedParts[12].highlight}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Screw004.geometry}
//               material={nodes.Screw004.material}
//               position={[-33.76, 2.88, 12.42]}
//             />
//           </Select>
//         </mesh>
//       </Select>
//       <Select enabled={highlightedParts[10].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.LowerControlSpring.geometry}
//           material={materials.Lower_Control_Spring}
//           position={[4.01, 4.11, -6.9]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[11].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Mirror.geometry}
//           material={materials.Mirror}
//           position={[4.16, 8.4, -2.67]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[12].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Screw.geometry}
//           material={nodes.Screw.material}
//           position={[1.52, 3.34, -2.77]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[12].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Screw001.geometry}
//           material={nodes.Screw001.material}
//           position={[6.8, 3.34, -2.77]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[12].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Screw002.geometry}
//           material={nodes.Screw002.material}
//           position={[7.11, 7.25, -2.66]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[12].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Screw003.geometry}
//           material={nodes.Screw003.material}
//           position={[1.2, 7.25, -2.66]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={highlightedParts[3].highlight}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes["Asably_-_PermanentMagnet-1"].geometry}
//           material={materials.Permanent_Magnet}
//           position={[4.15, 4.71 + Permanent_MagnetY, -3.96 - Permanent_MagnetZ]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.11}
//         />
//       </Select>
//       <Select enabled={false}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube.geometry}
//           material={nodes.Cube.material}
//           position={[4.16, 7.76, -2.77]}
//           scale={[-4, 1.48, 0.05]}
//         />
//       </Select>
//       <Select enabled={false}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Text002.geometry}
//           material={nodes.Text002.material}
//           position={[4.16, 8.74, -2.7]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.93}
//         />
//       </Select>
//       <Select enabled={false}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Text003.geometry}
//           material={nodes.Text003.material}
//           position={[3.84, 7.03, -2.7]}
//           rotation={[Math.PI / 2, 0, 0]}
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
        geometry={nodes.BindingPostCap1.geometry}
        material={materials.Cap2}
        position={[6.586, 2.393, 1.413]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      >
        <mesh
          geometry={nodes["Asably_-_Pointer-1"].geometry}
          material={materials.Pointer}
          position={[-22.982, -37.151, -22.892]}
        />
        <mesh
          geometry={nodes["Asably_-_Shaft1-1"].geometry}
          material={materials.Shaft}
          position={[-22.991, -75.421, -15.5]}
        />
        <mesh
          geometry={nodes["Asably_-_Shaft2-1"].geometry}
          material={materials.Shaft}
          position={[-22.991, -34.365, -15.5]}
        />
        <mesh
          geometry={nodes["Asably_-_ShuntResistorBody-1"].geometry}
          material={materials.Shunt_Resistor_Body}
          position={[-22.996, -32.131, 0]}
        />
        <mesh
          geometry={nodes["Asably_-_ShuntResistorLead-1"].geometry}
          material={materials.Shunt_Resistor_Lead}
          position={[-23.041, -30.817, 0]}
        />
        <mesh
          geometry={nodes["Asably_-_UperControlSpring-1"].geometry}
          material={materials.Upper_Control_Spring}
          position={[-23.458, -34.392, -16.098]}
        />
        <mesh
          geometry={nodes["Asably_-_ZeroAdjust1-1"].geometry}
          material={materials.Zero_Adjust}
          position={[-22.188, -88.263, -14.671]}
        />
        <mesh
          geometry={nodes["Asably_-_ZeroAdjust2-1"].geometry}
          material={materials.Zero_Adjust}
          position={[-23.92, -21.514, -16.444]}
        />
        <mesh
          geometry={nodes.BidingPostBase1.geometry}
          material={materials.Cap2}
          position={[0.024, -9.011, 0]}
        />
        <mesh
          geometry={nodes.BindingPostBase2.geometry}
          material={materials.Binding_PostBase2}
          position={[-45.976, -9.011, 0]}
        />
        <mesh
          geometry={nodes.BindingPostCap2.geometry}
          material={materials.Cap1}
          position={[-46, 0, 0]}
        />
        <mesh
          geometry={nodes.BindingPostHolder1.geometry}
          material={materials.Binding_post_Holder}
          position={[-45.975, -11.975, -0.025]}
        />
        <mesh
          geometry={nodes.BindingPostHolder2.geometry}
          material={materials.Binding_post_Holder}
          position={[0.025, -11.976, -0.025]}
        />
        <mesh
          geometry={nodes["Coil-1"].geometry}
          material={materials.Coil}
          position={[-22.817, -40.509, -5.401]}
        />
        <mesh
          geometry={nodes["Cylinder-1"].geometry}
          material={materials.Cylinder}
          position={[-22.854, -53.115, -15.5]}
        />
        <mesh
          geometry={nodes.Former.geometry}
          material={materials.Former}
          position={[-22.996, -54.893, -15.716]}
        />
        <mesh
          geometry={nodes.hex_nut_jam.geometry}
          material={materials.Nut}
          position={[-46.001, -19.471, -0.005]}
        />
        <mesh
          geometry={nodes.hex_nut_jam_am.geometry}
          material={materials.Nut}
          position={[0, -19.471, -0.006]}
        />
        <mesh
          geometry={nodes.JuelBaring2.geometry}
          material={materials.Jewel_Bearing}
          position={[-22.978, -22.814, -15.5]}
        />
      </mesh>
      <mesh
        geometry={nodes["Casing-1"].geometry}
        material={materials.Casing}
        position={[4.158, 4.764, -7.383]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.HoldingPlate1.geometry}
        material={materials.Holding_Plate}
        position={[4.16, 4.03, -7.76]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.HoldingPlate2.geometry}
        material={materials.Holding_Plate}
        position={[4.16, 4.03, -1.004]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.InsulatingRod1.geometry}
        material={materials.Insulating_Rod}
        position={[2.473, 4.03, -7.021]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.InsulatingRod2.geometry}
        material={materials.Insulating_Rod}
        position={[5.851, 4.03, -7.021]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.InsulatingRod3.geometry}
        material={materials.Insulating_Rod}
        position={[5.851, 4.03, -1.743]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.InsulatingRod4.geometry}
        material={materials.Insulating_Rod}
        position={[2.473, 4.03, -1.743]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.Juelbaring1.geometry}
        material={materials.Jewel_Bearing}
        position={[4.16, 4.03, -7.768]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.Lid.geometry}
        material={materials.Lid}
        position={[4.133, 2.016, 18.277]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      >
        <mesh
          geometry={nodes["Asably_-_oval_head_am-2"].geometry}
          material={materials.Screw}
          position={[34.237, 2.883, 12.426]}
        />
        <mesh
          geometry={nodes.Screw004.geometry}
          material={materials.Screw}
          position={[-33.763, 2.883, 12.419]}
        />
      </mesh>
      <mesh
        geometry={nodes.LowerControlSpring.geometry}
        material={materials.Lower_Control_Spring}
        position={[4.109, 4.093, -6.546]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.Mirror.geometry}
        material={materials.Mirror}
        position={[4.158, 8.397, -2.672]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.Screw.geometry}
        material={materials.Screw}
        position={[1.519, 3.343, -2.766]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.Screw001.geometry}
        material={materials.Screw}
        position={[6.797, 3.343, -2.766]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.Screw002.geometry}
        material={materials.Screw}
        position={[7.114, 7.249, -2.66]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.Screw003.geometry}
        material={materials.Screw}
        position={[1.202, 7.249, -2.66]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes["Asably_-_PermanentMagnet-1"].geometry}
        material={materials.Permanent_Magnet}
        position={[4.146, 4.711, -3.963]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.106}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[4.158, 7.759, -2.768]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-3.657, -1.48, -0.053]}
      />
      <mesh
        geometry={nodes.Text002.geometry}
        material={materials.Readings}
        position={[4.16, 8.735, -2.696]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.927}
      />
      <mesh
        geometry={nodes.Text003.geometry}
        material={materials.Readings}
        position={[3.839, 7.027, -2.7]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
useGLTF.preload(glbFileURL);

export default function Ammeter({ props }) {
  const directionalLight = [
    { intensity: 1, position: null },
    { intensity: 1, position: [0, 5, -25] },
    { intensity: 0.4, position: [0, 5, 25] },
  ];
  const camera = { position: [3, 30, -35], fov: 69 };
  const { isLoginCountDownComplete, setLoginCountDownComplete, loggedIn } =
    useContext(AppContext);

  const highlightedParts = [
    //0
    {
      id: "Casing",
      name: "Casing",
      description: "some description",
      highlight: false,
    },
    //1
    {
      id: "Cap1",
      name: "Cap1",
      description: "Cap1 description",
      highlight: false,
    },
    //2
    {
      id: "Cap2",
      name: "Cap2",
      description: "Cap2 description",
      highlight: false,
    },
    //3
    {
      id: "Permanent_Magnet",
      name: "Permanent_Magnet",
      description: "Permanent_Magnet",
      highlight: false,
    },
    //4
    {
      id: "Coil",
      name: "Coil",
      description: "Coil",
      highlight: false,
    },
    //5
    {
      id: "Lid",
      name: "Lid",
      description: "Lid",
      highlight: false,
    },
    //6
    {
      id: "Holding_Plate",
      name: "Holding_Plate",
      description: "Holding_Plate",
      highlight: false,
    },
    //7
    {
      id: "Insulating_Rod",
      name: "Insulating_Rod",
      description: "Insulating_Rod",
      highlight: false,
    },
    //8
    {
      id: "Cylinder",
      name: "Cylinder",
      description: "Cylinder",
      highlight: false,
    },
    //9
    {
      id: "Former",
      name: "Former",
      description: "Former",
      highlight: false,
    },
    //10
    {
      id: "Lower_Control_Spring",
      name: "Lower_Control_Spring",
      description: "Lower_Control_Spring",
      highlight: false,
    },
    //11
    {
      id: "Mirror",
      name: "Mirror",
      description: "Mirror",
      highlight: false,
    },
    //12
    {
      id: "Screw",
      name: "Screw",
      description: "Mirror",
      highlight: false,
    },
    //13
    {
      id: "Nut",
      name: "Nut",
      description: "Nut",
      highlight: false,
    },
    //14
    {
      id: "Jewel_Bearing",
      name: "Jewel_Bearing",
      description: "Jewel_Bearing",
      highlight: false,
    },
    //15
    {
      id: "Binding_post_Holder",
      name: "Binding_post_Holder",
      description: "Binding_post_Holder",
      highlight: false,
    },
    //16
    {
      id: "Binding_post_base",
      name: "Binding_post_base",
      description: "Binding_post_base",
      highlight: false,
    },
    //17
    {
      id: "Binding_PostBase2",
      name: "Binding_PostBase2",
      description: "Binding_PostBase2",
      highlight: false,
    },
    //18
    {
      id: "Zero_Adjust",
      name: "Zero_Adjust",
      description: "Zero_Adjust",
      highlight: false,
    },
    //19
    {
      id: "Upper_Control_Spring",
      name: "Upper_Control_Spring",
      description: "Upper_Control_Spring",
      highlight: false,
    },
    //20
    {
      id: "Shunt_Resistor_Body",
      name: "Upper_Control_Spring",
      description: "Upper_Control_Spring",
      highlight: false,
    },
    //21
    {
      id: "Shunt_Resistor_Body",
      name: "Upper_Control_Spring",
      description: "Upper_Control_Spring",
      highlight: false,
    },
    //22
    {
      id: "Pointer",
      name: "Pointer",
      description: "Pointer",
      highlight: false,
    },
  ];

  const [highlightState, dispatch] = useReducer(reducer, highlightedParts);

  return (
    <>
      <ModelJSXGenerator
        //state={state}
        camera={camera}
        directionalLight={directionalLight}
        bgcolor="#050505"
      >
        <Model
          position={[-3, -5, 0]}
          dispatch={dispatch}
          highlightedParts={highlightState}
        />
      </ModelJSXGenerator>
    </>
  );
  // return (
  //   <>
  //     <div className="w-screen h-screen">
  //       <Pick state={state} />
  //       <Canvas camera={{ position: [3, 30, -35], fov: 69 }}>
  //         <color attach="background" args={["#050505"]} />
  //         <directionalLight intensity={1} />
  //         <directionalLight intensity={1} position={[0, 5, -25]} />
  //         <directionalLight intensity={1} position={[0, 5, 25]} />
  //         <OrbitControls />

  //         <Suspense fallback={<ProgressLoader />}>
  //           <Model position={[-3, -5, 0]} />
  //         </Suspense>
  //       </Canvas>
  //     </div>
  //   </>
  // );
}
/*[model_params.js]
model_pages/Ammeter
getStaticProps
*/
