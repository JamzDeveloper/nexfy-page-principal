"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { authService } from "@/services/auth-service"
import type { LoginCredentials, RegisterCredentials, UpdateProfileData, User } from "@/types/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: UpdateProfileData) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { setTheme } = useTheme()

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = () => {
      try {
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)

        // Establecer tema según el rol del usuario
        if (currentUser) {
          if (currentUser.role === "company") {
            setTheme("light")
          } else {
            setTheme("system")
          }
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [setTheme])

  // Función de login
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const { user } = await authService.login(credentials)
      setUser(user)

      // Establecer tema según el rol
      if (user.role === "company") {
        setTheme("light")
      } else {
        setTheme("system")
      }

      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido de nuevo, ${user.name}`,
      })

      // Redirigir según el rol
      if (user.role === "company") {
        router.push("/dashboard-company/dashboard")
      } else {
        router.push("/dashboard-agent/dashboard")
      }
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error instanceof Error ? error.message : "Ocurrió un error al iniciar sesión",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Función de registro
  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true)
    try {
      const { user } = await authService.register(credentials)
      setUser(user)

      // Establecer tema según el rol
      if (user.role === "company") {
        setTheme("light")
      } else {
        setTheme("system")
      }

      toast({
        title: "Registro exitoso",
        description: `Bienvenido a NexfyApp, ${user.name}`,
      })

      // Esperar un momento para asegurar que los datos se han guardado
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirigir según el rol
      if (user.role === "company") {
        window.location.href = "/dashboard-company/dashboard"
      } else {
        window.location.href = "/dashboard-agent/dashboard"
      }
    } catch (error) {
      toast({
        title: "Error de registro",
        description: error instanceof Error ? error.message : "Ocurrió un error al registrarse",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Función de logout
  const logout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setUser(null)

      // Usar window.location para forzar una recarga completa
      window.location.href = "/auth/login"

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      })
    } catch (error) {
      toast({
        title: "Error al cerrar sesión",
        description: "Ocurrió un error al cerrar sesión",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para actualizar perfil
  const updateProfile = async (data: UpdateProfileData) => {
    if (!user) throw new Error("No hay usuario autenticado")

    setIsLoading(true)
    try {
      const updatedUser = await authService.updateProfile(user.id, data)
      setUser(updatedUser)
      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error al actualizar perfil",
        description: error instanceof Error ? error.message : "Ocurrió un error al actualizar el perfil",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
