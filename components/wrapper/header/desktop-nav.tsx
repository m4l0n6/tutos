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
  companyLinks2,
} from "./nav-links";
import { LinkItem } from "./sheard";

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuLink asChild className="px-4">
          <a className="hover:bg-accent p-2 rounded-md" href="#">
            Home
          </a>
        </NavigationMenuLink>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Company
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-muted/50 dark:bg-background p-1 pr-1.5 pb-1.5">
            <div className="gap-2 grid grid-cols-2 w-lg">
              <div className="space-y-2 bg-popover shadow p-2 border rounded-lg">
                {companyLinks.map((item, i) => (
                  <NavigationMenuLink asChild key={`item-${item.label}-${i}`}>
                    <LinkItem {...item} />
                  </NavigationMenuLink>
                ))}
              </div>
              <div className="space-y-2 p-3">
                {companyLinks2.map((item, i) => (
                  <NavigationMenuLink
                    href={item.href}
                    key={`item-${item.label}-${i}`}
                  >
                    {item.icon}
                    {item.label}
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuLink asChild className="px-4">
          <a className="hover:bg-accent p-2 rounded-md" href="#">
            About
          </a>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
