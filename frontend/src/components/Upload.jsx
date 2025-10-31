import React, { useState } from "react";
import { motion } from "framer-motion";
import arrow from "../assets/images/arrow-right.svg";
import Navbar from "./Navbar";

function UploadModel() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [file, setFile] = useState(null);
const [message, setMessage] = useState("");

const handleUpload = async (e) => {
e.preventDefault();

if (!file) {
  setMessage("Please select a file first!");
  return;
}

const formData = new FormData();
formData.append("title", title);
formData.append("description", description);
formData.append("model", file);

try {
  const response = await fetch("/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (response.ok) {
    setMessage("Upload successful!");
    setTitle("");
    setDescription("");
    setFile(null);
  } else {
    setMessage("Upload failed: " + data.error);
  }
} catch (error) {
  console.error("Error uploading file:", error);
  setMessage(" Upload failed!");
}


};

return (
<div>
  <Navbar/>
<div className="bg-gradient-to-br from-[#fffaf0] via-[#fff7e6] to-[#ffffff] min-h-screen flex items-center justify-center px-6 py-16">
<motion.div
initial={{ opacity: 0, y: 60 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}
className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-10"
>
{/* Header */}
<div className="text-center mb-8">
<h2 className="text-2xl font-semibold text-[#d4af37] mb-2 tracking-wide">
UPLOAD YOUR DESIGN
</h2>
<h1 className="text-4xl font-bold text-gray-800">
Showcase Your 3D Architecture
</h1>
<p className="text-gray-500 mt-3 text-sm">
Upload your .glb 3D model along with its title and short description.
</p>
</div>

    {/* Upload Form */}
    <form onSubmit={handleUpload} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Model Title
        </label>
        <input
          type="text"
          placeholder="Enter model title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] shadow-sm"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          placeholder="Enter a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] shadow-sm resize-none"
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Upload 3D Model (.glb)
        </label>
        <input
          type="file"
          accept=".glb"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-gray-700 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer bg-gray-50 hover:border-[#d4af37] transition-all duration-300"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#b8902f] text-white font-semibold py-3 rounded-full shadow-lg transition-all duration-300"
      >
        Upload Model
        <motion.img
          src={arrow}
          alt="arrow"
          className="w-5 h-5"
          animate={{ x: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </form>

    {/* Message */}
    {message && (
      <p
        className={`mt-6 text-center font-medium ${
          message.includes("✅")
            ? "text-green-600"
            : message.includes("⚠️")
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {message}
      </p>
    )}
  </motion.div>
</div>
</div>

);
}

export default UploadModel;