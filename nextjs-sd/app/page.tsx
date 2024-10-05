"use client";

import ContactUs from "@/components/pages/ContactUs";
import Projects from "@/components/pages/Projects";
import Services from "@/components/pages/Services";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import TopHeader from "@/components/pages/TopHeader";
import Title from "@/components/pages/Title";
import TitleScrolling from "@/components/pages/TitleScrolling";

// Define a reusable animation variant
const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  // InView hooks for each section
  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true });
  const [contactRef, contactInView] = useInView({ triggerOnce: true });

  // Animation controls
  const headerControls = useAnimation();
  const servicesControls = useAnimation();
  const projectsControls = useAnimation();
  const pricingControls = useAnimation();
  const contactControls = useAnimation();

  // Trigger animation based on section visibility
  useEffect(() => {
    if (headerInView) headerControls.start("visible");
    if (servicesInView) servicesControls.start("visible");
    if (projectsInView) projectsControls.start("visible");
    if (pricingInView) pricingControls.start("visible");
    if (contactInView) contactControls.start("visible");
  }, [
    headerInView,
    servicesInView,
    projectsInView,
    pricingInView,
    contactInView,
    headerControls,
    servicesControls,
    projectsControls,
    pricingControls,
    contactControls,
  ]);

  return (
    <div className="bg-primary min-h-screen font-karla">
      <TopHeader />
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerControls}
        variants={revealVariants}
      >
        {/* <Header /> */}

        <Title />
        <TitleScrolling />
      </motion.div>

      <motion.div
        ref={servicesRef}
        initial="hidden"
        animate={servicesControls}
        variants={revealVariants}
      >
        <Services />
      </motion.div>

      <motion.div
        ref={projectsRef}
        initial="hidden"
        animate={projectsControls}
        variants={revealVariants}
      >
        <Projects />
      </motion.div>

      <motion.div
        ref={pricingRef}
        initial="hidden"
        animate={pricingControls}
        variants={revealVariants}
      >
        {/* <Pricing /> */}
      </motion.div>

      <motion.div
        ref={contactRef}
        initial="hidden"
        animate={contactControls}
        variants={revealVariants}
      >
        <ContactUs />
      </motion.div>
    </div>
  );
}
