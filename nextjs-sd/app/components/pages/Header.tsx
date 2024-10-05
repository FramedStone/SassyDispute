"use client";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Framer Motion variants

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } },
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <header className="flex justify-between items-start border border-black relative text-black">
      <div
        className="flex-1 flex items-end sm:border-r border-black p-8 relative"
        style={{ height: "500px" }}
      >
        <div className="absolute top-5 left-0 pl-4">
          <h1 className="text-2xl font-bold flex flex-col">
            <div>LOGO</div>
            <div>HERE</div>
            <div>HERE</div>
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-end px-6 pb-6 lg:px-[50px] lg:pb-[50px]">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            I'm Milids, A Self-taught UI/UX Designer
          </motion.h2>
          <motion.p
            className="mt-4 text-base lg:text-lg"
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
          >
            Based in Cheras, Malaysia. I'm passionate about improving the lives
            of others through design and learning new things every day.
          </motion.p>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex p-8">
        <ul className="flex flex-col space-y-4 text-xl font-semibold text-right">
          {["Home", "Services", "My Project", "Contact"].map((item, index) => (
            <motion.li
              key={index}
              className="relative group cursor-pointer text-right"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <div className="flex items-center justify-between">
                <motion.a
                  href={`#${item.replace(" ", "").toLowerCase()}`}
                  className="transition-all duration-300 group-hover:text-yellow-800 group-hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
                <motion.span
                  className="absolute -right-11 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-400 group-hover:text-yellow-800"
                  whileHover={{ x: -5 }}
                >
                  <FaMinus />
                </motion.span>
              </div>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden absolute top-0 right-0 border-l border-b border-black">
        <button
          onClick={toggleMenu}
          className="text-2xl font-bold focus:outline-none p-5"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobileMenu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden absolute top-[72px] right-0 bg-yellow-400 border border-black shadow-md rounded-md p-4"
          >
            <ul className="flex flex-col space-y-4 text-lg font-semibold text-right">
              {["Home", "Services", "My Project", "Contact"].map(
                (item, index) => (
                  <motion.a
                    key={index}
                    href={`/${item.replace(" ", "")}`}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 * index }}
                    className="cursor-pointer"
                  >
                    <li>{item}</li>
                  </motion.a>
                )
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
