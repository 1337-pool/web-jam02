"use client"

import { motion } from "framer-motion"

const AnimatedLogoGreen = () => {
  const pathVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0 
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.3,
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1]
        },
        opacity: {
          delay: i * 0.3,
          duration: 0.3
        }
      }
    })
  }

  const fillVariants = {
    hidden: { 
      fillOpacity: 0
    },
    visible: (i: number) => ({
      fillOpacity: 1,
      transition: {
        delay: i * 0.3 + 1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <motion.svg
      width="380"
      height="100"
      viewBox="0 0 76 20"
      fill="none"
      className="w-[300px] h-[80px] md:w-[380px] md:h-[100px] lg:w-[450px] lg:h-[120px]"
      initial="hidden"
      animate="visible"
      style={{
        filter: "drop-shadow(0 0 20px rgba(0, 255, 65, 0.6)) drop-shadow(0 0 40px rgba(0, 255, 65, 0.4)) drop-shadow(0 0 60px rgba(0, 255, 65, 0.2))"
      }}
    >
      {/* 1 */}
      <motion.path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        stroke="#00ff41"
        strokeWidth="0.5"
        fill="none"
        custom={0}
        variants={pathVariants}
      />
      <motion.path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        fill="#00ff41"
        custom={0}
        variants={fillVariants}
      />
      
      {/* First E */}
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        stroke="#00ff41"
        strokeWidth="0.5"
        fill="none"
        custom={1}
        variants={pathVariants}
      />
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        fill="#00ff41"
        custom={1}
        variants={fillVariants}
      />
      
      {/* Second E */}
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        stroke="#00ff41"
        strokeWidth="0.5"
        fill="none"
        custom={2}
        variants={pathVariants}
      />
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        fill="#00ff41"
        custom={2}
        variants={fillVariants}
      />
      
      {/* F */}
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        stroke="#00ff41"
        strokeWidth="0.5"
        fill="none"
        custom={3}
        variants={pathVariants}
      />
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        fill="#00ff41"
        custom={3}
        variants={fillVariants}
      />
    </motion.svg>
  )
}

export default AnimatedLogoGreen
