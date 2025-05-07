import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Star } from "lucide-react"

interface ApplicantsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ApplicantsList({ className, ...props }: ApplicantsListProps) {
  const applicants = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/professional-headshot.png",
      location: "San Francisco, CA",
      opportunity: "Enterprise Sales Representative",
      experience: "8 years",
      appliedDate: "May 15, 2023",
      status: "Reviewing",
      statusColor: "secondary",
      rating: 4,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/professional-woman-headshot.png",
      location: "New York, NY",
      opportunity: "Sales Development Representative",
      experience: "5 years",
      appliedDate: "May 12, 2023",
      status: "Pending",
      statusColor: "outline",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "/asian-businessman-confident.png",
      location: "Chicago, IL",
      opportunity: "Regional Sales Manager",
      experience: "10 years",
      appliedDate: "May 10, 2023",
      status: "Accepted",
      statusColor: "success",
      rating: 5,
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      avatar: "/latina-executive-woman.png",
      location: "Remote",
      opportunity: "Inside Sales Representative",
      experience: "3 years",
      appliedDate: "May 8, 2023",
      status: "Rejected",
      statusColor: "destructive",
      rating: 3,
    },
  ]

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">All Applicants</h3>
        <span className="text-sm text-muted-foreground">Showing {applicants.length} applicants</span>
      </div>
      <div className="space-y-6">
        {applicants.map((applicant) => (
          <Card key={applicant.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                    <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{applicant.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="mr-1 h-4 w-4" />
                      {applicant.location}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={applicant.statusColor as any}>{applicant.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium">Applied For</p>
                    <p className="text-sm text-muted-foreground">{applicant.opportunity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">{applicant.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Applied Date</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {applicant.appliedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < applicant.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">ID: APP-{applicant.id.toString().padStart(4, "0")}</span>
              <div className="flex gap-2">
                <Link href={`/dashboard/applicants/${applicant.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
                {applicant.status === "Pending" || applicant.status === "Reviewing" ? (
                  <>
                    <Button variant="default" size="sm">
                      Accept
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reject
                    </Button>
                  </>
                ) : applicant.status === "Accepted" ? (
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                ) : null}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
