"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Network, Server, Laptop, Terminal, Calendar, Award, BookOpen } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useResponsive } from "@/hooks/use-responsive"

export default function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()
  const { isMobile } = useResponsive()

  // Definimos los elementos de educación directamente
  const educationItems = [
    {
      title: t("education.items.0.title"),
      institution: t("education.items.0.institution"),
      period: t("education.items.0.period"),
      icon: <GraduationCap size={20} />,
      iconBg: "#ff3e55",
    },
    {
      title: t("education.items.1.title"),
      institution: t("education.items.1.institution"),
      period: t("education.items.1.period"),
      icon: <Network size={20} />,
      iconBg: "#00e5ff",
    },
    {
      title: t("education.items.2.title"),
      institution: t("education.items.2.institution"),
      period: t("education.items.2.period"),
      icon: <Server size={20} />,
      iconBg: "#9FEF00",
    },
    {
      title: t("education.items.3.title"),
      institution: t("education.items.3.institution"),
      period: t("education.items.3.period"),
      icon: <Laptop size={20} />,
      iconBg: "#ffbd2e",
    },
    {
      title: t("education.items.4.title"),
      institution: t("education.items.4.institution"),
      period: t("education.items.4.period"),
      icon: <Terminal size={20} />,
      iconBg: "#ff3e55",
    },
  ]

  return (
    <section id="educacion" className="py-16 sm:py-20 bg-[#0a0b16]">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t("education.title")}</h2>
          <div className="w-16 sm:w-20 h-1 bg-[#ff3e55] mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {educationItems.map((edu, index) => (
            <motion.div
              key={index}
              className="bg-[#0d1117] rounded-xl overflow-hidden border border-[#1a1b2e] shadow-lg hover:shadow-[0_0_25px_rgba(255,62,85,0.1)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Card header with gradient */}
              <div
                className="p-1"
                style={{
                  background: `linear-gradient(to right, ${edu.iconBg}, rgba(10, 11, 22, 0))`,
                }}
              ></div>

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: edu.iconBg }}
                  >
                    {edu.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{edu.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={14} className="text-gray-400" />
                      <h4 className="text-[#ff3e55] text-sm">{edu.institution}</h4>
                    </div>
                    <div className="flex items-center gap-2 bg-[#1a1b2e] px-3 py-1 rounded-full w-fit">
                      <Calendar size={14} className="text-[#ff3e55]" />
                      <span className="text-xs text-gray-300">{edu.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate badge - optional decorative element */}
        <motion.div
          className="mt-12 max-w-md mx-auto bg-[#0d1117] rounded-xl overflow-hidden border border-[#1a1b2e] shadow-lg p-6 flex items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#ff3e55]/10 flex items-center justify-center">
            <Award size={32} className="text-[#ff3e55]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Certificaciones Continuas</h3>
            <p className="text-gray-400 text-sm">Siempre en constante aprendizaje y actualización profesional</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
