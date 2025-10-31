import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds, Center } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileDown } from "lucide-react";


// 3D Model Component with smooth auto-rotation
function Model() {
const gltf = useGLTF("/models/modern_villa.glb"); // make sure this file exists in public/models/
const ref = useRef();

useFrame(() => {
if (ref.current) {
ref.current.rotation.y += 0.005; // smooth continuous rotation
}
});

return <primitive ref={ref} object={gltf.scene} />;
}

const Spotlight = () => {
const navigate = useNavigate();

return (
<div className="bg-gradient-to-br from-[#fffaf0] via-[#fff7e6] to-[#ffffff] text-gray-900 py-16 px-4 md:px-12 lg:px-24 font-poppins min-h-screen">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
{/* Left Side */}
<div className="md:w-1/2 space-y-6 text-center md:text-left">
<h2 className="text-2xl font-semibold text-[#d4af37] tracking-wide">
ARCHITECTURE SPOTLIGHT
</h2>
<h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
Step Into the World of{" "}
<span className="text-blue-800">3D Architecture</span>
</h1>
<p className="text-lg text-gray-600">
Experience intricate architectural masterpieces in interactive 3D.
<br /> Perfect for designers, students, and creative explorers.
</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        {/* <button
          onClick={() => navigate("/models")}
          className="bg-[#d4af37] hover:bg-[#b8902d] text-white px-6 py-3 rounded-md flex items-center gap-2 transition"
        >
          <FileDown size={18} />
          View 3D Models
        </button> */}
        <button
            onClick={() => navigate("/view-all")}
          className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white px-6 py-3 rounded-md flex items-center gap-2 transition"
        >
          Learn More
          <ArrowRight size={18} />
        </button>
      </div>
    </div>

    {/* Right Side - 3D Canvas */}
    <div className="md:w-1/2 h-[500px] w-full bg-gray-900 rounded-3xl shadow-lg">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} />
        <Bounds fit clip observe margin={1.2}>
          <Center>
            <Model />
          </Center>
        </Bounds>
      </Canvas>
    </div>
  </div>
</div>


);
};

export default Spotlight;