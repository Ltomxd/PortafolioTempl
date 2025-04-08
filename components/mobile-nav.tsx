"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Menu } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useResponsive } from "@/hooks/use-responsive"

interface MobileNavProps {
  sections: string[]
  sectionNames: Record<string, string>
  activeSection: string
}

export default function MobileNav({ sections, sectionNames, activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const menuRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useResponsive()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && menuRef.current && !menuRef.current.contains(target) && !target.closest(".menu-button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  // Close menu when a section is clicked
  const handleSectionClick = () => {
    setIsOpen(false)
  }

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false)
    }
  }, [isMobile, isOpen])

  return (
    <div className="md:hidden">
      <button
        className="p-2 menu-button focus:outline-none relative z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-[#0a0b16]/95 backdrop-blur-md mobile-menu flex flex-col"
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-6 p-6">
              {sections.map((section) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sections.indexOf(section) * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={`#${section}`}
                    className={`text-2xl font-medium capitalize transition-colors block text-center py-3 px-4 rounded-lg ${
                      activeSection === section
                        ? "text-[#ff3e55] bg-[#1a1b2e]"
                        : "text-gray-300 hover:text-white hover:bg-[#1a1b2e]/50"
                    }`}
                    onClick={handleSectionClick}
                  >
                    {sectionNames[section]}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sections.length * 0.1 }}
                className="w-full"
              >
                <Link
                  href="/blogs"
                  className="text-2xl font-medium capitalize transition-colors block text-center py-3 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-[#1a1b2e]/50"
                  onClick={handleSectionClick}
                >
                  {sectionNames.blogs}
                </Link>
              </motion.div>
            </div>

            <div className="p-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} Franklyn Velásquez</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
