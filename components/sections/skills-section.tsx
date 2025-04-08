"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import SkillsSlider from "@/components/skills-slider"
import { useLanguage } from "@/contexts/language-context"

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-[#0a0b16] to-[#0a0b16]">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("skills.title")}</h2>
          <div className="w-20 h-1 bg-[#ff3e55] mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">{t("skills.description")}</p>
        </motion.div>

        {/* Tecnologías y Herramientas Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full overflow-hidden"
        >
          <SkillsSlider />
        </motion.div>
      </div>
    </section>
  )
}
