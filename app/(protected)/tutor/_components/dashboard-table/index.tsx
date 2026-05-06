"use client"

import type { Column, ColumnDef } from "@tanstack/react-table"
import {
  CheckCircle,
  CheckCircle2,
  DollarSign,
  MoreHorizontal,
  Text,
  XCircle,
} from "lucide-react"
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"
import * as React from "react"
import { DataTable } from "@/components/common/data-table/data-table"
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header"
import { DataTableToolbar } from "@/components/common/data-table/data-table-toolbar"
import { DataTableSortList } from "@/components/common/data-table/data-table-sort-list"
import { useDataTable } from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface Project {
  id: string
  title: string
  status: "active" | "inactive"
  budget: number
}

const initialData: Project[] = [
  {
    id: "1",
    title: "Project Alpha",
    status: "active",
    budget: 50000,
  },
  {
    id: "2",
    title: "Project Beta",
    status: "inactive",
    budget: 75000,
  },
  {
    id: "3",
    title: "Project Gamma",
    status: "active",
    budget: 25000,
  },
  {
    id: "4",
    title: "Project Delta",
    status: "active",
    budget: 100000,
  },
]

export function DashboardTable() {
  const [data, setData] = React.useState<Project[]>(initialData)
  const [title] = useQueryState("title", parseAsString.withDefault(""))
  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  )

  const filteredData = React.useMemo(() => {
    return data.filter((project) => {
      const matchesTitle =
        title === "" ||
        project.title.toLowerCase().includes(title.toLowerCase())
      const matchesStatus =
        status.length === 0 || status.includes(project.status)

      return matchesTitle && matchesStatus
    })
  }, [title, status, data])

  const columns = React.useMemo<ColumnDef<Project>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Title" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<Project["title"]>()}</div>,
        meta: {
          label: "Title",
          placeholder: "Search titles...",
          variant: "text",
          icon: Text,
        },
        enableColumnFilter: true,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Status" />
        ),
        cell: ({ cell }) => {
          const status = cell.getValue<Project["status"]>()
          const Icon = status === "active" ? CheckCircle2 : XCircle

          return (
            <Status variant={status === "active" ? "success" : "error"}>
              <StatusIndicator />
              <StatusLabel>{status}</StatusLabel>
            </Status>
          )
        },
        meta: {
          label: "Status",
          variant: "multiSelect",
          options: [
            { label: "Active", value: "active", icon: CheckCircle },
            { label: "Inactive", value: "inactive", icon: XCircle },
          ],
        },
        enableColumnFilter: true,
      },
      {
        id: "budget",
        accessorKey: "budget",
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Budget" />
        ),
        cell: ({ cell }) => {
          const budget = cell.getValue<Project["budget"]>()

          return (
            <div className="flex items-center gap-1">
              <DollarSign className="size-4" />
              {budget.toLocaleString()}
            </div>
          )
        },
      },
      {
        id: "actions",
        accessorKey: "Actions",
        cell: function Cell() {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
        size: 32,
      },
    ],
    [data]
  )

  const { table } = useDataTable({
    data: filteredData,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "title", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row) => row.id,
  })

  // const handleCreateProject = async (formData: Partial<Project>) => {
  //   if (!formData.title?.toString().trim()) {
  //     toast.error("Title is required")
  //     return
  //   }
  //   if (!formData.budget || formData.budget <= 0) {
  //     toast.error("Budget must be greater than 0")
  //     return
  //   }

  //   const newProject: Project = {
  //     id: Date.now().toString(),
  //     title: formData.title.toString(),
  //     status: (formData.status as "active" | "inactive") || "active",
  //     budget: formData.budget as number,
  //   }

  //   setData([...data, newProject])
  //   toast.success("Project created successfully")
  // }

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <div className="flex justify-between items-center gap-2 p-1 w-full">
          <DataTableToolbar table={table} />
          <div className="flex items-center gap-2">
            <DataTableSortList table={table} />
            <Button size="sm" className="font-normal">
              <Plus />
              Create Project
            </Button>
          </div>
        </div>
      </DataTable>
    </div>
  )
}
