import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"

interface UpcomingMeetingsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UpcomingMeetings({ className, ...props }: UpcomingMeetingsProps) {
  const meetings = [
    {
      id: 1,
      title: "Entrevista inicial",
      company: "TechCorp",
      contact: "Jane Cooper",
      avatar: "/woman-headshot.png",
      date: "Hoy",
      time: "14:00 - 15:00",
      type: "Video llamada",
    },
    {
      id: 2,
      title: "Discusión de contrato",
      company: "GrowthTech",
      contact: "Robert Fox",
      avatar: "/placeholder.svg?key=z6dlg",
      date: "Mañana",
      time: "10:30 - 11:30",
      type: "Video llamada",
    },
    {
      id: 3,
      title: "Seguimiento de ventas",
      company: "Innovate Inc",
      contact: "Esther Howard",
      avatar: "/professional-woman.png",
      date: "24 Mayo, 2023",
      time: "16:00 - 17:00",
      type: "Presencial",
    },
  ]

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Ultimos mensajes</CardTitle>
        <CardDescription>Ultimos mensajes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="flex items-start space-x-4">
              <Avatar className="mt-1">
                <AvatarImage src={meeting.avatar || "/placeholder.svg"} alt={meeting.contact} />
                <AvatarFallback>{meeting.contact[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <h4 className="font-medium leading-none">{meeting.title}</h4>
                <p className="text-sm text-muted-foreground">{meeting.company}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-2">
                </div>
              </div>
              <Button variant="outline" size="sm">
                chat
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
