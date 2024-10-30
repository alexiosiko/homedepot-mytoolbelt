import { Home, Package, Edit } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
	{
	  title: "Home",
	  url: "/",
	  icon: Home,
	},
  {
    title: "Sequencing",
    url: "/sequencing",
    icon: Edit,
  },

  {
    title: "Planogram",
    url: "/planogram.pdf",
    icon: Package,
  },

]

export function AppSidebar() {
  return (
    <Sidebar>
		<SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
			<SidebarMenu>
			{items.map((item) => (
				<SidebarMenuItem key={item.title}>
				<SidebarMenuButton asChild>
					<a href={item.url} target={item.title === "Planogram" ? "_blank" : "_self"} rel="noopener noreferrer">
					<item.icon />
					<span>{item.title}</span>
					</a>
				</SidebarMenuButton>
				</SidebarMenuItem>
			))}
			</SidebarMenu>
			</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
