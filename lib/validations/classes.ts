import { z } from "zod"
import { DayOfWeek } from "@/lib/contant"

export const classRequestSchema = z
  .object({
    categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
    subjectId: z.string().min(1, "Vui lòng chọn môn học"),
    levelId: z.string().min(1, "Vui lòng chọn trình độ"),
    description: z
      .string()
      .min(10, "Vui lòng mô tả chi tiết (tối thiểu 10 ký tự)"),
    daysOfWeek: z
      .array(z.nativeEnum(DayOfWeek))
      .min(1, "Vui lòng chọn ít nhất 1 ngày"),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Giờ không hợp lệ"),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Giờ không hợp lệ"),
    timeNote: z.string().optional().default(""),
    location: z.string().min(1, "Vui lòng nhập khu vực"),
    minBudget: z.number().min(0, "Giá không hợp lệ"),
    maxBudget: z.number().min(0, "Giá không hợp lệ"),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "Giờ kết thúc phải sau giờ bắt đầu",
    path: ["endTime"],
  })
  .refine((data) => data.maxBudget >= data.minBudget, {
    message: "Giá tối đa phải >= giá tối thiểu",
    path: ["maxBudget"],
  })

export type ClassRequestFormValues = z.infer<typeof classRequestSchema>
