import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, DollarSign, MapPin } from "lucide-react"

interface ApplicationsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ApplicationsList({ className, ...props }: ApplicationsListProps) {
  const applications = [
    {
      id: 1,
      title: "Enterprise Sales Representative",
      company: "TechCorp",
      location: "San Francisco, CA",
      remote: true,
      salary: "$80,000 - $120,000",
      status: "Reviewing",
      statusColor: "secondary",
      appliedDate: "May 15, 2023",
      lastUpdated: "May 18, 2023",
    },
    {
      id: 2,
      title: "Sales Development Representative",
      company: "GrowthTech",
      location: "New York, NY",
      remote: false,
      salary: "$60,000 - $80,000",
      status: "Accepted",
      statusColor: "success",
      appliedDate: "April 28, 2023",
      lastUpdated: "May 10, 2023",
    },
    {
      id: 3,
      title: "Regional Sales Manager",
      company: "Innovate Inc",
      location: "Chicago, IL",
      remote: false,
      salary: "$100,000 - $140,000",
      status: "Rejected",
      statusColor: "destructive",
      appliedDate: "April 10, 2023",
      lastUpdated: "April 25, 2023",
    },
    {
      id: 4,
      title: "Inside Sales Representative",
      company: "GlobalSales Co",
      location: "Remote",
      remote: true,
      salary: "$50,000 - $70,000",
      status: "Pending",
      statusColor: "outline",
      appliedDate: "May 20, 2023",
      lastUpdated: "May 20, 2023",
    },
  ]

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Your Applications</h3>
        <span className="text-sm text-muted-foreground">Showing {applications.length} applications</span>
      </div>
      <div className="space-y-6">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{application.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="mr-1 h-4 w-4" />
                    {application.company}
                  </CardDescription>
                </div>
                <Badge variant={application.statusColor as any}>{application.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {application.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {application.salary}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    Applied: {application.appliedDate}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Last updated: {application.lastUpdated}</span>
              <div className="flex gap-2">
                <Link href={`/dashboard/applications/${application.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  Withdraw
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
