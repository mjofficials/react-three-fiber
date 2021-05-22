import React, { useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"
import "./App.css"
import { MeshWobbleMaterial, softShadows } from "@react-three/drei";

softShadows()

function MyRotatingBox({ position, color, args }) {
  const myMesh = React.useRef();
  const [active, setActive] = useState(false);
  const set = useThree((state) => state.set)
  set({ shadowMap: true })
  useFrame(() => {
    myMesh.current.rotation.x = myMesh.current.rotation.y -= 0.01;
  });

  return (
    <mesh
      castShadow
      scale={active ? 1.5 : 1}
      // onClick={() => setActive(!active)}
      onPointerEnter={() => setActive(!active)}
      onPointerLeave={() => setActive(!active)}
      ref={myMesh}
      position={position}
    >
      <boxBufferGeometry args={args} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
}

export default function App() {

  return (
    <div className="App">
      <Canvas
        shadows={true}
        camera={{ position: [-5, 2, 10], fov: 60 }}
        colorManagement
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]} >
            <planeBufferGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
          <MyRotatingBox args={[3, 2, 1]} color={"lightblue"} position={[0, 1, 0]} />
          <MyRotatingBox color={"pink"} position={[-2, 1, -5]} />
          <MyRotatingBox color={"pink"} position={[5, 1, -2]} />
        </group>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
