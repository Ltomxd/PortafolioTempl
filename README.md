Portfolio Personal


📋 Descripción
Portfolio personal interactivo y dinámico desarrollado con Next.js y React. Este sitio web muestra mis habilidades como Pentester Profesional y Desarrollador, con secciones para experiencia, proyectos, educación y un formulario de contacto seguro. Incluye efectos visuales avanzados, animaciones fluidas, y funcionalidades especiales como generación de CV en PDF y efectos interactivos.

✨ Características Principales
Diseño Responsivo: Adaptado a todos los tamaños de pantalla (móvil, tablet, escritorio)
Multilingüe: Soporte para español, inglés, francés y alemán
Animaciones Avanzadas: Utilizando Framer Motion para transiciones fluidas
Efectos Visuales: Partículas interactivas, efectos de desintegración tipo "Thanos", y renacimiento de elementos
Generador de CV: Creación de PDF profesional con jsPDF
Formulario de Contacto: Integración con Resend para envío de emails
Integración con GitHub: Muestra automática de repositorios
Modo Terminal: Interfaz de línea de comandos estilizada
Sección de Blog: Con integración de GitHub, Medium y HackTheBox
🛠️ Tecnologías Utilizadas
Frontend:

Next.js 14 (App Router)
React 18
TypeScript
Tailwind CSS
Framer Motion
Librerías Principales:

jsPDF y jspdf-autotable (generación de PDF)
Resend (envío de emails)
React Particles (efectos de partículas)
React Type Animation (efectos de escritura)
Lucide React (iconos)
Herramientas de Desarrollo:

ESLint
TypeScript
PNPM (gestor de paquetes)
📧 Servidor de Mensajes (Resend)
El portfolio utiliza Resend como servidor de mensajes para el formulario de contacto. Resend es una plataforma moderna de API de email diseñada específicamente para desarrolladores.

Características de Resend
API moderna y fácil de usar: Integración sencilla con Next.js
Soporte para plantillas React: El proyecto utiliza componentes React para crear emails con estilos personalizados
Alta entregabilidad: Mejores tasas de entrega que servicios tradicionales
Plan gratuito generoso: 3,000 emails/mes en el plan gratuito
Configuración de Resend
Crear una cuenta en Resend:

Regístrate en resend.com
Verifica tu dominio (opcional pero recomendado)
Obtener API Key:



- Para despliegue en Vercel, añade estas mismas variables en la configuración del proyecto

### Implementación en el proyecto

El proyecto implementa Resend de dos maneras:
- **API Route principal** (`app/api/send/route.ts`): Utiliza componentes React para el formato del email
- **API Route simplificada** (`app/api/send-simple/route.ts`): Versión alternativa que usa HTML plano

La lógica principal está centralizada en `lib/services/email-service.ts` para facilitar su mantenimiento.


## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.0.0 o superior
- PNPM (recomendado), NPM o Yarn

### Instalación con PNPM (Recomendado)

1. **Clona el repositorio**:
```bash
git clone https://github.com/tu-usuario/portfolio.git
cd portfolio


pnpm install


**Configura las variables de entorno**:

- Crea un archivo `.env.local` en la raíz del proyecto
- Añade las siguientes variables:
En el dashboard de Resend, ve a "API Keys"
Crea una nueva API key
Copia la key generada
Configurar variables de entorno:


RESEND_API_KEY=tu_api_key_de_resend
CONTACT_EMAIL=tu_email@ejemplo.com

pnpm dev

Añade la API key a tu archivo .env.local:


## Verificación de la instalación

Para verificar que todo está funcionando correctamente:

1. **Comprueba la página principal**: Debe cargar sin errores
2. **Prueba el cambio de idioma**: El selector de idiomas debe funcionar
3. **Verifica la generación de CV**: El botón "OBTENER CV" debe generar un PDF
4. **Prueba el formulario de contacto**: Envía un mensaje de prueba
5. **Comprueba la integración con GitHub**: Deben aparecer repositorios en la sección de proyectos


## 📚 Recursos adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Resend](https://resend.com/docs)
- [Guía de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Framer Motion](https://www.framer.com/motion/)
- [Guía de jsPDF](https://artskydj.github.io/jsPDF/docs/jsPDF.html)


## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 👤 Autor

**Franklyn Velásquez**

- GitHub: [@Ltomxd](https://github.com/Ltomxd)
- LinkedIn: [@ftoml](https://linkedin.com/in/ftoml)
- HackTheBox: [TomL8014](https://app.hackthebox.com/profile/1767382)


## 🙏 Agradecimientos

- A todos los creadores de las librerías utilizadas
- A la comunidad de Next.js y React
- A Vercel por su excelente plataforma de despliegue
