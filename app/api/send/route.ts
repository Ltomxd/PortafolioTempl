import { EmailTemplate } from "@/components/EmailTemplate"
import { Resend } from "resend"

// Verificar que la API key esté disponible
const resendApiKey = process.env.RESEND_API_KEY
if (!resendApiKey) {
  console.error("RESEND_API_KEY no está configurada en las variables de entorno")
}

const resend = new Resend(resendApiKey)

export async function POST(request: Request) {
  try {
    // Obtener los datos del formulario
    const body = await request.json()
    const { name, email, message } = body

    console.log("Datos recibidos:", { name, email, message })

    // Validación básica
    if (!name || !email || !message) {
      console.error("Campos incompletos:", { name, email, message })
      return Response.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    // Verificar que el email de destino esté configurado
    const toEmail = process.env.CONTACT_EMAIL || "velasquez8014@gmail.com"
    console.log("Enviando email a:", toEmail)
    console.log("Usando API key:", resendApiKey.substring(0, 10) + "...")

    try {
      const { data, error } = await resend.emails.send({
        from: "Formulario de Contacto <delivered@resend.dev>",
        to: [toEmail],
        subject: `Nuevo mensaje de ${name}`,
        react: EmailTemplate({
          firstName: "Franklyn",
          name,
          email,
          message,
        }),
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`, // Versión de texto plano como respaldo
      })

      if (error) {
        console.error("Error de Resend:", error)
        return Response.json(
          {
            success: false,
            error: error.message || "Error al enviar el email con Resend",
          },
          { status: 400 },
        )
      }

      console.log("Email enviado correctamente:", data)
      return Response.json({
        success: true,
        data,
      })
    } catch (resendError) {
      console.error("Error al llamar a la API de Resend:", resendError)
      return Response.json(
        {
          success: false,
          error: "Error al comunicarse con el servicio de email",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error general en la API route:", error)
    return Response.json(
      {
        success: false,
        error: "Error interno del servidor",
      },
      { status: 500 },
    )
  }
}
