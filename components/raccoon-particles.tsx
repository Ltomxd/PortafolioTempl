"use client"

import { useEffect, useRef } from "react"

interface RaccoonParticlesProps {
  isActive: boolean
}

export default function RaccoonParticles({ isActive }: RaccoonParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Clase para las partículas
  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    alpha: number

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.size = Math.random() * 5 + 1
      this.speedX = Math.random() * 3 - 1.5
      this.speedY = Math.random() * 3 - 1.5
      this.color = this.getRandomColor()
      this.alpha = 1
    }

    getRandomColor() {
      const colors = ["#ff3e55", "#00e5ff", "#9FEF00", "#ffbd2e", "#ffffff"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY
      if (this.size > 0.2) this.size -= 0.1
      this.alpha -= 0.01
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.globalAlpha = this.alpha
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Función para limpiar la animación
  const cleanup = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }

  // Limpiar al desmontar
  useEffect(() => {
    return cleanup
  }, [])

  // Efecto para manejar la animación de partículas
  useEffect(() => {
    if (isActive) {
      cleanup()

      const canvas = canvasRef.current
      if (!canvas) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const particles: Particle[] = []

      // Función para crear partículas
      const createParticles = (x: number, y: number, amount: number) => {
        for (let i = 0; i < amount; i++) {
          particles.push(new Particle(x, y))
        }
      }

      // Crear partículas iniciales
      for (let i = 0; i < 50; i++) {
        createParticles(Math.random() * canvas.width, Math.random() * canvas.height, 5)
      }

      // Manejar eventos de mouse
      const handleMouseMove = (e: MouseEvent) => {
        createParticles(e.x, e.y, 2)
      }

      window.addEventListener("mousemove", handleMouseMove)

      // Función de animación
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < particles.length; i++) {
          particles[i].update()
          particles[i].draw(ctx)

          // Eliminar partículas con baja opacidad
          if (particles[i].alpha <= 0.01 || particles[i].size <= 0.2) {
            particles.splice(i, 1)
            i--
          }
        }

        // Crear nuevas partículas aleatoriamente
        if (Math.random() < 0.1 && particles.length < 500) {
          createParticles(Math.random() * canvas.width, Math.random() * canvas.height, 1)
        }

        animationFrameRef.current = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        cleanup()
      }
    }
  }, [isActive])

  if (!isActive) return null

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" style={{ opacity: 0.7 }} />
}
