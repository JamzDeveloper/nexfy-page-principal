"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, Home, MessageSquare, PlusCircle, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface CompanySidebarProps {
  className?: string
}

export function CompanySidebar({ className = "" }: CompanySidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard-company/dashboard",
    },
    {
      title: "Oportunidades",
      icon: Building,
      href: "/dashboard-company/opportunities",
    },
    {
      title: "Clientes",
      icon: Users,
      href: "/dashboard-company/clientes",
    },
    {
      title: "Mensajes",
      icon: MessageSquare,
      href: "/dashboard-company/messages",
    },
  ]

  return (
    <Sidebar className={`w-64 ${className}`}>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                    <Link href={item.href} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Acciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard-company/opportunities/new" className="flex items-center">
                    <PlusCircle className="h-5 w-5 mr-3" />
                    <span>Crear Oportunidad</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          <p>NexfyApp v1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
