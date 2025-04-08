"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ExternalLink, Github, Star, GitFork, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
  stars: number
  forks: number
  updated: string
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [projects, setProjects] = useState<Project[]>([
    {
      title: "Cargando repositorios...",
      description: "Obteniendo información de GitHub...",
      image: "/images/github-raccoon.png",
      tags: ["Loading"],
      github: "https://github.com/Ltomxd",
      demo: "#",
      stars: 0,
      forks: 0,
      updated: "",
    },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchGithubRepos() {
      try {
        setLoading(true)
        const response = await fetch("https://api.github.com/users/Ltomxd/repos")

        if (!response.ok) {
          throw new Error(t("projects.error"))
        }

        const data = await response.json()

        // Para cada repositorio, obtener los lenguajes
        const reposWithLanguages = data
          .filter((repo) => !repo.fork) // Excluir forks
          .slice(0, 6) // Limitar a 6 proyectos
          .map((repo) => {
            return {
              title: repo.name,
              description: repo.description || "Sin descripción disponible",
              image: "/images/github-raccoon.png",
              tags: repo.language ? [repo.language] : ["N/A"],
              github: repo.html_url,
              demo: repo.homepage || "#",
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              updated: new Date(repo.updated_at).toLocaleDateString(),
            }
          })

        setProjects(reposWithLanguages)
      } catch (err) {
        console.error("Error fetching GitHub repos:", err)
        setError(err.message)

        // Fallback repositories
      
      } finally {
        setLoading(false)
      }
    }

    fetchGithubRepos()
  }, [t])

  return (
    <section id="projects" className="py-20 bg-[#0a0b16]">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("projects.title")}</h2>
          <div className="w-20 h-1 bg-[#ff3e55] mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">{t("projects.description")}</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3e55]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            <p>
              {t("projects.error")} {error}
            </p>
            <p className="mt-4">Mostrando proyectos de ejemplo</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => {
              // Generate random colors for each project
              const colors = [
                ["#ff3e55", "#ff7eb3"], // Red to Pink
                ["#00e5ff", "#00a3ff"], // Cyan to Blue
                ["#9FEF00", "#73b800"], // Green to Dark Green
                ["#ffbd2e", "#ff9900"], // Yellow to Orange
                ["#bf5af2", "#8a3ffc"], // Purple to Violet
              ]
              const colorIndex = index % colors.length
              const [primaryColor, secondaryColor] = colors[colorIndex]

              return (
                <motion.div
                  key={index}
                  className="bg-[#0d1117] rounded-xl overflow-hidden group border border-gray-800 flex flex-col h-full relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    boxShadow: `0 10px 25px -5px ${primaryColor}20`,
                  }}
                >
                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0L80 0L80 80Z" fill={`${primaryColor}20`} />
                    </svg>
                  </motion.div>

                  {/* Project image with dynamic effects */}
                  <div className="relative overflow-hidden aspect-video bg-gradient-to-b from-[#0d1117] to-[#0a0b16] flex items-center justify-center p-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        duration: 3 + index * 0.5,
                      }}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={200}
                        height={200}
                        className="object-contain max-h-[150px] filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)]"
                      />
                    </motion.div>

                    {/* Animated background elements */}
                    <motion.div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      initial={{ backgroundPosition: "0% 0%" }}
                      animate={{ backgroundPosition: "100% 100%" }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${primaryColor}40 0%, transparent 50%)`,
                      }}
                    />

                    {/* Hover overlay with links */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/80 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-4 mt-8">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-full bg-[#0d1117] border border-gray-700 text-white hover:text-white hover:border-transparent transition-all`}
                          style={{
                            boxShadow: `0 0 20px ${primaryColor}50`,
                            background: `linear-gradient(135deg, #0d1117 0%, ${primaryColor}30 100%)`,
                          }}
                          title={t("projects.github.viewCode")}
                          whileHover={{
                            scale: 1.2,
                            backgroundColor: primaryColor,
                            boxShadow: `0 0 30px ${primaryColor}80`,
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={20} />
                        </motion.a>
                        {project.demo && project.demo !== "#" && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 rounded-full bg-[#0d1117] border border-gray-700 text-white hover:text-white hover:border-transparent transition-all`}
                            style={{
                              boxShadow: `0 0 20px ${secondaryColor}50`,
                              background: `linear-gradient(135deg, #0d1117 0%, ${secondaryColor}30 100%)`,
                            }}
                            title="Ver demo del proyecto"
                            whileHover={{
                              scale: 1.2,
                              rotate: -5,
                              backgroundColor: secondaryColor,
                              boxShadow: `0 0 30px ${secondaryColor}80`,
                            }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink size={20} />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Project content with dynamic elements */}
                  <div className="p-6 flex-grow flex flex-col relative z-10">
                    {/* Animated title with underline effect */}
                    <div className="relative overflow-hidden">
                      <motion.h3
                        className="text-xl font-bold mb-2 line-clamp-1 inline-block"
                        whileHover={{ color: primaryColor, x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                        }}
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Description with subtle animation */}
                    <motion.p
                      className="text-gray-400 mb-4 line-clamp-3 flex-grow"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.description}
                    </motion.p>

                    <div className="mt-auto">
                      {/* Tags with dynamic colors */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags &&
                          project.tags.map((tag, i) => (
                            <motion.span
                              key={i}
                              className="px-3 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: `${primaryColor}15`,
                                color: primaryColor,
                                border: `1px solid ${primaryColor}30`,
                              }}
                              whileHover={{
                                scale: 1.1,
                                backgroundColor: `${primaryColor}30`,
                                y: -2,
                              }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                      </div>

                      {/* Stats with animated icons */}
                      <div className="flex items-center text-xs text-gray-500 mt-2 justify-between">
                        <div className="flex items-center">
                          <motion.div
                            className="mr-3 flex items-center"
                            whileHover={{
                              scale: 1.2,
                              color: primaryColor,
                            }}
                          >
                            <motion.div
                              animate={{
                                rotate: project.stars > 0 ? [0, 15, 0, -15, 0] : 0,
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                repeatDelay: 5,
                              }}
                            >
                              <Star size={14} className="mr-1" />
                            </motion.div>
                            {project.stars || 0}
                          </motion.div>
                          <motion.div
                            className="flex items-center"
                            whileHover={{
                              scale: 1.2,
                              color: secondaryColor,
                            }}
                          >
                            <GitFork size={14} className="mr-1" /> {project.forks || 0}
                          </motion.div>
                        </div>
                        <motion.div
                          className="flex items-center"
                          whileHover={{
                            scale: 1.1,
                            color: "#ffffff",
                          }}
                        >
                          <Calendar size={14} className="mr-1" /> {project.updated}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom gradient accent */}
                  <motion.div
                    className="h-1"
                    style={{
                      background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                      opacity: 0.5,
                    }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              )
            })}
          </div>
        )}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/blogs"
            className="px-6 sm:px-8 py-3 rounded-full bg-transparent border border-[#ff3e55] text-white font-medium hover:bg-[#ff3e55]/10 transition-colors inline-flex items-center gap-2 group"
          >
            <Github size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform group-hover:translate-y-full duration-300">
                {t("projects.viewMore")}
              </span>
              <span className="absolute top-0 left-0 inline-block -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {t("projects.exploreGithub")}
              </span>
            </span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
