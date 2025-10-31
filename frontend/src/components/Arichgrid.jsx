import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import villa from "../assets/images/villa.jpg";
import Tower from "../assets/images/Tower.jpg";
import Apartment from "../assets/images/Apartment.jpg";
import arrow from "../assets/images/arrow-right.svg";

const ArchGrid = () => {
const navigate = useNavigate();

const designs = [
{
id: 1,
imageUrl: villa,
text: "Luxury Villa",
desc: "Modern villa with open terrace and pool surrounded by nature.",
route: "/view/Luxury-Villa",
},
{
id: 2,
imageUrl: Tower,
text: "Corporate Tower",
desc: "Glass façade skyscraper with minimal interiors and urban style.",
route: "/towerdetails",
},
{
id: 3,
imageUrl: Apartment,
text: "Urban Apartment",
desc: "Compact, sleek, and smartly designed modern apartment layout.",
route: "/Apartmentdetails",
},
];

const handleLearnMore = (route) => {
navigate(route);
};

return (
<div className="bg-gradient-to-br from-[#fffaf0] via-[#fff7e6] to-[#ffffff] px-6 py-16 md:px-12 lg:px-24">
{/* Section Header */}
<section className="text-center mb-16">
<h2 className="text-2xl font-semibold text-[#d4af37] mb-2 tracking-wide">
ARCHITECTURE GALLERY
</h2>
<h1 className="text-4xl md:text-5xl font-bold text-gray-800">
Explore Modern Architectural Masterpieces
</h1>
</section>

  {/* Card Section */}
  <div className="flex flex-col gap-12">
    {designs.map((design, index) => (
      <motion.div
        key={design.id}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.3,
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-8 border border-gray-100 rounded-3xl shadow-lg bg-white hover:shadow-2xl hover:border-[#d4af37] transition-all duration-500 overflow-hidden"
      >
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <motion.img
            src={design.imageUrl}
            alt={design.text}
            className="w-full h-72 object-cover md:h-96 transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Text Content */}
        <div className="p-8 md:w-1/2 text-center md:text-left">
          <h3 className="text-3xl font-semibold text-[#d4af37] mb-4">
            {design.text}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {design.desc}
          </p>
          <button
            onClick={() => handleLearnMore(design.route)}
            className="inline-flex items-center gap-2 text-[#d4af37] font-semibold hover:text-[#b8902f] transition-all duration-300"
          >
            Learn More
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
          </button>
        </div>
      </motion.div>
    ))}
  </div>

  {/* View More Button */}
  <motion.div
    className="mt-20 text-center"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 1 }}
    viewport={{ once: true }}
  >
    <button
      onClick={() => navigate("/view-all")}
      className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#b8902f] text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105"
    >
      View More Projects
      <motion.img
        src={arrow}
        alt="arrow"
        className="w-5 h-5"
        animate={{ x: [0, 5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </button>
  </motion.div>
</div>


);
};

export default ArchGrid;