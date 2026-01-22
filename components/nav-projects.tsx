"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function NavProjects({
  conversations,
}: {
  conversations: {
    id: string
    title: string
    score: number
  }[]
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const handleCorrection = () => router.refresh()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Conversations History</SidebarGroupLabel>
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70" onClick={handleCorrection}>
            <Plus className="text-sidebar-foreground/70" />
            <span>New Correction</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      <SidebarMenu>
        {conversations.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link href={`${item.id}`}>
                {/* <item.icon /> */}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
