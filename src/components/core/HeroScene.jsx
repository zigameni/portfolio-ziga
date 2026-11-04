import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Dust() {
  const points = useRef();

  const positions = useMemo(() => {
    const values = new Float32Array(760 * 3);
    for (let i = 0; i < 760; i += 1) {
      const radius = 2.7 + Math.random() * 4.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[i * 3 + 2] = radius * Math.cos(phi);
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.018;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff8a63"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Sculpture() {
  const group = useRef();
  const rings = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;

    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.3,
      0.045
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.18,
      0.045
    );

    if (rings.current) {
      rings.current.rotation.z = time * 0.14;
      rings.current.rotation.x = Math.sin(time * 0.22) * 0.24;
    }
  });

  return (
    <group ref={group} scale={1.06}>
      <Float speed={1.1} rotationIntensity={0.24} floatIntensity={0.85}>
        <mesh scale={1.32}>
          <torusKnotGeometry args={[1.22, 0.4, 220, 36]} />
          <MeshDistortMaterial
            color="#27282e"
            metalness={0.92}
            roughness={0.2}
            distort={0.16}
            speed={1.3}
            emissive="#ff4d1f"
            emissiveIntensity={0.07}
          />
        </mesh>
      </Float>

      <group ref={rings}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.006, 6, 220]} />
          <meshBasicMaterial color="#ff5a2a" transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.4, 0.3]}>
          <torusGeometry args={[2.95, 0.0035, 6, 220]} />
          <meshBasicMaterial color="#f2ecdf" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2.8]}>
          <torusGeometry args={[2.15, 0.004, 6, 220]} />
          <meshBasicMaterial color="#7d8cff" transparent opacity={0.42} />
        </mesh>
      </group>

      <mesh position={[2.45, 0.85, -0.5]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#ff5a2a" />
      </mesh>
      <mesh position={[-2.1, -1.1, 0.8]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#f2ecdf" />
      </mesh>

      <Dust />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="core-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.55} />
        <spotLight
          position={[6, 5, 6]}
          angle={0.55}
          penumbra={1}
          intensity={140}
          color="#ff6a3d"
        />
        <spotLight
          position={[-6, -3, 5]}
          angle={0.7}
          penumbra={1}
          intensity={90}
          color="#7c89ff"
        />
        <pointLight position={[0, 4, 3]} intensity={35} color="#f2ecdf" />
        <Sculpture />
      </Canvas>
    </div>
  );
}
