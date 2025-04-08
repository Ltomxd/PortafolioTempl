// Crear un nuevo archivo para un componente de título de sección memoizado
import { memo } from "react"

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="w-20 h-1 bg-[#ff3e55] mx-auto"></div>
      {subtitle && <p className="text-gray-300 mt-6 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

// Memoizar el componente para evitar renderizados innecesarios
export default memo(SectionTitle)
