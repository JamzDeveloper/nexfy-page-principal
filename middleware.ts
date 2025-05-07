import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Obtener la cookie de autenticación
  const authCookie = request.cookies.get("auth")?.value

  // Verificar si la ruta actual es la raíz o /dashboard
  const isRoot = request.nextUrl.pathname === "/"
  const isDashboard = request.nextUrl.pathname === "/dashboard"

  // Si estamos en la raíz o en /dashboard y hay una cookie de autenticación
  if ((isRoot || isDashboard) && authCookie) {
    try {
      // Parsear la cookie para obtener el rol del usuario
      const userData = JSON.parse(authCookie)
      console.log("Middleware - User role:", userData.role) // Para depuración

      // Redirigir según el rol
      if (userData.role === "company") {
        console.log("Middleware - Redirecting to company dashboard") // Para depuración
        return NextResponse.redirect(new URL("/dashboard-company/dashboard", request.url))
      } else if (userData.role === "agent") {
        console.log("Middleware - Redirecting to agent dashboard") // Para depuración
        return NextResponse.redirect(new URL("/dashboard-agent/dashboard", request.url))
      }
    } catch (e) {
      // Si hay un error al parsear la cookie, no hacer nada
      console.error("Error parsing auth cookie:", e)
    }
  }

  // Si estamos en la raíz o en /dashboard y no hay cookie o hubo un error
  if ((isRoot || isDashboard) && !authCookie) {
    // Redirigir al login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Verificar si estamos intentando acceder a rutas protegidas sin autenticación
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard-agent") || request.nextUrl.pathname.startsWith("/dashboard-company")

  if (isProtectedRoute && !authCookie) {
    // Redirigir al login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Verificar si estamos intentando acceder a rutas de agente siendo compañía o viceversa
  if (authCookie) {
    try {
      const userData = JSON.parse(authCookie)

      // Si es agente intentando acceder a rutas de compañía
      if (userData.role === "agent" && request.nextUrl.pathname.startsWith("/dashboard-company")) {
        return NextResponse.redirect(new URL("/dashboard-agent/dashboard", request.url))
      }

      // Si es compañía intentando acceder a rutas de agente
      if (userData.role === "company" && request.nextUrl.pathname.startsWith("/dashboard-agent")) {
        return NextResponse.redirect(new URL("/dashboard-company/dashboard", request.url))
      }
    } catch (e) {
      // Si hay un error al parsear la cookie, no hacer nada
      console.error("Error parsing auth cookie:", e)
    }
  }

  // Continuar con la solicitud normal si no hay redirecciones
  return NextResponse.next()
}

// Configurar las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: ["/", "/dashboard", "/dashboard-agent/:path*", "/dashboard-company/:path*", "/auth/:path*"],
}
