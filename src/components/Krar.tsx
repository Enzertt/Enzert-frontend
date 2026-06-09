"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/krar.glb");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;

    group.current.rotation.y = t * 0.2;
    group.current.position.y = Math.sin(t) * 0.05;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene.clone()} scale={2} />
      </Center>
    </group>
  );
}

export default function Krar() {
  return (
    <Suspense fallback={null}>
      <Model />
    </Suspense>
  );
}

useGLTF.preload("/models/krar.glb");
