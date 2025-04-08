"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ExternalLink, Github, Star, GitFork, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Repository {
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

interface GitHubProfile {
  name: string
  avatar: string
  bio: string
  followers: number
  following: number
  publicRepos: number
  location: string
  blog: string
}

export default function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGithubData() {
      try {
        setLoading(true)

        // Fetch GitHub profile
        const profileResponse = await fetch("https://api.github.com/users/Ltomxd")

        if (!profileResponse.ok) {
          throw new Error("Error al cargar el perfil de GitHub")
        }

        const profileData = await profileResponse.json()

        setProfile({
          name: profileData.name || profileData.login,
          avatar: profileData.avatar_url,
          bio: profileData.bio || "Pentester Profesional y Desarrollador",
          followers: profileData.followers,
          following: profileData.following,
          publicRepos: profileData.public_repos,
          location: profileData.location || "No disponible",
          blog: profileData.blog || "#",
        })

        // Fetch all repositories
        const reposResponse = await fetch("https://api.github.com/users/Ltomxd/repos?per_page=100")

        if (!reposResponse.ok) {
          throw new Error("Error al cargar los repositorios")
        }

        const reposData = await reposResponse.json()

        // Process all repositories
        const processedRepos = await Promise.all(
          reposData
            .filter((repo) => !repo.fork) // Exclude forks
            .map(async (repo) => {
              // Get repository languages
              let languages = []
              try {
                const langResponse = await fetch(repo.languages_url)
                if (langResponse.ok) {
                  const langData = await langResponse.json()
                  languages = Object.keys(langData)
                }
              } catch (err) {
                console.error(`Error fetching languages for ${repo.name}:`, err)
                if (repo.language) languages = [repo.language]
              }

              return {
                title: repo.name,
                description: repo.description || "Sin descripción disponible",
                image: "/images/github-raccoon.png",
                tags: languages.length > 0 ? languages : ["N/A"],
                github: repo.html_url,
                demo: repo.homepage || "#",
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updated: new Date(repo.updated_at).toLocaleDateString(),
              }
            }),
        )

        setRepositories(processedRepos)
      } catch (err) {
        console.error("Error fetching GitHub data:", err)
        setError(err.message)

        // Fallback repositories
        setRepositories([
          {
            title: "AdvancedPortScanner",
            description: "DecoyMACPortScanner es un script avanzado de escaneo de puertos TCP usando Nmap. Permite...",
            image: "/images/github-raccoon.png",
            tags: ["Shell"],
            github: "https://github.com/Ltomxd/securenet-scanner",
            demo: "#",
            stars: 0,
            forks: 0,
            updated: "8/8/2024",
          },
          {
            title: "Docker-vuln-labs",
            description:
              "Entornos controlados diseñados para estudiantes y principiantes que desean practicar técnicas de...",
            image: "/images/github-raccoon.png",
            tags: ["N/A"],
            github: "https://github.com/Ltomxd/cyberguard-dashboard",
            demo: "#",
            stars: 0,
            forks: 0,
            updated: "8/10/2024",
          },
          {
            title: "IPBlocker",
            description:
              "El script ha sido desarrollado para automatizar la respuesta a incidentes de seguridad en redes. Su principal...",
            image: "/images/github-raccoon.png",
            tags: ["Python"],
            github: "https://github.com/Ltomxd/pentest-framework",
            demo: "#",
            stars: 0,
            forks: 0,
            updated: "8/8/2024",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchGithubData()
  }, [])

  return (
    <section id="blogs" className="py-20 bg-[#0a0b16]">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">BLOG</h2>
          <div className="w-20 h-1 bg-[#ff3e55] mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">Explora todos mis proyectos y contribuciones en GitHub</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3e55]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            <p>Error al cargar los datos de GitHub: {error}</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* GitHub Profile Preview */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-gray-800 sticky top-24">
                {profile && (
                  <div className="flex flex-col items-center p-6">
                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-[#ff3e55]">
                      <Image
                        src={profile.avatar || "/images/github-raccoon.png"}
                        alt={profile.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
                    <p className="text-gray-400 text-center mb-4">{profile.bio}</p>

                    <div className="grid grid-cols-3 w-full mb-6 text-center">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold">{profile.publicRepos}</span>
                        <span className="text-xs text-gray-400">Repos</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-bold">{profile.followers}</span>
                        <span className="text-xs text-gray-400">Seguidores</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-bold">{profile.following}</span>
                        <span className="text-xs text-gray-400">Siguiendo</span>
                      </div>
                    </div>

                    <div className="w-full space-y-3">
                      <div className="flex items-center text-gray-400">
                        <span className="mr-2">
                          <Github size={16} />
                        </span>
                        <span>@Ltomxd</span>
                      </div>
                      {profile.location && (
                        <div className="flex items-center text-gray-400">
                          <span className="mr-2">📍</span>
                          <span>{profile.location}</span>
                        </div>
                      )}
                    </div>

                    <Link
                      href="https://github.com/Ltomxd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 px-6 py-2 rounded-full bg-transparent border border-[#ff3e55] text-white font-medium hover:bg-[#ff3e55]/10 transition-colors inline-flex items-center gap-2 w-full justify-center"
                    >
                      Ver Perfil <ExternalLink size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Repositories Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {repositories.map((repo, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#0d1117] rounded-xl overflow-hidden group border border-gray-800 flex flex-col h-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: 0.2 + (index % 6) * 0.1 }}
                  >
                    <div className="relative overflow-hidden aspect-video bg-gradient-to-b from-[#0d1117] to-[#0a0b16] flex items-center justify-center p-4">
                      <Image
                        src={repo.image || "/placeholder.svg"}
                        alt={repo.title}
                        width={200}
                        height={200}
                        className="object-contain max-h-[150px] transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <div className="flex gap-4">
                          <a
                            href={repo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-800 hover:bg-[#ff3e55] transition-colors"
                            title="Ver código en GitHub"
                          >
                            <Github size={20} />
                          </a>
                          {repo.demo && repo.demo !== "#" && (
                            <a
                              href={repo.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-gray-800 hover:bg-[#ff3e55] transition-colors"
                              title="Ver demo del proyecto"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold mb-2">{repo.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">{repo.description}</p>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {repo.tags &&
                            repo.tags.map((tag, i) => (
                              <span key={i} className="px-3 py-1 bg-[#ff3e55]/10 text-[#ff3e55] text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                        </div>

                        <div className="flex items-center text-xs text-gray-500 mt-2 justify-between">
                          <div className="flex items-center">
                            <span className="mr-3 flex items-center">
                              <Star size={14} className="mr-1" /> {repo.stars}
                            </span>
                            <span className="flex items-center">
                              <GitFork size={14} className="mr-1" /> {repo.forks}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" /> {repo.updated}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link
                  href="https://github.com/Ltomxd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ff3e55] to-[#ff3e55] text-white font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
                >
                  Ver más en GitHub <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
