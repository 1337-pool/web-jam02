"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MatrixRain from "./elements/matrix-rain"
import AnimatedLogoGreen from "./elements/animated-logo-green"
// import MatrixRain from "@/components/matrix-rain"
// import AnimatedLogoGreen from "@/components/animated-logo-green"

const AnimatedLogo = () => {
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

  const glowVariants = {
    animate: {
      filter: [
        "drop-shadow(0 0 0px rgba(10, 10, 10, 0))",
        "drop-shadow(0 0 20px rgba(10, 10, 10, 0.3))",
        "drop-shadow(0 0 0px rgba(10, 10, 10, 0))"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
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
      variants={glowVariants}
    >
      {/* 1 */}
      <motion.path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        stroke="#0a0a0a"
        strokeWidth="0.5"
        fill="#0a0a0a"
        custom={0}
        variants={pathVariants}
      />
      <motion.path
        d="M2.8333 17.6623H5.92418V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        fill="#0a0a0a"
        custom={0}
        variants={fillVariants}
      />
      
      {/* First E */}
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        stroke="#0a0a0a"
        strokeWidth="0.5"
        fill="#0a0a0a"
        custom={1}
        variants={pathVariants}
      />
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        fill="#0a0a0a"
        custom={1}
        variants={fillVariants}
      />
      
      {/* Second E */}
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        stroke="#0a0a0a"
        strokeWidth="0.5"
        fill="#0a0a0a"
        custom={2}
        variants={pathVariants}
      />
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        fill="#0a0a0a"
        custom={2}
        variants={fillVariants}
      />
      
      {/* F */}
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        stroke="#0a0a0a"
        strokeWidth="0.5"
        fill="#0a0a0a"
        custom={3}
        variants={pathVariants}
      />
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        fill="#0a0a0a"
        custom={3}
        variants={fillVariants}
      />
    </motion.svg>
  )
}

const avatars = [
  { src: "https://i.pravatar.cc/150?img=1", fallback: "JD" },
  { src: "https://i.pravatar.cc/150?img=2", fallback: "SM" },
  { src: "https://i.pravatar.cc/150?img=3", fallback: "RK" },
  { src: "https://i.pravatar.cc/150?img=4", fallback: "AL" },
  { src: "https://i.pravatar.cc/150?img=5", fallback: "MJ" },
]

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  }

  const headlineWords = ["Achieve", "More", "with", "Elite", "Access", "Pro"]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Dark */}
      <motion.div 
        className="flex-1 bg-[#0a0a0a] text-white p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center min-h-[60vh] lg:min-h-screen"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Brand */}
          <motion.div 
            variants={itemVariants}
            className="mb-12 md:mb-16"
          >
            <span className="text-neutral-400 text-lg md:text-xl tracking-wide">Business </span>
            <span className="text-white text-lg md:text-xl font-semibold tracking-wide">PRO</span>
          </motion.div>

          {/* Headline with word-by-word animation */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-3 md:mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            className="text-neutral-400 text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-md"
          >
            Enhance your career hunt with increased visibility, first-look opportunities and monetary incentives!
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              className="group relative bg-white text-black px-6 py-3.5 rounded-full flex items-center gap-3 font-medium text-sm md:text-base overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-neutral-200"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <span className="relative z-10">Upgrade to premium</span>
              <motion.span
                className="relative z-10"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 md:mt-20 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {avatars.map((avatar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1.2 + i * 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Avatar className="w-10 h-10 border-2 border-[#0a0a0a] ring-2 ring-neutral-700">
                    <AvatarImage src={avatar.src || "/placeholder.svg"} alt="User avatar" />
                    <AvatarFallback className="bg-neutral-800 text-white text-xs">
                      {avatar.fallback}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              ))}
            </div>
            <motion.p 
              className="text-neutral-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              More than <span className="text-neutral-300 font-medium">1 million</span> medical<br />
              practitioners rely on <span className="text-neutral-300 font-medium">CareerMed</span>
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Section - Matrix Effect with Logo */}
      <motion.div 
        className="flex-1 flex items-center justify-center min-h-[40vh] lg:min-h-screen relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {/* Matrix Rain Background */}
        <MatrixRain />

        {/* Floating animation for logo with glow effect */}
        <motion.div
          className="relative z-10"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 1, 0, -1, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <AnimatedLogoGreen />
        </motion.div>
      </motion.div>
    </div>
  )
}
