import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

const navItems = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "My Classes",
    href: "/my-classes",
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
            <Link
              href={"/tutor" + item.href}
              className="rounded-md p-2 hover:bg-accent"
            >
              {item.label}
              {item.count && item.count > 0 && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
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
