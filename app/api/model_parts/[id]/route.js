import { NextResponse } from "next/server";

const tempDB = [
  {
    id: "dc_shunt",
    data: [
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
    ],
  },
  {
    id: "induction",
    data: [
      {
        name: "Yoke",
        image: "/images/model_parts/induction/yoke.png",
        partDescription: {
          construction: `The yoke of a three-phase induction motor is crafted from magnetic materials like steel, forming the sturdy outer frame. It encases and supports the motor's internal components while providing a low-reluctance path for magnetic flux.`,
          workingPrinciple: `By containing and guiding the magnetic flux produced by the stator windings, the yoke enhances the interaction between the stator's rotating magnetic field and the rotor. This interaction induces currents in the rotor, leading to electromagnetically-driven rotation and enabling the conversion of electrical energy into mechanical motion`,
        },
      },

      {
        name: "Fan Cover",
        image: "/images/model_parts/induction/fan_cover.png",
        partDescription: {
          construction: `The fan guard for a three-phase induction motor is typically made of metal wires or a mesh-like material, forming a protective enclosure around the motor's cooling fan. It prevents foreign objects from entering the motor while allowing air circulation.`,
          workingPrinciple: `The fan guard ensures the safety of the motor by preventing debris or accidental contact with the rotating fan blades. It allows air to pass through, facilitating effective cooling of the motor during operation, which is crucial for maintaining optimal performance and preventing overheating.`,
        },
      },
      {
        name: "Squrrel Cage",
        image: "/images/model_parts/induction/cage.png",
        partDescription: {
          construction: `A three-phase induction motor squirrel cage features a rotor with robust bars of conductive material, often aluminum or copper, embedded in its core. This cage-like design eliminates the need for external connections like slip rings, simplifying construction.`,
          workingPrinciple: `When connected to a three-phase power supply, the stator windings generate a rotating magnetic field. This field induces currents in the squirrel cage bars, producing their own magnetic fields. These fields interact with the stator's field, initiating rotor motion through electromagnetic forces, allowing the motor to convert electrical energy into mechanical motion efficiently.`,
        },
      },
      {
        name: "Core",
        image: "/images/model_parts/induction/core.png",
        partDescription: {
          construction: `The core of a three-phase induction motor consists of laminated layers of magnetic material, typically iron or steel, arranged to form a sturdy and insulated structure. This core design minimizes energy losses from hysteresis and eddy currents.`,
          workingPrinciple: `When three-phase AC currents flow through the stator windings, the core guides and concentrates the resulting magnetic flux. This controlled flux interacts with the rotor, inducing currents that create a rotating magnetic field. This interaction between the stator's magnetic field and the rotor's currents leads to mechanical motion, enabling the motor to efficiently convert electrical energy into mechanical power.`,
        },
      },
      {
        name: "Fan",
        image: "/images/model_parts/induction/fan.png",
        partDescription: {
          construction: `The cooling fan in a three-phase induction motor is typically a blade attached to the motor shaft. It's designed to dissipate heat generated during operation by promoting air circulation around the motor's core and windings.`,
          workingPrinciple: `As the motor operates, the cooling fan, connected to the motor shaft, rotates. This rotation draws air in and directs it over the motor's components, facilitating heat exchange and maintaining optimal operating temperatures. By enhancing air movement, the cooling fan ensures efficient cooling and prevents overheating, contributing to the motor's reliability and performance.`,
        },
      },
      {
        name: "Rotor Shaft",
        image: "/images/model_parts/induction/shaft.png",
        partDescription: {
          construction: `The rotor shaft of a three-phase induction motor is a sturdy component typically made of durable materials like steel. It connects the rotor assembly to external machinery, allowing the transfer of rotational energy produced by the motor.`,
          workingPrinciple: `As the three-phase AC currents in the stator windings create a rotating magnetic field, it induces currents in the rotor's conductive bars. These induced currents interact with the stator's magnetic field, producing torque and causing the rotor shaft to rotate, thereby transmitting mechanical power to connected devices.`,
        },
      },
    ],
  },
];

export async function GET(request, { params }) {
  console.log(params.id);
  const [selected] = tempDB.filter((item) => item.id === params.id);
  return NextResponse.json(selected.data);
}
