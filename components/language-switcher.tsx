"use client"

import { useState } from "react"
import { useLanguage, type Language } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Check, Globe } from "lucide-react"
import { useResponsive } from "@/hooks/use-responsive"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useResponsive()

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ]

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    closeDropdown()
  }

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-[#0d1117] border border-gray-800 hover:border-[#ff3e55] transition-colors"
        aria-label="Cambiar idioma"
      >
        <Globe size={isMobile ? 14 : 16} className="text-gray-400" />
        <span className="text-xs sm:text-sm">{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-36 sm:w-48 rounded-md shadow-lg bg-[#0d1117] border border-gray-800 z-50"
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center justify-between w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-[#1a1b2e] hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {language === lang.code && <Check size={isMobile ? 14 : 16} className="text-[#ff3e55]" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
