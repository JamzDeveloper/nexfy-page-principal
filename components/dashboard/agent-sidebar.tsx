"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, Home, MessageSquare, Search, Users, X } from 'lucide-react'
import {
  Sidebar,
  SidebarClose,
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
import { Logo } from "@/components/ui/logo"

interface AgentSidebarProps {
  className?: string
}

export function AgentSidebar({ className = "" }: AgentSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard-agent/dashboard",
    },
    {
      title: "Buscar Oportunidades",
      icon: Search,
      href: "/dashboard-agent/find-opportunities",
    },
    {
      title: "Mis Compañías",
      icon: Building,
      href: "/dashboard-agent/my-companies",
    },
    {
      title: "Mensajes",
      icon: MessageSquare,
      href: "/dashboard-agent/messages",
    },
    {
      title: "Clientes",
      icon: Users,
      href: "/dashboard-agent/clientes",
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
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          <p>NexfyApp v1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
