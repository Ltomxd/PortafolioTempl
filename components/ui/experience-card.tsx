"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Briefcase, ExternalLink } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  description: string
  icon: ReactNode
  iconBg: string
  skills?: string[]
  location?: string
  companyLogo?: string
  companyUrl?: string
  index: number
  isAlternate?: boolean
}

export default function ExperienceCard({
  title,
  company,
  period,
  description,
  icon,
  iconBg,
  skills = [],
  location,
  companyLogo,
  companyUrl,
  index,
  isAlternate = false,
}: ExperienceCardProps) {
  // Extract just the date part from the period string if it's in parentheses
  const dateText = period.split("(")[1]?.replace(")", "") || period

  return (
    <motion.div
      className="w-full"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-[#1a1b2e] shadow-xl hover:shadow-[0_0_25px_rgba(255,62,85,0.1)] transition-all duration-300">
        {/* Card header with gradient */}
        <div
          className="p-1"
          style={{
            background: `linear-gradient(to right, ${iconBg}, rgba(10, 11, 22, 0))`,
          }}
        ></div>

        <div className="p-6">
          {/* Company logo and date section */}
          <div className="flex justify-between items-start mb-4">
            {companyLogo ? (
              <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-700">
                <Image src={companyLogo || "/placeholder.svg"} alt={company} fill className="object-cover" />
              </div>
            ) : (
              <div
                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: iconBg }}
              >
                {icon}
              </div>
            )}

            <div className="flex items-center gap-2 bg-[#1a1b2e] px-3 py-1 rounded-full">
              <Calendar size={14} className="text-[#ff3e55]" />
              <span className="text-xs text-gray-300">{dateText}</span>
            </div>
          </div>

          {/* Title and company */}
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={14} className="text-gray-400" />
            <h4 className="text-[#ff3e55]">{company}</h4>
            {companyUrl && (
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Location if provided */}
          {location && (
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-400 text-sm sm:text-base">{description}</p>

          {/* Skills tags */}
          {skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: `${iconBg}10`,
                    color: iconBg,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
