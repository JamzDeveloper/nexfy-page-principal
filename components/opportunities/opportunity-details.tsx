"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Calendar, DollarSign, MapPin, Users, MessageSquare, Edit } from "lucide-react"
import { ApplicantsList } from "@/components/opportunities/applicants-list"
import { usePathname } from "next/navigation"

interface OpportunityDetailsProps {
  id: string
}

export function OpportunityDetails({ id }: OpportunityDetailsProps) {
  const [applying, setApplying] = useState(false)
  const pathname = usePathname()
  const userRole = pathname.includes("/agent") ? "agent" : "company"

  // This would come from your API in a real app
  const opportunity = {
    id: Number.parseInt(id),
    title: "Enterprise Sales Representative",
    company: "TechCorp",
    location: "San Francisco, CA",
    remote: true,
    salary: "$80,000 - $120,000",
    type: "Full-time",
    description:
      "TechCorp is seeking an experienced Enterprise Sales Representative to join our growing team. You will be responsible for developing and maintaining relationships with enterprise clients, identifying new business opportunities, and closing deals. The ideal candidate will have a proven track record of success in enterprise software sales.",
    requirements:
      "- 5+ years of experience in enterprise software sales\n- Proven track record of meeting or exceeding sales targets\n- Experience with CRM software (Salesforce preferred)\n- Excellent communication and presentation skills\n- Bachelor's degree or equivalent experience",
    benefits:
      "- Competitive base salary plus commission\n- Comprehensive health, dental, and vision insurance\n- 401(k) matching\n- Generous PTO policy\n- Professional development opportunities\n- Remote work options",
    posted: "May 15, 2023",
    applicants: 12,
    status: "Active",
  }

  const handleApply = () => {
    setApplying(true)
    setTimeout(() => {
      setApplying(false)
      // In a real app, you would redirect or show a success message
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Building className="mr-1 h-4 w-4" />
                {opportunity.company}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={opportunity.remote ? "outline" : "secondary"}>
                {opportunity.remote ? "Remote" : "On-site"}
              </Badge>
              <Badge variant="secondary">{opportunity.type}</Badge>
              <Badge variant="success">{opportunity.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {opportunity.location}
            </div>
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="mr-1 h-4 w-4" />
              {opportunity.salary}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Posted: {opportunity.posted}
            </div>
            {userRole === "company" && (
              <div className="flex items-center text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                {opportunity.applicants} Applicants
              </div>
            )}
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="whitespace-pre-line">{opportunity.description}</p>
            </TabsContent>
            <TabsContent value="requirements" className="pt-4">
              <p className="whitespace-pre-line">{opportunity.requirements}</p>
            </TabsContent>
            <TabsContent value="benefits" className="pt-4">
              <p className="whitespace-pre-line">{opportunity.benefits}</p>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/opportunities">Back to Opportunities</Link>
          </Button>
          {userRole === "agent" ? (
            <Button onClick={handleApply} disabled={applying}>
              {applying ? "Applying..." : "Apply Now"}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/opportunities/${id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/dashboard/messages`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Applicants
                </Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      {userRole === "company" && (
        <div className="pt-4">
          <h3 className="text-xl font-bold mb-6">Applicants</h3>
          <ApplicantsList opportunityId={id} />
        </div>
      )}
    </div>
  )
}
