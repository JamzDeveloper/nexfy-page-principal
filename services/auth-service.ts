import type { AuthResponse, LoginCredentials, RegisterCredentials, UpdateProfileData, User } from "@/types/auth"

// Función para generar un ID único
const generateId = () => Math.random().toString(36).substring(2, 15)

// Función para obtener la fecha actual en formato ISO
const getCurrentDate = () => new Date().toISOString()

// Clave para almacenar usuarios en localStorage
const USERS_STORAGE_KEY = "nexfy_users"
const AUTH_TOKEN_KEY = "nexfy_auth_token"
const CURRENT_USER_KEY = "nexfy_current_user"

// Función para obtener usuarios almacenados
const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return []

  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
  return storedUsers ? JSON.parse(storedUsers) : []
}

// Función para guardar usuarios
const saveUsers = (users: User[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

// Función para guardar el token y usuario actual
const saveAuthData = (user: User, token: string) => {
  if (typeof window === "undefined") return
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))

  // También guardar en cookies para el middleware
  document.cookie = `nexfy_auth_token=${token}; path=/; max-age=86400`
  document.cookie = `nexfy_current_user=${JSON.stringify(user)}; path=/; max-age=86400`
}

// Función para limpiar datos de autenticación
const clearAuthData = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(CURRENT_USER_KEY)

  // También limpiar cookies
  document.cookie = "nexfy_auth_token=; path=/; max-age=0"
  document.cookie = "nexfy_current_user=; path=/; max-age=0"
}

// Servicio de autenticación mock
export const authService = {
  // Inicializar con algunos usuarios de ejemplo
  init: () => {
    const existingUsers = getStoredUsers()

    if (existingUsers.length === 0) {
      const defaultUsers: User[] = [
        {
          id: generateId(),
          email: "agent@example.com",
          name: "Juan Pérez",
          role: "agent",
          createdAt: getCurrentDate(),
          profile: {
            bio: "Agente de ventas con 5 años de experiencia",
            title: "Agente Senior",
            location: "Madrid, España",
            expertise: "SaaS",
          },
        },
        {
          id: generateId(),
          email: "company@example.com",
          name: "Empresa ABC",
          role: "company",
          createdAt: getCurrentDate(),
          company: {
            id: generateId(),
            name: "Empresa ABC",
          },
          profile: {
            bio: "Empresa líder en soluciones tecnológicas",
            location: "Barcelona, España",
            website: "www.empresaabc.com",
          },
        },
      ]

      saveUsers(defaultUsers)
    }
  },

  // Registrar un nuevo usuario
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    // Simular latencia de red
    await new Promise((resolve) => setTimeout(resolve, 800))

    const users = getStoredUsers()

    // Verificar si el email ya existe
    if (users.some((user) => user.email === credentials.email)) {
      throw new Error("El email ya está registrado")
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: generateId(),
      email: credentials.email,
      name: credentials.name,
      role: credentials.role,
      createdAt: getCurrentDate(),
      profile: {
        bio: "",
        title: credentials.role === "agent" ? "Agente" : "",
        location: "",
        expertise: credentials.role === "agent" ? "General" : "",
      },
    }

    // Si es una empresa, añadir datos de empresa
    if (credentials.role === "company") {
      newUser.company = {
        id: generateId(),
        name: credentials.name,
      }
    }

    // Guardar el nuevo usuario
    users.push(newUser)
    saveUsers(users)

    // Generar token (simulado)
    const token = `mock_token_${generateId()}`

    // Guardar datos de autenticación
    saveAuthData(newUser, token)

    return { user: newUser, token }
  },

  // Iniciar sesión
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simular latencia de red
    await new Promise((resolve) => setTimeout(resolve, 800))

    const users = getStoredUsers()

    // En un mock, solo verificamos el email (en producción verificaríamos también la contraseña)
    const user = users.find((user) => user.email === credentials.email)

    if (!user) {
      throw new Error("Credenciales inválidas")
    }

    // Generar token (simulado)
    const token = `mock_token_${generateId()}`

    // Guardar datos de autenticación
    saveAuthData(user, token)

    return { user, token }
  },

  // Cerrar sesión
  logout: async (): Promise<void> => {
    // Simular latencia de red
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Limpiar datos de autenticación
    clearAuthData()
  },

  // Obtener usuario actual
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null

    const userJson = localStorage.getItem(CURRENT_USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false

    return !!localStorage.getItem(AUTH_TOKEN_KEY)
  },

  // Actualizar perfil de usuario
  updateProfile: async (userId: string, data: UpdateProfileData): Promise<User> => {
    // Simular latencia de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = getStoredUsers()
    const userIndex = users.findIndex((user) => user.id === userId)

    if (userIndex === -1) {
      throw new Error("Usuario no encontrado")
    }

    // Actualizar datos del usuario
    const updatedUser = {
      ...users[userIndex],
      name: data.name || users[userIndex].name,
      email: data.email || users[userIndex].email,
      profile: {
        ...users[userIndex].profile,
        bio: data.bio !== undefined ? data.bio : users[userIndex].profile?.bio,
        title: data.title !== undefined ? data.title : users[userIndex].profile?.title,
        location: data.location !== undefined ? data.location : users[userIndex].profile?.location,
        expertise: data.expertise !== undefined ? data.expertise : users[userIndex].profile?.expertise,
        phone: data.phone !== undefined ? data.phone : users[userIndex].profile?.phone,
        website: data.website !== undefined ? data.website : users[userIndex].profile?.website,
      },
      avatar: data.avatar || users[userIndex].avatar,
    }

    // Actualizar la lista de usuarios
    users[userIndex] = updatedUser
    saveUsers(users)

    // Si es el usuario actual, actualizar también en el almacenamiento local
    const currentUser = authService.getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      saveAuthData(updatedUser, localStorage.getItem(AUTH_TOKEN_KEY) || "")
    }

    return updatedUser
  },
}

// Inicializar el servicio si estamos en el cliente
if (typeof window !== "undefined") {
  authService.init()
}
