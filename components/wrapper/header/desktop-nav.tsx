import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  companyLinks,
} from "./nav-links";
import { LinkItem } from "./sheard";
import Link from "next/link";

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuLink asChild className="px-4">
          <Link href="/">
            Home
          </Link>
        </NavigationMenuLink>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            View
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-muted/50 dark:bg-background p-1 pr-1.5 pb-1.5">
              <div className="space-y-2 bg-popover shadow p-2 border rounded-lg w-56">
                {companyLinks.map((item, i) => (
                  <NavigationMenuLink asChild key={`item-${item.label}-${i}`}>
                    <LinkItem {...item} />
                  </NavigationMenuLink>
                ))}
              </div>

          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuLink asChild className="px-4">
          <Link href="/about">
            About
          </Link>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
