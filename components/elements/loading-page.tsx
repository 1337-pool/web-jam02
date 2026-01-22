"use client"

import { motion } from "framer-motion"

const AnimatedLogo1337 = () => {
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
      className="w-[280px] h-[75px] md:w-[380px] md:h-[100px] lg:w-[450px] lg:h-[120px]"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        stroke="white"
        strokeWidth="0.5"
        fill="white"
        custom={0}
        variants={pathVariants}
      />
      <motion.path
        d="M2.8333 17.6623H5.92418V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        fill="white"
        custom={0}
        variants={fillVariants}
      />
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        stroke="white"
        strokeWidth="0.5"
        fill="white"
        custom={1}
        variants={pathVariants}
      />
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        fill="white"
        custom={1}
        variants={fillVariants}
      />
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        stroke="white"
        strokeWidth="0.5"
        fill="white"
        custom={2}
        variants={pathVariants}
      />
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        fill="white"
        custom={2}
        variants={fillVariants}
      />
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        stroke="white"
        strokeWidth="0.5"
        fill="white"
        custom={3}
        variants={pathVariants}
      />
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        fill="white"
        custom={3}
        variants={fillVariants}
      />
    </motion.svg>
  )
}

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <motion.div
        className="relative z-10"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          key={Date.now()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: [
              "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
              "drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))",
              "drop-shadow(0 0 0px rgba(255, 255, 255, 0))"
            ]
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            filter: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <RepeatingLogo />
        </motion.div>
      </motion.div>
      <motion.div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.p 
          className="text-white/50 text-sm tracking-[0.3em] uppercase font-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading
        </motion.p>
      </motion.div>
    </div>
  )
}

function RepeatingLogo() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          }
        }
      }}
    >
      <RepeatingSVG />
    </motion.div>
  )
}

function RepeatingSVG() {
  const pathVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0 
    },
    visible: (i: number) => ({
      pathLength: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      transition: {
        pathLength: {
          delay: i * 0.2,
          duration: 3,
          times: [0, 0.4, 0.8, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        },
        opacity: {
          delay: i * 0.2,
          duration: 3,
          times: [0, 0.1, 0.8, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        }
      }
    })
  }

  const fillVariants = {
    hidden: { 
      fillOpacity: 0
    },
    visible: (i: number) => ({
      fillOpacity: [0, 0, 1, 1, 0],
      transition: {
        delay: i * 0.2,
        duration: 3,
        times: [0, 0.35, 0.5, 0.8, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5,
      }
    })
  }

  return (
    <motion.svg
      width="380"
      height="100"
      viewBox="0 0 76 20"
      fill="none"
      className="w-[280px] h-[75px] md:w-[380px] md:h-[100px] lg:w-[450px] lg:h-[120px]"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        stroke="white"
        strokeWidth="0.5"
        fill="transparent"
        custom={0}
        variants={pathVariants}
      />
      <motion.path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        fill="white"
        custom={0}
        variants={fillVariants}
      />
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        stroke="white"
        strokeWidth="0.5"
        fill="transparent"
        custom={1}
        variants={pathVariants}
      />
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        fill="white"
        custom={1}
        variants={fillVariants}
      />
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        stroke="white"
        strokeWidth="0.5"
        fill="transparent"
        custom={2}
        variants={pathVariants}
      />
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        fill="white"
        custom={2}
        variants={fillVariants}
      />
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        stroke="white"
        strokeWidth="0.5"
        fill="transparent"
        custom={3}
        variants={pathVariants}
      />
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        fill="white"
        custom={3}
        variants={fillVariants}
      />
    </motion.svg>
  )
}
