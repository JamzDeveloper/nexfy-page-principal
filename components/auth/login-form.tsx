"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(6, {
    message: "Mínimo 6 caracteres",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { setTheme } = useTheme()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simular autenticación
    setTimeout(() => {
      // Determinar automáticamente el rol basado en el email
      // Modificado: Ahora detecta "company" en cualquier parte del email
      const isCompany = values.email.toLowerCase().includes("company")
      const role = isCompany ? "company" : "agent"

      console.log("Role detected:", role) // Para depuración

      // Establecer el tema según el rol determinado
      if (role === "company") {
        setTheme("light") // Tema claro para compañías
      } else {
        setTheme("system") // Tema del sistema para agentes
      }

      // Crear un objeto con los datos del usuario
      const userData = {
        email: values.email,
        role: role,
        name: role === "company" ? "Empresa ABC" : "Juan Pérez",
        theme: role === "company" ? "light" : "system",
      }

      // Guardar en una cookie
      document.cookie = `auth=${JSON.stringify(userData)}; path=/; max-age=86400`

      // Redirigir según el rol
      if (role === "company") {
        console.log("Redirecting to company dashboard") // Para depuración
        router.push("/dashboard-company/dashboard")
      } else {
        console.log("Redirecting to agent dashboard") // Para depuración
        router.push("/dashboard-agent/dashboard")
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
