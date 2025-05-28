//herramientas y peticiones del middleware
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

//se ejecuta en cada solicitud, verifica las cookies de autenticación y redirige a los usuarios según su rol y la ruta a la que intentan acceder.

export async function middleware (request:NextRequest) {
  const sessionToken = request.cookies.get("session-token"); /* ?.value para evitar que salga error y tambien bote los undefined. (sesion-token es el nombre recordar para users/route.ts) */
  const userRole = request.cookies.get("role");
  const { pathname } = request.nextUrl;

  let isLoggedIn = !!sessionToken;
  let isCompany = userRole?.value === "Company";
  let isAgent = userRole?.value === "Agent";
  
  // Validar token con la API
  if (sessionToken) {
    try {
      const response = await fetch(
        `${process.env.EXTERNAL_URL}/users/data-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken.value}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        isLoggedIn = true;
        isCompany = data.user?.role === "company";
        isAgent = data.user?.role === "agent";
      } else if (response.status === 401) {
        // Token inválido: eliminar cookies y redirigir a login
        const res = NextResponse.redirect(new URL("/auth/login", request.url));
        res.cookies.set("session-token", "", { maxAge: 0, path: "/" });
        res.cookies.set("role", "", { maxAge: 0, path: "/" });
        return res;
      }
    } catch (err) {
      console.error("Error validando token:", err);
      const res = NextResponse.redirect(new URL("/auth/login", request.url));
      res.cookies.set("session-token", "", { maxAge: 0, path: "/" });
      res.cookies.set("role", "", { maxAge: 0, path: "/" });
      return res;
    }
  } else {
    // Permitir acceso a la página de login aunque no haya token
    if (pathname === "/auth/login") {
      return NextResponse.next();
    }
    // Si no hay token y no es la página de login, redirige a login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Si intenta entrar al login y ya está autenticado, redirige a su dashboard
  if (pathname === "/auth/login") {
    if (isLoggedIn && isCompany) {
      return NextResponse.redirect(new URL("/dashboard-company/dashboard", request.url));
    }
    if (isLoggedIn && isAgent) {
      return NextResponse.redirect(new URL("/dashboard-agent/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protege los dashboards según el rol
  if (pathname.startsWith("/dashboard-company")) {
    if (!isLoggedIn || !isCompany) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  if (pathname.startsWith("/dashboard-agent")) {
    if (!isLoggedIn || !isAgent) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard-company/:path*",
    "/dashboard-agent/:path*",
    "/auth/login"
  ],
};

/*

export function middleware(request: NextRequest) {
  // Obtener la cookie de autenticación
  const authToken = request.cookies.get("nexfy_auth_token")?.value
  const userJson = request.cookies.get("nexfy_current_user")?.value

  // Verificar si la ruta actual es la raíz o /dashboard
  const isRoot = request.nextUrl.pathname === "/"
  const isDashboard = request.nextUrl.pathname === "/dashboard"

  // Si estamos en la raíz o en /dashboard y hay una cookie de autenticación
  if ((isRoot || isDashboard) && authToken && userJson) {
    try {
      // Parsear la cookie para obtener el rol del usuario
      const userData = JSON.parse(userJson)

      // Redirigir según el rol
      if (userData.role === "company") {
        return NextResponse.redirect(new URL("/dashboard-company/dashboard", request.url))
      } else if (userData.role === "agent") {
        return NextResponse.redirect(new URL("/dashboard-agent/dashboard", request.url))
      }
    } catch (e) {
      // Si hay un error al parsear la cookie, no hacer nada
      console.error("Error parsing auth cookie:", e)
    }
  }

  // Si estamos en la raíz o en /dashboard y no hay cookie o hubo un error
  if ((isRoot || isDashboard) && (!authToken || !userJson)) {
    // Redirigir al login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Verificar si estamos intentando acceder a rutas protegidas sin autenticación
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard-agent") || request.nextUrl.pathname.startsWith("/dashboard-company")

  if (isProtectedRoute && (!authToken || !userJson)) {
    // Redirigir al login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Verificar si estamos intentando acceder a rutas de agente siendo compañía o viceversa
  if (authToken && userJson) {
    try {
      const userData = JSON.parse(userJson)

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

*/