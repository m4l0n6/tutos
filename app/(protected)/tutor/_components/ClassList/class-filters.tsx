"use client"

import * as React from "react"
import {
  useGetCategories,
  useGetSubjects,
  useGetLevels,
  useGetDaysOfWeek,
} from "@/hooks/queries/useMasterDataQuery"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ICategory } from "@/types/category"
import { ISubject } from "@/types/subject"
import { ILevel } from "@/types/level"
import { IDayOfWeek } from "@/types/master-data"

// ---------------------------------------------------------------------------
// FilterPill — controlled open state để đóng programmatically
// ---------------------------------------------------------------------------

interface FilterPillProps {
  label: string
  count: number
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const FilterPill: React.FC<FilterPillProps> = ({
  label,
  count,
  open,
  onOpenChange,
  children,
}) => (
  <Popover open={open} onOpenChange={onOpenChange}>
    <PopoverTrigger asChild>
      <Button variant="outline" className="h-8">
        {label}
        {count > 0 && (
          <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {count}
          </span>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-64 p-4">{children}</PopoverContent>
  </Popover>
)

// ---------------------------------------------------------------------------
// FilterPopoverContent
// ---------------------------------------------------------------------------

interface FilterPopoverContentProps<T> {
  items: T[] | undefined
  selectedItems: string[]
  onSelectionChange: (id: string) => void
  onConfirm: () => void
  onCancel: () => void
  labelAccessor: (item: T) => string
  idAccessor: (item: T) => string
  isLoading: boolean
  isError: boolean
}

const FilterPopoverContent = <T,>({
  items,
  selectedItems,
  onSelectionChange,
  onConfirm,
  onCancel,
  labelAccessor,
  idAccessor,
  isLoading,
  isError,
}: FilterPopoverContentProps<T>) => (
  <div className="space-y-4">
    <div className="max-h-60 space-y-2 overflow-y-auto">
      {isLoading && (
        <p className="text-sm text-muted-foreground">Đang tải...</p>
      )}
      {isError && <p className="text-sm text-destructive">Lỗi tải dữ liệu.</p>}
      {!isLoading && !isError && (!items || items.length === 0) && (
        <p className="text-sm text-muted-foreground">Không có dữ liệu.</p>
      )}
      {items?.map((item) => (
        <div key={idAccessor(item)} className="flex items-center gap-2">
          <Checkbox
            id={idAccessor(item)}
            checked={selectedItems.includes(idAccessor(item))}
            onCheckedChange={() => onSelectionChange(idAccessor(item))}
          />
          <label htmlFor={idAccessor(item)} className="cursor-pointer text-sm">
            {labelAccessor(item)}
          </label>
        </div>
      ))}
    </div>
    <div className="flex justify-end gap-2">
      <Button variant="ghost" size="sm" onClick={onCancel}>
        Hủy
      </Button>
      <Button size="sm" onClick={onConfirm}>
        Xác nhận
      </Button>
    </div>
  </div>
)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ClassFilterState {
  categoryId?: string
  subjectId?: string
  levelId?: string
  dayOfWeek?: string
  status?: string
}

interface ClassFiltersProps {
  onFilterChange: (filters: ClassFilterState) => void
}

// ---------------------------------------------------------------------------
// ClassFilters
// ---------------------------------------------------------------------------

export const ClassFilters: React.FC<ClassFiltersProps> = ({
  onFilterChange,
}) => {
  // Popover open states
  const [categoryOpen, setCategoryOpen] = React.useState(false)
  const [subjectOpen, setSubjectOpen] = React.useState(false)
  const [levelOpen, setLevelOpen] = React.useState(false)
  const [dayOpen, setDayOpen] = React.useState(false)

  // Temp = in-progress selection inside popover (not yet confirmed)
  // Applied = confirmed, drives the actual filter
  const [tempCategories, setTempCategories] = React.useState<string[]>([])
  const [appliedCategories, setAppliedCategories] = React.useState<string[]>([])

  const [tempSubjects, setTempSubjects] = React.useState<string[]>([])
  const [appliedSubjects, setAppliedSubjects] = React.useState<string[]>([])

  const [tempLevels, setTempLevels] = React.useState<string[]>([])
  const [appliedLevels, setAppliedLevels] = React.useState<string[]>([])

  const [tempDays, setTempDays] = React.useState<string[]>([])
  const [appliedDays, setAppliedDays] = React.useState<string[]>([])

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategories()
  const {
    data: subjects,
    isLoading: subjectsLoading,
    isError: subjectsError,
  } = useGetSubjects()
  const {
    data: levels,
    isLoading: levelsLoading,
    isError: levelsError,
  } = useGetLevels()
  const {
    data: daysOfWeek,
    isLoading: daysLoading,
    isError: daysError,
  } = useGetDaysOfWeek()

  React.useEffect(() => {
    onFilterChange({
      categoryId: appliedCategories.join(","),
      subjectId: appliedSubjects.join(","),
      levelId: appliedLevels.join(","),
      dayOfWeek: appliedDays.join(","),
    })
  }, [
    appliedCategories,
    appliedSubjects,
    appliedLevels,
    appliedDays,
    onFilterChange,
  ])

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    id: string
  ) =>
    setter((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )

  // Sync temp back to applied when popover closes without confirming
  const handleOpenChange = (
    open: boolean,
    setOpen: (v: boolean) => void,
    applied: string[],
    setTemp: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (!open) setTemp(applied) // reset temp on close
    setOpen(open)
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {/* Category */}
      <FilterPill
        label="Danh mục"
        count={appliedCategories.length}
        open={categoryOpen}
        onOpenChange={(o) =>
          handleOpenChange(
            o,
            setCategoryOpen,
            appliedCategories,
            setTempCategories
          )
        }
      >
        <FilterPopoverContent<ICategory>
          items={categories}
          selectedItems={tempCategories}
          onSelectionChange={(id) => toggle(setTempCategories, id)}
          onConfirm={() => {
            setAppliedCategories(tempCategories)
            setCategoryOpen(false)
          }}
          onCancel={() => {
            setTempCategories(appliedCategories)
            setCategoryOpen(false)
          }}
          labelAccessor={(item) => item.name}
          idAccessor={(item) => item.id}
          isLoading={categoriesLoading}
          isError={categoriesError}
        />
      </FilterPill>

      {/* Subject */}
      <FilterPill
        label="Môn học"
        count={appliedSubjects.length}
        open={subjectOpen}
        onOpenChange={(o) =>
          handleOpenChange(o, setSubjectOpen, appliedSubjects, setTempSubjects)
        }
      >
        <FilterPopoverContent<ISubject>
          items={subjects}
          selectedItems={tempSubjects}
          onSelectionChange={(id) => toggle(setTempSubjects, id)}
          onConfirm={() => {
            setAppliedSubjects(tempSubjects)
            setSubjectOpen(false)
          }}
          onCancel={() => {
            setTempSubjects(appliedSubjects)
            setSubjectOpen(false)
          }}
          labelAccessor={(item) => item.name}
          idAccessor={(item) => item.id}
          isLoading={subjectsLoading}
          isError={subjectsError}
        />
      </FilterPill>

      {/* Level */}
      <FilterPill
        label="Cấp độ"
        count={appliedLevels.length}
        open={levelOpen}
        onOpenChange={(o) =>
          handleOpenChange(o, setLevelOpen, appliedLevels, setTempLevels)
        }
      >
        <FilterPopoverContent<ILevel>
          items={levels}
          selectedItems={tempLevels}
          onSelectionChange={(id) => toggle(setTempLevels, id)}
          onConfirm={() => {
            setAppliedLevels(tempLevels)
            setLevelOpen(false)
          }}
          onCancel={() => {
            setTempLevels(appliedLevels)
            setLevelOpen(false)
          }}
          labelAccessor={(item) => item.name}
          idAccessor={(item) => item.id}
          isLoading={levelsLoading}
          isError={levelsError}
        />
      </FilterPill>

      <FilterPill
        label="Ngày học"
        count={appliedDays.length}
        open={dayOpen}
        onOpenChange={(o) =>
          handleOpenChange(o, setDayOpen, appliedDays, setTempDays)
        }
      >
        <FilterPopoverContent<IDayOfWeek>
          items={daysOfWeek}
          selectedItems={tempDays}
          onSelectionChange={(id) => toggle(setTempDays, id)}
          onConfirm={() => {
            setAppliedDays(tempDays)
            setDayOpen(false)
          }}
          onCancel={() => {
            setTempDays(appliedDays)
            setDayOpen(false)
          }}
          labelAccessor={(item) => item.name}
          idAccessor={(item) => item.code}
          isLoading={daysLoading}
          isError={daysError}
        />
      </FilterPill>
    </div>
  )
}
