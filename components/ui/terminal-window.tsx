import type React from "react"

interface TerminalWindowProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export default function TerminalWindow({ children, title = "terminal", className = "" }: TerminalWindowProps) {
  return (
    <div className={`bg-[#0d1117] rounded-lg overflow-hidden border border-gray-700 shadow-xl ${className}`}>
      <div className="bg-[#161b22] px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-gray-400 text-xs sm:text-sm ml-2">{title}</div>
      </div>
      <div className="p-2 sm:p-4 font-mono text-xs sm:text-sm overflow-auto">{children}</div>
    </div>
  )
}
