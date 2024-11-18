import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
  } from "@/components/ui/sidebar";
  import { Home, Edit, Search } from "lucide-react";
import { TransitionLink } from "./transitionlink";
import { IoNewspaperOutline } from "react-icons/io5";

  const menuItems = [
	{ title: "Home", url: "/", icon: Home },
	{ title: "Sequencing", url: "/sequencing", icon: Edit },
	{ title: "Article Lookup", url: "/article", icon: Search },
  ];
  
  export function AppSidebar() {
	return (
	  <Sidebar>
		<SidebarHeader>
		  <h1 className="text-lg font-bold">MyToolBelt</h1>
		</SidebarHeader>
		<SidebarContent>
		  <SidebarGroup>
			<SidebarGroupLabel>Navigation</SidebarGroupLabel>
			<SidebarGroupContent>
			  <SidebarMenu>
				{menuItems.map((item) => (
				  <SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild>
					  <TransitionLink  href={item.url}>
						  <item.icon className="h-5 w-5" />
						  <span>{item.title}</span>
					  </TransitionLink>
					</SidebarMenuButton>
				  </SidebarMenuItem>
				))}
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<a target="_blank" href="/files/planogram.pdf">
							<IoNewspaperOutline  className="h-5 w-5" />
							<span>Example Planogram</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			  </SidebarMenu>
			</SidebarGroupContent>
		  </SidebarGroup>
		</SidebarContent>
	  </Sidebar>
	);
  }
  