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

    console.log("Datos recibidos en send-simple:", { name, email, message })

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
      // Versión simplificada sin React
      const { data, error } = await resend.emails.send({
        from: "Formulario de Contacto <delivered@resend.dev>",
        to: [toEmail],
        subject: `Nuevo mensaje de ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
            <h1 style="color: #ff3e55; margin-bottom: 20px;">¡Hola, Franklyn!</h1>
            <p style="font-size: 16px; line-height: 1.5;">Has recibido un nuevo mensaje desde tu formulario de contacto.</p>
            
            <div style="background-color: #0a0b16; color: #fff; padding: 15px; border-radius: 5px; margin-top: 20px; margin-bottom: 20px; border: 1px solid #1a1b2e;">
              <h2 style="color: #00e5ff; font-size: 18px; margin-top: 0;">Detalles del remitente:</h2>
              <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
              <h2 style="color: #ff3e55; font-size: 18px; margin-top: 0;">Mensaje:</h2>
              <p style="white-space: pre-wrap; line-height: 1.5;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px 0; border-top: 1px solid #ddd; font-size: 14px; color: #666; text-align: center;">
              <p>Este mensaje fue enviado desde tu portfolio.</p>
              <p style="margin-bottom: 0;">© ${new Date().getFullYear()} Franklyn Velásquez</p>
            </div>
          </div>
        `,
        text: `
          Nombre: ${name}
          Email: ${email}
          
          Mensaje:
          ${message}
        `,
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
