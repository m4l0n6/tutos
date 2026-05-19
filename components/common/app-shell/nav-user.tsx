"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  UserIcon,
  SettingsIcon,
  CreditCardIcon,
  LogOutIcon,
  Moon,
} from "lucide-react"
import { useRouter } from "next/navigation"

import type { MUser } from "@/types/auth"

interface NavUserProps {
  user?: MUser | null
  logout?: () => void
}

export function NavUser({ user, logout }: NavUserProps) {
  const router = useRouter()
  const handleGotoAccount = () => {
    if(!user) return
    if(user.role === "TUTOR") {
      router.push("/tutor/profile")
    }
    else {
      router.push("/parent/me")
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem className="flex justify-start items-center gap-2">
          <DropdownMenuLabel className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium text-foreground">
                {user?.fullName}
              </span>{" "}
              <br />
              <div className="max-w-full overflow-ellipsis overflow-hidden text-muted-foreground text-xs whitespace-nowrap">
                {user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleGotoAccount}>
            <UserIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Moon />
            Theme
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {user?.role === "TUTOR" && (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CreditCardIcon />
              Plan & Billing
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="w-full cursor-pointer"
            variant="destructive"
            onClick={logout}
          >
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
