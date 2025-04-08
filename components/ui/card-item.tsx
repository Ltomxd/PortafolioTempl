"use client"

// Crear un componente de tarjeta reutilizable
import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface CardItemProps {
  icon?: ReactNode
  title: string
  description: string
  delay?: number
  className?: string
  onClick?: () => void
}

export default function CardItem({ icon, title, description, delay = 0, className = "", onClick }: CardItemProps) {
  return (
    <motion.div
      className={`bg-[#0d1117] rounded-xl overflow-hidden border border-gray-800 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      {icon && <div className="mb-4 text-[#ff3e55]">{icon}</div>}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}
