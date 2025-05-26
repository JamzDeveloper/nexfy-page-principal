"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { AgentRegisterData, CompanyRegisterData } from "@/types/auth"
import { createAgent, createCompany } from "@/lib/api/users";

interface LoginData {
  email: string
  password: string
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "agent" | "company"
  companyName?: string // Opcional en User porque los agents no lo tienen
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  registerAgent: (data: AgentRegisterData) => Promise<void>
  registerCompany: (data: CompanyRegisterData) => Promise<void>
  login: (data: LoginData) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

// Cache para evitar múltiples peticiones
const requestCache = new Map<string, Promise<any>>()
const dataCache = new Map<string, { data: any; timestamp: number; ttl: number }>()

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Función para hacer peticiones con caché y deduplicación
  const makeRequest = useCallback(
    async (key: string, requestFn: () => Promise<any>, cacheTTL: number = 5 * 60 * 1000): Promise<any> => {
      // Verificar caché primero
      const cached = dataCache.get(key)
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        return cached.data
      }

      // Verificar si ya hay una petición en curso
      if (requestCache.has(key)) {
        return requestCache.get(key)
      }

      // Crear nueva petición
      const request = requestFn()
        .then((data) => {
          // Guardar en caché
          dataCache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: cacheTTL,
          })
          // Limpiar de peticiones en curso
          requestCache.delete(key)
          return data
        })
        .catch((error) => {
          // Limpiar de peticiones en curso en caso de error
          requestCache.delete(key)
          throw error
        })

      // Guardar petición en curso
      requestCache.set(key, request)
      return request
    },
    [],
  )

  // Función para limpiar caché
  const clearCache = useCallback((pattern?: string) => {
    if (pattern) {
      for (const key of dataCache.keys()) {
        if (key.includes(pattern)) {
          dataCache.delete(key)
          requestCache.delete(key)
        }
      }
    } else {
      dataCache.clear()
      requestCache.clear()
    }
  }, [])

  // Cargar usuario al inicializar (con caché)
  const loadUser = useCallback(async () => {
    if (isInitialized) return

    try {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setIsInitialized(true)
        return
      }

      const userData = await makeRequest(
        "current_user",
        async () => {
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (!response.ok) throw new Error("Token inválido")
          return response.json()
        },
        10 * 60 * 1000, // 10 minutos de caché para datos de usuario
      )

      setUser(userData.user)
    } catch (error) {
      // Token inválido, limpiar
      localStorage.removeItem("auth_token")
      clearCache("current_user")
    } finally {
      setIsInitialized(true)
    }
  }, [isInitialized, makeRequest, clearCache])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  // Registro para agentes
const registerAgent = useCallback(
  async (data: AgentRegisterData) => {
    setIsLoading(true)
    try {
      const result = await makeRequest(
        `register_agent_${data.user.email}`,
        async () => {
          // Usar función centralizada
          return await createAgent(data, "");
        },
        0,
      )
      setUser(result.user)
      if (result.token) {
        localStorage.setItem("auth_token", result.token)
      }
      clearCache("current_user")
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta de agente ha sido creada correctamente",
      })
      router.push("/dashboard-agent")
    } catch (error) {
      toast({
        title: "Error de registro",
        description: error instanceof Error ? error.message : "Ocurrió un error al registrar el agente",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  },
  [makeRequest, clearCache, router, toast],
)

// Registro para empresas
const registerCompany = useCallback(
  async (data: CompanyRegisterData) => {
    setIsLoading(true)
    try {
      const result = await makeRequest(
        `register_company_${data.user.email}`,
        async () => {
          // Usar función centralizada
          return await createCompany(data, "");
        },
        0,
      )
      setUser(result.user)
      if (result.token) {
        localStorage.setItem("auth_token", result.token)
      }
      clearCache("current_user")
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta de empresa ha sido creada correctamente",
      })
      router.push("/dashboard-company")
    } catch (error) {
      toast({
        title: "Error de registro",
        description: error instanceof Error ? error.message : "Ocurrió un error al registrar la empresa",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  },
  [makeRequest, clearCache, router, toast],
)

  const login = useCallback(
    async (data: LoginData) => {
      setIsLoading(true)
      try {
        const result = await makeRequest(
          `login_${data.email}`,
          async () => {
            const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.message || "Error al iniciar sesión")
            }

            return response.json()
          },
          0, // No cachear logins
        )

        setUser(result.user)

        // Guardar token
        if (result.token) {
          localStorage.setItem("auth_token", result.token)
        }

        // Limpiar caché relacionado con auth
        clearCache("current_user")

        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido de nuevo, ${result.user.firstName}`,
        })

        // Redirigir según el rol
        if (result.user.role === "agent") {
          router.push("/dashboard-agent")
        } else {
          router.push("/dashboard-company")
        }
      } catch (error) {
        toast({
          title: "Error de inicio de sesión",
          description: error instanceof Error ? error.message : "Credenciales inválidas",
          variant: "destructive",
        })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [makeRequest, clearCache, router, toast],
  )

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await makeRequest(
        "logout",
        async () => {
          const response = await fetch("/api/auth/logout", {
            method: "POST",
          })
          return response.json()
        },
        0, // No cachear logout
      )

      setUser(null)
      localStorage.removeItem("auth_token")

      // Limpiar todo el caché al hacer logout
      clearCache()

      router.push("/auth/login")

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
  }, [makeRequest, clearCache, router, toast])

  const refreshUser = useCallback(async () => {
    // Forzar actualización del usuario (limpiar caché primero)
    clearCache("current_user")
    await loadUser()
  }, [clearCache, loadUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        registerAgent,
        registerCompany,
        login,
        logout,
        refreshUser,
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

// Exportar los tipos para uso en otros archivos
export type { AgentRegisterData, CompanyRegisterData, LoginData, User }
