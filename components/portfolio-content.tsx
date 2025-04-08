"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Importar componentes de secciones
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ExperienceSection from "@/components/sections/experience-section"
import SkillsSection from "@/components/sections/skills-section"
import EducationSection from "@/components/sections/education-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"
import { Linkedin } from "lucide-react"

import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import MobileNav from "@/components/mobile-nav"
import { useResponsive } from "@/hooks/use-responsive"

// Importar el componente ThanosSnapEffect
import ThanosSnapEffect from "@/components/thanos-snap-effect"

// Importar el nuevo componente RaccoonRevival
import RaccoonRevival from "@/components/raccoon-revival"

// Importar el componente SoundEffect
import SoundEffect from "@/components/sound-effect"

export default function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("home")
  const headerRef = useRef(null)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8])
  const { t } = useLanguage()
  const { isMobile, isTablet } = useResponsive()

  const sections = ["home", "acerca-de-mi", "experiencia", "skills", "educacion", "projects", "contacto"]
  const sectionNames = {
    home: t("nav.home"),
    "acerca-de-mi": t("nav.about"),
    experiencia: t("nav.experience"),
    skills: t("nav.skills"),
    educacion: t("nav.education"),
    projects: t("nav.projects"),
    blogs: t("nav.blogs"),
    contacto: t("nav.contact"),
  }

  // Estado para controlar el efecto Thanos
  const [snapActive, setSnapActive] = useState(false)
  const [snapCooldown, setSnapCooldown] = useState(false)
  const [hasSnapped, setHasSnapped] = useState(false)
  const [playSound, setPlaySound] = useState(false)

  // Estado para controlar el renacimiento de mapaches
  const [raccoonRevival, setRaccoonRevival] = useState(false)

  // Function to play audio immediately on hover
  const playHoverAudio = () => {
    try {
      console.log("Playing hover audio")
      const audio = new Audio("/Aundio.wav")
      audio.volume = 1.0
      audio.play().catch((error) => {
        console.error("Error playing hover audio:", error)
        // Try fallback paths if the main path fails
        const fallbackAudio = new Audio("/sounds/Aundio.wav")
        fallbackAudio.volume = 1.0
        fallbackAudio.play().catch((e) => console.error("Fallback audio failed too:", e))
      })
    } catch (error) {
      console.error("Error creating hover audio:", error)
    }
  }

  // Función para manejar el efecto Thanos
  const handleThanosSnap = () => {
    if (snapCooldown || hasSnapped) {
      return
    }

    // Add a small delay to prevent accidental triggers
    const hoverTimer = setTimeout(() => {
      console.log("Activating Thanos effect")

      // Activar el efecto
      setSnapActive(true)
      setSnapCooldown(true)
      setPlaySound(true)

      // Establecer un cooldown para evitar múltiples activaciones accidentales
      setTimeout(() => {
        setSnapCooldown(false)
      }, 8000)

      // Marcar que ya se ha realizado el snap
      setHasSnapped(true)
    }, 300) // 300ms delay before activation

    // Clean up timer if mouse leaves before delay completes
    return () => clearTimeout(hoverTimer)
  }

  // Efecto para manejar el scroll y actualizar la sección activa
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (isMobile ? 70 : 100)

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections, isMobile])

  return (
    <>
      <div className="min-h-screen bg-[#0a0b16] text-white">
        {/* Componente de efecto Thanos */}
        <ThanosSnapEffect
          isActive={snapActive}
          onComplete={() => {
            console.log("Snap effect completed")
            // Desactivar el efecto cuando termine
            setSnapActive(false)
            // Ahora que el efecto Thanos ha terminado, activamos el renacimiento de mapaches
            setTimeout(() => {
              setRaccoonRevival(true)
            }, 3000) // Pequeño retraso para asegurar que todo se ha limpiado
          }}
        />

        {/* Componente de renacimiento de mapaches - ahora permanente */}
        <RaccoonRevival isActive={raccoonRevival} />

    

        <motion.header
          ref={headerRef}
          className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center"
          style={{
            opacity: headerOpacity,
            backdropFilter: `blur(${headerBlur}px)`,
            backgroundColor: "rgba(10, 11, 22, 0.8)",
          }}
        >
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 relative cursor-pointer"
              onMouseEnter={() => {
                // Play audio immediately on hover
                playHoverAudio()
                // Still trigger the Thanos effect with its conditions
                handleThanosSnap()
              }}
              whileHover={{ scale: snapCooldown ? 1 : 1.1 }}
              title={hasSnapped ? "Ya has usado el poder del Infinito" : "Pasa el cursor para activar el efecto Thanos"}
            >
              <Image
                src="/images/logo.png"
                alt="Franklyn Velásquez Logo"
                width={40}
                height={40}
                className={`w-full h-full object-contain ${snapCooldown ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
              {snapCooldown && (
                <motion.div
                  className="absolute inset-0 bg-gray-800 rounded-full opacity-50 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs text-white">⏱️</span>
                </motion.div>
              )}
              {hasSnapped && !snapCooldown && (
                <motion.div
                  className="absolute inset-0 bg-[#ff3e55]/20 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs text-white">✓</span>
                </motion.div>
              )}
            </motion.div>
            <span className="text-base sm:text-lg md:text-xl font-bold truncate">Franklyn Velásquez</span>
          </motion.div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-3 lg:space-x-6">
                {sections.map((section) => (
                  <motion.li
                    key={section}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: sections.indexOf(section) * 0.1 }}
                  >
                    <a
                      href={`#${section}`}
                      className={`capitalize transition-colors text-sm lg:text-base ${
                        activeSection === section ? "text-[#ff3e55] font-medium" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {sectionNames[section]}
                      
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: sections.length * 0.1 }}
                >
                  <Link
                    href="/blogs"
                    className="capitalize transition-colors text-sm lg:text-base text-gray-400 hover:text-white"
                  >
                    {sectionNames.blogs}
                  </Link>
                </motion.li>
              </ul>
            </nav>

            {/* Mobile Navigation */}
            <MobileNav sections={sections} sectionNames={sectionNames} activeSection={activeSection} />
          </div>
        </motion.header>

        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <footer className="bg-[#0a0b16] text-gray-400 py-6 sm:py-8 text-center border-t border-gray-800">
          <div className="container mx-auto px-4">
            <p className="text-xs sm:text-sm">
              © {new Date().getFullYear()} Franklyn Velásquez. {t("footer.rights")}
            </p>
            <div className="flex justify-center mt-3 sm:mt-4 space-x-3 sm:space-x-4">
              <a
                href="https://github.com/Ltomxd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-[#181717] hover:text-white transition-colors"
              >
                <Github size={isMobile ? 16 : 18} />
              </a>
              <a
                href="https://www.linkedin.com/in/ftoml"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-[#0A66C2] hover:text-white transition-colors"
              >
                <Linkedin size={isMobile ? 16 : 18} />
              </a>
              <a
                href="https://app.hackthebox.com/profile/1767382"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-[#9FEF00] hover:text-[#0D1117] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={isMobile ? 16 : 18}
                  height={isMobile ? 16 : 18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.83 8.01l-8-4.5c-.5-.28-1.17-.28-1.67 0l-8 4.5c-.51.29-.83.84-.83 1.42v5.15c0 .58.32 1.13.83 1.42l8 4.5c.5.28 1.17.28 1.67 0l8-4.5c.51-.29.83-.84.83-1.42V9.43c0-.58-.32-1.13-.83-1.42z" />
                  <path d="M3.37 7.83L12 12.5l8.63-4.67" />
                  <path d="M12 12.5V22" />
                </svg>
              </a>
              <a
                href="mailto:velasquez8014@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-[#EA4335] hover:text-white transition-colors"
              >
                <Mail size={isMobile ? 16 : 18} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
