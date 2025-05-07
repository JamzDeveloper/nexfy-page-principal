"use client"

import { usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function CommissionHistory() {
  const pathname = usePathname()
  const userRole = pathname.includes("/agent") ? "agent" : "company"

  const commissions = [
    {
      id: "COM-001",
      company: "TechCorp",
      opportunity: "Enterprise Sales Representative",
      amount: 1250,
      date: "May 15, 2023",
      status: "Paid",
    },
    {
      id: "COM-002",
      company: "GrowthTech",
      opportunity: "Sales Development Representative",
      amount: 850,
      date: "April 28, 2023",
      status: "Paid",
    },
    {
      id: "COM-003",
      company: "Innovate Inc",
      opportunity: "Regional Sales Manager",
      amount: 1800,
      date: "April 10, 2023",
      status: "Paid",
    },
    {
      id: "COM-004",
      company: "TechCorp",
      opportunity: "Enterprise Sales Representative",
      amount: 1250,
      date: "May 30, 2023",
      status: "Pending",
    },
    {
      id: "COM-005",
      company: "GlobalSales Co",
      opportunity: "Inside Sales Representative",
      amount: 750,
      date: "May 22, 2023",
      status: "Processing",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{userRole === "agent" ? "Commission History" : "Commissions Paid"}</CardTitle>
        <CardDescription>
          {userRole === "agent" ? "Your earned commissions" : "Commissions paid to agents"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>{userRole === "agent" ? "Company" : "Agent"}</TableHead>
              <TableHead>Opportunity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissions.map((commission) => (
              <TableRow key={commission.id}>
                <TableCell className="font-medium">{commission.id}</TableCell>
                <TableCell>{commission.company}</TableCell>
                <TableCell>{commission.opportunity}</TableCell>
                <TableCell>${commission.amount.toLocaleString()}</TableCell>
                <TableCell>{commission.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      commission.status === "Paid"
                        ? "success"
                        : commission.status === "Pending"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {commission.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
