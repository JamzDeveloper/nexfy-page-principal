"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createUser } from "@/lib/api/users"

const formSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
  role: z.enum(["agent", "company"], { required_error: "Selecciona un rol" }),
})

export function RegisterForm() {
  const [formError, setFormError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "agent",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError(null)
    setIsLoading(true)
    try {
      await createUser(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: values.role,
        },
        "" // Pasa aquí el token si tu backend lo requiere, si no, déjalo vacío
      )
      // Aquí puedes redirigir o mostrar mensaje de éxito si lo deseas
    } catch (error: any) {
      setFormError(error.message || "Ocurrió un error al registrarse")
    } finally {
      setIsLoading(false)
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
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
                  <FormLabel>Apellido</FormLabel>
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
                        <FormLabel className="font-normal">Compañía</FormLabel>
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