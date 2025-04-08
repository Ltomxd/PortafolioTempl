"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Definir los idiomas disponibles
export type Language = "es" | "en" | "fr" | "de"

// Interfaz para el contexto
interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Valores por defecto para el contexto
const defaultContextValue: LanguageContextType = {
  language: "es",
  setLanguage: () => {},
  t: (key: string) => key,
}

// Crear el contexto
const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

// Hook personalizado para usar el contexto
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage debe ser usado dentro de un LanguageProvider")
  }
  return context
}

// Props para el proveedor
interface LanguageProviderProps {
  children: ReactNode
}

// Proveedor del contexto
export function LanguageProvider({ children }: LanguageProviderProps) {
  // Estado para el idioma actual
  const [language, setLanguage] = useState<Language>("es")
  // Estado para las traducciones
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({})
  // Estado para controlar si las traducciones están cargadas
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar las traducciones
  useEffect(() => {
    async function loadTranslations() {
      try {
        // Importar todos los archivos de traducción
        const es = (await import("@/translations/es.json")).default
        const en = (await import("@/translations/en.json")).default
        const fr = (await import("@/translations/fr.json")).default
        const de = (await import("@/translations/de.json")).default

        setTranslations({
          es,
          en,
          fr,
          de,
        })
        setIsLoaded(true)
      } catch (error) {
        console.error("Error al cargar las traducciones:", error)
      }
    }

    loadTranslations()
  }, [])

  // Función para obtener una traducción
  const t = (key: string): string => {
    if (!isLoaded || !translations[language]) return key

    // Dividir la clave por puntos para acceder a objetos anidados
    const keys = key.split(".")
    let value = translations[language]

    // Navegar por el objeto de traducciones
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        console.warn(`Traducción no encontrada para la clave: ${key} en el idioma: ${language}`)
        return key
      }
    }

    return value as string
  }

  // Guardar el idioma en localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  // Recuperar el idioma de localStorage al cargar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language | null
      if (savedLanguage && ["es", "en", "fr", "de"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      } else {
        // Detectar el idioma del navegador como alternativa
        const browserLanguage = navigator.language.split("-")[0]
        if (["es", "en", "fr", "de"].includes(browserLanguage)) {
          setLanguage(browserLanguage as Language)
        }
      }
    }
  }, [])

  // Valor del contexto
  const value = {
    language,
    setLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
