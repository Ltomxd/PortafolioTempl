"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

export default function DebugTranslations() {
  const { language, t } = useLanguage()

  useEffect(() => {
    console.log("Current language:", language)
    console.log("Translation test:", {
      hello: t("hero.hello"),
      iam: t("hero.iam"),
      pentester: t("hero.roles.pentester"),
      developer: t("hero.roles.developer"),
      consultant: t("hero.roles.consultant"),
    })
  }, [language, t])

  // No renderiza nada visible
  return null
}
