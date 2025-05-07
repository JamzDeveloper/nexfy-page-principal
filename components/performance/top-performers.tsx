"use client"

import { usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function TopPerformers() {
  const pathname = usePathname()
  const userRole = pathname.includes("/agent") ? "agent" : "company"

  // For agents, show their ranking among peers
  // For companies, show their top performing agents
  const agentRankings = [
    {
      name: "You",
      avatar: "/professional-headshot.png",
      sales: 120000,
      target: 150000,
      progress: 80,
      rank: 4,
    },
    {
      name: "Sarah Johnson",
      avatar: "/professional-woman-headshot.png",
      sales: 180000,
      target: 150000,
      progress: 120,
      rank: 1,
    },
    {
      name: "Michael Chen",
      avatar: "/asian-businessman-confident.png",
      sales: 165000,
      target: 150000,
      progress: 110,
      rank: 2,
    },
    {
      name: "Emma Rodriguez",
      avatar: "/latina-executive-woman.png",
      sales: 145000,
      target: 150000,
      progress: 97,
      rank: 3,
    },
    {
      name: "David Kim",
      avatar: "/placeholder.svg?key=a98ck",
      sales: 110000,
      target: 150000,
      progress: 73,
      rank: 5,
    },
  ]

  const companyTopAgents = [
    {
      name: "Sarah Johnson",
      avatar: "/professional-woman-headshot.png",
      sales: 180000,
      target: 150000,
      progress: 120,
      commission: 36000,
    },
    {
      name: "Michael Chen",
      avatar: "/asian-businessman-confident.png",
      sales: 165000,
      target: 150000,
      progress: 110,
      commission: 33000,
    },
    {
      name: "Emma Rodriguez",
      avatar: "/latina-executive-woman.png",
      sales: 145000,
      target: 150000,
      progress: 97,
      commission: 29000,
    },
    {
      name: "John Doe",
      avatar: "/professional-headshot.png",
      sales: 120000,
      target: 150000,
      progress: 80,
      commission: 24000,
    },
    {
      name: "David Kim",
      avatar: "/placeholder.svg?key=a98ck",
      sales: 110000,
      target: 150000,
      progress: 73,
      commission: 22000,
    },
  ]

  const performers = userRole === "agent" ? agentRankings : companyTopAgents

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{userRole === "agent" ? "Agent Rankings" : "Top Performing Agents"}</CardTitle>
        <CardDescription>
          {userRole === "agent" ? "How you compare to other agents" : "Your highest performing sales agents"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {performers.map((performer, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-8 text-sm font-medium text-muted-foreground">
                  {userRole === "agent" ? `#${performer.rank}` : `#${index + 1}`}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={performer.avatar || "/placeholder.svg"} alt={performer.name} />
                  <AvatarFallback>{performer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-none">
                    {performer.name}
                    {userRole === "agent" && performer.name === "You" && (
                      <span className="ml-2 inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        You
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {userRole === "agent"
                      ? `$${performer.sales.toLocaleString()} / $${performer.target.toLocaleString()}`
                      : `$${performer.sales.toLocaleString()} in sales`}
                  </p>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0 w-32">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">
                    {userRole === "agent"
                      ? `${performer.progress}% of target`
                      : `$${performer.commission.toLocaleString()}`}
                  </span>
                </div>
                <Progress value={performer.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
