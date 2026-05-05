import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "My Classes",
    href: "/my-classes",
    count: 3,
  },
  {
    label: "Chat",
    href: "/chat",
    count: 5,
  },
]

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-6">
        {navItems.map((item) => (
          <NavigationMenuLink asChild className="px-4" key={item.href}>
            <Link href={'/parent' + item.href} className="hover:bg-accent p-2 rounded-md">
              {item.label}
              {item.count && item.count > 0 && (
                <span className="flex justify-center items-center bg-primary ml-2 rounded-full w-5 h-5 text-white text-xs">
                  {item.count}
                </span>
              )}
            </Link>
          </NavigationMenuLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
