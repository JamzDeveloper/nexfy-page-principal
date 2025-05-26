import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { ChevronLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-sm font-medium text-muted-foreground"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          NexfyApp
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "NexfyApp has revolutionized how we connect with sales talent. Our revenue has grown by 200% since we
              started using the platform."
            </p>
            <footer className="text-sm">Sofia Davis, CEO at GrowthTech</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">¡Bienvenido de nuevo!</h1>
            <p className="text-sm text-muted-foreground">Ingresa tus credenciales para Acceder a tu cuenta.</p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="underline underline-offset-4 hover:text-primary">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
