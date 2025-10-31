// ViewPage.jsx
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Bounds } from "@react-three/drei";
import axios from "axios";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

/**
 * Error boundary to catch Canvas/render errors (Three/GLTF failures)
 */
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "An error occurred." };
  }
  componentDidCatch(error, info) {
    console.error("Canvas error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-red-400">
            <p className="font-medium">Unable to load 3D model.</p>
            <p className="text-sm mt-1">{this.state.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Model primitive component that uses useGLTF.
 * Keep as a separate component so errors are isolated.
 */
const Model = ({ url }) => {
  // useGLTF throws while loading — we wrap in Suspense above.
  const { scene } = useGLTF(url, true);
  return <primitive object={scene} />;
};

/**
 * GLBViewer: small wrapper that sets up Canvas and Bounds/Center.
 * Safe-guards: will not attempt to render if url is falsy.
 */
const GLBViewer = ({ url, canvasKey }) => {
  if (!url) {
    return (
      <div className="w-full h-64 bg-gray-900 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">No model file available</p>
      </div>
    );
  }

  // Preload (helps next-time load)
  try {
    useGLTF.preload(url);
  } catch (e) {
    // preload may throw if url invalid; ignore
  }

  return (
    <div className="w-full h-64 bg-black rounded-xl overflow-hidden">
      <Canvas key={canvasKey} camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <OrbitControls enableZoom enablePan enableRotate autoRotate autoRotateSpeed={1.2} />
        <Center>
          <Bounds fit clip observe margin={1.2}>
            <CanvasErrorBoundary>
              <Suspense
                fallback={
                  <mesh>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshStandardMaterial />
                  </mesh>
                }
              >
                <Model url={url} />
              </Suspense>
            </CanvasErrorBoundary>
          </Bounds>
        </Center>
      </Canvas>
    </div>
  );
};

/**
 * Main ViewPage component
 */
const ViewPage = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // adjust this endpoint to your backend; earlier you used /models or /api/models
  const MODELS_ENDPOINTS = [
    "http://localhost:8009/models",
    "http://localhost:8009/api/models",
  ];

  const fetchModels = async () => {
    setLoading(true);
    setError("");
    try {
      // try endpoints in order until one succeeds
      let res = null;
      for (const ep of MODELS_ENDPOINTS) {
        try {
          res = await axios.get(ep);
          if (res && res.data) break;
        } catch (e) {
          // try next
        }
      }
      if (!res || !res.data) {
        throw new Error("Could not fetch models from backend.");
      }

      // Ensure array and sort newest first if createdAt exists
      let data = Array.isArray(res.data) ? res.data : [];
      // Put latest first if createdAt exists; otherwise reverse to put newest first
      if (data.length > 0 && data[0].createdAt) {
        data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        data = data.slice().reverse();
      }

      setModels(data);
    } catch (err) {
      console.error("Error fetching models:", err);
      setError("Failed to load models. Check backend & network.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();

    // Optional polling so newly uploaded models appear as new cards automatically.
    // If you don't want polling, remove interval code.
    const interval = setInterval(fetchModels, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper: resolve filename from backend model object (support many possible field names)
  const resolveFileName = (model) => {
    if (!model) return null;
    return model.fileData || model.file || model.filename || model.name || model.fileName || null;
  };

  // Build full URL for GLB (adjust if your server serves at different path)
  const buildGLBUrl = (fileName) => {
    if (!fileName) return null;
    // ensure no double slashes
    return `http://localhost:8009/uploads/${fileName}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf0] via-[#fff7e6] to-[#ffffff] font-poppins text-gray-900">
      <Navbar />

      <div className="px-6 md:px-12 lg:px-20 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#d4af37] mb-8"
        >
          Architectural Model Gallery
        </motion.h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading models...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : models.length === 0 ? (
          <div className="text-center text-gray-600">No models uploaded yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model) => {
              const fileName = resolveFileName(model);
              const url = buildGLBUrl(fileName);
              const canvasKey = fileName || model._id || model.id; // forces remount when file changes

              return (
                <motion.div
                  key={model._id || model.id || canvasKey}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
                >
                  {/* Viewer area */}
                  <GLBViewer url={url} canvasKey={canvasKey} />

                  {/* Info */}
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-[#333] truncate">
                      {model.title || "Untitled Model"}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                      {model.description || "No description provided."}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-gray-500">
                        {model.createdAt
                          ? `Uploaded: ${new Date(model.createdAt).toLocaleString()}`
                          : ""}
                      </p>

                      {fileName ? (
                        <a
                          href={buildGLBUrl(fileName)}
                          download={fileName}
                          className="bg-[#d4af37] hover:bg-[#b8902f] text-white text-xs font-medium py-2 px-3 rounded-full shadow"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-xs text-red-500">No file</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPage;
