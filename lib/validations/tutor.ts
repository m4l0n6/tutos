import { z } from "zod"

const MAX_BIO_WORDS = 300

function countWords(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return 0

  return trimmed.split(/\s+/).length
}

export const tutorProfileFormSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên"),
  phone: z.string().trim().min(1, "Vui lòng nhập số điện thoại"),
  bio: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập bio")
    .refine((value) => countWords(value) <= MAX_BIO_WORDS, {
      message: `Bio tối đa ${MAX_BIO_WORDS} từ`,
    }),
  education: z.string().trim().min(1, "Vui lòng nhập học thức"),
  hourlyRate: z.number().min(0, "Mức giá không hợp lệ"),
  location: z.string().trim().min(1, "Vui lòng nhập khu vực"),
  subjects: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 môn học"),
  levels: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 cấp độ"),
})

export type TutorProfileFormValues = z.infer<typeof tutorProfileFormSchema>

export { MAX_BIO_WORDS, countWords }
