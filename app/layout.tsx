import "./globals.css"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import DebugTranslations from "@/components/debug-translations"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Franklyn Velásquez | Portfolio",
  description: "Portfolio personal de Franklyn Velásquez - Pentester Profesional y Desarrollador",
  icons: {
    icon: "/images/logo.png",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        {/* Audio elements hidden from view but still available for the effects */}
        <div style={{ position: "fixed", bottom: "10px", right: "10px", zIndex: 9999, display: "none" }}>
          <audio id="thanos-snap-audio" preload="auto">
            <source src="/sounds/Aundio.wav" type="audio/wav" />
          </audio>
        </div>

        <LanguageProvider>
          <DebugTranslations />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
