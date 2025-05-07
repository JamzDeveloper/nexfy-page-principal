"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LineChart } from "@/components/ui/chart"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface RevenueChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RevenueChart({ className, ...props }: RevenueChartProps) {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isAgent = pathname.includes("/agent")

  // Montar el componente del lado del cliente para evitar errores de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Datos de ejemplo para el gráfico
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  const currentMonth = new Date().getMonth()
  const lastSixMonths = months.slice(Math.max(0, currentMonth - 5), currentMonth + 1)

  // Datos de ingresos (simulados)
  const revenueData = isAgent
    ? [4200, 3800, 3600, 3900, 4100, 5200] // Datos para agente
    : [12500, 11800, 11200, 11500, 12700, 15200] // Datos para compañía

  // Calcular el porcentaje de cambio
  const lastMonthRevenue = revenueData[revenueData.length - 2]
  const currentRevenue = revenueData[revenueData.length - 1]
  const percentChange = ((currentRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
  const isPositive = percentChange > 0

  // Formatear el valor total con separadores de miles y decimales
  const formattedRevenue = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(currentRevenue)

  // Determinar colores basados en el tema
  const isDark = mounted && resolvedTheme === "dark"

  // Colores para el gráfico basados en el tema - más sutiles y con opacidad
  const lineColor = isDark ? "rgba(59, 130, 246, 0.6)" : "rgba(37, 99, 235, 0.5)" // Azul más opaco
  const pointColor = isDark ? "rgba(96, 165, 250, 0.7)" : "rgba(59, 130, 246, 0.6)" // Puntos más opacos
  const tooltipBackgroundColor = isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)"
  const tooltipTextColor = isDark ? "#f1f5f9" : "#1e293b"

  if (!mounted) {
    // Renderizado inicial para evitar problemas de hidratación
    return (
      <Card className={cn("col-span-3", className)} {...props}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{isAgent ? "Mis Ingresos Totales" : "Ingresos Totales"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[120px]"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{isAgent ? "Mis Ingresos Totales" : "Ingresos Totales"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{formattedRevenue}</div>
          <div className={cn("text-sm", isPositive ? "text-emerald-500" : "text-red-500")}>
            {isPositive ? "+" : ""}
            {percentChange.toFixed(1)}% desde el mes pasado
          </div>
        </div>

        <div className="h-[60px] mt-4">
          <LineChart
            data={{
              labels: lastSixMonths,
              datasets: [
                {
                  label: "Ingresos",
                  data: revenueData,
                  borderColor: lineColor,
                  backgroundColor: "transparent",
                  tension: 0.3,
                  pointBackgroundColor: pointColor,
                  pointRadius: 3, // Puntos más pequeños
                  pointHoverRadius: 4, // Ligeramente más grandes al pasar el cursor
                  borderWidth: 1.5, // Línea más delgada
                  fill: false,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                  mode: "index",
                  intersect: false,
                  backgroundColor: tooltipBackgroundColor,
                  titleColor: tooltipTextColor,
                  bodyColor: tooltipTextColor,
                  borderColor: isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(51, 65, 85, 0.2)",
                  borderWidth: 1,
                  padding: 8,
                  cornerRadius: 4,
                },
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                  beginAtZero: false,
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
