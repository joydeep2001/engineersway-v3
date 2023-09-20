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
  {
    id: "ammeter",
    data: [
      {
        name: "Permanent Magnet",
        image: "/images/model_parts/ammeter/permanent_magnet.png",
        partDescription: {
          workingPrinciple: `The permanent magnet helps or works in an ammeter by creating a stable and constant magnetic field. When an electric current flows through the coil, it generates its own magnetic field. The interaction between the magnetic field of the permanent magnet and the magnetic field produced by the current in the coil causes the coil to move. This movement is proportional to the current being measured, allowing the ammeter to display the current value on a scale. The permanent magnet's unchanging field ensures that the ammeter remains calibrated and provides accurate current readings over time.`,
        },
      },
      {
        name: "Coil and CoilFormer",
        image: "/images/model_parts/ammeter/coil_and_coilformer.png",
        partDescription: {
          construction: {
            "Coil (Moving coil)": [
              "The coil is typically made of a fine wire wound into a cylindrical or rectangular shape. It is mounted on a spindle that can rotate freely within the magnetic field of the permanent magnet. The wire used in the coil is usually chosen for its electrical conductivity and low resistance to minimize the impact on the circuit being measured.",
            ],
            "Coil Former": [
              `The coil is wound on a coil former, which is a non-magnetic, insulating material. The coil former serves to provide structural support to the wire windings and keeps them in a fixed position. It also prevents electrical contact between the windings and the surrounding metal parts of the ammeter.`,
            ],
          },
          workingPrinciple: {
            __intro__: `The coil and coil former in an ammeter work based on the interaction between the magnetic field generated by the permanent magnet and the magnetic field produced by the current flowing through the coil`,
            "Magnetic Field Interaction": [
              `When an electric current flows through the coil, it generates a magnetic field around the coil in accordance with Ampere's law. This magnetic field interacts with the constant magnetic field of the permanent magnet.`,
            ],
            "Torque Generation": [
              `The interaction between these two magnetic fields results in a torque being applied to the coil. The direction of this torque depends on the direction of the current flow in the coil and follows the right-hand rule (Fleming's left-hand rule for motors).`,
            ],
            "Coil Rotation": [
              "The torque causes the coil, along with its attached spindle, to rotate within the magnetic field. As the coil rotates, the attached pointer or needle moves along a calibrated scale. This scale is marked with units of current, allowing the user to read the current value directly",
            ],
            "Restoring Force": [
              `A spring, also attached to the spindle, provides a restoring force. This force opposes the torque created by the current and helps keep the coil in a stable position when there is no current flowing through it.`,
            ],
          },
        },
      },
      {
        name: "Upper and lower control spring",
        image: "/images/model_parts/ammeter/spring.png",
        partDescription: {
          construction: {
            "Upper Control Spring": [
              "The upper control spring is typically a coiled spring made of a suitable material, such as stainless steel or phosphor bronze. It is positioned above the moving coil and is connected to the spindle on which the coil is mounted. The upper end of the upper control spring is often attached to a fixed point within the ammeter's housing or frame",
            ],
            "Lower Control Spring": [
              `The lower control spring is another coiled spring, usually made of the same material as the upper control spring. It is positioned below the moving coil and is connected to the spindle as well. The lower end of the lower control spring is usually anchored to a fixed point within the ammeter.`,
            ],
          },
          workingPrinciple: {
            __intro__: `The upper and lower control springs serve several critical functions in an ammeter:`,
            "Magnetic Field Interaction": [
              `When an electric current flows through the coil, it generates a magnetic field around the coil in accordance with Ampere's law. This magnetic field interacts with the constant magnetic field of the permanent magnet.`,
            ],
            "Restoring Torque": [
              `The interaction between these two magnetic fields results in a torque being applied to the coil. The direction of this torque depends on the direction of the current flow in the coil and follows the right-hand rule (Fleming's left-hand rule for motors).`,
            ],
            "Coil Rotation": [
              "Both the upper and lower control springs provide a restoring torque to the moving coil. When there is no current flowing through the coil, and it is at rest, these springs exert a torque that opposes any rotational movement of the coil. This helps keep the coil in its resting position, preventing the pointer from moving when there is no current being measured",
            ],
            Damping: [
              `The control springs also contribute to damping the movement of the coil and the attached pointer. Damping is essential to prevent excessive oscillations and ensure that the pointer quickly settles at the correct reading when the current changes. The control springs help control the coil's movement and minimize any overshooting of the pointer.`,
            ],
            Stability: [
              `By providing a stable and known force opposing the torque produced by the current in the coil, the control springs ensure that the ammeter remains calibrated and accurate over time. The strength and tension of these springs are carefully chosen to maintain the ammeter's sensitivity and precision.
              In summary, the upper and lower control springs in an ammeter play a crucial role in maintaining the instrument's stability, accuracy, and damping characteristics. They provide a restoring torque that opposes the torque generated by the current in the coil, ensuring that the pointer remains steady and accurate when measuring electric current. Additionally, they help prevent oscillations and provide stability to the ammeter's readings.
              `,
            ],
          },
        },
      },
      {
        name: "Insulating Rod",
        image: "/images/model_parts/ammeter/insulating_rod.png",
        partDescription: {
          construction: `The insulating rod is typically made of a non-conductive material, such as plastic, ceramic, or glass, that has high electrical insulating properties. It is designed as a rod or shaft and is strategically positioned within the ammeter's construction. The insulating rod may have various shapes and sizes depending on the specific design of the ammeter.`,
          workingPrinciple: {
            __intro__: `The insulating rod plays a crucial role in the ammeter's functionality, ensuring electrical isolation and mechanical support in the following ways`,
            "Electrical Isolation": [
              `One of the primary functions of the insulating rod is to provide electrical isolation between different components of the ammeter. This prevents unintended electrical contact or short circuits that could compromise the accuracy and safety of the instrument.`,
            ],
            "Support and Alignment": [
              `The insulating rod serves as a structural support for various parts of the ammeter, including the moving coil, control springs, and other internal components. It helps maintain the proper alignment and spacing between these components.`,
            ],
            "Preventing Current Leakage": [
              "By insulating sensitive components from each other and the ammeter's casing or frame, the insulating rod prevents current leakage and ensures that the current flows only through the intended path, typically the coil, when making a measurement",
            ],
            Safety: [
              `The insulating rod enhances the safety of the ammeter by preventing electrical contact with live or potentially hazardous components inside the ammeter's housing.`,
            ],
            __extro__: `In summary, the insulating rod in an ammeter is a non-conductive component that serves to electrically isolate and support various internal parts of the instrument. It plays a critical role in ensuring that the ammeter operates safely and accurately by preventing unintended electrical contact, current leakage, and short circuits between internal components. Additionally, it helps maintain the proper alignment and spacing of components, contributing to the instrument's overall functionality.
              `,
          },
        },
      },
      {
        name: "Shaft",
        image: "/images/model_parts/ammeter/shaft.png",
        partDescription: {
          construction: {
            __intro__: `The shaft in an ammeter is typically a long, slender, and rigid component made of a durable and non-conductive material, such as metal or plastic. It is positioned within the ammeter's housing and is designed to provide support and a pivot point for several key elements, including`,
            "Electrical Isolation": [
              `One of the primary functions of the insulating rod is to provide electrical isolation between different components of the ammeter. This prevents unintended electrical contact or short circuits that could compromise the accuracy and safety of the instrument.`,
            ],
            "Moving Coil": [
              `The shaft supports the spindle or axle upon which the moving coil is mounted. The moving coil rotates around the shaft when an electric current flows through it, causing the attached pointer to move across the scale.`,
            ],
            "Control Springs": [
              "The upper and lower control springs, which exert restoring torques on the moving coil, are anchored to the shaft. These springs ensure that the moving coil returns to its resting position when there is no current.",
            ],
            Pointer: [
              `The pointer or needle indicating the current measurement is also attached to the shaft. As the moving coil rotates, the pointer moves along the calibrated scale to display the current reading.`,
            ],
          },
          workingPrinciple: {
            __intro__: `The shaft in an ammeter serves the following functions and operates based on the following principles`,
            "Support and Pivot": [
              `The shaft provides a stable support and pivot point for the moving coil, control springs, and pointer. When an electric current flows through the coil, it generates a magnetic field that interacts with the permanent magnet's field, resulting in a torque. This torque causes the moving coil to rotate around the shaft.`,
            ],
            "Rotation and Indication": [
              `As the moving coil rotates, the attached pointer moves along the scale, indicating the magnitude of the electric current being measured. The rotation angle of the coil and the corresponding pointer position are directly proportional to the current.`,
            ],
            Stability: [
              "The shaft's rigidity and stable construction ensure that the moving coil and pointer maintain their positions accurately during measurement. It also helps prevent excessive vibrations or oscillations in the pointer's movement.",
            ],
            Alignment: [
              `Proper alignment of the shaft is essential to ensure that the pointer accurately corresponds to the current value on the scale. Precise construction and placement of the shaft are critical to maintaining the ammeter's accuracy.`,
            ],
            __extro__: `In summary, the shaft in an ammeter provides support, a pivot point, and stability for critical components such as the moving coil, control springs, and pointer. It enables the ammeter to accurately measure and display electric current by allowing the coil to rotate when current flows through it, resulting in the movement of the pointer along the scale. The shaft's proper construction and alignment are essential for the instrument's accuracy and reliability.
              `,
          },
        },
      },
    ],
  },
  {
    id: "transformer",
    data: [
      {
        name: "Oil Tank",
        image: "/images/model_parts/transformer/oil_tank.png",
        partDescription: {
          construction: `A transformer oil tank is typically constructed using steel or another suitable material to ensure durability and corrosion resistance. It consists of a cylindrical or rectangular enclosure designed to hold the transformer's core and windings submerged in insulating oil. The tank also incorporates features like cooling fins, radiators, and oil level indicators for efficient heat dissipation and oil monitoring.`,
          workingPrinciple: `The primary purpose of a transformer oil tank is to provide a sealed and protective environment for the internal components of the transformer, such as the core and windings, immersed in insulating oil. This oil serves as both electrical insulation and coolant, preventing electrical breakdown and dissipating heat generated during transformer operation. The tank's construction and design ensure the safe and efficient functioning of the transformer while maintaining the integrity of the insulating oil.`,
        },
      },
      {
        name: "Core Former",
        image: "/images/model_parts/transformer/coreformer.png",
        partDescription: {
          construction: `Transformer core former clamps are typically made of high-strength, non-magnetic materials such as stainless steel or aluminum. They consist of two parts: a U-shaped clamp and a threaded bolt. The U-shaped clamp has a curved profile that matches the shape of the transformer core, while the threaded bolt is used to secure the clamp in place.`,
          workingPrinciple: `Transformer core former clamps are used to firmly hold the laminated core of a transformer in its desired shape. The U-shaped clamp is placed around the core, and the threaded bolt is tightened, applying pressure to the core's outer layers. This ensures that the core remains tightly bound together, preventing deformation and maintaining the transformer's efficiency and performance.`,
        },
      },
      {
        name: "Core",
        image: "/images/model_parts/transformer/core.png",
        partDescription: {
          construction: `A transformer core consists of two main components: the primary winding and the secondary winding. These windings are typically wrapped around a core made of laminated iron or steel sheets. The core's laminated structure reduces eddy current losses and improves the transformer's efficiency.`,
          workingPrinciple: `The transformer core plays a crucial role in the device's operation by providing a path for magnetic flux. When an alternating current flows through the primary winding, it creates a changing magnetic field that induces a voltage in the secondary winding through electromagnetic induction. The core's magnetic properties concentrate and guide this magnetic flux, facilitating efficient energy transfer from the primary to the secondary winding, making transformers essential in voltage conversion and power distribution.`,
        },
      },

      {
        name: "Hv Coil",
        image: "/images/model_parts/transformer/hv_coil.png",
        partDescription: {
          construction: `The high-voltage (HV) coil in a transformer is typically constructed using high-quality, insulated copper or aluminum wire wound tightly around a laminated iron core. The number of turns and thickness of the wire determine the coil's voltage rating.`,
          workingPrinciple: `The HV coil's primary function is to receive and transmit electrical energy through electromagnetic induction. When an alternating current (AC) flows through the primary winding (HV coil), it creates a magnetic field that induces a voltage in the secondary winding, allowing for efficient voltage transformation and power distribution in electrical systems.`,
        },
      },
      {
        name: "Lv Coil",
        image: "/images/model_parts/transformer/lv_coil.png",
        partDescription: {
          construction: `A low-voltage (LV) coil in a transformer is typically made of copper or aluminum wire wound around a laminated core. The coil is designed to handle lower voltage levels, often used for distribution purposes.`,
          workingPrinciple: `The LV coil is connected to the primary side of the transformer, where it receives the incoming electrical voltage. Through electromagnetic induction, it transfers this energy to the secondary coil, which is connected to the load, allowing voltage transformation and distribution at a lower voltage level.`,
        },
      },
      {
        name: "Core Insulators",
        image: "/images/model_parts/transformer/insulator.png",
        partDescription: {
          construction: `Transformer core insulators are typically made of high-quality insulating materials such as laminated pressboard or composite materials. They are precision-cut into specific shapes and sizes to fit between the transformer's core laminations, providing electrical insulation and mechanical support.`,
          workingPrinciple: `The primary function of transformer core insulators is to prevent electrical contact between the core laminations, which helps to maintain the electrical isolation of the transformer windings. By doing so, they minimize the risk of short circuits and ensure efficient energy transfer within the transformer while maintaining structural stability.`,
        },
      },
      {
        name: "Lv Bus Insulators",
        image: "/images/model_parts/transformer/lv_busbar_and-insualator.png",
        partDescription: {
          construction: `LV (Low Voltage) bus insulators are typically constructed using high-quality, non-conductive materials such as porcelain, polymer, or glass-reinforced plastic. These insulators are designed in various shapes and sizes to provide electrical insulation and mechanical support for low-voltage busbars in electrical distribution systems.`,
          workingPrinciple: `LV bus bars are a fundamental component in electrical distribution systems. They serve to carry low voltage electrical currents from the power source to various loads and equipment. The bus bars efficiently distribute electricity by minimizing resistance and are crucial for maintaining a stable and reliable electrical supply within a facility.contacts, signaling a potential issue or disconnecting power to prevent further damage to the transformer.`,
        },
      },
      {
        name: "Hv Bus Insulators",
        image: "/images/model_parts/transformer/hv_busbar_and-insualator.png",
        partDescription: {
          construction: `HV (High Voltage) bus insulators are typically made of high-quality materials such as porcelain or composite materials. They consist of a cylindrical or conical shape with flanges on both ends for mounting. The insulators are designed to provide electrical insulation and mechanical support for high-voltage conductors in substations and power transmission systems.`,
          workingPrinciple: `The primary function of HV bus insulators is to maintain a physical separation between high-voltage conductors and the supporting structures, preventing electrical arcing and ensuring the safe and reliable operation of the electrical system. They work by effectively isolating the conductors from ground and nearby objects, thus preventing electrical faults and ensuring the uninterrupted flow of electricity in the transmission and distribution networks`,
        },
      },
      {
        name: "Breather",
        image: "/images/model_parts/transformer/breather.png",
        partDescription: {
          construction: `A transformer breather is typically composed of a cylindrical container made of non-corrosive materials such as metal or plastic. Inside the container, there is a desiccant, usually silica gel or molecular sieve, which absorbs moisture from the air entering the breather.`,
          workingPrinciple: `The breather works on the principle of maintaining a dry and moisture-free environment within the transformer's oil-filled tank. As the transformer oil contracts and expands due to temperature changes, air is drawn in or pushed out through the breather. The desiccant inside the breather adsorbs any moisture in the incoming air, preventing it from contaminating the transformer oil and ensuring the transformer operates efficiently and safely.
          `,
        },
      },
      {
        name: "Conservator tank",
        image: "/images/model_parts/transformer/conservator.png",
        partDescription: {
          workingPrinciple: {
            "Oil Expansion and Contraction": [
              `Transformers generate heat during operation due to losses in the core and winding resistance. This causes the insulating oil to expand. When the oil expands, it needs a place to go to prevent excessive pressure build-up. This is where the conservator tank comes into play.`,
            ],
            "Oil Cooling and Contraction": [
              `Conversely, when the transformer is not in operation or is under light load, the oil cools down and contracts. Again, the conservator tank provides a reservoir of oil to make up for the reduced level in the main tank.`,
            ],
            "Maintaining Oil Quality": [
              `The breather on top of the conservator tank plays a crucial role in maintaining the quality of the insulating oil. As the oil level rises and falls, it is exposed to air. The breather contains a desiccant to remove moisture from the incoming air, which helps prevent the oil from becoming contaminated.`,
            ],
            "Preventing Air Contact": [
              `The conservator tank also serves to minimize the contact of the oil with the atmosphere, which can lead to oxidation and degradation of the oil. This helps extend the lifespan of the insulating oil and, consequently, the transformer.`,
            ],
          },
        },
      },
    ],
  },
  {
    id: "alternator",
    data: [
      {
        name: "Brush",
        image: "/images/model_parts/alternator/brush.png",
        partDescription: {
          construction: {
            "Carbon Brush Holder": [
              `An alternator carbon brush holder is typically made of a non-conductive material such as plastic or ceramic. It houses carbon brushes, which are essential for electrical contact with the rotating slip rings of the alternator.`,
            ],
            "Carbon Brush Holder Arms": [
              `Alternator carbon brush holder arms are typically made of a durable and conductive material, such as copper or brass. They are designed as small, adjustable components that hold the carbon brushes securely in place within the alternator housing. These arms often have threaded ends for easy installation and adjustment`,
            ],
            "Carbon Brush": [
              `Alternator carbon brushes are typically made of a mix of carbon and other materials. They are housed in a brush holder, which is often mounted on the alternator casing. The brush is designed with a curved shape to ensure proper contact with the slip rings.`,
            ],
          },
          workingPrinciple: {
            "Carbon Brush Holder": [
              `The carbon brush holder ensures consistent electrical contact between the stationary brushes and the rotating slip rings of the alternator. As the alternator rotor spins, the brushes maintain contact, allowing the transfer of electrical current to generate alternating current (AC) power in the stator windings. Proper maintenance of the brush holder is crucial for efficient and reliable alternator performance.`,
            ],
            "Carbon Brush Holder Arms": [
              `The primary function of alternator carbon brush holder arms is to maintain constant contact between the carbon brushes and the slip rings on the alternator rotor. This continuous contact allows for the transfer of electrical current from the rotor to the external circuit, ensuring a stable output of electrical power from the alternator. Properly adjusted and maintained brush holder arms are essential for the efficient operation of an alternator.`,
            ],
            "Carbon Brush": [
              `Alternator carbon brushes play a crucial role in electrical contact between the stationary parts (brushes) and the rotating parts (slip rings) of an alternator. As the alternator rotor spins, the carbon brushes maintain continuous electrical contact with the slip rings, allowing the transfer of electrical current to the external circuit. This contact enables the generation of alternating current (AC) by the alternator, which is vital for various electrical systems in vehicles and power generation applications.`,
            ],
          },
        },
      },
      {
        name: "Controls",
        image: "/images/model_parts/alternator/controls.png",
        partDescription: {
          construction: {
            "Electrical Socket": [
              `An alternator electrical socket, also known as a power outlet or receptacle, consists of a durable housing typically made of heat-resistant plastic or metal. Inside, it contains electrical contacts, terminals, and wiring to safely connect to an electrical circuit. The socket may have multiple slots or holes to accommodate different plug types and sizes.`,
            ],
            "Electrical Switch": [
              `An alternator electrical switch typically consists of a durable metal or plastic casing housing various components, including contact points, a lever or toggle for manual operation, and often a spring mechanism for tension control. Inside, it contains electrical contacts and conductive materials to facilitate the switching process.`,
            ],
            "Volt Meter": [
              `An alternator voltmeter consists of a calibrated coil of wire, usually wound around an iron core, connected in parallel to the electrical circuit whose voltage is being measured. It also includes a pointer and a scale for voltage readings.`,
            ],
          },
          workingPrinciple: {
            "Electrical Socket": [
              `The alternator electrical socket serves as a connection point for electrical devices to access AC (alternating current) power. When a plug is inserted into the socket, it engages with the contacts inside, completing the electrical circuit. The socket's terminals are designed to ensure a secure and reliable connection, allowing electrical energy to flow from the source, such as a generator or wall outlet, to the connected device, providing the necessary power for its operation.`,
            ],
            "Electrical Switch": [
              `The alternator electrical switch's primary function is to open or close an electrical circuit, allowing or interrupting the flow of electrical current. When the lever or toggle is moved, it either physically separates or connects the electrical contacts, enabling the alternator to supply or disconnect power to a specific load or electrical system. This switching action ensures efficient power distribution and control within an electrical system.`,
            ],
            "Volt Meter": [
              `When voltage flows through the coil in the alternator voltmeter, it generates an electromagnetic field. This field interacts with the iron core, causing the pointer to move along the scale, indicating the voltage level. The deflection of the pointer is proportional to the voltage, allowing for accurate voltage measurements.`,
            ],
          },
        },
      },
      {
        name: "Cooling fan",
        image: "/images/model_parts/alternator/cooling_fan.png",
        partDescription: {
          construction: `The alternator cooling fan typically consists of a set of blades or impellers mounted on a shaft within the alternator housing. These blades are often made of metal or plastic and are designed to efficiently move air through the alternator for cooling purposes. `,
          workingPrinciple: `When the alternator is in operation, it generates heat due to electrical resistance and friction within its components. The cooling fan is connected to the alternator shaft and spins along with it. As the fan rotates, it draws in ambient air and directs it over the alternator's internal components, dissipating heat and helping to maintain the alternator's optimal operating temperature. This cooling process helps prevent overheating and ensures the alternator's proper functioning.`,
        },
      },
      {
        name: "Rotor Coil",
        image: "/images/model_parts/alternator/rotor_coil.png",
        partDescription: {
          construction: `The alternator rotor coil former is typically made of a high-strength, non-conductive material such as fiberglass or epoxy resin. It is designed as a cylindrical or barrel-shaped structure with precise dimensions to accommodate the rotor windings.`,
          workingPrinciple: `The rotor coil former plays a crucial role in an alternator by providing structural support for the rotor windings. The windings are placed around the former, ensuring they maintain the correct shape and alignment during rotation. As the rotor spins within the stator, the magnetic field induces an alternating current in the rotor windings, which is then rectified to produce electrical output.`,
        },
      },
      {
        name: "Rotor Pole Coreformer",
        image: "/images/model_parts/alternator/rotor_pole_coreformer.png",
        partDescription: {
          construction: `Alternator rotor poles are typically made of laminated iron cores, which reduce eddy current losses. They are mounted on the rotor shaft and spaced evenly around it. The poles may have a cylindrical or salient (projecting) design depending on the type of alternator.`,
          workingPrinciple: `When the rotor rotates within the stator windings, the changing magnetic field created by the rotor poles induces an alternating current (AC) in the stator windings through electromagnetic induction. This AC voltage output is then used to generate electrical power in alternators. The design of the rotor poles plays a crucial role in determining the alternator's output voltage and frequency.`,
        },
      },
      {
        name: "Shaft",
        image: "/images/model_parts/alternator/shaft.png",
        partDescription: {
          construction: `The rotor shaft of an alternator is typically made of high-strength steel or other durable materials to withstand mechanical stress and rotational forces. It is designed with precision to ensure proper balance and alignment within the alternator assembly.`,
          workingPrinciple: `The alternator rotor shaft serves as the central axis for the rotor assembly, which consists of field windings or magnets. When the rotor shaft rotates within the stator (stationary part), it induces a magnetic field, facilitating the generation of alternating current (AC) electricity through electromagnetic induction, which is the fundamental working principle of an alternator.`,
        },
      },
      {
        name: "Slip ring and holder",
        image: "/images/model_parts/alternator/slip_ring_and_holder.png",
        partDescription: {
          construction: {
            "Slip Rings": [
              `An alternator consists of two main components: a stator and a rotor. The rotor includes slip rings, which are conductive rings typically made of copper or a similar material, mounted on the shaft of the alternator.`,
            ],
            "Slip Ring Holder": [
              `A slip ring holder, also known as a slip ring assembly, consists of a cylindrical structure typically made of insulating materials like plastic or ceramic. It houses a set of conductive rings, usually made of copper or other conductive materials, which are mounted on the inner surface of the cylinder. Each ring is separated from the others to prevent electrical contact.`,
            ],
          },
          workingPrinciple: {
            "Slip Rings": [
              `Slip rings in an alternator serve as electrical contacts for the rotor winding. They enable the transfer of electrical energy from the rotor to the external circuit. As the rotor spins within the stator's magnetic field, the slip rings maintain continuous electrical contact, allowing the generation of alternating current (AC) output.`,
            ],
            "Slip Ring Holder": [
              `The slip ring holder is used in electrical machinery, such as alternators, to enable continuous electrical connection between a rotating component (like the rotor) and a stationary one (like the stator). When the machine rotates, the conductive rings within the slip ring holder maintain electrical contact with brushes or contacts, allowing the transfer of electrical signals or power without the need for wires to twist or tangle. This enables the efficient transmission of electricity and data in applications where continuous rotation is required, like in generators and certain types of machinery.`,
            ],
          },
        },
      },
      {
        name: "Stator Coil",
        image: "/images/model_parts/alternator/stator_coil.png",
        partDescription: {
          construction: `The stator coil in an alternator is typically made of a laminated iron core wound with multiple coils of copper wire. The core provides a magnetic path, and the coils are arranged in a specific pattern to generate alternating current.`,
          workingPrinciple: `When the rotor (usually a magnetic field) spins within the stator coil, it induces a changing magnetic flux. This changing flux in the stator coils generates an alternating current (AC) output through electromagnetic induction, which can be used for various electrical applications, including power generation in vehicles and power plants.`,
        },
      },
      {
        name: "Stator Core",
        image: "/images/model_parts/alternator/stator_core.png",
        partDescription: {
          construction: `The alternator stator core is typically made of high-quality laminated iron or steel sheets. These sheets are stacked together to form a cylindrical or rectangular core structure. The laminations reduce eddy current losses and enhance the magnetic properties of the core.`,
          workingPrinciple: `The alternator stator core plays a crucial role in generating electrical power. When it rotates within a magnetic field produced by the rotor, it induces a varying magnetic flux. This changing flux induces alternating current (AC) in the stator windings, which is then rectified to produce usable electrical power. The core's design and materials are essential for efficient power generation and minimizing losses in the alternator.`,
        },
      },
      {
        name: "Yoke",
        image: "/images/model_parts/alternator/yoke.png",
        partDescription: {
          construction: `The alternator yoke is typically made of a high-quality magnetic material, such as cast iron or steel. It forms the outermost part of the alternator's core and provides mechanical support and protection to the internal components.`,
          workingPrinciple: `The alternator yoke plays a crucial role in completing the magnetic circuit within the alternator. It helps to channel the magnetic field generated by the rotor and stator, ensuring efficient electromagnetic induction, which is essential for producing alternating current (AC) electricity in the alternator's windings.`,
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
