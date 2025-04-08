"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Code, Cpu, Calendar, Briefcase } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useResponsive } from "@/hooks/use-responsive"

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()
  const { isMobile, isTablet } = useResponsive()

  // Definimos los trabajos directamente en el componente para evitar problemas con t()
  const jobs = [
    {
      icon: <Shield size={20} />,
      iconBg: "#ff3e55",
      title: t("experience.jobs.0.title"),
      company: t("experience.jobs.0.company"),
      period: t("experience.jobs.0.period"),
      description: t("experience.jobs.0.description"),
    },
    {
      icon: <Code size={20} />,
      iconBg: "#00e5ff",
      title: t("experience.jobs.1.title"),
      company: t("experience.jobs.1.company"),
      period: t("experience.jobs.1.period"),
      description: t("experience.jobs.1.description"),
    },
    {
      icon: <Cpu size={20} />,
      iconBg: "#9FEF00",
      title: t("experience.jobs.2.title"),
      company: t("experience.jobs.2.company"),
      period: t("experience.jobs.2.period"),
      description: t("experience.jobs.2.description"),
    },
  ]

  return (
    <section id="experiencia" className="py-16 sm:py-20 bg-[#0a0b16] relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t("experience.title")}</h2>
          <div className="w-16 sm:w-20 h-1 bg-[#ff3e55] mx-auto"></div>
        </motion.div>

        {/* Modern Experience Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff3e55]/10 via-[#ff3e55] to-[#ff3e55]/10 hidden md:block"></div>

          {jobs.map((job, index) => (
            <motion.div
              key={index}
              className="mb-12 md:mb-16 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            >
              {/* Timeline dot for desktop */}
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#ff3e55] bg-[#0a0b16] z-10 hidden md:flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#ff3e55]"></div>
              </div>

              {/* Card container with alternating layout on desktop */}
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
              >
                {/* Date badge - visible on mobile and desktop */}
                <div
                  className={`flex items-center justify-center mb-4 md:mb-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:justify-end md:pr-12" : "md:justify-start md:pl-12"
                  }`}
                >
                  <motion.div
                    className="bg-[#1a1b2e] px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-[#2a2b3e] w-auto"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar size={16} className="text-[#ff3e55]" />
                    <span className="text-sm text-gray-300 whitespace-nowrap">
                      {job.period.split("(")[1]?.replace(")", "") || job.period}
                    </span>
                  </motion.div>
                </div>

                {/* Experience card */}
                <motion.div
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-[#1a1b2e] shadow-xl hover:shadow-[0_0_25px_rgba(255,62,85,0.1)] transition-all duration-300">
                    {/* Card header with gradient */}
                    <div
                      className="p-1"
                      style={{
                        background: `linear-gradient(to right, ${job.iconBg}, rgba(10, 11, 22, 0))`,
                      }}
                    ></div>

                    <div className="p-6">
                      {/* Icon and title section */}
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: job.iconBg }}
                        >
                          {job.icon}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                          <div className="flex items-center gap-2 mb-4">
                            <Briefcase size={14} className="text-gray-400" />
                            <h4 className="text-[#ff3e55]">{job.company}</h4>
                          </div>
                          <p className="text-gray-400 text-sm sm:text-base">{job.description}</p>
                        </div>
                      </div>

                      {/* Skills tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {index === 0 && (
                          <>
                            <span className="px-3 py-1 bg-[#ff3e55]/10 text-[#ff3e55] text-xs rounded-full">
                              Pentesting
                            </span>
                            <span className="px-3 py-1 bg-[#ff3e55]/10 text-[#ff3e55] text-xs rounded-full">
                              Seguridad
                            </span>
                            <span className="px-3 py-1 bg-[#ff3e55]/10 text-[#ff3e55] text-xs rounded-full">
                              Auditorías
                            </span>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <span className="px-3 py-1 bg-[#00e5ff]/10 text-[#00e5ff] text-xs rounded-full">React</span>
                            <span className="px-3 py-1 bg-[#00e5ff]/10 text-[#00e5ff] text-xs rounded-full">
                              Node.js
                            </span>
                            <span className="px-3 py-1 bg-[#00e5ff]/10 text-[#00e5ff] text-xs rounded-full">
                              Desarrollo Web
                            </span>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <span className="px-3 py-1 bg-[#9FEF00]/10 text-[#9FEF00] text-xs rounded-full">
                              Sistemas
                            </span>
                            <span className="px-3 py-1 bg-[#9FEF00]/10 text-[#9FEF00] text-xs rounded-full">
                              Infraestructura
                            </span>
                            <span className="px-3 py-1 bg-[#9FEF00]/10 text-[#9FEF00] text-xs rounded-full">
                              Soporte
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Final dot at the end of timeline */}
          <motion.div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-6 h-6 rounded-full bg-[#ff3e55] hidden md:block"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          ></motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-[#ff3e55]/20 rounded-full opacity-20 hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#00e5ff]/20 rounded-full opacity-20 hidden lg:block"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 border border-[#9FEF00]/20 rounded-full opacity-20 hidden lg:block"></div>
      </div>
    </section>
  )
}
