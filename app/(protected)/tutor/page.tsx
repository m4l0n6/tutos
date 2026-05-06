"use client"

import { useAuth } from "@/context/AuthContext"
import { Stat, StatLabel, StatValue, StatIndicator, StatTrend } from "@/components/ui/stat"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DollarSign, User, ShoppingCart, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"
import { DashboardTable } from "./_components/dashboard-table"

const TutorPage = () => {
  const { logout } = useAuth()
  return (
    <div className="flex flex-col gap-6">
      <div className="gap-4 grid sm:grid-cols-2">
        <Stat>
          <StatLabel>Total Revenue</StatLabel>
          <StatIndicator variant="icon" color="success">
            <DollarSign />
          </StatIndicator>
          <StatValue>$45,231</StatValue>
          <StatTrend trend="up">
            <ArrowUp />
            +20.1% from last month
          </StatTrend>
        </Stat>

        <Stat>
          <StatLabel>Active Users</StatLabel>
          <StatIndicator variant="badge" color="info">
            <User />
          </StatIndicator>
          <StatValue>2,350</StatValue>
          <StatTrend trend="up">
            <ArrowUp />
            +180 from last week
          </StatTrend>
        </Stat>

        <Stat>
          <StatLabel>Total Orders</StatLabel>
          <StatIndicator variant="icon" color="warning">
            <ShoppingCart />
          </StatIndicator>
          <StatValue>1,234</StatValue>
          <StatTrend trend="down">
            <ArrowDown />
            -4.3% from last month
          </StatTrend>
        </Stat>

        <Stat>
          <StatLabel>Conversion Rate</StatLabel>
          <DropdownMenu>
            <DropdownMenuTrigger className="">
              <StatIndicator variant="action">
                <MoreHorizontal />
              </StatIndicator>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <StatValue>3.2%</StatValue>
          <StatTrend trend="neutral">No change from last week</StatTrend>
        </Stat>
      </div>

      <DashboardTable />
    </div>
  )
}

export default TutorPage
