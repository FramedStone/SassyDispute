"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StripedBackground from "./StripedBackground ";

// Example projects array (You can replace this with your actual data)
const projects = [
  {
    title: "Redesign Case Study",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint...",
    index: 1,
    total: 6,
  },
  {
    title: "E-commerce Platform",
    description:
      "Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud...",
    index: 2,
    total: 6,
  },
  {
    title: "Social Media App",
    description: "Non deserunt ullamco est sit aliqua dolor do amet sint...",
    index: 3,
    total: 6,
  },
  // Add more projects as needed
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Testing() {
  const [currentProject, setCurrentProject] = useState(0);

  // Function to go to the previous project
  const handlePrevious = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Function to go to the next project
  const handleNext = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Desktop View */}
      <div
        id="myproject"
        className="hidden lg:grid grid-cols-5 grid-rows-6 h-screen bg-yellow-400 text-black"
      >
        <div className="row-span-2 col-span-2 bg-black">
          <StripedBackground width="100%" height="100%" />
        </div>
        <div className="row-span-2 col-span-2"></div>
        <div className="row-span-3 col-span-1 bg-black">
          <StripedBackground width="100%" height="100%" />
        </div>
        <div className="col-span-4 row-span-4 p-4 flex flex-col justify-between border-2 border-black">
          <div>
            <h4 className="text-xl font-semibold">My Projects</h4>

            <AnimatePresence mode="wait">
              <motion.div
                key={projects[currentProject].index}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeInVariants}
              >
                <h1 className="text-4xl font-bold mt-2">
                  {projects[currentProject].index}/
                  {projects[currentProject].total}
                </h1>
                <h2 className="text-2xl font-bold mt-4">
                  {projects[currentProject].title}
                </h2>
                <p className="mt-4">{projects[currentProject].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 border border-black flex items-center gap-2"
          >
            Take A Look <span>→</span>
          </motion.button>
        </div>

        <div className="row-span-4 flex justify-between items-center px-4">
          <motion.button
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            className="w-40 h-12 flex items-center justify-center border border-black hover:bg-gray-200"
          >
            <FaChevronLeft className="text-xl text-black" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            className="w-40 h-12 flex items-center justify-center border border-black hover:bg-gray-200"
          >
            <FaChevronRight className="text-xl text-black" />
          </motion.button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden grid grid-cols-2 grid-rows-6 h-screen bg-yellow-400 text-black">
        <div className="row-span-1">
          <StripedBackground width="100%" height="100%" />
        </div>
        <div className="row-span-1"></div>
        <div className="col-span-2 row-span-4 p-4 flex flex-col justify-between border-2 border-black">
          <div>
            <h4 className="text-xl font-semibold">My Projects</h4>

            <AnimatePresence mode="wait">
              <motion.div
                key={projects[currentProject].index}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeInVariants}
              >
                <h1 className="text-4xl font-bold mt-2">
                  {projects[currentProject].index}/
                  {projects[currentProject].total}
                </h1>
                <h2 className="text-2xl font-bold mt-4">
                  {projects[currentProject].title}
                </h2>
                <p className="mt-4">{projects[currentProject].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 border border-black flex items-center gap-2"
          >
            Take A Look <span>→</span>
          </motion.button>
        </div>

        <div className="row-span-1 col-span-2 flex items-center">
          <motion.button
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            className="w-40 h-12 flex items-center justify-center border border-black hover:bg-gray-200"
          >
            <FaChevronLeft className="text-xl text-black" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            className="w-40 h-12 flex items-center justify-center border border-black hover:bg-gray-200"
          >
            <FaChevronRight className="text-xl text-black" />
          </motion.button>
        </div>
        <div className="row-span-1"></div>
        <div className="row-span-1 sm:hidden">
          <StripedBackground width="100%" height="100%" />
        </div>
      </div>
    </>
  );
}
