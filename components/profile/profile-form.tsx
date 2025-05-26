"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { updateUser } from "@/lib/api/users"

// Utilidad para obtener cookie (puedes usar tu propia función)
function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift()!;
  return "";
}

const profileFormSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }).optional(),
  role: z.enum(["agent", "company"], { required_error: "Selecciona un rol" }),
  description: z.string().optional(),
  profileImage: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

type ProfileFormProps = {
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: "agent" | "company"
    description?: string
    profileImage?: string
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const defaultValues: Partial<ProfileFormValues> = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    role: user?.role || "agent",
    description: user?.description || "",
    profileImage: user?.profileImage || "",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormValues) {
    setFormError(null)
    setIsSubmitting(true)
    try {
      const token = getCookie("session-token")
      await updateUser(
        user.id,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password, // solo si quieres permitir cambiarla
          role: data.role,
          description: data.description,
          profileImage: data.profileImage,
        },
        token
      )
      // Aquí puedes mostrar un mensaje de éxito si lo deseas
    } catch (error: any) {
      setFormError(error.message || "Error al actualizar el perfil")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user?.profileImage || "/professional-headshot.png"} alt="Profile" />
                <AvatarFallback>
                  {user?.firstName?.charAt(0).toUpperCase()}{user?.lastName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Puedes agregar aquí lógica para cambiar la foto */}
            </div>
            <div className="flex-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre" {...field} />
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
                            <Input placeholder="Apellido" {...field} />
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
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rol</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu rol" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="agent">Agente</SelectItem>
                                <SelectItem value="company">Compañía</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Sobre ti o tu empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="profileImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Imagen de perfil (URL)</FormLabel>
                          <FormControl>
                            <Input placeholder="URL de la imagen" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Si quieres permitir cambiar la contraseña desde aquí, descomenta esto: */}
                    {/* 
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Nueva contraseña" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    */}
                  </div>
                  {formError && <div className="text-sm font-medium text-destructive">{formError}</div>}
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Actualizando..." : "Actualizar"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}