import jsPDF from "jspdf"
import "jspdf-autotable"

// Define types for CV data
interface CVEducation {
  title: string
  institution: string
  period: string
  url?: string
}

interface CVExperience {
  title: string
  company: string
  period: string
  description: string
  url?: string
}

interface CVSkill {
  name: string
  level?: number // 1-5
}

interface CVData {
  name: string
  title: string
  email: string
  phone?: string
  location: string
  about: string
  experience: CVExperience[]
  education: CVEducation[]
  skills: CVSkill[]
  // Remove or make optional
  languages?: { language: string; level: string }[]
  links?: { name: string; url: string }[]
}

// Function to generate CV PDF
export function generateCV(language = "es"): void {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Define CV data based on portfolio content
  const cvData: CVData = {
    name: "Franklyn Velásquez",
    title: language === "es" ? "Pentester Profesional y Desarrollador" : "Professional Pentester and Developer",
    email: "velasquez8014@gmail.com",
    location: "El Salvador",
    about:
      language === "es"
        ? "Me presento como un joven extrovertido con habilidades de comunicación que facilitan mi adaptación rápida a nuevos entornos de trabajo. Apasionado por la tecnología y la fotografía, soy Ingeniero en Sistemas y Redes Informáticas, programador, consultor de ciberseguridad, y pentester | Flag Player (Red Team)."
        : "I present myself as an outgoing young person with communication skills that facilitate my quick adaptation to new work environments. Passionate about technology and photography, I am a Systems and Computer Networks Engineer, programmer, cybersecurity consultant, and pentester | Flag Player (Red Team).",
    experience: [
      {
        title: language === "es" ? "PENTESTER" : "PENTESTER",
        company: "Soluciones Roots",
        period:
          language === "es"
            ? "Enero 2024 - Septiembre, experiencia en el area 3 años"
            : "January 2024 - September, 3 years of experience in the field",
        description:
          language === "es"
            ? "Realización de auditorías de seguridad, pruebas de penetración y análisis de vulnerabilidades para clientes corporativos. Implementación de soluciones de seguridad y capacitación a equipos técnicos."
            : "Conducting security audits, penetration testing, and vulnerability analysis for corporate clients. Implementation of security solutions and training for technical teams.",
      },
      {
        title: language === "es" ? "FRONTEND DEVELOPER" : "FRONTEND DEVELOPER",
        company: "Soluciones Roots",
        period: language === "es" ? "Enero 2024 - Septiembre" : "January 2024 - September",
        description:
          language === "es"
            ? "Desarrollo de aplicaciones web utilizando tecnologías modernas como React, Node.js. Implementación de medidas de seguridad en el desarrollo de software."
            : "Development of web applications using modern technologies such as React, Node.js. Implementation of security measures in software development.",
      },
      {
        title: language === "es" ? "DEVELOPER" : "DEVELOPER",
        company: language === "es" ? "(Freelance)" : "(Freelance)",
        period: language === "es" ? "Enero 2021 - Actualmente" : "January 2021 - Present",
        description:
          language === "es"
            ? "Análisis, diseño e implementación de sistemas informáticos. Mantenimiento y optimización de infraestructuras de red y servidores. Soporte técnico avanzado."
            : "Analysis, design, and implementation of computer systems. Maintenance and optimization of network infrastructures and servers. Advanced technical support.",
      },
    ],
    education: [
      {
        title:
          language === "es"
            ? "INGENIERÍA EN SISTEMAS Y REDES INFORMÁTICAS"
            : "SYSTEMS AND COMPUTER NETWORKS ENGINEERING",
        institution: "Universidad Gerardo Barrios, El Salvador",
        period: "2019 - 2023",
      },
      {
        title: language === "es" ? "CCNAV7: INTRODUCCIÓN A REDES" : "CCNAV7: INTRODUCTION TO NETWORKS",
        institution: "Cisco Networking Academy",
        period: "2020 - 2020",
        url: "https://www.netacad.com/",
      },
      {
        title:
          language === "es"
            ? "CCNAV7: SWITCHING, ROUTING AND WIRELESS ESSENTIALS"
            : "CCNAV7: SWITCHING, ROUTING AND WIRELESS ESSENTIALS",
        institution: "Cisco Networking Academy",
        period: "2021 - 2021",
        url: "https://www.netacad.com/",
      },
      {
        title: language === "es" ? "IT ESSENTIALS" : "IT ESSENTIALS",
        institution: "Cisco Networking Academy",
        period: "2020 - 2020",
        url: "https://www.netacad.com/",
      },
      {
        title: language === "es" ? "INTRODUCCIÓN AL HACKING" : "INTRODUCTION TO HACKING",
        institution: "hack4u",
        period: "2023 - 2024",
        url: "https://hack4u.io/",
      },
    ],
    skills: [
      { name: "Pentesting", level: 5 },
      { name: "Python", level: 4 },
      { name: "JavaScript/TypeScript", level: 4 },
      { name: "React", level: 4 },
      { name: "Node.js", level: 4 },
      { name: "Kali Linux", level: 5 },
      { name: "Parrot OS", level: 5 },
      { name: "OSINT", level: 4 },
      { name: "OWASP", level: 4 },
      { name: "Burp Suite", level: 4 },
      { name: "Wireshark", level: 4 },
      { name: "Docker", level: 3 },
      { name: "MySQL", level: 3 },
    ],
    languages: [],
    links: [
      { name: "GitHub", url: "https://github.com/Ltomxd" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/ftoml" },
      { name: "HackTheBox", url: "https://app.hackthebox.com/profile/1767382" },
    ],
  }

  // Set document properties
  doc.setProperties({
    title: `CV - ${cvData.name}`,
    subject: "Resume",
    author: cvData.name,
    keywords: "resume, cv, pentester, developer",
    creator: "Portfolio Website",
  })

  // Define colors
  const primaryColor = "#ff3e55"
  const secondaryColor = "#00e5ff"
  const darkColor = "#0a0b16"
  const lightColor = "#ffffff"
  const grayColor = "#888888"

  // Set font
  doc.setFont("helvetica")

  // Header section with dark background
  doc.setFillColor(darkColor)
  doc.rect(0, 0, 210, 40, "F")

  // Name
  doc.setTextColor(primaryColor)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text(cvData.name, 15, 15)

  // Title
  doc.setTextColor(lightColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.text(cvData.title, 15, 25)

  // Contact information with clickable links
  doc.setFontSize(10)
  doc.setTextColor(secondaryColor)

  // Email with link
  doc.setTextColor(secondaryColor)
  doc.textWithLink(cvData.email, 15, 33, { url: `mailto:${cvData.email}` })

  // Location
  doc.setTextColor(lightColor)
  doc.text(` | ${cvData.location}`, 15 + doc.getTextWidth(cvData.email), 33)

  // Links with proper spacing and clickable URLs
  if (cvData.links) {
    let xPos = 15
    cvData.links.forEach((link, index) => {
      doc.setTextColor(secondaryColor)
      doc.textWithLink(link.name, xPos, 38, { url: link.url })

      if (index < cvData.links!.length - 1) {
        doc.setTextColor(lightColor)
        xPos += doc.getTextWidth(link.name)
        doc.text(" | ", xPos, 38)
        xPos += doc.getTextWidth(" | ")
      }
    })
  }

  // Current Y position for content
  let yPos = 50

  // About section
  doc.setTextColor(primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text(language === "es" ? "SOBRE MÍ" : "ABOUT ME", 15, yPos)

  yPos += 7
  doc.setTextColor(darkColor)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")

  // Split about text to fit width
  const aboutLines = doc.splitTextToSize(cvData.about, 180)
  doc.text(aboutLines, 15, yPos)

  yPos += aboutLines.length * 5 + 10

  // Experience section
  doc.setTextColor(primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text(language === "es" ? "EXPERIENCIA" : "EXPERIENCE", 15, yPos)

  yPos += 7

  cvData.experience.forEach((exp) => {
    // Check if we need to add a new page
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }

    doc.setTextColor(darkColor)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(exp.title, 15, yPos)

    doc.setTextColor(secondaryColor)
    doc.setFontSize(10)
    doc.text(exp.company, 15, yPos + 5)

    doc.setTextColor(grayColor)
    doc.setFont("helvetica", "italic")
    doc.text(exp.period, 15, yPos + 10)

    doc.setTextColor(darkColor)
    doc.setFont("helvetica", "normal")
    const descLines = doc.splitTextToSize(exp.description, 180)
    doc.text(descLines, 15, yPos + 15)

    yPos += 15 + descLines.length * 5 + 10
  })

  // Education section
  // Check if we need to add a new page
  if (yPos > 250) {
    doc.addPage()
    yPos = 20
  }

  doc.setTextColor(primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text(language === "es" ? "EDUCACIÓN" : "EDUCATION", 15, yPos)

  yPos += 7

  cvData.education.forEach((edu) => {
    // Check if we need to add a new page
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }

    doc.setTextColor(darkColor)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(edu.title, 15, yPos)

    doc.setTextColor(secondaryColor)
    doc.setFontSize(10)

    // Add clickable link if URL is provided
    if (edu.url) {
      doc.textWithLink(edu.institution, 15, yPos + 5, { url: edu.url })
    } else {
      doc.text(edu.institution, 15, yPos + 5)
    }

    doc.setTextColor(grayColor)
    doc.setFont("helvetica", "italic")
    doc.text(edu.period, 15, yPos + 10)

    yPos += 15
  })

  // Skills section
  // Check if we need to add a new page
  if (yPos > 240) {
    doc.addPage()
    yPos = 20
  }

  yPos += 5
  doc.setTextColor(primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text(language === "es" ? "HABILIDADES" : "SKILLS", 15, yPos)

  yPos += 10

  // Create a grid for skills with visual indicators
  const skillsPerRow = 3
  const skillRows = Math.ceil(cvData.skills.length / skillsPerRow)
  const columnWidth = 60

  for (let i = 0; i < skillRows; i++) {
    // Check if we need to add a new page
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }

    for (let j = 0; j < skillsPerRow; j++) {
      const index = i * skillsPerRow + j
      if (index < cvData.skills.length) {
        const skill = cvData.skills[index]
        const xPos = 15 + j * columnWidth

        doc.setTextColor(darkColor)
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.text(skill.name, xPos, yPos)

        // Draw skill level with filled circles
        if (skill.level) {
          for (let k = 0; k < 5; k++) {
            if (k < skill.level) {
              // Filled circle for skills the user has
              doc.setFillColor(secondaryColor)
              doc.circle(xPos + 3 + k * 5, yPos + 5, 2, "F")
            } else {
              // Empty circle for skills the user doesn't have
              doc.setDrawColor(grayColor)
              doc.circle(xPos + 3 + k * 5, yPos + 5, 2, "S")
            }
          }
        }
      }
    }
    yPos += 15
  }

  // Languages section if available
  /*
  if (cvData.languages && cvData.languages.length > 0) {
    // Check if we need to add a new page
    if (yPos > 260) {
      doc.addPage()
      yPos = 20
    }

    yPos += 5
    doc.setTextColor(primaryColor)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text(language === "es" ? "IDIOMAS" : "LANGUAGES", 15, yPos)

    yPos += 7

    cvData.languages.forEach((lang) => {
      doc.setTextColor(darkColor)
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text(`${lang.language}: `, 15, yPos)

      doc.setFont("helvetica", "normal")
      doc.text(lang.level, 40, yPos)

      yPos += 5
    })
  }
  */

  // Add a QR code to your portfolio website (optional)
  // This would require a QR code library or you can use an image

  // Footer with date and page numbers
  const totalPages = doc.getNumberOfPages()

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)

    const today = new Date()
    const dateStr = today.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    doc.setFontSize(8)
    doc.setTextColor(grayColor)

    // Date on left
    doc.text(language === "es" ? `Generado el ${dateStr}` : `Generated on ${dateStr}`, 15, 285)

    // Page number on right
    doc.text(`${i} / ${totalPages}`, 180, 285)
  }

  // Create a more visually appealing version with color blocks
  // This is an alternative design that can be enabled
  const useAlternativeDesign = true

  if (useAlternativeDesign) {
    // Create a new PDF with alternative design
    const altDoc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Set document properties
    altDoc.setProperties({
      title: `CV - ${cvData.name}`,
      subject: "Resume",
      author: cvData.name,
      keywords: "resume, cv, pentester, developer",
      creator: "Portfolio Website",
    })

    // Dark header background
    altDoc.setFillColor(darkColor)
    altDoc.rect(0, 0, 210, 50, "F")

    // Name
    altDoc.setTextColor(primaryColor)
    altDoc.setFontSize(28)
    altDoc.setFont("helvetica", "bold")
    altDoc.text(cvData.name, 15, 20)

    // Title
    altDoc.setTextColor(lightColor)
    altDoc.setFontSize(14)
    altDoc.setFont("helvetica", "normal")
    altDoc.text(cvData.title, 15, 30)

    // Contact info with links
    altDoc.setFontSize(10)

    // Email with link
    altDoc.setTextColor(secondaryColor)
    altDoc.textWithLink(cvData.email, 15, 38, { url: `mailto:${cvData.email}` })

    // Location
    altDoc.setTextColor(lightColor)
    altDoc.text(` | ${cvData.location}`, 15 + altDoc.getTextWidth(cvData.email), 38)

    // Social links
    let xPos = 15
    cvData.links?.forEach((link, index) => {
      altDoc.setTextColor(secondaryColor)
      altDoc.textWithLink(link.name, xPos, 45, { url: link.url })

      if (index < cvData.links!.length - 1) {
        altDoc.setTextColor(lightColor)
        xPos += altDoc.getTextWidth(link.name)
        altDoc.text(" | ", xPos, 45)
        xPos += altDoc.getTextWidth(" | ")
      }
    })

    // Current Y position for content
    let yPos = 60

    // About section
    altDoc.setFillColor(primaryColor)
    altDoc.rect(0, yPos, 210, 10, "F")

    altDoc.setTextColor(lightColor)
    altDoc.setFontSize(14)
    altDoc.setFont("helvetica", "bold")
    altDoc.text(language === "es" ? "SOBRE MÍ" : "ABOUT ME", 15, yPos + 7)

    yPos += 15
    altDoc.setTextColor(darkColor)
    altDoc.setFontSize(10)
    altDoc.setFont("helvetica", "normal")

    // Split about text to fit width
    const aboutLines = altDoc.splitTextToSize(cvData.about, 180)
    altDoc.text(aboutLines, 15, yPos)

    yPos += aboutLines.length * 5 + 10

    // Experience section
    altDoc.setFillColor(primaryColor)
    altDoc.rect(0, yPos, 210, 10, "F")

    altDoc.setTextColor(lightColor)
    altDoc.setFontSize(14)
    altDoc.setFont("helvetica", "bold")
    altDoc.text(language === "es" ? "EXPERIENCIA" : "EXPERIENCE", 15, yPos + 7)

    yPos += 15

    cvData.experience.forEach((exp) => {
      // Check if we need to add a new page
      if (yPos > 270) {
        altDoc.addPage()
        yPos = 20
      }

      altDoc.setTextColor(primaryColor)
      altDoc.setFontSize(12)
      altDoc.setFont("helvetica", "bold")
      altDoc.text(exp.title, 15, yPos)

      altDoc.setTextColor(secondaryColor)
      altDoc.setFontSize(10)
      altDoc.text(exp.company, 15, yPos + 5)

      altDoc.setTextColor(grayColor)
      altDoc.setFont("helvetica", "italic")
      altDoc.text(exp.period, 15, yPos + 10)

      altDoc.setTextColor(darkColor)
      altDoc.setFont("helvetica", "normal")
      const descLines = altDoc.splitTextToSize(exp.description, 180)
      altDoc.text(descLines, 15, yPos + 15)

      yPos += 15 + descLines.length * 5 + 10
    })

    // Education section
    // Check if we need to add a new page
    if (yPos > 250) {
      altDoc.addPage()
      yPos = 20
    }

    altDoc.setFillColor(primaryColor)
    altDoc.rect(0, yPos, 210, 10, "F")

    altDoc.setTextColor(lightColor)
    altDoc.setFontSize(14)
    altDoc.setFont("helvetica", "bold")
    altDoc.text(language === "es" ? "EDUCACIÓN" : "EDUCATION", 15, yPos + 7)

    yPos += 15

    cvData.education.forEach((edu) => {
      // Check if we need to add a new page
      if (yPos > 270) {
        altDoc.addPage()
        yPos = 20
      }

      altDoc.setTextColor(primaryColor)
      altDoc.setFontSize(12)
      altDoc.setFont("helvetica", "bold")
      altDoc.text(edu.title, 15, yPos)

      altDoc.setTextColor(secondaryColor)
      altDoc.setFontSize(10)

      // Add clickable link if URL is provided
      if (edu.url) {
        altDoc.textWithLink(edu.institution, 15, yPos + 5, { url: edu.url })
      } else {
        altDoc.text(edu.institution, 15, yPos + 5)
      }

      altDoc.setTextColor(grayColor)
      altDoc.setFont("helvetica", "italic")
      altDoc.text(edu.period, 15, yPos + 10)

      yPos += 15
    })

    // Skills section
    // Check if we need to add a new page
    if (yPos > 240) {
      altDoc.addPage()
      yPos = 20
    }

    yPos += 5

    altDoc.setFillColor(primaryColor)
    altDoc.rect(0, yPos, 210, 10, "F")

    altDoc.setTextColor(lightColor)
    altDoc.setFontSize(14)
    altDoc.setFont("helvetica", "bold")
    altDoc.text(language === "es" ? "HABILIDADES" : "SKILLS", 15, yPos + 7)

    yPos += 15

    // Create a grid for skills with visual indicators
    const skillsPerRow = 3
    const skillRows = Math.ceil(cvData.skills.length / skillsPerRow)
    const columnWidth = 60

    for (let i = 0; i < skillRows; i++) {
      // Check if we need to add a new page
      if (yPos > 270) {
        altDoc.addPage()
        yPos = 20
      }

      for (let j = 0; j < skillsPerRow; j++) {
        const index = i * skillsPerRow + j
        if (index < cvData.skills.length) {
          const skill = cvData.skills[index]
          const xPos = 15 + j * columnWidth

          altDoc.setTextColor(primaryColor)
          altDoc.setFontSize(10)
          altDoc.setFont("helvetica", "bold")
          altDoc.text(skill.name, xPos, yPos)

          // Draw skill level with filled circles
          if (skill.level) {
            for (let k = 0; k < 5; k++) {
              if (k < skill.level) {
                // Filled circle for skills the user has
                altDoc.setFillColor(secondaryColor)
                altDoc.circle(xPos + 3 + k * 5, yPos + 5, 2, "F")
              } else {
                // Empty circle for skills the user doesn't have
                altDoc.setDrawColor(grayColor)
                altDoc.circle(xPos + 3 + k * 5, yPos + 5, 2, "S")
              }
            }
          }
        }
      }
      yPos += 15
    }

    // Languages section if available
    /*
    if (cvData.languages && cvData.languages.length > 0) {
      // Check if we need to add a new page
      if (yPos > 260) {
        altDoc.addPage()
        yPos = 20
      }

      yPos += 5

      altDoc.setFillColor(primaryColor)
      altDoc.rect(0, yPos, 210, 10, "F")

      altDoc.setTextColor(lightColor)
      altDoc.setFontSize(14)
      altDoc.setFont("helvetica", "bold")
      altDoc.text(language === "es" ? "IDIOMAS" : "LANGUAGES", 15, yPos + 7)

      yPos += 15

      cvData.languages.forEach((lang) => {
        altDoc.setTextColor(primaryColor)
        altDoc.setFontSize(10)
        altDoc.setFont("helvetica", "bold")
        altDoc.text(`${lang.language}: `, 15, yPos)

        altDoc.setTextColor(darkColor)
        altDoc.setFont("helvetica", "normal")
        altDoc.text(lang.level, 40, yPos)

        yPos += 5
      })
    }
    */

    // Footer with date and page numbers
    const totalPages = altDoc.getNumberOfPages()

    for (let i = 1; i <= totalPages; i++) {
      altDoc.setPage(i)

      const today = new Date()
      const dateStr = today.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      altDoc.setFontSize(8)
      altDoc.setTextColor(grayColor)

      // Date on left
      altDoc.text(language === "es" ? `Generado el ${dateStr}` : `Generated on ${dateStr}`, 15, 285)

      // Page number on right
      altDoc.text(`${i} / ${totalPages}`, 180, 285)
    }

    // Save the alternative design PDF
    altDoc.save(`CV_Franklyn_Velasquez_${language.toUpperCase()}.pdf`)
  } else {
    // Save the original design PDF
    doc.save(`CV_Franklyn_Velasquez_${language.toUpperCase()}.pdf`)
  }
}
