"use client"

import { useState, useEffect } from "react"

// Enhanced breakpoint system aligned with Tailwind's defaults
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    handleResize()

    // Add debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 100)
    }

    window.addEventListener("resize", debouncedResize)
    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [])

  const isBreakpoint = (breakpoint: Breakpoint, operator: "up" | "down" | "only" = "up") => {
    if (!mounted) return false

    const minWidth = breakpoints[breakpoint]
    const nextBreakpoint = Object.keys(breakpoints).find(
      (key) => breakpoints[key as Breakpoint] > breakpoints[breakpoint],
    ) as Breakpoint | undefined
    const maxWidth = nextBreakpoint ? breakpoints[nextBreakpoint] - 1 : Number.POSITIVE_INFINITY

    if (operator === "up") {
      return windowSize.width >= minWidth
    } else if (operator === "down") {
      return windowSize.width < (nextBreakpoint ? breakpoints[nextBreakpoint] : Number.POSITIVE_INFINITY)
    } else if (operator === "only") {
      return windowSize.width >= minWidth && windowSize.width <= maxWidth
    }

    return false
  }

  return {
    windowSize,
    isBreakpoint,
    isMobile: isBreakpoint("md", "down"),
    isTablet: isBreakpoint("md", "up") && isBreakpoint("lg", "down"),
    isDesktop: isBreakpoint("lg", "up"),
    isXs: isBreakpoint("sm", "down"),
    isSm: isBreakpoint("sm", "only"),
    isMd: isBreakpoint("md", "only"),
    isLg: isBreakpoint("lg", "only"),
    isXl: isBreakpoint("xl", "only"),
    is2Xl: isBreakpoint("2xl", "up"),
    orientation: mounted ? (windowSize.width > windowSize.height ? "landscape" : "portrait") : "portrait",
  }
}
