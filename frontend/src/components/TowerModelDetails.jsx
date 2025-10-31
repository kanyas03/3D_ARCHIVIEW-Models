import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

// Reusable 3D Model Component with rotation
const ModelViewer = ({ url }) => {
const { scene } = useGLTF(url);
const modelRef = useRef();

// Auto-rotate the model
useFrame(() => {
if (modelRef.current) {
modelRef.current.rotation.y += 0.01; // adjust speed as needed
}
});

return (
<Center>
<primitive ref={modelRef} object={scene} scale={1.5} />
</Center>
);
};

const CorporateTowerView = () => {
const model = {
name: "Corporate Tower",
description:
"A sleek glass façade skyscraper that embodies corporate minimalism and modern design. The structure combines transparency, light, and verticality to create a commanding urban presence with efficient interior layouts.",
glbUrl: "/models/modern_tower.glb", // ensure this file exists inside public/models/
};

return (
<div className="min-h-screen bg-gradient-to-br from-[#fffaf0] via-[#fff7e6] to-[#ffffff] text-gray-800">
<Navbar />

  <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
    {/* Header Section */}
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-10"
    >
      <h2 className="text-2xl font-semibold text-[#d4af37] mb-2 tracking-wide">
        PROJECT DETAILS
      </h2>
      <h1 className="text-5xl font-bold mb-4">{model.name}</h1>
      <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {model.description}
      </p>
    </motion.div>

    {/* 3D Viewer Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
    >
      <div className="w-full h-[500px]">
        <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 3, 3]} intensity={1} />
          <OrbitControls enableZoom enablePan={false} />
          <ModelViewer url={model.glbUrl} />
        </Canvas>
      </div>
    </motion.div>

    {/* Design Overview Section */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mt-12 bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
    >
      <h3 className="text-3xl font-semibold text-[#d4af37] mb-4">
        Design Overview
      </h3>
      <p className="text-gray-700 leading-relaxed text-lg">
        The Corporate Tower showcases structural precision and architectural sophistication.
        Its open floor plans and reflective glass façade redefine workspace aesthetics in
        the modern cityscape, ensuring functionality without compromising style.
      </p>
    </motion.div>
  </div>
</div>


);
};

export default CorporateTowerView;