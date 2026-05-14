"use client"

import * as React from "react"
import { Check, PlusCircle, Search, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { ClassStatus } from "@/types/classes"

const STATUS_OPTIONS: { label: string; value: ClassStatus }[] = [
  { label: "Recruiting", value: "RECRUITING" },
  { label: "Trial", value: "TRIAL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
]

interface ClassFilterProps {
  value?: ClassStatus
  onValueChange: (value?: ClassStatus) => void
  searchValue?: string
  onSearchChange: (value: string) => void
}

export const ClassFilter = ({
  value,
  onValueChange,
  searchValue = "",
  onSearchChange,
}: ClassFilterProps) => {
  const [open, setOpen] = React.useState(false)

  const selectedValueSet = React.useMemo(
    () => new Set(value ? [value] : []),
    [value],
  )

  const onItemSelect = React.useCallback(
    (nextValue: ClassStatus) => {
      onValueChange(value === nextValue ? undefined : nextValue)
      setOpen(false)
    },
    [onValueChange, value],
  )

  const onReset = React.useCallback((event?: React.MouseEvent) => {
    event?.stopPropagation()
    onValueChange(undefined)
  }, [onValueChange])

  return (
    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-3 w-full">
      <div className="relative w-full md:max-w-sm">
        <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
        <Input
          placeholder="Search classes..."
          className="pl-9"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="self-start md:self-auto border-dashed font-normal"
          >
            {selectedValueSet.size > 0 ? (
              <div
                role="button"
                aria-label="Clear class status filter"
                tabIndex={0}
                className="opacity-70 hover:opacity-100 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-opacity"
                onClick={onReset}
              >
                <XCircle className="w-4 h-4" />
              </div>
            ) : (
              <PlusCircle className="w-4 h-4" />
            )}
            Status
            {selectedValueSet.size > 0 && (
              <>
                <Separator
                  orientation="vertical"
                  className="mx-0.5 data-[orientation=vertical]:h-4"
                />
                <Badge
                  variant="secondary"
                  className="lg:hidden px-1 rounded-sm font-normal"
                >
                  1
                </Badge>
                <div className="hidden lg:flex items-center gap-1">
                  {STATUS_OPTIONS.filter((option) =>
                    selectedValueSet.has(option.value),
                  ).map((option) => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="px-1 rounded-sm font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-64" align="end">
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandList className="max-h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="max-h-75 overflow-x-hidden overflow-y-auto scroll-py-1">
                {STATUS_OPTIONS.map((option) => {
                  const isSelected = selectedValueSet.has(option.value)

                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => onItemSelect(option.value)}
                    >
                      <div
                        className={cn(
                          "flex justify-center items-center border border-primary rounded-sm size-4",
                          isSelected
                            ? "bg-primary"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="truncate">{option.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {selectedValueSet.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => onReset()}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}