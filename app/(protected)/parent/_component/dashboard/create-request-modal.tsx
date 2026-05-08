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
    title: "Thông tin lớp học",
    description: "Môn học, trình độ, địa điểm",
    fields: ["subject", "level", "location", "description"] as const,
  },
  {
    value: "schedule",
    title: "Thời gian học",
    description: "Lịch học và ngân sách",
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
  } = useForm<ClassRequestFormValues>({
    resolver: zodResolver(
      classRequestSchema
    ) as Resolver<ClassRequestFormValues>,
    defaultValues: {
      subject: "",
      level: "",
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

      // Dùng ref thay vì state trực tiếp
      const stepData = STEPS.find((s) => s.value === currentStepRef.current)
      if (!stepData) return true

      const isValid = await trigger(stepData.fields)

      if (!isValid) {
        toast.info("Vui lòng điền đầy đủ thông tin để tiếp tục", {
          description: "Kiểm tra lại các trường bắt buộc và thử lại.",
        })
      }

      return isValid
    },
    [trigger]
  )

  const onSubmit = (data: ClassRequestFormValues) => {
    mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true)
        toast.success("Gửi yêu cầu thành công!")
      },
      onError: (error) => {
        console.error(error.message)
        toast.error("Gửi yêu cầu thất bại, vui lòng thử lại")
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
              Gửi yêu cầu thành công!
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Chúng tôi sẽ xét duyệt yêu cầu của bạn và phản hồi trong vòng 24h.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-8 sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            Gửi yêu cầu thuê gia sư
          </DialogTitle>
          <DialogDescription className="text-body-md text-on-surface-variant">
            Vui lòng điền đầy đủ thông tin để chúng tôi tìm kiếm gia sư phù hợp
            nhất cho con bạn.
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

            {/* Step 1: Thông tin lớp học */}
            <StepperContent value="class-info">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="subject">Tên môn học</FieldLabel>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Nhập tên môn học ..."
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-destructive text-sm">
                      {errors.subject.message}
                    </p>
                  )}
                </Field>

                <div className="gap-4 grid grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="level">Trình độ lớp</FieldLabel>
                    <Controller
                      control={control}
                      name="level"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="level">
                            <SelectValue placeholder="Chọn cấp độ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={`Grade ${i + 1}`}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.level && (
                      <p className="text-destructive text-sm">
                        {errors.level.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="location">Địa chỉ</FieldLabel>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Nhập địa chỉ cụ thể ..."
                      {...register("location")}
                    />
                    {errors.location && (
                      <p className="text-destructive text-sm">
                        {errors.location.message}
                      </p>
                    )}
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="description">Mô tả</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Nhập mô tả chi tiết về yêu cầu của bạn ..."
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
                      Số tiền tối thiểu
                    </FieldLabel>
                    <Input
                      id="minBudget"
                      type="number"
                      placeholder="Nhập số tiền tối thiểu ..."
                      {...register("minBudget", { valueAsNumber: true })}
                    />
                    {errors.minBudget && (
                      <p className="text-destructive text-sm">
                        {errors.minBudget.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="maxBudget">Số tiền tối đa</FieldLabel>
                    <Input
                      id="maxBudget"
                      type="number"
                      placeholder="Nhập số tiền tối đa ..."
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
                  <FieldLegend>Ngày trong tuần</FieldLegend>
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
                    <FieldLabel htmlFor="startTime">Giờ bắt đầu</FieldLabel>
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
                    <FieldLabel htmlFor="endTime">Giờ kết thúc</FieldLabel>
                    <Input id="endTime" type="time" {...register("endTime")} />
                    {errors.endTime && (
                      <p className="text-destructive text-sm">
                        {errors.endTime.message}
                      </p>
                    )}
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="timeNote">Ghi chú thời gian</FieldLabel>
                  <Textarea
                    id="timeNote"
                    placeholder="Nhập ghi chú thời gian ..."
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
                  Hủy
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
                      Quay lại
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
                    {isPending ? "Đang gửi..." : "Gửi yêu cầu"}
                  </Button>
                ) : (
                  <StepperNext asChild>
                    <Button type="button">Tiếp theo</Button>
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
