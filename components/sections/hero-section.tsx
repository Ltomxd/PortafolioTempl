"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Download } from "lucide-react"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import TerminalWindow from "@/components/ui/terminal-window"
import ParticlesBackground from "@/components/ui/ParticlesBackground"
import { useLanguage } from "@/contexts/language-context"
import { useResponsive } from "@/hooks/use-responsive"
import { useCVGenerator } from "@/hooks/use-cv-generator"

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { t } = useLanguage()
  const { isMobile, isTablet } = useResponsive()
  const { handleGenerateCV, isGenerating } = useCVGenerator()

  // Definimos las variables de traducción antes del return
  const pentesterText = t("hero.roles.pentester")
  const developerText = t("hero.roles.developer")
  const consultantText = t("hero.roles.consultant")

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b16] via-[#0a0b16] to-[#0a0b16] z-10" />
        <ParticlesBackground />
      </div>

      <div className="container mx-auto px-4 z-10" ref={ref}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-4 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t("hero.hello")}
            </motion.h2>
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("hero.iam")} <span className="text-[#ff3e55]">Franklyn Velásquez</span>,
            </motion.h1>
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-[#00e5ff]">
                <TypeAnimation
                  sequence={[pentesterText, 2000, developerText, 2000, consultantText, 2000]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-6 sm:mb-8"
            >
              <a
                href="https://github.com/Ltomxd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#181717] dark:hover:text-white transition-colors"
              >
                <Github size={isMobile ? 20 : 24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ftoml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0A66C2] transition-colors"
              >
                <Linkedin size={isMobile ? 20 : 24} />
              </a>
              <a
                href="https://app.hackthebox.com/profile/1767382"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#9FEF00] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={isMobile ? 20 : 24}
                  height={isMobile ? 20 : 24}
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="#contacto"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-transparent border border-[#ff3e55] text-white font-medium hover:bg-[#ff3e55]/10 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,62,85,0.5)] flex items-center justify-center text-sm sm:text-base"
              >
                {t("hero.contactMe")}
              </Link>
              <button
                onClick={handleGenerateCV}
                disabled={isGenerating}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#ff3e55] to-[#ff3e55] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,62,85,0.5)] text-sm sm:text-base disabled:opacity-70 disabled:cursor-wait"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                    {t("hero.generatingCV")}
                  </>
                ) : (
                  <>
                    {t("hero.getResume")} <Download size={isMobile ? 16 : 18} className="hidden sm:inline-block" />
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full max-w-md">
              <TerminalWindow title="franklyn.sh">
                <div className="text-[#ff3e55] text-xs sm:text-sm">#!/bin/bash</div>
                <div className="mt-2 text-xs sm:text-sm">
                  <span className="text-[#00e5ff]">name=</span>{" "}
                  <span className="text-[#ffbd2e]">"Franklyn Velásquez"</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm">
                  <span className="text-[#00e5ff]">skills=(</span>
                  <div className="ml-4">
                    <span className="text-[#ffbd2e]">"Parrot Os"</span>{" "}
                    <span className="text-[#ffbd2e]">"Kali Linux"</span> <span className="text-[#ffbd2e]">"Osint"</span>{" "}
                    <span className="text-[#ffbd2e]">"JavaScript"</span>{" "}
                    <span className="text-[#ffbd2e]">"Python"</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-[#ffbd2e]">"MySql"</span> <span className="text-[#ffbd2e]">"Bursuip"</span>{" "}
                    <span className="text-[#ffbd2e]">"Docker"</span> <span className="text-[#ffbd2e]">"Bash"</span>
                  </div>
                  <span className="text-[#00e5ff]">)</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm">
                  <span className="text-[#00e5ff]">hardworker=</span> <span className="text-[#ff3e55]">true</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm">
                  <span className="text-[#00e5ff]">quickLearner=</span> <span className="text-[#ff3e55]">true</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm">
                  <span className="text-[#00e5ff]">problemSolver=</span> <span className="text-[#ff3e55]">true</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm">
                  <span className="text-[#00e5ff]">hireable()</span> <span className="text-white">{"{"}</span>
                </div>
                <div className="ml-4 mt-1 text-xs sm:text-sm">
                  <span className="text-[#ff3e55]">if</span>{" "}
                  <span className="text-white">[[ $hardworker == true && $problemSolver == true &&</span>
                </div>
                <div className="ml-8 text-xs sm:text-sm">
                  <span className="text-white">${"#"}skills[@] -ge 5 ]];</span>{" "}
                  <span className="text-[#ff3e55]">then</span>
                </div>
                <div className="ml-8 mt-1 text-xs sm:text-sm">
                  <span className="text-[#ff3e55]">return</span> <span className="text-white">0</span>
                </div>
                <div className="ml-4 text-xs sm:text-sm">
                  <span className="text-[#ff3e55]">else</span>
                </div>
                <div className="ml-8 text-xs sm:text-sm">
                  <span className="text-[#ff3e55]">return</span> <span className="text-white">1</span>
                </div>
                <div className="ml-4 text-xs sm:text-sm">
                  <span className="text-[#ff3e55]">fi</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm">
                  <span className="text-white">{"}"}</span>
                </div>
                <div className="mt-4 flex items-center text-xs sm:text-sm">
                  <span className="text-green-400 mr-2">$</span>
                  <TypeAnimation
                    sequence={[
                      'echo "Hello World!"',
                      2000,
                      "ls -la /skills/",
                      1000,
                      "sudo apt install hacking-tools",
                      1500,
                      "nmap -sV target.com",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Number.POSITIVE_INFINITY}
                    className="text-white"
                  />
                </div>
              </TerminalWindow>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
