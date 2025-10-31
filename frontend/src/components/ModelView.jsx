import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

// 3D Model Viewer
const ModelViewer = ({ url }) => {
const { scene } = useGLTF(url);
return (
<Center>
<primitive object={scene} scale={1.5} />
</Center>
);
};


const ModelDetailsPage = () => {
const model = {
name: "Luxury Modern Villa",
description:
"This luxurious modern villa combines sleek architectural lines, natural textures, and spacious interiors. Designed for elegance and functionality, it blends contemporary minimalism with warm, ambient comfort. The villa emphasizes open spaces, glass facades, and a serene connection with nature.",
glbUrl: "/models/villa.glb", 
};

return (
<div className="min-h-screen bg-gradient-to-br from-[#fffaf0] via-[#fff7e6] to-[#ffffff] text-gray-800">
<Navbar />

  {/* Page Container */}
  <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
    {/* Title Section */}
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
          <OrbitControls enableZoom />
          <ModelViewer url={model.glbUrl} />
        </Canvas>
      </div>
    </motion.div>

    {/* Info Section */}
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
        The model demonstrates the harmony between luxury and simplicity,
        featuring minimalistic forms, sustainable materials, and innovative
        spatial planning. It is ideal for high-end residential architecture
        showcasing a perfect balance of aesthetics and comfort.
      </p>
    </motion.div>
  </div>
</div>


);
};

export default ModelDetailsPage;