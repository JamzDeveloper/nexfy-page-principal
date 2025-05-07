"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

interface MessageChatProps extends React.HTMLAttributes<HTMLDivElement> {
  conversationId: number | null
}

export function MessageChat({ className, conversationId, ...props }: MessageChatProps) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)

  // Simulación de conversaciones
  const conversations = {
    1: {
      id: 1,
      name: "Jane Cooper",
      company: "TechCorp",
      avatar: "/woman-headshot.png",
      messages: [
        {
          id: 1,
          sender: "them",
          content:
            "Hola! Vi tu perfil y creo que serías perfecto para nuestra posición de Representante de Ventas Empresariales en TechCorp.",
          time: "10:30 AM",
        },
        {
          id: 2,
          sender: "me",
          content:
            "¡Hola Jane! Gracias por contactarme. Definitivamente estoy interesado en conocer más sobre la oportunidad.",
          time: "10:35 AM",
        },
        {
          id: 3,
          sender: "them",
          content:
            "¡Excelente! El puesto implica trabajar con nuestros clientes empresariales para entender sus necesidades y proporcionar soluciones utilizando nuestra plataforma de software. Serías responsable del ciclo completo de ventas, desde la prospección hasta el cierre.",
          time: "10:38 AM",
        },
        {
          id: 4,
          sender: "me",
          content:
            "Eso suena perfecto para mi experiencia. He estado trabajando en ventas empresariales durante los últimos 5 años y tengo un historial sólido de superar objetivos.",
          time: "10:40 AM",
        },
        {
          id: 5,
          sender: "them",
          content:
            "¡Gracias por tu aplicación! ¿Tienes tiempo para una llamada mañana para discutir el puesto con más detalle?",
          time: "10:42 AM",
        },
      ],
    },
    2: {
      id: 2,
      name: "Robert Fox",
      company: "GrowthTech",
      avatar: "/placeholder.svg?key=z6dlg",
      messages: [
        {
          id: 1,
          sender: "them",
          content: "Hola, he revisado tu propuesta y estoy interesado en seguir adelante.",
          time: "Ayer, 15:20 PM",
        },
        {
          id: 2,
          sender: "me",
          content: "¡Genial Robert! ¿Cuándo te gustaría programar una reunión para discutir los detalles?",
          time: "Ayer, 15:45 PM",
        },
        {
          id: 3,
          sender: "them",
          content: "¿Qué tal este jueves a las 10 AM? Podríamos hacer una videollamada.",
          time: "Ayer, 16:10 PM",
        },
        {
          id: 4,
          sender: "me",
          content: "Jueves a las 10 AM me parece perfecto. Te enviaré un enlace para la reunión.",
          time: "Ayer, 16:30 PM",
        },
      ],
    },
    3: {
      id: 3,
      name: "Esther Howard",
      company: "Innovate Inc",
      avatar: "/professional-woman.png",
      messages: [
        {
          id: 1,
          sender: "them",
          content: "¿Puedes proporcionar más detalles sobre tu experiencia con ventas empresariales?",
          time: "Ayer, 09:15 AM",
        },
        {
          id: 2,
          sender: "me",
          content:
            "¡Claro! He trabajado con clientes como Microsoft, IBM y Oracle, gestionando cuentas de más de $1M anuales. Mi especialidad es la venta consultiva y el desarrollo de relaciones a largo plazo.",
          time: "Ayer, 09:45 AM",
        },
        {
          id: 3,
          sender: "them",
          content:
            "Impresionante. Estamos buscando alguien con exactamente esa experiencia. ¿Podrías enviarnos tu portafolio de casos de éxito?",
          time: "Ayer, 10:20 AM",
        },
      ],
    },
    4: {
      id: 4,
      name: "Cameron Williamson",
      company: "GlobalSales Co",
      avatar: "/placeholder.svg?key=a98ck",
      messages: [
        {
          id: 1,
          sender: "them",
          content: "Programemos una reunión para discutir la oportunidad con más detalle.",
          time: "Martes, 14:30 PM",
        },
        {
          id: 2,
          sender: "me",
          content: "Me encantaría. ¿Qué horarios tienes disponibles la próxima semana?",
          time: "Martes, 15:00 PM",
        },
      ],
    },
    5: {
      id: 5,
      name: "Brooklyn Simmons",
      company: "ConsultPro",
      avatar: "/placeholder.svg?key=30qz6",
      messages: [
        {
          id: 1,
          sender: "them",
          content: "¡Tu aplicación ha sido aceptada! ¿Cuándo puedes comenzar?",
          time: "Lunes, 11:25 AM",
        },
        {
          id: 2,
          sender: "me",
          content:
            "¡Excelentes noticias! Podría comenzar en dos semanas, después de completar mis compromisos actuales.",
          time: "Lunes, 12:10 PM",
        },
        {
          id: 3,
          sender: "them",
          content:
            "Perfecto. Te enviaré el contrato para que lo revises y firmes. Estamos emocionados de tenerte en el equipo.",
          time: "Lunes, 13:45 PM",
        },
      ],
    },
  }

  useEffect(() => {
    if (conversationId && conversations[conversationId as keyof typeof conversations]) {
      setMessages(conversations[conversationId as keyof typeof conversations].messages)
    }
  }, [conversationId])

  const handleSendMessage = () => {
    if (newMessage.trim() && conversationId) {
      const newMsg = {
        id: messages.length + 1,
        sender: "me",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages([...messages, newMsg])
      setNewMessage("")

      // Simular respuesta
      setIsTyping(true)
      setTimeout(() => {
        const responseMsg = {
          id: messages.length + 2,
          sender: "them",
          content: getSimulatedResponse(conversationId, newMessage),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, responseMsg])
        setIsTyping(false)
      }, 2000)
    }
  }

  const getSimulatedResponse = (conversationId: number, message: string) => {
    const responses = {
      1: "Gracias por tu respuesta. Estamos muy interesados en tu perfil. ¿Podríamos programar una entrevista para la próxima semana?",
      2: "Perfecto, confirmaré los detalles con el equipo y te enviaré la agenda de la reunión pronto.",
      3: "Gracias por la información. Revisaremos tu experiencia y te contactaremos pronto para los siguientes pasos.",
      4: "Tengo disponibilidad el lunes o martes entre 10 AM y 2 PM. ¿Alguno de esos horarios te funciona?",
      5: "Entendido. Prepararemos todo para tu incorporación. ¿Tienes alguna pregunta sobre el proceso?",
    }

    return responses[conversationId as keyof typeof responses] || "Gracias por tu mensaje. Te responderemos pronto."
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!conversationId) {
    return (
      <div
        className={cn("flex items-center justify-center h-full border rounded-lg bg-muted/50", className)}
        {...props}
      >
        <div className="text-center">
          <h3 className="text-lg font-medium">No hay conversación seleccionada</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona una conversación de la lista para comenzar a chatear
          </p>
        </div>
      </div>
    )
  }

  const conversation = conversations[conversationId as keyof typeof conversations]

  return (
    <div className={cn("flex flex-col h-full border rounded-lg", className)} {...props}>
      <div className="flex items-center gap-4 p-4 border-b">
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <img src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} className="object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{conversation.name}</h4>
          <p className="text-sm text-muted-foreground">{conversation.company}</p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                <p>{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <p className="text-sm">Escribiendo...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Escribe tu mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
