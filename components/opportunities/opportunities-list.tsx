import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, DollarSign, MapPin } from "lucide-react"

interface OpportunitiesListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function OpportunitiesList({ className, ...props }: OpportunitiesListProps) {
  const opportunities = [
    {
      id: 1,
      title: "Enterprise Sales Representative",
      company: "TechCorp",
      location: "San Francisco, CA",
      remote: true,
      salary: "$80,000 - $120,000",
      type: "Full-time",
      description:
        "TechCorp is seeking an experienced Enterprise Sales Representative to join our growing team. You will be responsible for developing and maintaining relationships with enterprise clients.",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Sales Development Representative",
      company: "GrowthTech",
      location: "New York, NY",
      remote: false,
      salary: "$60,000 - $80,000",
      type: "Full-time",
      description:
        "Join our team as a Sales Development Representative and help us identify and qualify new business opportunities. You will work closely with our Account Executives to drive revenue growth.",
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "Regional Sales Manager",
      company: "Innovate Inc",
      location: "Chicago, IL",
      remote: false,
      salary: "$100,000 - $140,000",
      type: "Full-time",
      description:
        "Innovate Inc is looking for a Regional Sales Manager to oversee sales operations in the Midwest region. You will be responsible for leading a team of sales representatives and developing strategies to increase market share.",
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "Inside Sales Representative",
      company: "GlobalSales Co",
      location: "Remote",
      remote: true,
      salary: "$50,000 - $70,000",
      type: "Full-time",
      description:
        "GlobalSales Co is hiring Inside Sales Representatives to join our remote team. You will be responsible for generating leads, qualifying prospects, and closing sales through phone and email communication.",
      posted: "Just now",
    },
    {
      id: 5,
      title: "Sales Consultant",
      company: "ConsultPro",
      location: "Austin, TX",
      remote: true,
      salary: "$70,000 - $90,000",
      type: "Contract",
      description:
        "ConsultPro is seeking experienced Sales Consultants to help our clients improve their sales processes and increase revenue. This is a contract position with potential for long-term engagement.",
      posted: "5 days ago",
    },
  ]

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Oportunidades Disponibles</h3>
        <span className="text-sm text-muted-foreground">Mostrando {opportunities.length} resultados</span>
      </div>
      <div className="space-y-6">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{opportunity.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="mr-1 h-4 w-4" />
                    {opportunity.company}
                  </CardDescription>
                </div>
                <Badge variant={opportunity.remote ? "outline" : "secondary"}>
                  {opportunity.remote ? "Remote" : "On-site"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {opportunity.salary}
                  </div>
                  <Badge variant="secondary">{opportunity.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Publicado {opportunity.posted}</span>
              <Link href={`/dashboard-agent/find-opportunities/${opportunity.id}`}>
                <Button>Aplicar Ahora</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

import Link from "next/link"
