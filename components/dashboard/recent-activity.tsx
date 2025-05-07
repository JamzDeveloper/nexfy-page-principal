import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  const activities = [
    {
      type: "application",
      title: "Application Submitted",
      description: "You applied to Enterprise Sales Representative at TechCorp",
      date: "2 hours ago",
    },
    {
      type: "message",
      title: "New Message",
      description: "Jane from GrowthTech sent you a message",
      date: "Yesterday",
    },
    {
      type: "opportunity",
      title: "Opportunity Accepted",
      description: "Your application for Sales Manager at Innovate Inc was accepted",
      date: "2 days ago",
    },
    {
      type: "commission",
      title: "Commission Received",
      description: "You received a commission of $1,250 from TechCorp",
      date: "3 days ago",
    },
    {
      type: "application",
      title: "Application Viewed",
      description: "Your application was viewed by GlobalSales Co",
      date: "4 days ago",
    },
  ]

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest updates and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
