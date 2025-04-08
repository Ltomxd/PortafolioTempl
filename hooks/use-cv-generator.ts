"use client"

import { useState } from "react"
import { generateCV } from "@/lib/generate-cv"
import { useLanguage } from "@/contexts/language-context"

export function useCVGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const { language } = useLanguage()

  const handleGenerateCV = async () => {
    try {
      setIsGenerating(true)

      // Dynamically import jsPDF only when needed (client-side)
      const jsPDFModule = await import("jspdf")
      const jsPDF = jsPDFModule.default

      // Also import the autotable plugin
      await import("jspdf-autotable")

      // Create a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate the CV with the current language
      generateCV(language)
    } catch (error) {
      console.error("Error generating CV:", error)
      alert("Error generating CV. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    handleGenerateCV,
    isGenerating,
  }
}
