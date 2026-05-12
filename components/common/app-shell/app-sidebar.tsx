import { cn } from "@/lib/utils"
import { LogoIcon, Logo } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { footerNavLinks as defaultFooterNavLinks, navGroups as defaultNavGroups } from "./app-shared"
import type { SidebarNavItem, SidebarNavGroup } from "./app-shared"
import { LatestChange } from "./latest-change"
import { NavGroup } from "./nav-group"
import Link from "next/link"

interface AppSidebarProps {
  navGroups?: SidebarNavGroup[]
  footerNavLinks?: SidebarNavItem[]
}

export function AppSidebar({ navGroups, footerNavLinks }: AppSidebarProps) {
  const groups = navGroups || defaultNavGroups
  const footer = footerNavLinks || defaultFooterNavLinks

  return (
    <Sidebar
      className={cn(
        "*:data-[slot=sidebar-inner]:bg-background",
        "*:data-[slot=sidebar-inner]:dark:bg-[radial-gradient(60%_18%_at_10%_0%,--theme(--color-foreground/.08),transparent)]",
        "**:data-[slot=sidebar-menu-button]:[&>span]:text-foreground/75"
      )}
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="justify-center px-2 border-b h-14">
        <SidebarMenuButton asChild>
          <Link href="#link">
            <LogoIcon />
            <Logo />
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group, index) => (
          <NavGroup key={`sidebar-group-${index}`} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0 p-0">
        <SidebarMenu className="p-2 border-t">
          {footer.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-muted-foreground"
                isActive={item.isActive}
                size="sm"
              >
                <Link href={item.path || "#"}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="group-data-[collapsible=icon]:opacity-0 px-4 pt-4 pb-2 transition-opacity group-data-[collapsible=icon]:pointer-events-none">
          <p className="text-[9px] text-muted-foreground text-nowrap">
            © {new Date().getFullYear()} Tutos LLC
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
