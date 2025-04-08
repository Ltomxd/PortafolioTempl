import type * as React from "react"

interface EmailTemplateProps {
  firstName: string
  message: string
  email: string
  name: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, message, email, name }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      color: "#333",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "5px",
    }}
  >
    <h1 style={{ color: "#ff3e55", marginBottom: "20px" }}>¡Hola, {firstName}!</h1>
    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
      Has recibido un nuevo mensaje desde tu formulario de contacto.
    </p>

    <div
      style={{
        backgroundColor: "#0a0b16",
        color: "#fff",
        padding: "15px",
        borderRadius: "5px",
        marginTop: "20px",
        marginBottom: "20px",
        border: "1px solid #1a1b2e",
      }}
    >
      <h2 style={{ color: "#00e5ff", fontSize: "18px", marginTop: "0" }}>Detalles del remitente:</h2>
      <p style={{ margin: "10px 0" }}>
        <strong>Nombre:</strong> {name}
      </p>
      <p style={{ margin: "10px 0" }}>
        <strong>Email:</strong> {email}
      </p>
    </div>

    <div
      style={{
        backgroundColor: "#fff",
        padding: "15px",
        borderRadius: "5px",
        border: "1px solid #ddd",
      }}
    >
      <h2 style={{ color: "#ff3e55", fontSize: "18px", marginTop: "0" }}>Mensaje:</h2>
      <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>{message}</p>
    </div>

    <div
      style={{
        marginTop: "30px",
        padding: "15px 0",
        borderTop: "1px solid #ddd",
        fontSize: "14px",
        color: "#666",
        textAlign: "center" as const,
      }}
    >
      <p>Este mensaje fue enviado desde tu portfolio.</p>
      <p style={{ marginBottom: "0" }}>© {new Date().getFullYear()} Franklyn Velásquez</p>
    </div>
  </div>
)
