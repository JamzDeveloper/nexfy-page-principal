
/**
 * Obtiene una cookie del navegador
 * @param name Nombre de la cookie
 * @returns Valor de la cookie o null si no existe
 */
export function getCookie(name: string): string | null {
    // Verificar que estamos en el cliente
    if (typeof document === "undefined") {
        console.log("getCookie: No estamos en el cliente")
        return null
    }

    // Método 1: Usando split (más compatible)
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Verificar si esta cookie comienza con el nombre que buscamos
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1)
        }
    }

    // Método 2: Usando RegExp (alternativa)
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
    if (match) return match[2]

    console.log(`Cookie '${name}' no encontrada. Todas las cookies:`, document.cookie)
    return null
}

/**
 * Establece una cookie en el navegador
 * @param name Nombre de la cookie
 * @param value Valor de la cookie
 * @param days Días de duración (opcional)
 */
export function setCookie(name: string, value: string, days?: number): void {
    let expires = ""

    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = "; expires=" + date.toUTCString()
    }

    document.cookie = name + "=" + value + expires + "; path=/"
    console.log(`Cookie '${name}' establecida:`, value)
}

/**
 * Elimina una cookie
 * @param name Nombre de la cookie a eliminar
 */
export function deleteCookie(name: string): void {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    console.log(`Cookie '${name}' eliminada`)
}
