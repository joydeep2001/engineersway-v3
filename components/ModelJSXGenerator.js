import React, { Suspense, useContext, useState } from "react";
import ProgressLoader from "./ProgressLoader";
import Pick from "./Pick";
import { Canvas, useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";

import {
  OrbitControls,
  useAnimations,
  PerspectiveCamera,
  useGLTF,
  useProgress,
  Stage,
  Environment,
  Html,
  BakeShadows,
} from "@react-three/drei";
import Login from "./Login";
import AppContextProvider, { AppContext } from "../context/AppContext";
import {
  EffectComposer,
  SSAO,
  SMAA,
  Outline,
  Selection,
} from "@react-three/postprocessing";
import {
  Bounds,
  GizmoHelper,
  GizmoViewport,
  Lightformer,
  ArcballControls,
} from "@react-three/drei";

import SideMenu from "./SideMenu";
import PartDetailsView from "./PartDetailsView";
import PartViewer from "./PartViewer";
import ToolBar from "@/components/ToolBar";
import { useControls } from "leva";

console.log(EffectComposer, SSAO, SMAA, Outline);
export default function ModelJSXGenerator({
  state,
  directionalLight,
  camera,
  bgcolor,
  children,
  highlightedParts,
}) {
  const { loggedIn, setLoginCountDownComplete, isLoginCountDownComplete } =
    useContext(AppContext);
  const [casing, setCasing] = useState(false);
  const hightlightCasing = () => {
    setCasing(true);
  };
  const [toggleMenu, setToggleMenu] = useState();
  const handleToggleMenu = () => {
    setToggleMenu((prevState) => setToggleMenu(!prevState));
  };

  const [popup, showPopup] = useState({ visibility: false, selected: 0 });
  const partDetails = [
    {
      name: "Armature Lamination",
      image: "/images/model_parts/armature_lamination.png",
      partDescription: {
        construction: `The construction of a DC shunt motor armature is a precise and intricate 
        process that brings together various components to create the heart of the motor's operation. 
        It begins with the assembly of a laminated iron core, designed to minimize energy losses due to 
        eddy currents. Skilled technicians then meticulously wind high-conductivity copper or aluminum wire 
        into the core's slots, forming coils that will generate the motor's magnetic field.
        Each coil is insulated to prevent short circuits and ensure reliable performance. 
        A carefully crafted commutator, composed of copper segments divided by insulating materials, 
        is affixed to one end of the armature shaft. This commutator serves as the interface between the 
        armature winding and the external circuit. The coils are connected to specific segments of the commutator, 
        allowing for the reversal of current direction as the motor rotates.
        Rigorous testing is conducted to verify the integrity of the insulation and the quality of connections. 
        This includes insulation resistance checks to identify potential faults and ensure the motor's safe operation. 
        The culmination of these steps results in a meticulously constructed DC shunt motor armature, 
        ready to provide efficient and dependable motor performance in a wide range of applications.
        `,
        workingPrinciple: {
          "Magnetic Field Generation": [
            `The armature winding, consisting of multiple coils wound around the armature core, is connected to a direct current (DC) power source.`,
          ],
          "Interaction with Stator Field": [
            `The armature's magnetic field interacts with the stationary magnetic field produced by the stator (field windings) of the motor.`,
            `In a shunt motor configuration, the field windings are connected in parallel with the armature windings, and they both receive power from the same DC source.`,
            `The armature's magnetic field aligns with the stator's magnetic field, resulting in a torque-producing force on the armature.`,
          ],
          "Commutator and Rotation": [
            `As the armature rotates due to the generated torque, the commutator rotates with it.`,
            `The commutator's copper segments are connected to the armature coils.`,
            `As the coils rotate within the magnetic field of the stator, the direction of the current in each coil is periodically reversed by the commutator's segments. This reversal of current direction ensures that the torque remains in the same direction, leading to continuous rotation.`,
          ],
          "Continuous Rotation": [
            `The interaction between the armature's magnetic field and the stator's magnetic field creates a continuous torque that drives the armature to rotate.`,
            `As long as the DC power source is maintained, the armature will keep rotating, producing mechanical work.`,
          ],
          "Speed Regulation": [
            `The speed of the motor can be controlled by adjusting the voltage applied to the armature windings. `,
            `Higher voltage increases the magnetic force and speed, while lower voltage decreases them.`,
          ],
          "Back EMF": [
            `As the armature rotates faster, it generates a counter electromotive force (EMF) known as back EMF. `,
            `This back EMF opposes the applied voltage and helps regulate the motor's speed.`,
          ],
        },
      },
    },
    {
      name: "Armature Windings",
      image: "/images/model_parts/armature_windings.png",
      partDescription: {
        construction: `The armature winding of a DC shunt motor is a set of coils wound around the armature core, which is typically made of laminated steel. The winding consists of multiple turns of insulated wire, connected to the commutator segments, forming a closed loop that rotates within the magnetic field. 
        `,
        workingPrinciple: `When a direct current flows through the armature winding, it generates a magnetic field that interacts with the field produced by the stator's field windings. This interaction causes the armature to rotate due to the forces exerted on the winding's conductors. As the armature rotates, the commutator segments reverse the current direction in the armature coils, maintaining the rotational motion. The armature winding's role is to convert electrical energy into mechanical motion, making it a fundamental component in the operation of a DC shunt motor.
        `,
      },
    },
    {
      name: "Carbon Brush",
      image: "/images/model_parts/brush.png",
      partDescription: {
        construction: `DC shunt motor carbon brushes are small conductive components made from carbon or graphite materials. They are held in brush holders and press against the rotating commutator, creating a sliding electrical connection. `,
        workingPrinciple: `During motor operation, the carbon brushes maintain contact with the commutator segments, allowing electrical current to flow between the stationary parts (brushes) and the rotating parts (commutator). This transfer of current facilitates the creation of a magnetic field in the armature, enabling the motor to convert electrical energy into mechanical motion. The brushes need to be properly aligned and of appropriate material to ensure smooth and efficient electrical contact while minimizing wear on both the brushes and the commutator.`,
      },
    },
    {
      name: "Carbon Brush Holder",
      image: "/images/model_parts/brush_holder.png",
      partDescription: {
        construction: `The carbon brush holder in a DC shunt motor is a component made of insulating material, often plastic or ceramic, designed to securely hold carbon brushes in place. It consists of a housing with spring-loaded mechanisms to maintain proper contact pressure between the carbon brushes and the commutator. `,
        workingPrinciple: `During operation, the carbon brush holder ensures consistent contact between the carbon brushes and the rotating commutator. As the armature rotates, the commutator segments pass under the carbon brushes, which transfer current to the armature windings, inducing rotation. The spring-loaded design of the brush holder maintains optimal pressure, ensuring reliable electrical contact and facilitating efficient energy transfer between the power source and the motor's rotating components.`,
      },
    },
    {
      name: "Commutator",
      image: "/images/model_parts/commutator.png",
      partDescription: {
        construction: `The commutator in a DC shunt motor consists of segments made of durable materials like copper. These segments are insulated from each other and mounted on the motor's armature shaft. Brushes press against the rotating commutator, allowing for electrical contact and current transfer.`,
        workingPrinciple: `As the armature of the DC shunt motor rotates, the commutator plays a crucial role in reversing the direction of current flow in the armature coils at the appropriate moments. This reversal of current direction ensures that the motor's electromagnetic interaction remains constant, resulting in continuous rotation. By facilitating the conversion of alternating current in the armature coils into unidirectional current in the external circuit, the commutator enables the motor to generate consistent mechanical motion.`,
      },
    },
    {
      name: "Field Windings",
      image: "/images/model_parts/field_windings.png",
      partDescription: {
        construction: `The field winding in a DC shunt motor consists of multiple turns of insulated wire wound around the motor's pole pieces. These pole pieces are typically made of magnetic materials like iron, and the field winding is connected in parallel with the armature winding.`,
        workingPrinciple: `When direct current flows through the field winding, it creates a stationary magnetic field within the motor's pole pieces. This magnetic field interacts with the armature winding's current, inducing electromagnetic forces that lead to the motor's rotation. The shunt configuration allows the field winding to maintain a relatively constant field strength, resulting in consistent motor speed and performance across varying loads.`,
      },
    },
    {
      name: "Terminal Box",
      image: "/images/model_parts/terminal.png",
      partDescription: {
        construction: `The DC shunt motor terminal box is a housing located on the motor's exterior, typically made of sturdy materials like metal or plastic. It contains connection points for the motor's armature and field windings, as well as terminals for external power supply and control circuits. `,
        workingPrinciple: `The terminal box serves as a convenient interface for electrical connections. It allows for easy wiring of the motor's armature and field windings, enabling the motor to receive power and control signals from an external source. By providing organized and accessible connection points, the terminal box facilitates the operation and maintenance of the DC shunt motor.`,
      },
    },
    {
      name: "Yoke",
      image: "/images/model_parts/yoke.png",
      partDescription: {
        construction: `The DC shunt motor yoke forms the outer frame of the motor and is typically made of magnetic materials like iron or steel. It provides structural support, containing the motor's internal components and guiding the magnetic flux generated by the field windings.`,
        workingPrinciple: `The yoke's construction directs the magnetic field created by the shunt field windings, ensuring efficient energy transfer to the armature. As direct current flows through the windings, the yoke concentrates the magnetic flux within the motor, allowing interaction between the field and armature magnetic fields. This interaction generates rotational motion in the armature, enabling the motor to convert electrical power into mechanical output.`,
      },
    },
  ];
  function handleShowPartDetails(i) {
    showPopup({ visibility: true, selected: i });
  }
  const { color } = useControls({
    color: "#ff9621",
  });
  return (
    <>
      <AppContextProvider>
        <div className="w-screen h-screen">
          {/* {isLoginCountDownComplete && !loggedIn ? <Login /> : null}
          <SideMenu
            showPopup={showPopup}
            toggle={toggleMenu}
            items={highlightedParts}
          /> */}
          {/* <Pick handleToggleMenu={handleToggleMenu} state={state} /> */}
          <Canvas gl={{ logarithmicDepthBuffer: true }} shadows camera={camera}>
            <color attach="background" args={[color]} />
            {/* {directionalLight?.map(({ intensity, position }, index) => {
              return (
                <directionalLight
                  key={index}
                  intensity={intensity}
                  position={position}
                />
              );
            })} */}
            <pointLight
              position={[-0.564129, 12.0037, 2.08061]}
              intensity={0.1}
            />

            <OrbitControls enableDamping={false} />

            <Suspense
              fallback={
                <ProgressLoader
                  setLoginCountDownComplete={setLoginCountDownComplete}
                  loggedIn={loggedIn}
                />
              }
            >
              {/* {React.cloneElement(children, { reducer: reducer })} */}
              <Stage
                intensity={0.5}
                environment={null}
                shadows={{ type: "accumulative", bias: -0.003 }}
                adjustCamera={false}
              >
                {children}
                {/* <BakeShadows /> */}
              </Stage>
            </Suspense>
            {/* <GizmoHelper
              alignment="top-left"
              margin={[80, 80]}
              renderPriority={2}
            >
              <GizmoViewport
                axisColors={["hotpink", "aquamarine", "#3498DB"]}
                labelColor="black"
              />
            </GizmoHelper> */}
            {/* <Environment background preset="sunset" blur={0.8} /> */}
            {/* <ProgressLoader /> */}
          </Canvas>
          <ToolBar
            onPartCardClick={handleShowPartDetails}
            partDetails={partDetails}
          />
          {popup.visibility && (
            <PartDetailsView
              showPopup={showPopup}
              partDetails={partDetails[popup.selected]}
            />
          )}
        </div>
      </AppContextProvider>
    </>
  );
}
