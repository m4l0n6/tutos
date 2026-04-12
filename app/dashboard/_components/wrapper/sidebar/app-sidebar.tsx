"use client";

import type { ReactNode } from "react";
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
				url: "#",
				icon: (
					<LayoutGridIcon
					/>
				),
				isActive: true,
			},
			{
				title: "Sales",
				url: "#",
				icon: (
					<BarChart3Icon
					/>
				),
			},
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
				<SidebarGroup>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							className="bg-primary hover:bg-primary/90 active:bg-primary/90 min-w-8 text-primary-foreground hover:text-primary-foreground active:text-primary-foreground duration-200 ease-linear"
							tooltip="Add product"
						>
							<PlusIcon
							/>
							<span>Add product</span>
						</SidebarMenuButton>
						<Button
							aria-label="Search store"
							className="group-data-[collapsible=icon]:opacity-0 size-8"
							size="icon"
							variant="outline"
						>
							<SearchIcon
							/>
							<span className="sr-only">Search store</span>
						</Button>
					</SidebarMenuItem>
				</SidebarGroup>

				{navSections.map((section) => (
					<SidebarGroup key={section.label}>
						<SidebarGroupLabel>{section.label}</SidebarGroupLabel>
						<SidebarMenu>
							{section.items.map((item) => (
								<Collapsible
									asChild
									defaultOpen={item.isActive}
									key={item.title}
								>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive={item.isActive}
											tooltip={item.title}
										>
											<a href={item.url}>
												{item.icon}
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
										{item.items?.length ? (
											<>
												<CollapsibleTrigger asChild>
													<SidebarMenuAction className="data-[state=open]:rotate-90">
														<ChevronRightIcon
														/>
														<span className="sr-only">Toggle</span>
													</SidebarMenuAction>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<SidebarMenuSub>
														{item.items.map((subItem) => (
															<SidebarMenuSubItem key={subItem.title}>
																<SidebarMenuSubButton asChild>
																	<a href={subItem.url}>
																		<span>{subItem.title}</span>
																	</a>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														))}
													</SidebarMenuSub>
												</CollapsibleContent>
											</>
										) : null}
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroup>
				))}
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
	);
}
