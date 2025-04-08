"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ThanosSnapEffectProps {
  isActive: boolean
  onComplete?: () => void
}

export default function ThanosSnapEffect({ isActive, onComplete }: ThanosSnapEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const effectExecutedRef = useRef(false)

  // Particle class for the disintegration effect
  class Particle {
    x: number
    y: number
    size: number
    color: string
    speedX: number
    speedY: number
    alpha: number
    originX: number
    originY: number

    constructor(x: number, y: number, size: number, color: string) {
      this.x = x
      this.y = y
      this.originX = x
      this.originY = y
      this.size = Math.random() * size + 1
      this.color = color
      this.speedX = Math.random() * 3 - 1.5 // Slower horizontal movement
      this.speedY = Math.random() * 3 - 1.5 // Slower vertical movement
      this.alpha = 1
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY
      this.alpha -= 0.01 // Reduced alpha reduction rate for longer effect duration
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.globalAlpha = this.alpha
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Cleanup function to cancel animation frame
  const cleanup = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    // Reset particles
    particlesRef.current = []

    // Reset canvas if it exists
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    console.log("Thanos effect cleanup complete")
  }

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [])

  // Effect for handling the snap animation
  useEffect(() => {
    // If not active or already executed, do nothing
    if (!isActive || effectExecutedRef.current) {
      return
    }

    // Mark that the effect is executing
    effectExecutedRef.current = true
    console.log("Starting Thanos effect")

    try {
      // Cleanup any existing animation
      cleanup()

      // Get ALL visible elements on the page
      const elements = Array.from(
        document.querySelectorAll(
          "div, p, h1, h2, h3, h4, h5, h6, img, button, span, a, ul, li, nav, header, footer, section, article, aside, main, form, input, textarea, select, option, label, table, tr, td, th, thead, tbody, tfoot, canvas, svg, path, circle, rect, line, polyline, polygon, ellipse, text, tspan, g, defs, clipPath, mask, pattern, marker, linearGradient, radialGradient, stop, filter, feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix, feDiffuseLighting, feDisplacementMap, feDistantLight, feDropShadow, feFlood, feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur, feImage, feMerge, feMergeNode, feMorphology, feOffset, fePointLight, feSpecularLighting, feSpotLight, feTile, feTurbulence, foreignObject, image, use, video, audio, source, track, iframe, embed, object, param, picture, portal, template, slot, map, area, col, colgroup, caption, figcaption, figure, hr, pre, blockquote, cite, code, em, i, b, strong, small, sub, sup, mark, del, ins, u, s, time, var, samp, kbd, data, meter, progress, q, ruby, rt, rp, bdi, bdo, wbr, details, summary, dialog, menu, menuitem, datalist, legend, optgroup, output, noscript, address, hgroup, acronym, applet, basefont, big, center, dir, font, frame, frameset, noframes, strike, tt",
        ),
      ).filter((el) => {
        // Don't disintegrate the canvas or its parents
        const canvas = canvasRef.current
        if (!canvas) return false

        // Skip elements that are not visible or have no dimensions
        const rect = el.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return false

        // Skip elements that are not in the viewport
        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth)
          return false

        // Skip audio elements and their containers
        if (el.id === "thanos-snap-audio" || el.id === "raccoon-revival-audio") return false

        // Skip the canvas itself and its parents
        return el !== canvas && !el.contains(canvas)
      })

      // Create particles for each element
      const newParticles: Particle[] = []

      elements.forEach((element) => {
        try {
          const rect = element.getBoundingClientRect()

          // Get element color
          const computedStyle = window.getComputedStyle(element)
          let color = computedStyle.backgroundColor

          // If background is transparent, try text color or default to theme color
          if (color === "rgba(0, 0, 0, 0)" || color === "transparent") {
            color = computedStyle.color
            if (color === "rgba(0, 0, 0, 0)" || color === "transparent") {
              color = "#ff3e55" // Default theme color
            }
          }

          // Create more particles for a denser effect
          const particleCount = Math.max(8, Math.floor((rect.width * rect.height) / 800))
          for (let i = 0; i < particleCount; i++) {
            const x = rect.left + Math.random() * rect.width
            const y = rect.top + Math.random() * rect.height
            newParticles.push(new Particle(x, y, 3, color))
          }

          // Hide the element permanently
          if (element instanceof HTMLElement) {
            // Store original opacity to restore later if needed
            element.dataset.originalOpacity = element.style.opacity || "1"
            element.style.opacity = "0"
            element.style.pointerEvents = "none" // Disable interactions
          }
        } catch (err) {
          console.error("Error processing element for particles:", err)
        }
      })

      particlesRef.current = newParticles
      console.log(`Created ${newParticles.length} particles`)

      // Setup canvas
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const ctx = canvas.getContext("2d")
        if (ctx) {
          // Animation function
          const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            let remainingParticles = false

            for (let i = 0; i < particlesRef.current.length; i++) {
              particlesRef.current[i].update()

              // Remove particles with very low alpha
              if (particlesRef.current[i].alpha <= 0.01) {
                continue
              }

              particlesRef.current[i].draw(ctx)
              remainingParticles = true
            }

            if (remainingParticles) {
              animationFrameRef.current = requestAnimationFrame(animate)
            } else {
              // Animation complete
              cleanup()

              // Reset the executed flag after a delay to allow for future activations
              setTimeout(() => {
                effectExecutedRef.current = false
              }, 1000)

              // Notify that the animation has finished
              if (onComplete) {
                console.log("Thanos effect animation complete, calling onComplete")
                onComplete()
              }
            }
          }

          // Start animation
          animationFrameRef.current = requestAnimationFrame(animate)
        }
      }
    } catch (error) {
      console.error("Error in ThanosSnapEffect:", error)
      cleanup()

      // Reset the executed flag to allow future attempts
      setTimeout(() => {
        effectExecutedRef.current = false
      }, 1000)

      if (onComplete) onComplete()
    }

    // Cleanup function
    return () => {
      cleanup()
    }
  }, [isActive, onComplete])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  )
}
