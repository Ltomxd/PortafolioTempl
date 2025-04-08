"use client"

// Crear un nuevo hook para la animación de secciones
import { useRef } from "react"
import { useInView } from "framer-motion"

export function useSectionAnimation(once = true, amount = 0.2) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return { ref, isInView }
}
