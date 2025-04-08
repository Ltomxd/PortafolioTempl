import { Resend } from "resend"
import { EmailTemplate } from "@/components/EmailTemplate"

// Inicializar Resend con la API key desde variables de entorno
// Esto solo se ejecuta en el servidor, nunca en el cliente
const resend = new Resend(process.env.RESEND_API_KEY)

// Interfaz para los datos del formulario
export interface EmailFormData {
  name: string
  email: string
  message: string
}

/**
 * Servicio para enviar emails usando Resend
 * Esta función solo se ejecuta en el servidor
 */
export async function sendContactEmail(formData: EmailFormData) {
  try {
    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        error: "Todos los campos son obligatorios",
      }
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: "El formato del email no es válido",
      }
    }

    // Verificar que el email de destino esté configurado
    const toEmail = process.env.CONTACT_EMAIL || "velasquez8014@gmail.com"
    console.log("Enviando email a:", toEmail)

    // Verificar que la API key esté disponible
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      console.log("Usando API key:", resendApiKey.substring(0, 10) + "...")
    } else {
      console.error("RESEND_API_KEY no está configurada en las variables de entorno")
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: "Formulario de Contacto <delivered@resend.dev>",
      to: [toEmail],
      subject: `Nuevo mensaje de ${formData.name}`,
      react: EmailTemplate({
        firstName: "Franklyn",
        message: formData.message,
        email: formData.email,
        name: formData.name,
      }),
      // Versión de texto plano como respaldo
      text: `
       Nombre: ${formData.name}
       Email: ${formData.email}
       
       Mensaje:
       ${formData.message}
     `,
    })

    if (error) {
      console.error("Error al enviar email:", error)
      return {
        success: false,
        error: "Error al enviar el mensaje. Por favor, intenta de nuevo.",
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Error inesperado:", error)
    return {
      success: false,
      error: "Error inesperado. Por favor, intenta de nuevo.",
    }
  }
}
