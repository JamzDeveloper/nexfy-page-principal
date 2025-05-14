"use client"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/types/auth"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Mínimo 2 caracteres",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(8, {
    message: "Mínimo 8 caracteres",
  }),
  role: z.enum(["agent", "company"], {
    required_error: "Selecciona un rol",
  }),
})

export function RegisterForm() {
  const searchParams = useSearchParams()
  const { register, isLoading } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  const defaultRole = searchParams.get("role") as UserRole | null

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: defaultRole || "agent",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError(null)
    try {
      await register(values)
    } catch (error) {
      // El error ya se maneja en el contexto de autenticación
      console.error("Register error:", error)
      if (error instanceof Error) {
        setFormError(error.message)
      } else {
        setFormError("Ocurrió un error al registrarse")
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Soy</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="agent" />
                        </FormControl>
                        <FormLabel className="font-normal">Agente</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="company" />
                        </FormControl>
                        <FormLabel className="font-normal">Empresa</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formError && <div className="text-sm font-medium text-destructive">{formError}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
