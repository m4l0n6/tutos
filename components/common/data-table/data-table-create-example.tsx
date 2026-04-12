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
import { DataTableCreate } from "@/components/common/data-table/data-table-create"
import { useDataTable } from "@/hooks/use-data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

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

export function ClassesTable() {
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
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          return (
            <Badge variant={status === "active" ? "default" : "secondary"}>
              {status === "active" ? (
                <CheckCircle2 className="mr-1 w-3 h-3" />
              ) : (
                <XCircle className="mr-1 w-3 h-3" />
              )}
              {status}
            </Badge>
          )
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "budget",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Budget" />
        ),
        cell: ({ row }) => {
          const budget = parseFloat(row.getValue("budget"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(budget)
          return <div>{formatted}</div>
        },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 w-8 h-8">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(row.original.id)
                  toast.success("ID copied to clipboard")
                }}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const newData = data.filter((item) => item.id !== row.original.id)
                  setData(newData)
                  toast.success("Item deleted")
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data]
  )

  const table = useDataTable({
    data: filteredData,
    columns,
    pageSize: 10,
  })

  const handleCreate = async (formData: Partial<Project>) => {
    // Validate form data
    if (!formData.title?.toString().trim()) {
      toast.error("Title is required")
      return
    }
    if (!formData.budget || formData.budget <= 0) {
      toast.error("Budget must be greater than 0")
      return
    }

    // Create new project
    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title.toString(),
      status: (formData.status as "active" | "inactive") || "active",
      budget: formData.budget as number,
    }

    setData([...data, newProject])
    toast.success("Project created successfully")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Projects</h2>
        <DataTableCreate<Project>
          title="Create New Project"
          description="Add a new project to your list"
          buttonLabel="New Project"
          onSubmit={handleCreate}
          fields={[
            {
              name: "title",
              label: "Project Title",
              type: "text",
              placeholder: "Enter project name",
              required: true,
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              placeholder: "Select status",
              options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ],
              required: true,
            },
            {
              name: "budget",
              label: "Budget",
              type: "number",
              placeholder: "Enter budget amount",
              required: true,
            },
          ]}
        />
      </div>

      <DataTableToolbar table={table}>
        <DataTableSortList table={table} />
      </DataTableToolbar>

      <DataTable table={table} />
    </div>
  )
}
