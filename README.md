# Portfolio Personal de Franklyn Velásquez

![Logo del Proyecto](/public/images/logo.png)

## 📋 Descripción

Portfolio personal interactivo y dinámico desarrollado con Next.js y React. Este sitio web muestra mis habilidades como Pentester Profesional y Desarrollador, con secciones para experiencia, proyectos, educación y un formulario de contacto seguro. Incluye efectos visuales avanzados, animaciones fluidas, y funcionalidades especiales como generación de CV en PDF y efectos interactivos.

## ✨ Características Principales

- **Diseño Responsivo**: Adaptado a todos los tamaños de pantalla (móvil, tablet, escritorio)
- **Multilingüe**: Soporte para español, inglés, francés y alemán
- **Animaciones Avanzadas**: Utilizando Framer Motion para transiciones fluidas
- **Efectos Visuales**: Partículas interactivas, efectos de desintegración tipo "Thanos", y renacimiento de elementos
- **Generador de CV**: Creación de PDF profesional con jsPDF
- **Formulario de Contacto**: Integración con Resend para envío de emails
- **Integración con GitHub**: Muestra automática de repositorios
- **Modo Terminal**: Interfaz de línea de comandos estilizada
- **Sección de Blog**: Con integración de GitHub, Medium y HackTheBox

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **Librerías Principales**:
  - jsPDF y jspdf-autotable (generación de PDF)
  - Resend (envío de emails)
  - React Particles (efectos de partículas)
  - React Type Animation (efectos de escritura)
  - Lucide React (iconos)

- **Herramientas de Desarrollo**:
  - ESLint
  - TypeScript
  - PNPM (gestor de paquetes)

## 📁 Estructura del Proyecto



\`\`\`
portfolio/
├── app/                      # Directorio principal de Next.js App Router
│   ├── api/                  # API Routes para el formulario de contacto
│   │   ├── send/             # Endpoint principal para envío de emails
│   │   └── send-simple/      # Endpoint alternativo simplificado
│   ├── blogs/                # Página de blog
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal de la aplicación
│   ├── page.tsx              # Página principal
│   └── thanos-effect.css     # Estilos para el efecto Thanos
├── components/               # Componentes React
│   ├── sections/             # Componentes de secciones principales
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── education-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── projects-section.tsx
│   │   └── skills-section.tsx
│   ├── ui/                   # Componentes de UI reutilizables
│   ├── blog-section.tsx      # Componente de sección de blog
│   ├── EmailTemplate.tsx     # Plantilla para emails
│   ├── hackthebox-section.tsx # Sección de HackTheBox
│   ├── language-switcher.tsx # Selector de idiomas
│   ├── portfolio-content.tsx # Contenedor principal del portfolio
│   ├── raccoon-revival.tsx   # Efecto de renacimiento
│   ├── thanos-snap-effect.tsx # Efecto de desintegración
│   └── ...
├── contexts/                 # Contextos de React
│   └── language-context.tsx  # Contexto para manejo de idiomas
├── hooks/                    # Custom hooks
│   ├── use-cv-generator.ts   # Hook para generación de CV
│   ├── use-responsive.ts     # Hook para diseño responsivo
│   └── ...
├── lib/                      # Funciones y utilidades
│   ├── generate-cv.ts        # Lógica de generación de CV
│   └── services/             # Servicios (email, etc.)
├── public/                   # Archivos estáticos
│   ├── images/               # Imágenes del proyecto
│   │   ├── logo.png
│   │   ├── skills/           # Iconos de habilidades
│   │   └── ...
│   └── sounds/               # Archivos de audio para efectos
├── translations/             # Archivos de traducción
│   ├── en.json               # Inglés
│   ├── es.json               # Español
│   ├── fr.json               # Francés
│   └── de.json               # Alemán
├── .env.example              # Ejemplo de variables de entorno
├── .env.local                # Variables de entorno locales (no incluido en git)
├── next.config.js            # Configuración de Next.js
├── package.json              # Dependencias y scripts
├── tailwind.config.js        # Configuración de Tailwind CSS
└── tsconfig.json             # Configuración de TypeScript
\`\`\`



## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.0.0 o superior
- PNPM (recomendado) o NPM

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/portfolio.git
   cd portfolio
  
