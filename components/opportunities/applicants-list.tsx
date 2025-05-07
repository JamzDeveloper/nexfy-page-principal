import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Star } from "lucide-react"
import Link from "next/link"

interface ApplicantsListProps {
  opportunityId: string
}

export function ApplicantsList({ opportunityId }: ApplicantsListProps) {
  // This would come from your API in a real app
  const applicants = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/professional-headshot.png",
      location: "San Francisco, CA",
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
      experience: "10 years",
      appliedDate: "May 10, 2023",
      status: "Accepted",
      statusColor: "success",
      rating: 5,
    },
  ]

  return (
    <div className="space-y-4">
      {applicants.map((applicant) => (
        <Card key={applicant.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                  <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{applicant.name}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {applicant.location}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  Applied: {applicant.appliedDate}
                </div>
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
                <Badge variant={applicant.statusColor as any}>{applicant.status}</Badge>
              </div>
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
