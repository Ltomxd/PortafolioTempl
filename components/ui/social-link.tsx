import type React from "react"

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
}

export default function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-gray-800 hover:bg-[#ff3e55] transition-colors"
    >
      {icon}
    </a>
  )
}
