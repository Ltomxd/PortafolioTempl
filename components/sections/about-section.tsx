"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Terminal, Flag } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useResponsive } from "@/hooks/use-responsive"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { t } = useLanguage()
  const { isMobile, isTablet } = useResponsive()

  return (
    <section id="acerca-de-mi" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#0a0b16] to-[#0a0b16]">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#00e5ff]">{t("about.title")}</h2>
          <div className="w-16 sm:w-20 h-1 bg-[#ff3e55] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg">{t("about.description")}</p>

            <div className="space-y-4 sm:space-y-6">
              <motion.div
                className="flex items-start gap-3 sm:gap-4"
                whileHover={{ scale: 1.03, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="p-2 sm:p-3 bg-[#ff3e55]/10 text-[#ff3e55] rounded-lg relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(255,62,85,0.3)]">
                  <Shield size={isMobile ? 18 : 20} className="relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-[#ff3e55]/0 group-hover:bg-[#ff3e55]/20"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-1 group-hover:text-[#ff3e55] transition-colors text-base sm:text-lg">
                    {t("about.cybersecurity.title")}
                  </h4>
                  <p className="text-gray-400 text-sm sm:text-base">{t("about.cybersecurity.description")}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 sm:gap-4"
                whileHover={{ scale: 1.03, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="p-2 sm:p-3 bg-[#ff3e55]/10 text-[#ff3e55] rounded-lg relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(255,62,85,0.3)]">
                  <Terminal size={isMobile ? 18 : 20} className="relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-[#ff3e55]/0 group-hover:bg-[#ff3e55]/20"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-1 group-hover:text-[#ff3e55] transition-colors text-base sm:text-lg">
                    {t("about.development.title")}
                  </h4>
                  <p className="text-gray-400 text-sm sm:text-base">{t("about.development.description")}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 sm:gap-4"
                whileHover={{ scale: 1.03, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="p-2 sm:p-3 bg-[#ff3e55]/10 text-[#ff3e55] rounded-lg relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(255,62,85,0.3)]">
                  <Flag size={isMobile ? 18 : 20} className="relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-[#ff3e55]/0 group-hover:bg-[#ff3e55]/20"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-1 group-hover:text-[#ff3e55] transition-colors text-base sm:text-lg">
                    {t("about.ctfPlayer.title")}
                  </h4>
                  <p className="text-gray-400 text-sm sm:text-base">{t("about.ctfPlayer.description")}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative perspective-500 mt-8 md:mt-0"
          >
            <motion.div
              className="aspect-square rounded-2xl overflow-hidden border-2 border-[#ff3e55]/30 relative z-10 group"
              whileHover={{ rotateY: 15, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/images/logo.svg"
                alt="Franklyn Velásquez"
                width={600}
                height={600}
                className="object-cover w-full h-full filter grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e55]/20 to-[#00e5ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e55] to-[#00e5ff] rounded-2xl -z-10 blur-md opacity-20 transform translate-x-4 translate-y-4"></div>

            <div className="absolute -bottom-5 -right-5 bg-[#0a0b16] p-3 sm:p-4 rounded-lg border border-gray-800 shadow-xl z-20 transform rotate-3 hidden sm:block">
              <div className="text-[#00e5ff] font-bold text-base sm:text-xl rotate-90 absolute -right-8 sm:-right-10 top-1/2 -translate-y-1/2">
                {t("nav.about").toUpperCase()}
              </div>
            </div>

            {/* Elementos decorativos flotantes - solo visibles en pantallas más grandes */}
            <motion.div
              className="absolute -top-10 -left-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#ff3e55] z-0 hidden sm:block"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#00e5ff] z-0 hidden sm:block"
              animate={{
                y: [0, 15, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
