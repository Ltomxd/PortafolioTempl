"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useResponsive } from "@/hooks/use-responsive"

interface RaccoonRevivalProps {
  isActive: boolean
}

export default function RaccoonRevival({ isActive }: RaccoonRevivalProps) {
  // Estado para controlar si los mapaches están visibles
  const [showRaccoons, setShowRaccoons] = useState(false)
  // Estado para almacenar las imágenes que se cargaron correctamente
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  // Estado para rastrear si estamos cargando imágenes
  const [isLoading, setIsLoading] = useState(false)
  const { isMobile, isTablet } = useResponsive()

  // Imágenes de mapaches
  const raccoonImages = [
    "/images/github-raccoon.png",
    "/images/hacker-raccoon.png",
    "/images/hackthebox-raccoon.png",
    "/images/medium-raccoon.png",
  ]

  // Modificar el useEffect para asegurar que solo se activa cuando isActive es true
  // y para mejorar la gestión de la carga de imágenes

  // Efecto para mostrar los mapaches después de que el efecto Thanos termine
  useEffect(() => {
    // Si se activa el efecto y los mapaches aún no se muestran y no estamos ya cargando
    if (isActive && !showRaccoons && !isLoading) {
      console.log("Preparando efecto de mapaches")
      setIsLoading(true)

      // Función simplificada para precargar imágenes
      const preloadImages = async () => {
        console.log("Precargando imágenes de mapaches")
        const successfullyLoaded: string[] = []

        try {
          // Cargar cada imagen secuencialmente para evitar problemas
          for (const src of raccoonImages) {
            try {
              // Crear una promesa para cargar la imagen
              await new Promise<void>((resolve) => {
                const img = new Image()
                img.crossOrigin = "anonymous" // Añadir esto para evitar problemas CORS

                // Configurar manejadores de eventos
                img.onload = () => {
                  console.log(`Imagen cargada correctamente: ${src}`)
                  successfullyLoaded.push(src)
                  resolve()
                }

                img.onerror = () => {
                  console.warn(`No se pudo cargar la imagen: ${src}`)
                  resolve() // Resolvemos de todos modos para continuar
                }

                // Iniciar la carga
                img.src = src
              })
            } catch (imgError) {
              console.warn(`Error al cargar imagen ${src}:`, imgError)
              // Continuamos con la siguiente imagen
            }
          }

          console.log(`Imágenes cargadas correctamente: ${successfullyLoaded.length} de ${raccoonImages.length}`)
          setLoadedImages(successfullyLoaded)

          // Mostrar los mapaches después de que las imágenes estén cargadas
          setShowRaccoons(true)
          setIsLoading(false)
          console.log("Mostrando mapaches")

          // Reproducir el sonido
          try {
            const audioElement = document.getElementById("audio-effect") as HTMLAudioElement
            if (audioElement) {
              audioElement.volume = 0.7
              audioElement.currentTime = 0
              audioElement.play().catch((err) => console.warn("Error playing audio:", err))
            }
          } catch (audioError) {
            console.warn("Error with audio:", audioError)
          }
        } catch (error) {
          console.error("Error general en la precarga de imágenes:", error)
          // No propagamos el error para evitar que rompa la aplicación

          // Aún así, mostramos los mapaches
          setShowRaccoons(true)
          setIsLoading(false)
        }
      }

      // Iniciar la precarga de imágenes con un pequeño retraso
      // para asegurar que el efecto Thanos se ha limpiado completamente
      setTimeout(() => {
        preloadImages().catch((error) => {
          console.error("Error crítico en preloadImages:", error)
          setIsLoading(false)
          setShowRaccoons(true)
        })
      }, 500)
    }
  }, [isActive, showRaccoons, raccoonImages, isLoading])

  // Si los mapaches no deben mostrarse, no renderizamos nada
  if (!showRaccoons) return null

  // Usamos las imágenes que se cargaron correctamente, o la lista original si no hay ninguna
  const imagesToShow = loadedImages.length > 0 ? loadedImages : raccoonImages

  // Ajustar tamaños según el dispositivo
  const imageSize = isMobile ? 120 : isTablet ? 160 : 200

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Fondo con efecto de brillo */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Imágenes de mapaches */}
      {imagesToShow.map((src, index) => {
        // Calcular posiciones para una distribución más estética
        const angle = (index / imagesToShow.length) * Math.PI * 2
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        return (
          <motion.div
            key={src}
            className="absolute"
            initial={{
              x: centerX,
              y: centerY,
              scale: 0,
              rotate: Math.random() * 20 - 10,
              opacity: 0,
            }}
            animate={{
              x,
              y,
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 2,
              delay: index * 0.3,
            }}
            drag
            dragConstraints={{
              top: 0,
              right: window.innerWidth - imageSize,
              bottom: window.innerHeight - imageSize,
              left: 0,
            }}
            dragElastic={0.8}
            whileHover={{
              scale: 1.2,
              zIndex: 100,
              boxShadow: "0 0 30px rgba(255, 62, 85, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: "auto" }}
          >
            <div
              className={`relative w-${imageSize / 4} h-${imageSize / 4} filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]`}
              style={{ width: imageSize, height: imageSize }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt="Raccoon"
                fill
                className="object-contain"
                unoptimized
                onError={() => {
                  console.log(`Error al cargar imagen: ${src}`)
                }}
              />

              {/* Efecto de brillo alrededor de la imagen */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff3e55]/20 to-[#00e5ff]/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>
        )
      })}

      {/* Partículas brillantes - reducir cantidad en móviles */}
      {Array.from({ length: isMobile ? 20 : 50 }).map((_, i) => {
        const color = ["#ff3e55", "#00e5ff", "#ffbd2e", "#ffffff"][Math.floor(Math.random() * 4)]
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
              boxShadow: `0 0 10px ${color}`,
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, Math.random() * 2 + 1],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        )
      })}
    </div>
  )
}
