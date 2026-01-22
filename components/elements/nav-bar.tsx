"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LogOutIcon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contacts", href: "/contacts" },
]

function AnimatedLogo1337({ className = "", isAnimating = false }: { className?: string; isAnimating?: boolean }) {
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
          delay: i * 0.15,
          duration: 0.8,
          ease: "easeInOut",
        },
        opacity: {
          delay: i * 0.15,
          duration: 0.2,
          ease: "easeInOut",
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
        delay: i * 0.15 + 0.6,
        duration: 0.3,
        ease: "easeInOut",
      }
    })
  }

  return (
    <motion.svg
      viewBox="0 0 76 20"
      fill="none"
      className={className}
      initial="hidden"
      animate={isAnimating ? "visible" : "visible"}
      key={isAnimating ? "animating" : "static"}
    >
      {/* 1 */}
      <motion.path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="transparent"
        custom={0}
        variants={pathVariants}
      />
      <motion.path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        fill="currentColor"
        custom={0}
        variants={fillVariants}
      />
      
      {/* 3 (first) */}
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="transparent"
        custom={1}
        variants={pathVariants}
      />
      <motion.path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        fill="currentColor"
        custom={1}
        variants={fillVariants}
      />
      
      {/* 3 (second) */}
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="transparent"
        custom={2}
        variants={pathVariants}
      />
      <motion.path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        fill="currentColor"
        custom={2}
        variants={fillVariants}
      />
      
      {/* 7 */}
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="transparent"
        custom={3}
        variants={pathVariants}
      />
      <motion.path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        fill="currentColor"
        custom={3}
        variants={fillVariants}
      />
    </motion.svg>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const {data: session} = useSession()

  // Trigger animation on initial load
  useEffect(() => {
    setAnimationKey(1)
  }, [])

  const handleLogoHover = () => {
    setIsLogoHovered(true)
    setAnimationKey(prev => prev + 1)
  }

  const handleLogin = async () => {
    await signIn("42-school")
  }

  const handleLogout = async () => {
    await signOut()
  }

  const nameToInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase())
    .join('');
}

  const handleLogoLeave = () => {
    setIsLogoHovered(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent backdrop-blur ">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
          >
            <AnimatedLogo1337 
              key={animationKey}
              className="h-6 w-auto text-white" 
              isAnimating={animationKey > 0}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            {
                session?.user ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <div className="flex items-center align-middle gap-2">
                                    <code>{session?.user.name}</code>
                                    <Avatar>
                                        <AvatarImage src={session?.user.image || ""} alt="@shadcn" />
                                        <AvatarFallback>
                                            {nameToInitials(session?.user.name || "t t")}
                                        </AvatarFallback>
                                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                                    </Avatar>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOutIcon />
                                        Logout
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                : 

                    <Button className="rounded-full px-6 bg-white text-black hover:bg-gray-200" onClick={handleLogin}>
                        Login
                    </Button>
                    
                
            }
          </div>
          <button
            type="button"
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-400 transition-colors hover:text-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {
                session?.user ?
                    <div className="flex justify-around">
                        <Button onClick={handleLogout}>
                            <LogOutIcon />
                            Logout
                        </Button>
                        <div className="flex items-center align-middle gap-2">
                            <code>{session?.user.name}</code>
                            <Avatar>
                                <AvatarImage src={session?.user.image || ""} alt="@shadcn" />
                                <AvatarFallback>{nameToInitials(session?.user.name || "t t")}</AvatarFallback>
                                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                            </Avatar>
                        </div>
                    </div>
                : 

                    <Button className="rounded-full px-6 bg-white text-black hover:bg-gray-200" onClick={handleLogin}>
                        Login
                    </Button>
            }
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
