"use client"

import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Faceted,
  FacetedBadgeList,
  FacetedContent,
  FacetedEmpty,
  FacetedGroup,
  FacetedInput,
  FacetedItem,
  FacetedList,
  FacetedTrigger,
} from "@/components/ui/faceted"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/AuthContext"
import {
  useGetLevels,
  useGetSubjects,
} from "@/hooks/queries/useMasterDataQuery"
import { useCreateTutorProfile } from "@/hooks/queries/useTutorProfileQuery"
import { useUpdateUser } from "@/hooks/queries/useUserQuery"
import {
  MAX_BIO_WORDS,
  countWords,
  tutorProfileFormSchema,
  type TutorProfileFormValues,
} from "@/lib/validations/tutor"
import type { ILevel, ISubject } from "@/types/master-data"
import { Loader2, Upload } from "lucide-react"
import { toast } from "sonner"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const MAX_CV_FILES = 5

type FileFieldProps = {
  label: string
  description: string
  accept: string
  multiple?: boolean
  files: File[]
  onChange: (files: File[]) => void
  error?: string | null
}

function formatFileSize(bytes: number) {
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(mb >= 1 ? 1 : 2)} MB`
}

function isAllowedTutorFile(file: File) {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]
  return allowedTypes.includes(file.type)
}

function FileField({
  label,
  description,
  accept,
  multiple = false,
  files,
  onChange,
  error,
}: FileFieldProps) {
  const inputId = useMemo(
    () => `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-input`,
    [label]
  )

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <div className="flex flex-col gap-3">
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col gap-2 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 p-4 transition-colors hover:border-primary/40 hover:bg-muted/40"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
            <Upload className="size-4" />
            Chọn tệp
          </span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </label>

        <Input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(event) => {
            const nextFiles = Array.from(event.target.files ?? [])
            onChange(nextFiles)
            event.target.value = ""
          }}
        />

        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file) => (
              <Badge
                key={`${file.name}-${file.lastModified}`}
                variant="secondary"
              >
                {file.name}
              </Badge>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </Field>
  )
}

function MultiSelectField({
  title,
  placeholder,
  options,
  value,
  onChange,
  error,
}: {
  title: string
  placeholder: string
  options: Array<{ label: string; value: string }>
  value: string[]
  onChange: (value: string[]) => void
  error?: string | null
}) {
  return (
    <Field>
      <FieldLabel>{title}</FieldLabel>
      <Faceted
        multiple
        value={value}
        onValueChange={(nextValue) => onChange(nextValue ?? [])}
      >
        <FacetedTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className="h-auto min-h-10 w-full justify-between px-3 py-2"
          >
            <FacetedBadgeList
              options={options}
              placeholder={placeholder}
              className="min-h-5 flex-1"
            />
          </Button>
        </FacetedTrigger>
        <FacetedContent className="w-[320px] p-0">
          <FacetedInput placeholder={placeholder} />
          <FacetedList>
            <FacetedEmpty>Không tìm thấy kết quả.</FacetedEmpty>
            <FacetedGroup>
              {options.map((option) => (
                <FacetedItem key={option.value} value={option.value}>
                  {option.label}
                </FacetedItem>
              ))}
            </FacetedGroup>
          </FacetedList>
        </FacetedContent>
      </Faceted>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </Field>
  )
}

export function TutorProfileForm() {
  const { user } = useAuth()
  const {
    data: subjects = [],
    isLoading: subjectsLoading,
    isError: subjectsError,
  } = useGetSubjects()
  const {
    data: levels = [],
    isLoading: levelsLoading,
    isError: levelsError,
  } = useGetLevels()
  const { mutateAsync, isPending } = useCreateTutorProfile()
  const { mutateAsync: updateUser } = useUpdateUser()

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [cvFiles, setCvFiles] = useState<File[]>([])
  const [cvLinks, setCvLinks] = useState<string[]>([])
  const [cvLinkInput, setCvLinkInput] = useState<string>("")
  const [avatarError, setAvatarError] = useState<string | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarLoading, setAvatarLoading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TutorProfileFormValues>({
    resolver: zodResolver(tutorProfileFormSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      bio: "",
      education: "",
      hourlyRate: 0,
      location: "",
      subjects: [],
      levels: [],
    },
  })

  const bioValue = watch("bio")
  const selectedSubjectOptions = useMemo(
    () =>
      subjects.map((subject: ISubject) => ({
        label: subject.name,
        value: subject.id,
      })),
    [subjects]
  )
  const selectedLevelOptions = useMemo(
    () =>
      levels.map((level: ILevel) => ({ label: level.name, value: level.id })),
    [levels]
  )

  const resolveAvatarFile = (files: File[]) => {
    setAvatarError(null)

    const file = files[0]
    if (!file) {
      setAvatarFile(null)
      setAvatarPreview(null)
      return
    }

    if (file.type !== "image/png") {
      setAvatarError("Ảnh đại diện chỉ hỗ trợ PNG")
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setAvatarError("Ảnh đại diện tối đa 5MB")
      return
    }

    setAvatarLoading(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string)
      setAvatarLoading(false)
    }
    reader.readAsDataURL(file)
    setAvatarFile(file)
  }

  const resolveCvFiles = (files: File[]) => {
    setCvError(null)

    if (files.length > MAX_CV_FILES) {
      setCvError(`Tối đa ${MAX_CV_FILES} file`)
      return
    }

    const invalidFile = files.find((file) => !isAllowedTutorFile(file))
    if (invalidFile) {
      setCvError("CV chỉ hỗ trợ PDF, JPG, PNG")
      return
    }

    const oversizedFile = files.find((file) => file.size > MAX_FILE_SIZE)
    if (oversizedFile) {
      setCvError("Mỗi file tối đa 5MB")
      return
    }

    setCvFiles(files)
  }

  const addCvLink = () => {
    const url = cvLinkInput.trim()
    if (!url) return
    if (cvLinks.includes(url)) return
    setCvLinks((s) => [...s, url])
    setCvLinkInput("")
  }

  const removeCvLink = (url: string) => {
    setCvLinks((s) => s.filter((u) => u !== url))
  }

  const onSubmit = async (values: TutorProfileFormValues) => {
    setSubmitError(null)
    setAvatarError(null)
    setCvError(null)

    if (!avatarFile) {
      setAvatarError("Vui lòng tải lên ảnh đại diện PNG")
      return
    }

    if (cvFiles.length === 0) {
      setCvError("Vui lòng tải lên ít nhất 1 file CV")
      return
    }

    if (!user?.id) return

    try {
      await Promise.all([
        updateUser({
          userId: user.id,
          fullName: values.fullName.trim(),
          phone: values.phone.trim(),
          avatarUrl: avatarFile,
        }),
        mutateAsync({
          bio: values.bio.trim(),
          education: values.education.trim(),
          // pass existing links and new files separately
          cvUrls: cvLinks,
          files: cvFiles,
          subjects: values.subjects,
          levels: values.levels,
          hourlyRate: values.hourlyRate,
          location: values.location.trim(),
        }),
      ])

      toast.success("Tạo hồ sơ gia sư thành công")
      reset()
      setAvatarFile(null)
      setAvatarPreview(null)
      setCvFiles([])
    } catch (error) {
      console.error(error)
      setSubmitError("Không thể tạo hồ sơ. Vui lòng thử lại sau.")
      toast.error("Không thể tạo hồ sơ. Vui lòng thử lại sau.")
    }
  }

  if (subjectsLoading || levelsLoading) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center justify-center px-6 py-12">
        <div className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-muted-foreground shadow-sm">
          <Spinner />
          <span>Đang tải dữ liệu hồ sơ...</span>
        </div>
      </div>
    )
  }

  if (subjectsError || levelsError) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center justify-center px-6 py-12">
        <div className="max-w-lg rounded-2xl border border-dashed p-6 text-center">
          <p className="text-lg font-semibold text-destructive">
            Không thể tải danh mục môn học hoặc cấp độ
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Vui lòng tải lại trang để thử lại.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-10">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Tutor profile
        </p>
        <h1 className="text-3xl font-bold text-primary">Tạo hồ sơ gia sư</h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Hoàn tất hồ sơ để mở khóa toàn bộ chức năng của hệ thống và bắt đầu
          nhận lớp ngay khi có yêu cầu phù hợp.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="rounded-3xl border bg-card p-5 shadow-sm md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Thông tin cá nhân
              </h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="flex flex-col items-center gap-4">
              {/* Avatar clickable */}
              <label
                htmlFor="avatarUrl"
                className="group relative cursor-pointer"
              >
                <div className="relative size-28">
                  {avatarLoading ? (
                    <div className="flex size-28 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/30">
                      <Loader2 className="size-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <Avatar className="size-28 rounded-full">
                      <AvatarImage src={avatarPreview ?? user?.avatarUrl} />
                      <AvatarFallback className="rounded-full text-2xl">
                        {user?.fullName?.slice(0, 2)?.toUpperCase() || "TV"}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  {/* Hover overlay */}
                  {!avatarLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <Upload className="size-5 text-white" />
                      <span className="text-[10px] font-medium text-white">
                        Đổi ảnh
                      </span>
                    </div>
                  )}
                </div>
              </label>

              <Input
                id="avatarUrl"
                type="file"
                accept="image/png"
                className="hidden"
                onChange={(event) => {
                  resolveAvatarFile(Array.from(event.target.files ?? []))
                  event.target.value = ""
                }}
              />

              {/* Text + error giữ nguyên */}
              <div className="space-y-1 text-center">
                <FieldDescription>
                  Chỉ nhận 1 file PNG, tối đa 5MB.
                </FieldDescription>
                {avatarFile && (
                  <p className="text-sm text-muted-foreground">
                    Đã chọn: {avatarFile.name} (
                    {formatFileSize(avatarFile.size)})
                  </p>
                )}
                {avatarError && (
                  <p className="text-sm text-destructive">{avatarError}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="fullName">Họ và tên</FieldLabel>
                <Input id="fullName" {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Số điện thoại</FieldLabel>
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea
                  id="bio"
                  placeholder="e.g: I am a passionate Math tutor with 10 years of experience."
                  className="min-h-32 resize-none"
                  {...register("bio")}
                />
                <div className="mt-1 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                  <span>
                    {countWords(bioValue)} / {MAX_BIO_WORDS} từ
                  </span>
                </div>
                {errors.bio && (
                  <p className="text-sm text-destructive">
                    {errors.bio.message}
                  </p>
                )}
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel htmlFor="education">Học thức</FieldLabel>
                <Input
                  id="education"
                  placeholder="e.g:Bachelor of Mathematics, University of Education"
                  {...register("education")}
                />
                {errors.education && (
                  <p className="text-sm text-destructive">
                    {errors.education.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="hourlyRate">Mức phí theo giờ</FieldLabel>
                <Input
                  id="hourlyRate"
                  type="number"
                  min={0}
                  placeholder="e.g:150000"
                  {...register("hourlyRate", { valueAsNumber: true })}
                />
                {errors.hourlyRate && (
                  <p className="text-sm text-destructive">
                    {errors.hourlyRate.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Khu vực</FieldLabel>
                <Input
                  id="location"
                  placeholder="e.g:District 1, Ho Chi Minh City"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-sm text-destructive">
                    {errors.location.message}
                  </p>
                )}
              </Field>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border bg-card p-5 shadow-sm md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-foreground">
              Chuyên môn
            </h2>
            <p className="text-sm text-muted-foreground">
              Chọn môn học và cấp độ mà bạn có thể giảng dạy.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="subjects"
              render={({ field }) => (
                <MultiSelectField
                  title="Môn học"
                  placeholder="e.g:Chọn môn học"
                  options={selectedSubjectOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.subjects?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="levels"
              render={({ field }) => (
                <MultiSelectField
                  title="Cấp độ"
                  placeholder="e.g:Chọn cấp độ"
                  options={selectedLevelOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.levels?.message}
                />
              )}
            />
          </div>
        </section>

        <section className="rounded-3xl border bg-card p-5 shadow-sm md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-foreground">Tài liệu</h2>
            <p className="text-sm text-muted-foreground">
              Tải lên CV, chứng chỉ hoặc tài liệu liên quan để tăng độ tin cậy.
            </p>
          </div>

          <div className="space-y-4">
            <FileField
              label="CV / Chứng chỉ"
              description="Tối đa 5 file, mỗi file 5MB. Hỗ trợ PDF, JPG, PNG."
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              multiple
              files={cvFiles}
              onChange={resolveCvFiles}
              error={cvError}
            />

            <Field>
              <FieldLabel>CV links (URL)</FieldLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="https://drive.google.com/...."
                  value={cvLinkInput}
                  onChange={(e) => setCvLinkInput(e.target.value)}
                />
                <Button type="button" onClick={addCvLink}>
                  Thêm
                </Button>
              </div>
              {cvLinks.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {cvLinks.map((link) => (
                    <Badge
                      key={link}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="max-w-[180px] truncate underline"
                      >
                        {link}
                      </a>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCvLink(link)}
                      >
                        Xoá
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </Field>
          </div>
        </section>

        {submitError && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        <div className="flex flex-col gap-3 rounded-3xl border bg-card p-5 shadow-sm md:flex-row md:items-center md:justify-between md:p-6">
          <div className="text-sm text-muted-foreground">
            Kiểm tra lại thông tin trước khi gửi. Sau khi tạo hồ sơ, bạn có thể
            sử dụng ứng dụng như bình thường.
          </div>
          <Button type="submit" className="min-w-40" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            {isPending ? "Đang tạo..." : "Tạo hồ sơ"}
          </Button>
        </div>
      </form>
    </div>
  )
}
