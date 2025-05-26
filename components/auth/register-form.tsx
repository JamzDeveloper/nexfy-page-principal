"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const formSchema = z
  .object({
    role: z.enum(["agent", "company"], { required_error: "Selecciona un rol" }),
    firstName: z.string().min(1, { message: "El nombre es obligatorio" }),
    lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "Confirma tu contraseña" }),
    companyName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      // Si el rol es "company", el nombre de la empresa es obligatorio
      if (data.role === "company") {
        return data.companyName && data.companyName.trim().length > 0
      }
      return true
    },
    {
      message: "El nombre de la empresa es obligatorio",
      path: ["companyName"],
    },
  )

export function RegisterForm() {
  const { registerAgent, registerCompany, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [role, setRole] = useState<"agent" | "company">("agent")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "agent",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.role === "agent") {
        // Crear objeto específico para agente (sin companyName)
        const agentData = {
          user: {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName
          },
          agent: {}
        }
        await registerAgent(agentData)
      } else {
        // Crear objeto específico para empresa (con companyName)
        if (!values.companyName) {
          throw new Error("El nombre de la empresa es obligatorio")
        }
        const companyData = {
          user: {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          },
          company: {
            companyName: values.companyName,
            socialMedia: {}
          },
        }
        await registerCompany(companyData)
      }
    } catch (error) {
      // El error ya se maneja en el contexto
      console.error("Error en registro:", error)
    }
  }

  // Sincroniza el toggle visual con el valor del formulario
  function handleRoleChange(newRole: "agent" | "company") {
    setRole(newRole)
    form.setValue("role", newRole)

    // Limpiar el campo companyName cuando se cambia a agent
    if (newRole === "agent") {
      form.setValue("companyName", "")
    }

    // Trigger validation para mostrar/ocultar errores del campo companyName
    form.trigger("companyName")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TOGGLE DE ROL */}
        <div className="relative mb-6">
          <div className="flex bg-muted rounded-lg p-1">
            <button
              type="button"
              className={`relative flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                role === "agent"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleRoleChange("agent")}
            >
              <span className="relative z-10">Soy Agente</span>
            </button>
            <button
              type="button"
              className={`relative flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                role === "company"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleRoleChange("company")}
            >
              <span className="relative z-10">Soy Compañía</span>
            </button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {role === "company" && (
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nombre de empresa <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Apellido <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Contraseña <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••" {...field} />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-500"
                        tabIndex={-1}
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirmar contraseña <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showConfirm ? "text" : "password"} placeholder="••••••" {...field} />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-500"
                        tabIndex={-1}
                        onClick={() => setShowConfirm((v) => !v)}
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
