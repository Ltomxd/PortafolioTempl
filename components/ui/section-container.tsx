// Crear un componente contenedor de sección reutilizable
import type { ReactNode } from "react"

interface SectionContainerProps {
  id?: string
  children: ReactNode
  className?: string
  background?: "default" | "dark" | "gradient"
}

export default function SectionContainer({
  id,
  children,
  className = "",
  background = "default",
}: SectionContainerProps) {
  const getBgClass = () => {
    switch (background) {
      case "dark":
        return "bg-[#080915]"
      case "gradient":
        return "bg-gradient-to-b from-[#0a0b16] to-[#080915]"
      default:
        return "bg-[#0a0b16]"
    }
  }

  return (
    <section id={id} className={`py-20 ${getBgClass()} ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  )
}
