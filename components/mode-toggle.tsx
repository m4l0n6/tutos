"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnimationVariant = "circle" | "circle-blur" | "gif" | "polygon";

type StartPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface ModeToggleProps {
  showLabel?: boolean;
  variant?: AnimationVariant;
  start?: StartPosition;
  url?: string; // For gif variant
  className?: string;
}

export const ModeToggle = ({
  showLabel = false,
  variant = "circle",
  url,
  className,
}: ModeToggleProps) => {
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // Get button position
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Calculate position as percentage of viewport
      const xPercent = (x / window.innerWidth) * 100;
      const yPercent = (y / window.innerHeight) * 100;

      // Inject animation styles for this specific transition
      const styleId = `theme-transition-${Date.now()}`;
      const style = document.createElement("style");
      style.id = styleId;

      // Generate animation CSS based on variant
      let css = "";

      if (variant === "circle") {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-expand 0.4s ease-out;
          }
          @keyframes circle-expand {
            from {
              clip-path: circle(0% at ${xPercent}% ${yPercent}%);
            }
            to {
              clip-path: circle(150% at ${xPercent}% ${yPercent}%);
            }
          }
        }
      `;
      } else if (variant === "circle-blur") {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-blur-expand 0.5s ease-out;
            filter: blur(0);
          }
          @keyframes circle-blur-expand {
            from {
              clip-path: circle(0% at ${xPercent}% ${yPercent}%);
              filter: blur(4px);
            }
            to {
              clip-path: circle(150% at ${xPercent}% ${yPercent}%);
              filter: blur(0);
            }
          }
        }
      `;
      } else if (variant === "gif" && url) {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: fade-out 0.5s ease-out;
          }
          ::view-transition-new(root) {
            animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1);
            mask-image: url('${url}');
            mask-size: 0%;
            mask-repeat: no-repeat;
            mask-position: ${xPercent}% ${yPercent}%;
          }
          @keyframes fade-out {
            to {
              opacity: 0;
            }
          }
          @keyframes gif-reveal {
            0% {
              mask-size: 0%;
            }
            20% {
              mask-size: 35%;
            }
            60% {
              mask-size: 35%;
            }
            100% {
              mask-size: 300%;
            }
          }
        }
      `;
      } else if (variant === "polygon") {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: ${
              theme === "light" ? "wipe-in-dark" : "wipe-in-light"
            } 0.4s ease-out;
          }
          @keyframes wipe-in-dark {
            from {
              clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
          @keyframes wipe-in-light {
            from {
              clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        }
      `;
      }

      if (css) {
        style.textContent = css;
        document.head.appendChild(style);

        // Clean up animation styles after transition
        setTimeout(() => {
          const styleEl = document.getElementById(styleId);
          if (styleEl) {
            styleEl.remove();
          }
        }, 3000);
      }

      // Toggle theme with View Transition API
      const newTheme = theme === "light" ? "dark" : "light";

      if ("startViewTransition" in document) {
        (document as Document).startViewTransition(() => {
          setTheme(newTheme);
        });
      } else {
        setTheme(newTheme);
      }
    },
    [theme, setTheme, variant, url],
  );

  return (
    <Button
      variant="outline"
      size={showLabel ? "default" : "icon"}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden transition-all",
        showLabel && "gap-2",
        className,
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Sun className="w-[1.2rem] h-[1.2rem]" />
      ) : (
        <Moon className="w-[1.2rem] h-[1.2rem]" />
      )}
      {showLabel && (
        <span className="text-sm">{theme === "light" ? "Light" : "Dark"}</span>
      )}
    </Button>
  );
};

// Export a helper hook for using with View Transitions API
export const useThemeTransition = () => {
  const startTransition = useCallback((updateFn: () => void) => {
    if ("startViewTransition" in document) {
      (document as Document).startViewTransition(updateFn);
    } else {
      updateFn();
    }
  }, []);

  return { startTransition };
};
