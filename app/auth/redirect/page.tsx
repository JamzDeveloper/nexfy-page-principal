"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function RedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Obtener la cookie de autenticación
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(";").shift()
      return null
    }

    const authCookie = getCookie("auth")

    if (authCookie) {
      try {
        // Parsear la cookie para obtener el rol del usuario
        const userData = JSON.parse(authCookie)

        // Redirigir según el rol
        if (userData.role === "agent") {
          router.push("/dashboard-agent/dashboard")
        } else if (userData.role === "company") {
          router.push("/dashboard-company/dashboard")
        } else {
          // Si no hay un rol válido, redirigir al login
          router.push("/auth/login")
        }
      } catch (e) {
        // Si hay un error al parsear la cookie, redirigir al login
        console.error("Error parsing auth cookie:", e)
        router.push("/auth/login")
      }
    } else {
      // Si no hay cookie, redirigir al login
      router.push("/auth/login")
    }
  }, [router])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium">Redirigiendo...</p>
      </div>
    </div>
  )
}
