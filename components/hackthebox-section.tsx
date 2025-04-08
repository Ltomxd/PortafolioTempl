"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Flag, Server, Code, Target, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context" // Añadir esta importación

interface HackTheBoxProfile {
  username: string
  avatar: string
  rank: string
  points: number
  systemOwns: number
  userOwns: number
  challenges: number
  country: string
  level: number
  globalRanking: number
  ownership: string
  activities: Array<{
    type: string
    machine: string
    date: string
    timeAgo: string
  }>
}

export default function HackTheBoxSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [profile, setProfile] = useState<HackTheBoxProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage() // Añadir esta línea para usar el hook de traducción

  useEffect(() => {
    async function fetchHackTheBoxProfile() {
      try {
        setLoading(true)

        // En un entorno real, aquí harías una llamada a tu backend que tenga acceso a la API de HackTheBox
        // const response = await fetch('/api/hackthebox-profile');
        // const data = await response.json();

        // Como no podemos acceder directamente a la API de HackTheBox desde el frontend,
        // usaremos datos de ejemplo que puedes actualizar manualmente

        // Simulamos un tiempo de carga
        setTimeout(() => {
          const mockProfile: HackTheBoxProfile = {
            username: "TomL8014",
            avatar: "/images/hackthebox-raccoon.png", // Actualizamos a la nueva imagen
            rank: "Hacker",
            points: 2, // Final Score
            systemOwns: 15,
            userOwns: 20,
            challenges: 0, // No se muestra en la imagen, pero podemos dejarlo en 0
            country: "El Salvador",
            level: 0, // No se muestra nivel específico
            globalRanking: 919, // Añadimos el ranking global
            ownership: "4.31% of Hack The Box Pwned", // Añadimos el porcentaje de ownership
            activities: [
              {
                type: "System",
                machine: "Crafty",
                date: "25TH JANUARY 2025",
                timeAgo: "2 months ago",
              },
              {
                type: "User",
                machine: "Crafty",
                date: "25TH JANUARY 2025",
                timeAgo: "2 months ago",
              },
            ],
          }

          setProfile(mockProfile)
          setLoading(false)
        }, 1500)
      } catch (err) {
        console.error("Error fetching HackTheBox profile:", err)
        setError("No se pudo cargar el perfil de HackTheBox")
        setLoading(false)
      }
    }

    fetchHackTheBoxProfile()
  }, [])

  // Modificar el return para usar traducciones
  return (
    <div className="py-16" ref={ref}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("blogs.hackthebox.title")}</h2>
        <div className="w-20 h-1 bg-[#9FEF00] mx-auto"></div>
        <p className="text-gray-300 mt-6 max-w-2xl mx-auto">{t("blogs.hackthebox.description")}</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-[#1A2332] opacity-25"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#9FEF00] animate-spin"></div>
          </div>
          <span className="ml-4 text-[#9FEF00]">{t("blogs.hackthebox.loading")}</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          <p>{error}</p>
        </div>
      ) : profile ? (
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-[#1A2332] rounded-xl overflow-hidden border border-[#9FEF00]/20 shadow-lg shadow-[#9FEF00]/5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Perfil */}
              <div className="p-6 flex flex-col items-center border-r border-[#2E3B52] md:col-span-1">
                <div className="relative w-40 h-40 mb-4 rounded-lg overflow-hidden border-2 border-[#9FEF00]">
                  <Image
                    src={profile.avatar || "/placeholder.svg"}
                    alt={profile.username}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{profile.username}</h3>
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-[#1E2A3E] px-4 py-2 rounded-lg border border-[#9FEF00]/30 mb-2 w-full text-center">
                    <span className="text-[#9FEF00] font-bold text-lg">
                      {t("blogs.hackthebox.rank")}: {profile.rank}
                    </span>
                  </div>
                  <div className="bg-[#1E2A3E] px-4 py-2 rounded-lg border border-[#9FEF00]/30 mb-2 w-full text-center">
                    <span className="text-[#9FEF00] font-bold text-lg">
                      {t("blogs.hackthebox.global")}: #{profile.globalRanking}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 w-full justify-center">
                    <span className="px-3 py-1 bg-[#9FEF00]/10 text-[#9FEF00] text-xs rounded-full">
                      {profile.ownership}
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-3 mb-6">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="flex items-center gap-2">
                      <Flag size={16} className="text-[#9FEF00]" /> {t("blogs.hackthebox.country")}
                    </span>
                    <span>{profile.country}</span>
                  </div>
                </div>

                <Link
                  href="https://app.hackthebox.com/profile/1767382"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto px-6 py-2 rounded-full bg-[#9FEF00]/10 text-[#9FEF00] font-medium hover:bg-[#9FEF00]/20 transition-colors inline-flex items-center gap-2 w-full justify-center"
                >
                  {t("blogs.hackthebox.viewProfile")} <ExternalLink size={16} />
                </Link>
              </div>

              {/* Estadísticas */}
              <div className="p-6 md:col-span-2">
                <h4 className="text-xl font-bold mb-6 text-white">{t("blogs.hackthebox.stats")}</h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#111927] p-4 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#9FEF00]/10">
                      <Target size={24} className="text-[#9FEF00]" />
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-white">#{profile.globalRanking}</span>
                      <span className="text-gray-400 text-sm">{t("blogs.hackthebox.globalRanking")}</span>
                    </div>
                  </div>

                  <div className="bg-[#111927] p-4 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#9FEF00]/10">
                      <Server size={24} className="text-[#9FEF00]" />
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-white">{profile.systemOwns}</span>
                      <span className="text-gray-400 text-sm">{t("blogs.hackthebox.systemOwns")}</span>
                    </div>
                  </div>

                  <div className="bg-[#111927] p-4 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#9FEF00]/10">
                      <User size={24} className="text-[#9FEF00]" />
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-white">{profile.userOwns}</span>
                      <span className="text-gray-400 text-sm">{t("blogs.hackthebox.userOwns")}</span>
                    </div>
                  </div>

                  <div className="bg-[#111927] p-4 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#9FEF00]/10">
                      <Code size={24} className="text-[#9FEF00]" />
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-white">{profile.points}</span>
                      <span className="text-gray-400 text-sm">{t("blogs.hackthebox.finalScore")}</span>
                    </div>
                  </div>
                </div>

                {/* Gráfico de progreso */}
                <div className="mb-8">
                  <h5 className="text-lg font-medium mb-4 text-white">{t("blogs.hackthebox.progressTitle")}</h5>
                  <div className="w-full h-4 bg-[#111927] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#9FEF00] to-[#9FEF00]/70"
                      style={{ width: `4.31%` }} // 4.31% hacia Pro Hacker según la imagen
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>{t("blogs.hackthebox.hacker")}</span>
                    <span>{t("blogs.hackthebox.proHacker")}</span>
                  </div>
                </div>

                {/* Últimas actividades (reales) */}
                <div>
                  <h5 className="text-lg font-medium mb-4 text-white">{t("blogs.hackthebox.recentActivities")}</h5>
                  <div className="space-y-3">
                    {profile.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-[#9FEF00]/10 flex items-center justify-center">
                          {activity.type === "System" ? (
                            <Server size={16} className="text-[#9FEF00]" />
                          ) : (
                            <User size={16} className="text-[#9FEF00]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-gray-300">
                              {t("blogs.hackthebox.owned")} <strong>{activity.type}</strong> -{" "}
                              <span className="text-[#9FEF00]">{activity.machine}</span> {t("blogs.hackthebox.machine")}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{activity.date}</div>
                        </div>
                        <span className="text-gray-500">{activity.timeAgo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              href="https://app.hackthebox.com/profile/1767382"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-[#9FEF00] text-[#0D1117] font-medium hover:bg-[#9FEF00]/90 transition-all inline-flex items-center gap-2"
            >
              {t("blogs.hackthebox.viewFullProfile")} <ExternalLink size={18} />
            </Link>
          </motion.div>
        </div>
      ) : null}
    </div>
  )
}
