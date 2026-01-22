"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {data: session} = useSession()
    const [corr, setCorr] = React.useState([])
    React.useEffect( () => {
      const get_correction = async () => {
        const response = await fetch(`/api/session?login=${(session?.user as any)?.login}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          // throw new Error("Failed to start correction");
          console.error("errrrrrrrrorororororororor")
        }
  
        const data = await response.json();
        console.log(data)
        setCorr(data)
      }
      get_correction()
    }, [session])
  const router = useRouter()
  const handleRefrech = () => {
    router.push("new")
  }
  const data = {
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Start New Correction",
        url: "#",
        icon: Plus,
        function: handleRefrech,
        isActive: true,
      },
    ],
    conversations: corr,
  }
  const user = session?.user || {name: "", email: "", image: ""}
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects conversations={data.conversations} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
