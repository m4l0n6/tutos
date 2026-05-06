import { cn } from "@/lib/utils";
import type React from "react";

export type LinkItemType = {
  label: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
};

export function LinkItem({
  label,
  description,
  icon,
  className,
  href,
  ...props
}: React.ComponentProps<"a"> & LinkItemType) {
  return (
    <a
      className={cn("flex items-center gap-x-2", className)}
      href={href}
      {...props}
    >
      <div
        className={cn(
          "flex justify-center items-center bg-card shadow-sm border rounded-md size-12 aspect-square text-sm",
          "[&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:text-foreground",
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center items-start">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground text-xs line-clamp-2">
          {description}
        </span>
      </div>
    </a>
  );
}
