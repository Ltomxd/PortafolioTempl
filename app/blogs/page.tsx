"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  ExternalLink,
  Github,
  Star,
  GitFork,
  Calendar,
  ArrowLeft,
  BookOpen,
  Clock,
  Flag,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import HackTheBoxSection from "@/components/hackthebox-section"
import { useLanguage } from "@/contexts/language-context"

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

interface MediumPost {
  title: string
  description: string
  link: string
  pubDate: string
  thumbnail: string
  categories: string[]
}

export default function BlogPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([])
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMedium, setLoadingMedium] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mediumError, setMediumError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"github" | "medium" | "hackthebox">("github")
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchGithubData() {
      try {
        setLoading(true)

        // Try to fetch GitHub profile
        try {
          const profileResponse = await fetch("https://api.github.com/users/Ltomxd")

          if (profileResponse.ok) {
            const profileData = await profileResponse.json()

            setProfile({
              name: profileData.name || profileData.login,
              avatar: profileData.avatar_url,
              bio: profileData.bio || t("blogs.github.defaultBio"),
              followers: profileData.followers,
              following: profileData.following,
              publicRepos: profileData.public_repos,
              location: profileData.location || t("blogs.github.locationNotAvailable"),
              blog: profileData.blog || "#",
            })
          } else {
            // If profile fetch fails, use fallback profile
            throw new Error(t("blogs.github.profileError"))
          }
        } catch (err) {
          console.error("Error fetching GitHub profile:", err)
          // Set fallback profile
          setProfile({
            name: "Franklyn Velásquez",
            avatar: "/images/github-raccoon.png",
            bio: t("blogs.github.defaultBio"),
            followers: 0,
            following: 0,
            publicRepos: 0,
            location: t("blogs.github.locationNotAvailable"),
            blog: "#",
          })
        }

        // Try to fetch repositories
        try {
          const reposResponse = await fetch("https://api.github.com/users/Ltomxd/repos?per_page=100")

          if (reposResponse.ok) {
            const reposData = await reposResponse.json()

            // Process all repositories
            const processedRepos = reposData
              .filter((repo) => !repo.fork) // Exclude forks
              .map((repo) => {
                return {
                  title: repo.name,
                  description: repo.description || t("blogs.github.noDescription"),
                  image: "/images/github-raccoon.png",
                  tags: repo.language ? [repo.language] : ["N/A"],
                  github: repo.html_url,
                  demo: repo.homepage || "#",
                  stars: repo.stargazers_count,
                  forks: repo.forks_count,
                  updated: new Date(repo.updated_at).toLocaleDateString(),
                }
              })

            setRepositories(processedRepos)
          } else {
            throw new Error(t("blogs.github.reposError"))
          }
        } catch (err) {
          console.error("Error fetching GitHub repositories:", err)
          // Set fallback repositories
          setRepositories([
            {
              title: "AdvancedPortScanner",
              description: t("blogs.github.fallbackRepos.0.description"),
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
              description: t("blogs.github.fallbackRepos.1.description"),
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
              description: t("blogs.github.fallbackRepos.2.description"),
              image: "/images/github-raccoon.png",
              tags: ["Python"],
              github: "https://github.com/Ltomxd/pentest-framework",
              demo: "#",
              stars: 0,
              forks: 0,
              updated: "8/8/2024",
            },
          ])
        }
      } catch (err) {
        console.error("Error in fetchGithubData:", err)
        setError(t("blogs.github.generalError"))
      } finally {
        setLoading(false)
      }
    }

    async function fetchMediumPosts() {
      try {
        setLoadingMedium(true)

        // Use RSS2JSON to fetch Medium posts (with a more reliable approach)
        const mediumUsername = "RACOON80" // Replace with your actual Medium username
        const rss2jsonEndpoint = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`

        const response = await fetch(rss2jsonEndpoint, {
          method: "GET",
          headers: { Accept: "application/json" },
          next: { revalidate: 3600 }, // Revalidate cache every hour
        })

        if (!response.ok) {
          throw new Error(t("blogs.medium.fetchError"))
        }

        const data = await response.json()

        if (data.status !== "ok" || !data.items || data.items.length === 0) {
          console.warn("No Medium posts found or invalid response format")
          setMediumPosts([])
          return
        }

        // Process the posts
        const posts = data.items.map((item) => ({
          title: item.title,
          description:
            item.description
              .replace(/<[^>]*>?/gm, "") // Remove HTML tags
              .substring(0, 150) + "...",
          link: item.link,
          pubDate: new Date(item.pubDate).toLocaleDateString(),
          thumbnail: item.thumbnail || "/images/medium-raccoon.png",
          categories:
            item.categories && item.categories.length > 0 ? item.categories : [t("blogs.medium.defaultCategory")],
        }))

        setMediumPosts(posts)
      } catch (err) {
        console.error("Error fetching Medium posts:", err)
        setMediumError(`${t("blogs.medium.error")}: ${err.message}`)
        // Instead of using hardcoded fallback data, we'll just set an empty array
        setMediumPosts([])
      } finally {
        setLoadingMedium(false)
      }
    }

    fetchGithubData()
    fetchMediumPosts()
  }, [t])

  return (
    <div className="min-h-screen bg-[#0a0b16] text-white">
      <Head>
        <title>{t("blogs.pageTitle")}</title>
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#0a0b16]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image
              src="/images/logo.png"
              alt="Franklyn Velásquez Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold">Franklyn Velásquez</span>
        </div>
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-transparent border border-[#ff3e55] text-white font-medium hover:bg-[#ff3e55]/10 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} /> {t("blogs.backToHome")}
        </Link>
      </header>

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4" ref={ref}>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("blogs.title")}</h2>
            <div className="w-20 h-1 bg-[#ff3e55] mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">{t("blogs.description")}</p>
          </motion.div>

          {/* Tabs para alternar entre GitHub, Medium y HackTheBox */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#0d1117] rounded-full p-1 inline-flex flex-wrap justify-center">
              <button
                onClick={() => setActiveTab("github")}
                className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${
                  activeTab === "github" ? "bg-[#ff3e55] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Github size={18} /> {t("blogs.tabs.github")}
              </button>
              <button
                onClick={() => setActiveTab("medium")}
                className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${
                  activeTab === "medium" ? "bg-[#ff3e55] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <BookOpen size={18} /> {t("blogs.tabs.medium")}
              </button>
              <button
                onClick={() => setActiveTab("hackthebox")}
                className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${
                  activeTab === "hackthebox" ? "bg-[#9FEF00] text-[#0D1117]" : "text-gray-400 hover:text-white"
                }`}
              >
                <Flag size={18} /> {t("blogs.tabs.hackthebox")}
              </button>
            </div>
          </div>

          {/* GitHub Repositories Section */}
          {activeTab === "github" && (
            <>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3e55]"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-10">
                  <p>{error}</p>
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
                              <span className="text-xs text-gray-400">{t("blogs.github.repos")}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xl font-bold">{profile.followers}</span>
                              <span className="text-xs text-gray-400">{t("blogs.github.followers")}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xl font-bold">{profile.following}</span>
                              <span className="text-xs text-gray-400">{t("blogs.github.following")}</span>
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
                            {t("blogs.github.viewProfile")} <ExternalLink size={16} />
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
                                  title={t("blogs.github.viewCode")}
                                >
                                  <Github size={20} />
                                </a>
                                {repo.demo && repo.demo !== "#" && (
                                  <a
                                    href={repo.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-800 hover:bg-[#ff3e55] transition-colors"
                                    title={t("blogs.github.viewDemo")}
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
                                    <span
                                      key={i}
                                      className="px-3 py-1 bg-[#ff3e55]/10 text-[#ff3e55] text-xs rounded-full"
                                    >
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
                        <Github size={18} /> {t("blogs.github.viewMore")} <ArrowRight size={18} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Medium Posts Section */}
          {activeTab === "medium" && (
            <>
              {loadingMedium ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3e55]"></div>
                </div>
              ) : mediumError ? (
                <div className="text-center text-red-500 py-10">
                  <p>{mediumError}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Medium Profile Card */}
                  <motion.div
                    className="lg:col-span-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-gray-800 p-6">
                      <div className="flex items-center gap-4">
                        {/* Actualizar la imagen de perfil de Medium */}
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#ff3e55]">
                          <Image src="/images/medium-raccoon.png" alt="RACCOON" fill className="object-cover" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">RACCOON</h3>
                          <p className="text-gray-400">{t("blogs.medium.profileDescription")}</p>
                        </div>
                        <div className="ml-auto">
                          <Link
                            href="https://medium.com/@RACOON80"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 rounded-full bg-transparent border border-[#ff3e55] text-white font-medium hover:bg-[#ff3e55]/10 transition-colors inline-flex items-center gap-2"
                          >
                            {t("blogs.medium.followOnMedium")} <ExternalLink size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Medium Posts Grid */}
                  {mediumPosts.length > 0 ? (
                    mediumPosts.map((post, index) => (
                      <motion.div
                        key={index}
                        className="bg-[#0d1117] rounded-xl overflow-hidden group border border-gray-800 flex flex-col h-full"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      >
                        {/* Reemplazar la imagen de vista previa para cada artículo de Medium */}
                        <div className="relative overflow-hidden aspect-video bg-gradient-to-b from-[#0d1117] to-[#0a0b16]">
                          <Image
                            src="/images/medium-raccoon.png"
                            alt={post.title}
                            fill
                            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent opacity-70"></div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                          <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">{post.description}</p>

                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.categories &&
                                post.categories.map((category, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-[#ff3e55]/10 text-[#ff3e55] text-xs rounded-full"
                                  >
                                    {category}
                                  </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <span className="text-xs text-gray-500 flex items-center">
                                <Clock size={14} className="mr-1" /> {post.pubDate}
                              </span>
                              <Link
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff3e55] hover:text-white transition-colors flex items-center gap-1 text-sm"
                              >
                                {t("blogs.medium.readArticle")} <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="lg:col-span-3 text-center py-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="bg-[#0d1117] rounded-xl p-8 border border-gray-800">
                        <h3 className="text-xl font-bold mb-4">{t("blogs.medium.noArticlesFound")}</h3>
                        <p className="text-gray-400">{t("blogs.medium.noArticlesMessage")}</p>
                        <Link
                          href="https://medium.com/@RACOON80"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 px-6 py-2 inline-flex items-center gap-2 rounded-full bg-transparent border border-[#ff3e55] text-white font-medium hover:bg-[#ff3e55]/10 transition-colors"
                        >
                          {t("blogs.medium.visitMedium")} <ExternalLink size={16} />
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    className="lg:col-span-3 text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Link
                      href="https://medium.com/@RACOON80"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ff3e55] to-[#ff3e55] text-white font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
                    >
                      {t("blogs.medium.viewMoreOnMedium")} <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                </div>
              )}
            </>
          )}

          {/* HackTheBox Section */}
          {activeTab === "hackthebox" && <HackTheBoxSection />}
        </div>
      </main>

      <footer className="bg-[#0a0b16] text-gray-400 py-8 text-center border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p>
            © {new Date().getFullYear()} Franklyn Velásquez. {t("footer.rights")}
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a
              href="https://github.com/Ltomxd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-[#181717] hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://app.hackthebox.com/profile/1767382"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-[#9FEF00] hover:text-[#0D1117] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.83 8.01l-8-4.5c-.5-.28-1.17-.28-1.67 0l-8 4.5c-.51.29-.83.84-.83 1.42v5.15c0 .58.32 1.13.83 1.42l8 4.5c.5.28 1.17.28 1.67 0l8-4.5c.51-.29.83-.84.83-1.42V9.43c0-.58-.32-1.13-.83-1.42z" />
                <path d="M3.37 7.83L12 12.5l8.63-4.67" />
                <path d="M12 12.5V22" />
              </svg>
            </a>
            <a
              href="mailto:velasquez8014@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-[#EA4335] hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
