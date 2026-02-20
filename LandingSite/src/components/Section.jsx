import { motion } from "framer-motion";

import SectionSvg from "../assets/svg/SectionSvg";

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      id={id}
      className={`relative ${
        customPaddings ||
        `py-10 lg:py-16 xl:py-20 ${crosses && "lg:py-32 xl:py-40"}`
      } ${className || ""}`}
    >
      <motion.div variants={itemVariants}>
        {children}
      </motion.div>

      <div
        className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10"
        aria-hidden
      />
      <div
        className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10"
        aria-hidden
      />

      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 ${
              crossesOffset || ""
            } pointer-events-none lg:block xl:left-10 right-10`}
            aria-hidden
          />

          <SectionSvg crossesOffset={`${crossesOffset || ""}`} />
        </>
      )}
    </motion.section>
  );
};

export default Section;
