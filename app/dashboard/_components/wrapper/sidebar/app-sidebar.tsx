"use client";

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { LogoIcon, Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { LatestChange } from "./latest-change";
import { LayoutGridIcon, BarChart3Icon, ShoppingCartIcon, FileTextIcon, UsersIcon, MegaphoneIcon, SettingsIcon, HelpCircleIcon, ActivityIcon, PlusIcon, SearchIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export type SidebarNavItem = {
	title: string;
	url: string;
	icon: ReactNode;
	isActive?: boolean;
	items?: Array<{ title: string; url: string }>;
};

type SidebarSection = {
	label: string;
	items: SidebarNavItem[];
};

const navSections: SidebarSection[] = [
	{
		label: "Overview",
		items: [
			{
				title: "Dashboard",
				url: "/dashboard",
				icon: (
					<LayoutGridIcon
					/>
				),
				isActive: true,
			},
			{
				title: "Classes",
				url: "/dashboard/classes",
				icon: (
					<BarChart3Icon
					/>
				),
			},
      {
        title: "Users",
        url: "/dashboard/users",
        icon: (
          <UsersIcon
          />
        ),
        items: [
          { title: "Tutors", url: "/dashboard/users/tutors" },
          { title: "Parents", url: "/dashboard/users/parents" },
        ],
      }
		],
	},
	{
		label: "Store",
		items: [
			{
				title: "Orders",
				url: "#",
				icon: (
					<ShoppingCartIcon
					/>
				),
				items: [
					{ title: "All orders", url: "#" },
					{ title: "Unfulfilled", url: "#" },
					{ title: "Returns", url: "#" },
				],
			},
			{
				title: "Products",
				url: "#",
				icon: (
					<FileTextIcon
					/>
				),
				items: [
					{ title: "Catalog", url: "#" },
					{ title: "Inventory", url: "#" },
					{ title: "Collections", url: "#" },
				],
			},
			{
				title: "Customers",
				url: "#",
				icon: (
					<UsersIcon
					/>
				),
			},
			{
				title: "Marketing",
				url: "#",
				icon: (
					<MegaphoneIcon
					/>
				),
			},
		],
	},
	{
		label: "Settings",
		items: [
			{
				title: "Store settings",
				url: "#",
				icon: (
					<SettingsIcon
					/>
				),
				items: [
					{ title: "Store profile", url: "#" },
					{ title: "Shipping & delivery", url: "#" },
					{ title: "Payments", url: "#" },
					{ title: "Staff", url: "#" },
					{ title: "Apps", url: "#" },
				],
			},
		],
	},
];

const footerNavLinks: SidebarNavItem[] = [
	{
		title: "Seller help",
		url: "#",
		icon: (
			<HelpCircleIcon
			/>
		),
	},
	{
		title: "Platform status",
		url: "#",
		icon: (
			<ActivityIcon
			/>
		),
	},
];

export function AppSidebar() {
  const pathname = usePathname()
  const [highlightStyle, setHighlightStyle] = useState({
    top: 0,
    height: 0,
    opacity: 0,
  })
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())
  const sidebarRef = useRef<HTMLDivElement>(null)

  const isItemActive = (itemUrl: string): boolean => {
    if (itemUrl === "#") return false
    if (itemUrl === "/dashboard") return pathname === "/dashboard"
    // Nếu item có children thì chỉ active khi match exact
    const item = navSections
      .flatMap((s) => s.items)
      .find((i) => i.url === itemUrl)
    if (item?.items?.length) {
      return pathname === itemUrl // ← exact match nếu có children
    }
    return pathname.startsWith(itemUrl)
  }

  useEffect(() => {
    const allItems = navSections.flatMap((s) => s.items)

    // Tìm active item — ưu tiên sub items trước
    const activeItem = allItems.find((item) => {
      // Kiểm tra sub items trước
      if (item.items?.length) {
        return item.items.some(sub => pathname === sub.url || pathname.startsWith(sub.url))
          ? false // parent không active khi có sub active
          : false
      }
      if (item.url === "#") return false
      if (item.url === "/dashboard") return pathname === "/dashboard"
      return pathname.startsWith(item.url)
    })

    const timer = setTimeout(() => {
      if (!activeItem) {
        setHighlightStyle((prev) => ({ ...prev, opacity: 0 }))
        return
      }

      const activeEl = itemRefs.current.get(activeItem.url)
      const sidebarEl = sidebarRef.current
      if (!activeEl || !sidebarEl) return

      const itemRect = activeEl.getBoundingClientRect()
      const sidebarRect = sidebarEl.getBoundingClientRect()
      setHighlightStyle({
        top: itemRect.top - sidebarRect.top,
        height: itemRect.height,
        opacity: 1,
      })
  }, 0)

  return () => clearTimeout(timer)
}, [pathname])

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="justify-center h-14">
        <SidebarMenuButton asChild>
          <a href="#link">
            <LogoIcon />
            <Logo />
          </a>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        {/* Highlight trượt */}
        <div ref={sidebarRef} className="relative">
          <motion.div
            className="right-1 left-1 z-0 absolute bg-sidebar-accent rounded-md pointer-events-none"
            animate={{
              top: highlightStyle.top,
              height: highlightStyle.height,
              opacity: highlightStyle.opacity,
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />

          <SidebarGroup>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                className="bg-primary hover:bg-primary/90 active:bg-primary/90 min-w-8 text-primary-foreground hover:text-primary-foreground active:text-primary-foreground duration-200 ease-linear"
                tooltip="Add product"
              >
                <PlusIcon />
                <span>Add product</span>
              </SidebarMenuButton>
              <Button
                aria-label="Search store"
                className="group-data-[collapsible=icon]:opacity-0 size-8"
                size="icon"
                variant="outline"
              >
                <SearchIcon />
              </Button>
            </SidebarMenuItem>
          </SidebarGroup>

          {navSections.map((section) => (
            <SidebarGroup key={section.label}>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              <SidebarMenu>
                {section.items.map((item) => {
                  const active = isItemActive(item.url)
                  return (
                    <Collapsible
                      asChild
                      defaultOpen={active}
                      key={item.title}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem
                        ref={(el) => {
                          if (el) itemRefs.current.set(item.url, el)
                          else itemRefs.current.delete(item.url)
                        }}
                      >
                        {item.items?.length ? (
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              isActive={false}
                              tooltip={item.title}
                              className="z-10 relative hover:bg-transparent active:bg-transparent"
                            >
                              {item.icon}
                              <span>{item.title}</span>
                              <ChevronRightIcon className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                        ) : (
                          <SidebarMenuButton
                            asChild
                            isActive={false}
                            tooltip={item.title}
                            className="z-10 relative hover:bg-transparent active:bg-transparent"
                          >
                            <Link href={item.url}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        )}

                        {item.items?.length ? (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={
                                      pathname === subItem.url ||
                                      pathname.startsWith(subItem.url)
                                    }
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        ) : null}
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter>
        <LatestChange />
        <SidebarMenu className="mt-2">
          {footerNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-muted-foreground"
                isActive={false}
                size="sm"
              >
                <a href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
