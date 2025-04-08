"use server"

import { sendContactEmail, type EmailFormData } from "@/lib/services/email-service"

/**
 * Server Action para enviar emails
 * Esta función se ejecuta en el servidor y es segura para usar API keys
 */
export async function sendEmail(formData: EmailFormData) {
  return await sendContactEmail(formData)
}
