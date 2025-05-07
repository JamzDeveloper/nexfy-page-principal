"use client"

import { usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"

export function SalesChart() {
  const pathname = usePathname()
  const userRole = pathname.includes("/agent") ? "agent" : "company"

  const chartConfig = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      sales: [
        {
          label: "Sales",
          data: [4500, 3500, 6000, 5000, 7500, 8000, 6500, 9000, 8500, 10000, 9500, 11000],
          backgroundColor: "hsl(var(--primary))",
          borderColor: "hsl(var(--primary))",
        },
      ],
      commissions: [
        {
          label: "Commissions",
          data: [900, 700, 1200, 1000, 1500, 1600, 1300, 1800, 1700, 2000, 1900, 2200],
          backgroundColor: "hsl(var(--primary) / 0.3)",
          borderColor: "hsl(var(--primary))",
        },
      ],
    },
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{userRole === "agent" ? "Your Sales Performance" : "Sales Performance"}</CardTitle>
        <CardDescription>Monthly sales and commissions over the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Sales</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-primary/30" />
                <span className="text-xs text-muted-foreground">Commissions</span>
              </div>
            </div>
          </div>
          <TabsContent value="bar" className="pt-4">
            <BarChart
              data={{
                labels: chartConfig.labels,
                datasets: [
                  {
                    ...chartConfig.datasets.sales[0],
                    borderWidth: 0,
                    borderRadius: 4,
                  },
                  {
                    ...chartConfig.datasets.commissions[0],
                    borderWidth: 0,
                    borderRadius: 4,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              height={300}
            />
          </TabsContent>
          <TabsContent value="line" className="pt-4">
            <LineChart
              data={{
                labels: chartConfig.labels,
                datasets: [
                  {
                    ...chartConfig.datasets.sales[0],
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    ...chartConfig.datasets.commissions[0],
                    borderWidth: 2,
                    fill: false,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              height={300}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
