"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Terminal, Github, Linkedin, Send, Shield, Code, Cpu, Lock } from "lucide-react"
import HackTheBoxIcon from "@/components/hackthebox-icon"
import TerminalWindow from "@/components/ui/terminal-window"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

// ASCII art del mapache hacker
const raccoonAsciiArt = `
 /\\   /\\
/  \\ /  \\
(    '    )  RACCOON SECURITY
\\  ---  /   MENSAJE ENVIADO
 \\_____/    EXITOSAMENTE
`

export default function ContactSection() {
  const [mounted, setMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setMounted(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const ref = useRef(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [terminalText, setTerminalText] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [currentField, setCurrentField] = useState<"name" | "email" | "message" | "complete">("name")
  const [cursorBlink, setCursorBlink] = useState(true)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  // Track mouse position for the glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Initialize terminal
  useEffect(() => {
    if (isInView) {
      const initialMessages = [
        t("contact.terminal.initializing"),
        t("contact.terminal.establishing"),
        t("contact.terminal.established"),
        t("contact.terminal.welcome"),
        t("contact.terminal.protocol"),
        t("contact.terminal.pleaseProvide"),
        t("contact.terminal.enterName"),
      ]

      let delay = 0
      initialMessages.forEach((message, index) => {
        delay += index === 0 ? 500 : 800
        setTimeout(() => {
          setTerminalText((prev) => [...prev, message])
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
          }
        }, delay)
      })
    }
  }, [isInView, t])

  // Handle form submission logic
  const handleSubmit = async () => {
    if (currentField === "name") {
      if (!formData.name.trim()) return

      setTerminalText((prev) => [...prev, `${formData.name}`, t("contact.terminal.enterEmail")])
      setCurrentField("email")
      setCurrentInput("")
      triggerGlitch()
    } else if (currentField === "email") {
      if (!formData.email.trim() || !formData.email.includes("@")) return

      setTerminalText((prev) => [...prev, `${formData.email}`, t("contact.terminal.enterMessage")])
      setCurrentField("message")
      setCurrentInput("")
      triggerGlitch()
    } else if (currentField === "message") {
      if (!formData.message.trim()) return

      setIsSubmitting(true)
      setTerminalText((prev) => [
        ...prev,
        `${formData.message}`,
        t("contact.terminal.encrypting"),
        t("contact.terminal.verifying"),
        t("contact.terminal.securingChannel"),
      ])

      try {
        // Mostrar los datos que se están enviando para depuración
        console.log("Enviando datos:", formData)

        // Llamada a la API de App Router
        const response = await fetch("/api/send-simple", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        // Obtener el texto de la respuesta para depuración
        const responseText = await response.text()
        console.log("Respuesta completa:", responseText)

        // Intentar parsear la respuesta como JSON
        let result
        try {
          result = JSON.parse(responseText)
        } catch (parseError) {
          console.error("Error al parsear la respuesta:", parseError)
          throw new Error(`Respuesta no válida: ${responseText}`)
        }

        console.log("Resultado procesado:", result)

        if (response.ok && result.success) {
          setTerminalText((prev) => [
            ...prev,
            t("contact.terminal.success"),
            t("contact.terminal.thanks"),
            t("contact.terminal.connectionEnded"),
            "ascii-art", // Marcador especial para el ASCII art
            t("contact.terminal.reset"),
            t("contact.terminal.availableCommand"), // Añadir esta línea para hacer más visible la opción
          ])
        } else {
          const errorMessage = result.error || "Error desconocido al enviar el mensaje"
          console.error("Error en la respuesta:", errorMessage)
          setTerminalText((prev) => [
            ...prev,
            `${t("contact.terminal.error")} ${errorMessage}`,
            t("contact.terminal.tryAgain"),
            t("contact.terminal.reset"),
          ])
        }
      } catch (error: unknown) {
        console.error("Error al enviar el mensaje:", error)
        const errorMessage =
          error instanceof Error ? error.message : "No se pudo enviar el mensaje. Verifica tu conexión."
        setTerminalText((prev) => [...prev, `ERROR: ${errorMessage}`, ">> Escribe 'reset' para comenzar de nuevo"])
      } finally {
        setIsSubmitting(false)
        setCurrentField("complete")
        setCurrentInput("")
        triggerGlitch()
      }
    } else if (currentField === "complete") {
      // Corregir esta parte para que reconozca correctamente los comandos
      const command = currentInput.toLowerCase().trim()

      if (command === "reset") {
        // Mostrar mensaje de reinicio antes de resetear
        setTerminalText((prev) => [
          ...prev,
          "reset",
          t("contact.terminal.resetting"),
          t("contact.terminal.clearingData"),
        ])

        // Pequeña pausa antes de reiniciar para mostrar los mensajes
        setTimeout(() => {
          resetForm()
        }, 1500)
      } else {
        setTerminalText((prev) => [
          ...prev,
          `${t("contact.terminal.unknownCommand")} ${currentInput}`,
          t("contact.terminal.reset"),
          t("contact.terminal.availableCommand"),
        ])
        setCurrentInput("")
      }
    }

    if (terminalRef.current) {
      setTimeout(() => {
        terminalRef.current!.scrollTop = terminalRef.current!.scrollHeight
      }, 100)
    }
  }

  const resetForm = () => {
    setTerminalText([
      t("contact.terminal.initializing"),
      t("contact.terminal.establishing"),
      t("contact.terminal.established"),
      t("contact.terminal.welcome"),
      t("contact.terminal.protocol"),
      t("contact.terminal.pleaseProvide"),
      t("contact.terminal.enterName"),
    ])
    setFormData({ name: "", email: "", message: "" })
    setCurrentField("name")
    setCurrentInput("")
    triggerGlitch()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (!isSubmitting) {
        handleSubmit()
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value)

    if (currentField === "name") {
      setFormData((prev) => ({ ...prev, name: e.target.value }))
    } else if (currentField === "email") {
      setFormData((prev) => ({ ...prev, email: e.target.value }))
    } else if (currentField === "message") {
      setFormData((prev) => ({ ...prev, message: e.target.value }))
    }
  }

  const triggerGlitch = () => {
    setGlitchEffect(true)
    setTimeout(() => setGlitchEffect(false), 500)
  }

  // Decorative elements - cybersecurity icons that float around
  const floatingIcons = [
    { icon: <Shield size={24} />, delay: 0 },
    { icon: <Lock size={24} />, delay: 5 },
    { icon: <Code size={24} />, delay: 10 },
    { icon: <Cpu size={24} />, delay: 15 },
    { icon: <Terminal size={24} />, delay: 20 },
  ]

  const handleResetButton = () => {
    if (currentField === "complete") {
      setTerminalText((prev) => [...prev, "reset", t("contact.terminal.resetting"), t("contact.terminal.clearingData")])
      setTimeout(() => {
        resetForm()
      }, 1500)
    }
  }

  return (
    <section id="contacto" className="py-20 relative overflow-hidden bg-[#0a0b16]" ref={ref}>
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b16] via-[#0a0b16] to-[#0a0b16] opacity-90 z-10" />
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full opacity-20">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-[#1a1b2e]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.005 }}
            />
          ))}
        </div>
      </div>

      {/* Floating icons - only show on larger screens */}
      {mounted &&
        windowSize.width > 768 &&
        floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-[#ff3e55]/30 z-10"
            initial={{
              x: Math.random() * (windowSize.width || 1000),
              y: Math.random() * 500 + 100,
              opacity: 0.3,
              rotate: 0,
            }}
            animate={{
              x: [
                Math.random() * (windowSize.width || 1000),
                Math.random() * (windowSize.width || 1000),
                Math.random() * (windowSize.width || 1000),
              ],
              y: [Math.random() * 500 + 100, Math.random() * 500 + 100, Math.random() * 500 + 100],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 30 + Math.random() * 20,
              delay: item.delay,
              ease: "linear",
            }}
          >
            {item.icon}
          </motion.div>
        ))}

      {/* Radial glow that follows cursor - only on desktop */}
      {mounted && windowSize.width > 768 && (
        <motion.div
          className="hidden md:block absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#ff3e55]/10 to-[#00e5ff]/10 blur-3xl pointer-events-none z-0"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            mass: 0.5,
          }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text">{t("contact.title")}</h2>
          <div className="w-20 h-1 bg-[#ff3e55] mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">{t("contact.description")}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Left column - Social links */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-4"
            >
              <div className="space-y-6">
                {/* Connection status card */}
                <motion.div
                  className="bg-[#0d1117] border border-[#1a1b2e] rounded-lg p-4 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <h3 className="text-sm font-mono text-green-500">{t("contact.connectionStatus.title")}</h3>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    <div className="flex justify-between mb-1">
                      <span>ESTADO:</span>
                      <span className="text-green-500">{t("contact.connectionStatus.status")}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>ENCRIPTACIÓN:</span>
                      <span className="text-[#00e5ff]">{t("contact.connectionStatus.encryption")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PROTOCOLO:</span>
                      <span className="text-[#ff3e55]">{t("contact.connectionStatus.protocol")}</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border-4 border-[#1a1b2e] border-t-[#ff3e55] animate-spin opacity-20"></div>
                </motion.div>

                {/* Social links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-mono text-[#00e5ff] mb-2">{t("contact.secureChannels")}</h3>

                  <motion.a
                    href="https://github.com/Ltomxd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#0d1117] border border-[#1a1b2e] rounded-lg p-3 hover:border-[#ff3e55] transition-colors group relative overflow-hidden"
                    whileHover={{ x: 5 }}
                  >
                    <div className="absolute inset-0 bg-[#181717] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></div>
                    <Github className="relative z-10 text-gray-400 group-hover:text-white transition-colors" />
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                    <div className="ml-auto relative z-10 text-xs text-gray-500 font-mono group-hover:text-gray-300 transition-colors">
                      @Ltomxd
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/ftoml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#0d1117] border border-[#1a1b2e] rounded-lg p-3 hover:border-[#ff3e55] transition-colors group relative overflow-hidden"
                    whileHover={{ x: 5 }}
                  >
                    <div className="absolute inset-0 bg-[#0A66C2] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></div>
                    <Linkedin className="relative z-10 text-gray-400 group-hover:text-white transition-colors" />
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">
                      LinkedIn
                    </span>
                    <div className="ml-auto relative z-10 text-xs text-gray-500 font-mono group-hover:text-gray-300 transition-colors">
                      CONECTAR
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://app.hackthebox.com/profile/1767382"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#0d1117] border border-[#1a1b2e] rounded-lg p-3 hover:border-[#ff3e55] transition-colors group relative overflow-hidden"
                    whileHover={{ x: 5 }}
                  >
                    <div className="absolute inset-0 bg-[#9FEF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></div>
                    <HackTheBoxIcon className="relative z-10 text-gray-400 group-hover:text-[#111] transition-colors" />
                    <span className="relative z-10 text-gray-300 group-hover:text-[#111] transition-colors">
                      HackTheBox
                    </span>
                    <div className="ml-auto relative z-10 text-xs text-gray-500 font-mono group-hover:text-[#111] transition-colors">
                      TomL8014
                    </div>
                  </motion.a>

                  <motion.a
                    href="mailto:velasquez8014@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#0d1117] border border-[#1a1b2e] rounded-lg p-3 hover:border-[#ff3e55] transition-colors group relative overflow-hidden"
                    whileHover={{ x: 5 }}
                  >
                    <div className="absolute inset-0 bg-[#EA4335] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></div>
                    <svg
                      className="relative z-10 text-gray-400 group-hover:text-white transition-colors w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">Gmail</span>
                    <div className="ml-auto relative z-10 text-xs text-gray-500 font-mono group-hover:text-gray-300 transition-colors">
                      CONTACTAR
                    </div>
                  </motion.a>
                </div>

                {/* Binary decoration */}
                <div className="text-[#1a1b2e] font-mono text-xs leading-tight mt-4 select-none">
                  01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100
                  00100001 00100000 01001001 00100000 01100001 01101101 00100000 01100001 00100000 01110000 01100101
                  01101110 01110100 01100101 01110011 01110100 01100101 01110010 00100000 01100001 01101110 01100100
                  00100000 01100100 01100101 01110110 01100101 01101100 01101111 01110000 01100101 01110010 00101110.
                </div>
              </div>
            </motion.div>

            {/* Right column - Terminal contact form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`md:col-span-8 ${glitchEffect ? "glitch" : ""}`}
            >
              <TerminalWindow title="secure_contact.sh">
                {/* Add this right after the opening TerminalWindow tag */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-70 transform rotate-12 z-10 pointer-events-none">
                  <Image
                    src="/images/hacker-raccoon.png"
                    alt="Secure Connection"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>

                <div
                  ref={terminalRef}
                  className="font-mono text-sm h-[300px] sm:h-[400px] overflow-y-auto scrollbar-hide relative"
                >
                  {terminalText.map((line, index) => (
                    <div
                      key={index}
                      className={`mb-1 ${
                        line.startsWith(">>")
                          ? "text-[#00e5ff]"
                          : line.includes("ERROR")
                            ? "text-[#ff3e55]"
                            : line.includes("éxito")
                              ? "text-green-500"
                              : line === "ascii-art"
                                ? "text-[#9FEF00] font-mono whitespace-pre"
                                : "text-gray-300"
                      }`}
                    >
                      {line === "ascii-art" ? (
                        <div className="flex flex-col items-center py-2">
                          <pre className="text-[#9FEF00] text-xs sm:text-sm">{raccoonAsciiArt}</pre>
                          <img
                            src="/images/hacker-raccoon.png"
                            alt="Hacker Raccoon"
                            className="w-24 h-24 object-contain mt-2"
                          />
                        </div>
                      ) : (
                        line
                      )}
                    </div>
                  ))}

                  <div className="flex items-center">
                    <span className="text-[#00e5ff] mr-2">{currentField !== "complete" ? ">" : ""}</span>
                    <input
                      type="text"
                      value={currentInput}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-none outline-none text-white flex-1 font-mono"
                      autoFocus
                      disabled={isSubmitting}
                    />
                    <span className={`w-2 h-5 bg-white inline-block ml-1 ${cursorBlink ? "animate-blink" : ""}`}></span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center border-t border-gray-800 pt-4">
                  <div className="text-xs text-gray-500 font-mono">
                    {currentField === "name"
                      ? "PASO 1/3"
                      : currentField === "email"
                        ? "PASO 2/3"
                        : currentField === "message"
                          ? "PASO 3/3"
                          : "COMPLETADO"}
                  </div>

                  <motion.button
                    onClick={currentField === "complete" ? handleResetButton : handleSubmit}
                    disabled={isSubmitting}
                    className={`px-4 py-1 bg-[#1a1b2e] border border-[#ff3e55] rounded text-[#ff3e55] text-sm font-mono flex items-center gap-2 hover:bg-[#ff3e55]/10 transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 rounded-full border-2 border-[#ff3e55] border-t-transparent animate-spin mr-1"></div>
                        {t("contact.buttons.sending")}
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        {currentField === "complete" ? t("contact.buttons.reset") : t("contact.buttons.send")}
                      </>
                    )}
                  </motion.button>
                </div>
              </TerminalWindow>

              {/* Decorative elements */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-2 bg-[#1a1b2e] rounded-full overflow-hidden"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 2,
                      delay: i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#ff3e55] to-[#00e5ff]"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 2,
                        delay: i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CSS for glitch effect */}
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .glitch {
          animation: glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
