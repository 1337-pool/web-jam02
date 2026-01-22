"use client"

import { motion } from "framer-motion"
// import { Navbar } from "@/components/navbar"

function AnimatedNotFound() {
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
          delay: i * 0.15,
          duration: 3.5,
          times: [0, 0.4, 0.8, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        },
        opacity: {
          delay: i * 0.15,
          duration: 3.5,
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
        delay: i * 0.15,
        duration: 3.5,
        times: [0, 0.35, 0.5, 0.8, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5,
      }
    })
  }

  return (
    <motion.svg
      viewBox="0 0 280 50"
      fill="none"
      className="w-[320px] h-[60px] md:w-[450px] md:h-[80px] lg:w-[560px] lg:h-[100px]"
      initial="hidden"
      animate="visible"
    >
      {/* N */}
      <motion.path
        d="M0 40V10H5V32L18 10H23V40H18V18L5 40H0Z"
        stroke="white"
        strokeWidth="0.8"
        fill="transparent"
        custom={0}
        variants={pathVariants}
      />
      <motion.path
        d="M0 40V10H5V32L18 10H23V40H18V18L5 40H0Z"
        fill="white"
        custom={0}
        variants={fillVariants}
      />

      {/* O */}
      <motion.path
        d="M30 10H50V40H30V10ZM35 15V35H45V15H35Z"
        stroke="white"
        strokeWidth="0.8"
        fill="transparent"
        custom={1}
        variants={pathVariants}
      />
      <motion.path
        d="M30 10H50V40H30V10ZM35 15V35H45V15H35Z"
        fill="white"
        custom={1}
        variants={fillVariants}
      />

      {/* T */}
      <motion.path
        d="M55 10H80V15H70V40H65V15H55V10Z"
        stroke="white"
        strokeWidth="0.8"
        fill="transparent"
        custom={2}
        variants={pathVariants}
      />
      <motion.path
        d="M55 10H80V15H70V40H65V15H55V10Z"
        fill="white"
        custom={2}
        variants={fillVariants}
      />

      {/* F */}
      <motion.path
        d="M105 10H130V15H110V22H125V27H110V40H105V10Z"
        stroke="white"
        strokeWidth="0.8"
        fill="transparent"
        custom={3}
        variants={pathVariants}
      />
      <motion.path
        d="M105 10H130V15H110V22H125V27H110V40H105V10Z"
        fill="white"
        custom={3}
        variants={fillVariants}
      />

      {/* O */}
      <motion.path
        d="M135 10H155V40H135V10ZM140 15V35H150V15H140Z"
        stroke="white"
        strokeWidth="0.8"
        fill="transparent"
        custom={4}
        variants={pathVariants}
      />
      <motion.path
        d="M135 10H155V40H135V10ZM140 15V35H150V15H140Z"
        fill="white"
        custom={4}
        variants={fillVariants}
      />

      {/* U */}
      <motion.path
        d="M160 10H165V35H180V10H185V40H160V10Z"
        stroke="white"
        strokeWidth="0.8"
        fill="transparent"
        custom={5}
        variants={pathVariants}
      />
      <motion.path
        d="M160 10H165V35H180V10H185V40H160V10Z"
        fill="white"
        custom={5}
        variants={fillVariants}
      />

      {/* N */}
      <motion.path
        d="M190 40V10H195V32L208 10H213V40H208V18L195 40H190Z"
        stroke="white"
        strokeWidth="0.8"
        fill="transparent"
        custom={6}
        variants={pathVariants}
      />
      <motion.path
        d="M190 40V10H195V32L208 10H213V40H208V18L195 40H190Z"
        fill="white"
        custom={6}
        variants={fillVariants}
      />

      {/* D */}
      <motion.path
        d="M218 10H238C245 10 250 15 250 25C250 35 245 40 238 40H218V10ZM223 15V35H237C241 35 245 32 245 25C245 18 241 15 237 15H223Z"
        stroke="white"
        strokeWidth="0.8"
        fill="transparent"
        custom={7}
        variants={pathVariants}
      />
      <motion.path
        d="M218 10H238C245 10 250 15 250 25C250 35 245 40 238 40H218V10ZM223 15V35H237C241 35 245 32 245 25C245 18 241 15 237 15H223Z"
        fill="white"
        custom={7}
        variants={fillVariants}
      />
    </motion.svg>
  )
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden">
      {/* <Navbar /> */}
      
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-[500px] h-[300px] rounded-full bg-white/5 blur-3xl"
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

        {/* Animated text */}
        <motion.div
          className="relative z-10"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
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
            <AnimatedNotFound />
          </motion.div>
        </motion.div>

        {/* 404 code */}
        <motion.div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.p 
            className="text-white/50 text-sm tracking-[0.3em] uppercase font-light"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Error 404
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
