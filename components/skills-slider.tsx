"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

interface SkillItem {
  name: string
  icon: string
  color: string
}

export default function SkillsSlider() {
  const [isPaused, setIsPaused] = useState(false)
  const [activeSkill, setActiveSkill] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const skills: SkillItem[] = [
    { name: "Github", icon: "/images/skills/github.svg", color: "#FFFFFF" },
    { name: "Gitlab", icon: "/images/skills/gitlab.svg", color: "#fd7e14" },
    { name: "TypeScript", icon: "/images/skills/typescript.svg", color: "#007ACC" },
    { name: "React", icon: "/images/skills/react.svg", color: "#FFFFFF" },
    { name: "Javascript", icon: "/images/skills/javascript.svg", color: "#f7df1e" },
    { name: "Html", icon: "/images/skills/html.svg", color: "#f16529" },
    { name: "Css", icon: "/images/skills/css.svg", color: "#2965f1" },
    { name: "Mysql", icon: "/images/skills/mysql.svg", color: "#FFFFFF" },
    { name: "MongoDB", icon: "/images/skills/mongoDB.svg", color: "#499d4a" },
    { name: "Nginx", icon: "/images/skills/nginx.svg", color: "#009639" },
    { name: "Docker", icon: "/images/skills/docker.svg", color: "#2395ec" },
    { name: "Next.js", icon: "/images/skills/NEXT.svg", color: "#FFFFFF" },
    { name: "Tailwind CSS", icon: "/images/skills/tailwind.svg", color: "#0ED7B5" },
    { name: "Python", icon: "/images/skills/python.svg", color: "#366994" },
    { name: "Kali Linux", icon: "/images/skills/kalinux.svg", color: "#557C94" },
    { name: "Linux", icon: "/images/skills/linux.svg", color: "#557C94" },
    { name: "Parrot OS", icon: "/images/skills/parrot.svg", color: "#22C3E6" },
    { name: "VMware", icon: "/images/skills/vmware.svg", color: "#f80" },
    { name: "OSINT", icon: "/images/skills/osint.svg", color: "#009cde" },
    { name: "OWASP", icon: "/images/skills/owasp.svg", color: "#FFFFFF" },
    { name: "Winshar", icon: "/images/skills/winshar.svg", color: "#1a6dff" },
    { name: "Burp Suite", icon: "/images/skills/burpSuite.svg", color: "#FF6633" },
    { name: "Niko", icon: "/images/skills/niko.svg", color: "#41e6ec" },
    { name: "Nmap", icon: "/images/skills/nmap.svg", color: "#b3e5fc" },
    { name: "Lua", icon: "/images/skills/lua.svg", color: "#674bff" },
    { name: "Bash", icon: "/images/skills/bash.svg", color: "#368646" },
    { name: "Gobuster", icon: "/images/skills/gobuster.svg", color: "#4cb5e0" },
    { name: "Ffuf", icon: "/images/skills/ffuf.svg", color: "#dc3534" },
    { name: "Metasploit", icon: "/images/skills/metasploit.svg", color: "#59c7f9" },
    { name: "Office", icon: "/images/skills/office.svg", color: "#cf3600" },
  ]

  const extendedSkills = [...skills, ...skills, ...skills]

  useEffect(() => {
    if (!isPaused && containerRef.current) {
      const totalWidth = containerRef.current.scrollWidth
      controls.start({
        x: -totalWidth / 3,
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 100,
          ease: "linear",
        },
      })
    } else {
      controls.stop()
    }
  }, [isPaused, controls])

  return (
    <div className="relative w-full overflow-x-hidden overflow-y-visible py-10 bg-[#0a0b16]">
      <div
        className="overflow-hidden"
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setActiveSkill(null)
        }}
      >
        <motion.div className="flex" animate={controls} initial={{ x: 0 }}>
          {extendedSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[140px] min-w-[140px] mx-3"
              whileHover={{
                scale: 1.0,
                transition: { duration: 2.2 },
              }}
              onClick={() => setActiveSkill(activeSkill === index ? null : index)}
            >
              <motion.div
                className={`bg-[#0c0d1d] rounded-lg p-6 border ${
                  activeSkill === index
                    ? "border-[#3d5afe] border-2 shadow-[0_0_15px_rgba(61,90,254,0.5)]"
                    : "border-[#1a1b2e]"
                } transition-all duration-300 h-[170px] flex flex-col items-center justify-center group hover:border-[#3d5afe] hover:border-2 hover:shadow-[0_0_15px_rgba(61,90,254,0.3)]`}
                layout
              >
                <motion.div
                  className="w-16 h-16 relative mb-6 transition-transform duration-300 group-hover:scale-110"
                  animate={
                    activeSkill === index
                      ? {
                          rotate: [0, 10, 0, -10, 0],
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <Image src={skill.icon || "/placeholder.svg"} alt={skill.name} fill className="object-contain" />
                </motion.div>
                <motion.h4
                  className="text-sm font-medium text-center transition-colors duration-300"
                  style={{ color: skill.color }}
                  animate={
                    activeSkill === index
                      ? {
                          scale: [1, 1.1, 1],
                          textShadow: [
                            "0px 0px 0px rgba(255,255,255,0)",
                            "0px 0px 10px rgba(255,255,255,0.5)",
                            "0px 0px 0px rgba(255,255,255,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: activeSkill === index ? Number.POSITIVE_INFINITY : 0 }}
                >
                  {skill.name}
                </motion.h4>

                {activeSkill === index && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      boxShadow: [
                        "0px 0px 0px rgba(61,90,254,0)",
                        "0px 0px 20px rgba(61,90,254,0.7)",
                        "0px 0px 0px rgba(61,90,254,0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicadores de navegación (pueden eliminarse si no los usás) */}
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gray-600"
            animate={{
              scale: [1, 1.5, 1],
              backgroundColor: ["rgba(100, 100, 100, 0.5)", "rgba(61, 90, 254, 1)", "rgba(100, 100, 100, 0.5)"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  )
}
