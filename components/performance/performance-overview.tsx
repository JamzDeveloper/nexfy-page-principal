"use client"

import { usePathname } from "next/navigation"
import { ArrowDown, ArrowUp, BarChart3, DollarSign, Target, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PerformanceOverview() {
  const pathname = usePathname()
  const userRole = pathname.includes("/agent") ? "agent" : "company"

  const agentMetrics = [
    {
      title: "Total Sales",
      value: "$24,320",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      description: "vs. previous month",
    },
    {
      title: "Conversion Rate",
      value: "18.2%",
      change: "+2.3%",
      trend: "up",
      icon: BarChart3,
      description: "vs. previous month",
    },
    {
      title: "Commissions Earned",
      value: "$4,864",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      description: "vs. previous month",
    },
    {
      title: "Deals Closed",
      value: "12",
      change: "-2",
      trend: "down",
      icon: Target,
      description: "vs. previous month",
    },
  ]

  const companyMetrics = [
    {
      title: "Total Revenue",
      value: "$142,568",
      change: "+24%",
      trend: "up",
      icon: DollarSign,
      description: "vs. previous quarter",
    },
    {
      title: "Active Agents",
      value: "18",
      change: "+5",
      trend: "up",
      icon: Users,
      description: "vs. previous quarter",
    },
    {
      title: "Commissions Paid",
      value: "$28,513",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      description: "vs. previous quarter",
    },
    {
      title: "Average Deal Size",
      value: "$7,920",
      change: "-$340",
      trend: "down",
      icon: BarChart3,
      description: "vs. previous quarter",
    },
  ]

  const metrics = userRole === "agent" ? agentMetrics : companyMetrics

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs">
              <span className={`flex items-center ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {metric.trend === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {metric.change}
              </span>
              <span className="ml-1 text-muted-foreground">{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
