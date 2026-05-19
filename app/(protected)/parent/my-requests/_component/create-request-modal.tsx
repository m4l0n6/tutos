"use client"

import { useState } from "react"
import * as React from "react"
import { Send, CheckCircle } from "lucide-react"
import { Controller, useForm, Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  classRequestSchema,
  ClassRequestFormValues,
} from "@/lib/validations/classes"
import { DayOfWeek, DayOfWeekLabel } from "@/lib/contant"
import type { TClassResquestParam } from "@/types/classes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useCreateClassRequest } from "@/hooks/queries/useClassQuery"
import {
  useGetCategories,
  useGetSubjects,
  useGetLevels,
} from "@/hooks/queries/useMasterDataQuery"
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperNext,
  StepperPrev,
  type StepperProps,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

interface CreateRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const STEPS = [
  {
    value: "class-info",
    title: "Class Information",
    description: "Category, Subject, Level, Location",
    fields: ["categoryId", "subjectId", "levelId", "location", "description"] as const,
  },
  {
    value: "schedule",
    title: "Class Schedule",
    description: "Schedule and Budget",
    fields: [
      "daysOfWeek",
      "startTime",
      "endTime",
      "minBudget",
      "maxBudget",
    ] as const,
  },
]

export function CreateRequestModal({
  open,
  onOpenChange,
}: CreateRequestModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState("class-info")
  const { mutate, isPending } = useCreateClassRequest()

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    watch,
  } = useForm<ClassRequestFormValues>({
    resolver: zodResolver(
      classRequestSchema
    ) as Resolver<ClassRequestFormValues>,
    defaultValues: {
      subjectId: "",
      levelId: "",
      description: "",
      daysOfWeek: [],
      startTime: "",
      endTime: "",
      timeNote: "",
      location: "",
      minBudget: 0,
      maxBudget: 0,
    },
  })

  const selectedCategory = watch("categoryId")
  
  // Fetch master data
  const { data: categories = [] } = useGetCategories()
  const { data: subjects = [] } = useGetSubjects(selectedCategory)
  const { data: levels = [] } = useGetLevels(selectedCategory)

  const stepIndex = React.useMemo(
    () => STEPS.findIndex((s) => s.value === currentStep),
    [currentStep]
  )

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsSubmitted(false)
      setCurrentStep("class-info")
      reset()
    }
    onOpenChange(newOpen)
  }

  const currentStepRef = React.useRef(currentStep)
  React.useEffect(() => {
    currentStepRef.current = currentStep
  }, [currentStep])

  const onValidate: NonNullable<StepperProps["onValidate"]> = React.useCallback(
    async (_value, direction) => {
      if (direction === "prev") return true

      // Use ref instead of state directly
      const stepData = STEPS.find((s) => s.value === currentStepRef.current)
      if (!stepData) return true

      const isValid = await trigger(stepData.fields)

      if (!isValid) {
        toast.info("Please fill in all required information to continue", {
          description: "Check required fields and try again.",
        })
      }

      return isValid
    },
    [trigger]
  )

  const onSubmit = (data: ClassRequestFormValues) => {
    // Exclude categoryId when sending
    const { categoryId: _categoryId, ...submitData } = data
    mutate(submitData as TClassResquestParam, {
      onSuccess: () => {
        setIsSubmitted(true)
        toast.success("Request submitted successfully!")
      },
      onError: (error) => {
        console.error(error.message)
        toast.error("Failed to submit request, please try again")
      },
    })
  }

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col justify-center items-center py-12 text-center">
            <div className="bg-primary/10 mb-4 p-4 rounded-full">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h2 className="mb-2 font-bold text-h2 text-primary">
              Request submitted successfully!
            </h2>
            <p className="text-body-md text-on-surface-variant">
              We will review your request and respond within 24 hours.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-8 sm:max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            Create Class Request
          </DialogTitle>
          <DialogDescription className="text-body-md text-on-surface-variant">
            Please fill out the form below to submit a new class request. Our team will review your request and get back to you within 24-48 hours.
          </DialogDescription>
        </DialogHeader>

        <form id="class-request-form" onSubmit={handleSubmit(onSubmit)}>
          <Stepper
            value={currentStep}
            onValueChange={setCurrentStep}
            onValidate={onValidate}
          >
            {/* Stepper Header */}
            <StepperList className="mb-6">
              {STEPS.map((step) => (
                <StepperItem
                  key={step.value}
                  value={step.value}
                  className="flex-1"
                >
                  <StepperTrigger className="w-full">
                    <StepperIndicator />
                    <div className="flex flex-col items-start gap-0.5">
                      <StepperTitle>{step.title}</StepperTitle>
                      <StepperDescription className="hidden sm:block">
                        {step.description}
                      </StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator className="mx-4" />
                </StepperItem>
              ))}
            </StepperList>

            {/* Step 1: Class Information */}
            <StepperContent value="class-info">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="categoryId">Category</FieldLabel>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="categoryId">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.categoryId && (
                    <p className="text-destructive text-sm">
                      {errors.categoryId.message}
                    </p>
                  )}
                </Field>

                <div className="gap-4 grid grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="subjectId">Subject</FieldLabel>
                    <Controller
                      control={control}
                      name="subjectId"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!selectedCategory}
                        >
                          <SelectTrigger id="subjectId">
                            <SelectValue
                              placeholder={
                                selectedCategory
                                  ? "Select Subject"
                                  : "Select Category First"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {subjects.map((subject) => (
                                <SelectItem key={subject.id} value={subject.id}>
                                  {subject.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.subjectId && (
                      <p className="text-destructive text-sm">
                        {errors.subjectId.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="levelId">Level</FieldLabel>
                    <Controller
                      control={control}
                      name="levelId"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!selectedCategory}
                        >
                          <SelectTrigger id="levelId">
                            <SelectValue
                              placeholder={
                                selectedCategory
                                  ? "Select Level"
                                  : "Select Category First"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {levels.map((level) => (
                                <SelectItem key={level.id} value={level.id}>
                                  {level.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.levelId && (
                      <p className="text-destructive text-sm">
                        {errors.levelId.message}
                      </p>
                    )}
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="location">Address</FieldLabel>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter specific address..."
                    {...register("location")}
                  />
                  {errors.location && (
                    <p className="text-destructive text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Enter detailed description of your request..."
                    className="resize-none"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-destructive text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </StepperContent>

            {/* Step 2: Thời gian học */}
            <StepperContent value="schedule">
              <FieldGroup>
                <div className="gap-4 grid grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="minBudget">
                      Minimum Budget
                    </FieldLabel>
                    <Input
                      id="minBudget"
                      type="number"
                      placeholder="Enter minimum budget..."
                      {...register("minBudget", { valueAsNumber: true })}
                    />
                    {errors.minBudget && (
                      <p className="text-destructive text-sm">
                        {errors.minBudget.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="maxBudget">Maximum Budget</FieldLabel>
                    <Input
                      id="maxBudget"
                      type="number"
                      placeholder="Enter maximum budget..."
                      {...register("maxBudget", { valueAsNumber: true })}
                    />
                    {errors.maxBudget && (
                      <p className="text-destructive text-sm">
                        {errors.maxBudget.message}
                      </p>
                    )}
                  </Field>
                </div>

                <FieldSet>
                  <FieldLegend>Days of Week</FieldLegend>
                  <Controller
                    control={control}
                    name="daysOfWeek"
                    render={({ field }) => (
                      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
                        {Object.entries(DayOfWeekLabel).map(([key, label]) => (
                          <FieldLabel
                            key={key}
                            htmlFor={`day-${key}`}
                            className="flex items-center gap-3"
                          >
                            <Checkbox
                              id={`day-${key}`}
                              checked={field.value.includes(key as DayOfWeek)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...field.value,
                                    key as DayOfWeek,
                                  ])
                                } else {
                                  field.onChange(
                                    field.value.filter((day) => day !== key)
                                  )
                                }
                              }}
                            />
                            <span>{label}</span>
                          </FieldLabel>
                        ))}
                      </div>
                    )}
                  />
                  {errors.daysOfWeek && (
                    <p className="text-destructive text-sm">
                      {errors.daysOfWeek.message}
                    </p>
                  )}
                </FieldSet>

                <div className="gap-4 grid grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
                    <Input
                      id="startTime"
                      type="time"
                      {...register("startTime")}
                    />
                    {errors.startTime && (
                      <p className="text-destructive text-sm">
                        {errors.startTime.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="endTime">End Time</FieldLabel>
                    <Input id="endTime" type="time" {...register("endTime")} />
                    {errors.endTime && (
                      <p className="text-destructive text-sm">
                        {errors.endTime.message}
                      </p>
                    )}
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="timeNote">Time Note</FieldLabel>
                  <Textarea
                    id="timeNote"
                    placeholder="Enter time note..."
                    {...register("timeNote")}
                  />
                  {errors.timeNote && (
                    <p className="text-destructive text-sm">
                      {errors.timeNote.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </StepperContent>

            {/* Footer Navigation */}
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>

              <div className="flex items-center gap-2 ml-auto">
                {stepIndex > 0 && (
                  <StepperPrev asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isPending}
                    >
                      Back
                    </Button>
                  </StepperPrev>
                )}

                {stepIndex === STEPS.length - 1 ? (
                  <Button
                    type="submit"
                    form="class-request-form"
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : <Send className="w-4 h-4" />}
                    {isPending ? "Sending..." : "Submit Request"}
                  </Button>
                ) : (
                  <StepperNext asChild>
                    <Button type="button">Next</Button>
                  </StepperNext>
                )}
              </div>
            </DialogFooter>
          </Stepper>
        </form>
      </DialogContent>
    </Dialog>
  )
}
