"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import Krar from "./Krar";
import { Suspense } from "react";

export default function EnzertHero() {
  return (
    <div className="w-full h-screen  bg-[#110D0C] relative pt-32">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[2, 2, 2]} intensity={3} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Krar />
        </Suspense>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
        <h1 className="pt-32 text-4xl opacity-80 font-medium tracking-[0.3em]">
          እንዝርት
        </h1>
        <p className="text-sm opacity-40 mt-2">
          Discover Ethiopian Amharic Music
        </p>
      </div>
    </div>
  );
}
