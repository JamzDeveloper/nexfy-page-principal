"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building, Briefcase, Home, MessageSquare, PlusCircle, Search, Settings, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()

  // Determine if user is agent or company based on URL
  const userRole = pathname.includes("/agent") ? "agent" : "company"

  const agentMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard/agent",
    },
    {
      title: "Oportunidades",
      icon: Search,
      href: "/dashboard/opportunities",
    },
    {
      title: "Mis Aplicaciones",
      icon: Building,
      href: "/dashboard/applications",
    },
    {
      title: "Mis Compañías",
      icon: Briefcase,
      href: "/dashboard/agent/companies",
    },
    {
      title: "Rendimiento",
      icon: BarChart3,
      href: "/dashboard/performance",
    },
    {
      title: "Mensajes",
      icon: MessageSquare,
      href: "/dashboard/messages",
    },
    {
      title: "Perfil",
      icon: User,
      href: "/dashboard/profile",
    },
    {
      title: "Configuración",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ]

  const companyMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard/company",
    },
    {
      title: "Mis Oportunidades",
      icon: Building,
      href: "/dashboard/opportunities",
    },
    {
      title: "Aplicantes",
      icon: User,
      href: "/dashboard/applicants",
    },
    {
      title: "Analítica de Ventas",
      icon: BarChart3,
      href: "/dashboard/analytics",
    },
    {
      title: "Mensajes",
      icon: MessageSquare,
      href: "/dashboard/messages",
    },
    {
      title: "Perfil de Compañía",
      icon: Building,
      href: "/dashboard/profile",
    },
    {
      title: "Configuración",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ]

  const menuItems = userRole === "agent" ? agentMenuItems : companyMenuItems

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4 font-semibold">
          {userRole === "agent" ? "Panel de Agente" : "Panel de Compañía"}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "company" && (
          <SidebarGroup>
            <SidebarGroupLabel>Acciones</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/opportunities/new">
                      <PlusCircle />
                      <span>Crear Oportunidad</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          <p>NexfyApp v1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
