"use client"

import { useEffect, useMemo, useState } from "react"
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
import {
  useCreateTutorProfile,
  useUpdateTutorProfile,
} from "@/hooks/queries/useTutorProfileQuery"
import { useUpdateUser } from "@/hooks/queries/useUserQuery"
import {
  MAX_BIO_WORDS,
  countWords,
  tutorProfileFormSchema,
  type TutorProfileFormValues,
} from "@/lib/validations/tutor"
import { ISubject } from "@/types/subject"
import { ILevel } from "@/types/level"
import type { TutorProfile } from "@/types/tutor"
import { Loader2, Trash2, Upload } from "lucide-react"
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
  onRemove?: (index: number) => void
  error?: string | null
}

type TutorProfileFormProps = {
  mode?: "create" | "update"
  initialProfile?: TutorProfile | null
  onCancel?: () => void
  onSuccess?: () => void
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
  onRemove,
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
          className="flex flex-col gap-2 bg-muted/20 hover:bg-muted/40 p-4 border border-muted-foreground/30 hover:border-primary/40 border-dashed rounded-xl transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 font-medium text-foreground text-sm">
            <Upload className="size-4" />
            Chọn tệp
          </span>
          <span className="text-muted-foreground text-sm">{description}</span>
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
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="flex justify-between items-center gap-3 px-3 py-2 border rounded-lg"
              >
                <Badge variant="secondary" className="max-w-[80%] truncate">
                  {file.name}
                </Badge>
                {onRemove ? (
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onRemove(index)}
                    aria-label={`Xoa file ${file.name}`}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-destructive text-sm">{error}</p>}
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
            className="justify-between px-3 py-2 w-full h-auto min-h-10"
          >
            <FacetedBadgeList
              options={options}
              placeholder={placeholder}
              className="flex-1 min-h-5"
            />
          </Button>
        </FacetedTrigger>
        <FacetedContent className="p-0 w-[320px]">
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
      {error && <p className="text-destructive text-sm">{error}</p>}
    </Field>
  )
}

export function TutorProfileForm({
  mode = "create",
  initialProfile = null,
  onCancel,
  onSuccess,
}: TutorProfileFormProps) {
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
  const { mutateAsync: createTutorProfile, isPending: isCreating } =
    useCreateTutorProfile()
  const { mutateAsync: updateTutorProfile, isPending: isUpdatingProfile } =
    useUpdateTutorProfile()
  const { mutateAsync: updateUser } = useUpdateUser()

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [cvFiles, setCvFiles] = useState<File[]>([])
  const [avatarError, setAvatarError] = useState<string | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [existingCvUrls, setExistingCvUrls] = useState<string[]>(
    initialProfile?.cvUrls ?? []
  )

  const isPending = isCreating || isUpdatingProfile
  const isUpdateMode = mode === "update"

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
      fullName: user?.fullName ?? "",
      phone: user?.phone ?? "",
      bio: initialProfile?.bio ?? "",
      education: initialProfile?.education ?? "",
      hourlyRate: initialProfile?.hourlyRate ?? 0,
      location: initialProfile?.location ?? "",
      subjectIds: initialProfile?.subjectIds ?? [],
      levelIds: initialProfile?.levelIds ?? [],
    },
  })

  useEffect(() => {
    setExistingCvUrls(initialProfile?.cvUrls ?? [])
    setAvatarPreview(null)
    setAvatarFile(null)
    setCvFiles([])
    reset({
      fullName: user?.fullName ?? "",
      phone: user?.phone ?? "",
      bio: initialProfile?.bio ?? "",
      education: initialProfile?.education ?? "",
      hourlyRate: initialProfile?.hourlyRate ?? 0,
      location: initialProfile?.location ?? "",
      subjectIds: initialProfile?.subjectIds ?? [],
      levelIds: initialProfile?.levelIds ?? [],
    })
  }, [initialProfile, reset, user?.fullName, user?.phone])

  useEffect(() => {
    if (!initialProfile) return
    reset({
      fullName: user?.fullName ?? "",
      phone: user?.phone ?? "",
      bio: initialProfile?.bio ?? "",
      education: initialProfile?.education ?? "",
      hourlyRate: initialProfile?.hourlyRate ?? 0,
      location: initialProfile?.location ?? "",
      subjectIds: initialProfile?.subjectIds ?? [],
      levelIds: initialProfile?.levelIds ?? [],
    })
  }, [initialProfile, reset, subjects, levels, user?.fullName, user?.phone])

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

    if (files.length + existingCvUrls.length > MAX_CV_FILES) {
      setCvError(
        `Tối đa ${MAX_CV_FILES} file (hiện có ${existingCvUrls.length} file cũ)`
      )
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

  const removeExistingCvUrl = (index: number) => {
    setCvError(null)
    setExistingCvUrls((prev) => prev.filter((_, current) => current !== index))
  }

  const removeNewCvFile = (index: number) => {
    setCvError(null)
    setCvFiles((prev) => prev.filter((_, current) => current !== index))
  }

  const onSubmit = async (values: TutorProfileFormValues) => {
    setSubmitError(null)
    setAvatarError(null)
    setCvError(null)

    if (!avatarFile && !isUpdateMode) {
      setAvatarError("Vui lòng tải lên ảnh đại diện PNG")
      return
    }

    if (cvFiles.length === 0 && existingCvUrls.length === 0) {
      setCvError("Vui lòng tải lên ít nhất 1 file CV")
      return
    }

    if (!user?.id) return

    try {
      const profilePayload = {
        bio: values.bio.trim(),
        education: values.education.trim(),
        cvUrls: existingCvUrls,
        files: cvFiles,
        subjectIds: values.subjectIds,
        levelIds: values.levelIds,
        hourlyRate: values.hourlyRate,
        location: values.location.trim(),
      }

      const profileRequest = isUpdateMode
        ? updateTutorProfile(profilePayload)
        : createTutorProfile(profilePayload)

      await Promise.all([
        updateUser({
          userId: user.id,
          fullName: values.fullName.trim(),
          phone: values.phone.trim(),
          avatarUrl: avatarFile ?? undefined,
        }),
        profileRequest,
      ])

      toast.success(
        isUpdateMode
          ? "Cập nhật hồ sơ gia sư thành công"
          : "Tạo hồ sơ gia sư thành công"
      )

      if (isUpdateMode) {
        setCvFiles([])
        setAvatarFile(null)
        setAvatarPreview(null)
        onSuccess?.()
        return
      }

      reset()
      setAvatarFile(null)
      setAvatarPreview(null)
      setCvFiles([])
      setExistingCvUrls([])
    } catch (error) {
      console.error(error)
      const message = isUpdateMode
        ? "Không thể cập nhật hồ sơ. Vui lòng thử lại sau."
        : "Không thể tạo hồ sơ. Vui lòng thử lại sau."
      setSubmitError(message)
      toast.error(message)
    }
  }

  if (subjectsLoading || levelsLoading) {
    return (
      <div className="flex justify-center items-center mx-auto px-6 py-12 w-full max-w-4xl min-h-[70vh]">
        <div className="flex items-center gap-3 bg-card shadow-sm px-4 py-3 border rounded-2xl text-muted-foreground">
          <Spinner />
          <span>Đang tải dữ liệu hồ sơ...</span>
        </div>
      </div>
    )
  }

  if (subjectsError || levelsError) {
    return (
      <div className="flex justify-center items-center mx-auto px-6 py-12 w-full max-w-4xl min-h-[70vh]">
        <div className="p-6 border border-dashed rounded-2xl max-w-lg text-center">
          <p className="font-semibold text-destructive text-lg">
            Không thể tải danh mục môn học hoặc cấp độ
          </p>
          <p className="mt-2 text-muted-foreground text-sm">
            Vui lòng tải lại trang để thử lại.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto px-4 md:px-8 py-8 md:py-10 w-full max-w-5xl">
      <div className="space-y-2 mb-6">
        <p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.2em]">
          Tutor profile
        </p>
        <h1 className="font-bold text-primary text-3xl">
          {isUpdateMode ? "Chỉnh sửa hồ sơ gia sư" : "Tạo hồ sơ gia sư"}
        </h1>
        <p className="max-w-2xl text-muted-foreground text-sm md:text-base">
          Hoàn tất hồ sơ để mở khóa toàn bộ chức năng của hệ thống và bắt đầu
          nhận lớp ngay khi có yêu cầu phù hợp.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="bg-card shadow-sm p-5 md:p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-4 mb-5">
            <div>
              <h2 className="font-semibold text-foreground text-lg">
                Thông tin cá nhân
              </h2>
            </div>
          </div>

          <div className="gap-6 grid lg:grid-cols-[280px_1fr]">
            <div className="flex flex-col items-center gap-4">
              <label
                htmlFor="avatarUrl"
                className="group relative cursor-pointer"
              >
                <div className="relative size-28">
                  {avatarLoading ? (
                    <div className="flex justify-center items-center bg-muted/30 border-2 border-muted-foreground/30 border-dashed rounded-full size-28">
                      <Loader2 className="size-6 text-muted-foreground animate-spin" />
                    </div>
                  ) : (
                    <Avatar className="rounded-full size-28">
                      <AvatarImage src={avatarPreview ?? user?.avatarUrl} />
                      <AvatarFallback className="rounded-full text-2xl">
                        {user?.fullName?.slice(0, 2)?.toUpperCase() || "TV"}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  {!avatarLoading && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-1 bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                      <Upload className="size-5 text-white" />
                      <span className="font-medium text-[10px] text-white">
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

              <div className="space-y-1 text-center">
                <FieldDescription>
                  Chỉ nhận 1 file PNG, tối đa 5MB.
                </FieldDescription>
                {avatarFile && (
                  <p className="text-muted-foreground text-sm">
                    Đã chọn: {avatarFile.name} (
                    {formatFileSize(avatarFile.size)})
                  </p>
                )}
                {avatarError && (
                  <p className="text-destructive text-sm">{avatarError}</p>
                )}
              </div>
            </div>

            <div className="gap-4 grid md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="fullName">Họ và tên</FieldLabel>
                <Input id="fullName" {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-destructive text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Số điện thoại</FieldLabel>
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-destructive text-sm">
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
                <div className="flex justify-between items-center gap-3 mt-1 text-muted-foreground text-sm">
                  <span>
                    {countWords(bioValue)} / {MAX_BIO_WORDS} từ
                  </span>
                </div>
                {errors.bio && (
                  <p className="text-destructive text-sm">
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
                  <p className="text-destructive text-sm">
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
                  <p className="text-destructive text-sm">
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
                  <p className="text-destructive text-sm">
                    {errors.location.message}
                  </p>
                )}
              </Field>
            </div>
          </div>
        </section>

        <section className="bg-card shadow-sm p-5 md:p-6 border rounded-3xl">
          <div className="mb-5">
            <h2 className="font-semibold text-foreground text-lg">
              Chuyên môn
            </h2>
            <p className="text-muted-foreground text-sm">
              Chọn môn học và cấp độ mà bạn có thể giảng dạy.
            </p>
          </div>

          <div className="gap-4 grid md:grid-cols-2">
            <Controller
              control={control}
              name="subjectIds"
              render={({ field }) => (
                <MultiSelectField
                  title="Môn học"
                  placeholder="e.g:Chọn môn học"
                  options={selectedSubjectOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.subjectIds?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="levelIds"
              render={({ field }) => (
                <MultiSelectField
                  title="Cấp độ"
                  placeholder="e.g:Chọn cấp độ"
                  options={selectedLevelOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.levelIds?.message}
                />
              )}
            />
          </div>
        </section>

        <section className="bg-card shadow-sm p-5 md:p-6 border rounded-3xl">
          <div className="mb-5">
            <h2 className="font-semibold text-foreground text-lg">Tài liệu</h2>
            <p className="text-muted-foreground text-sm">
              Tải lên CV, chứng chỉ hoặc tài liệu liên quan để tăng độ tin cậy.
            </p>
          </div>

          <div className="space-y-4">
            {existingCvUrls.length > 0 && (
              <Field>
                <FieldLabel>File đính kèm hiện có</FieldLabel>
                <div className="space-y-2">
                  {existingCvUrls.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className="flex justify-between items-center gap-3 px-3 py-2 border rounded-lg"
                    >
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary text-sm hover:underline underline-offset-4 truncate"
                      >
                        {`File đính kèm ${index + 1}`}
                      </a>
                      <Button
                        type="button"
                        size="icon-xs"
                        variant="ghost"
                        onClick={() => removeExistingCvUrl(index)}
                        aria-label={`Xoa file dinh kem ${index + 1}`}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Field>
            )}

            <FileField
              label={
                isUpdateMode ? "Tải thêm CV / Chứng chỉ mới" : "CV / Chứng chỉ"
              }
              description="Tối đa 5 file, mỗi file 5MB. Hỗ trợ PDF, JPG, PNG."
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              multiple
              files={cvFiles}
              onChange={resolveCvFiles}
              onRemove={removeNewCvFile}
              error={cvError}
            />
          </div>
        </section>

        {submitError && (
          <div className="bg-destructive/5 px-4 py-3 border border-destructive/20 rounded-2xl text-destructive text-sm">
            {submitError}
          </div>
        )}

        <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-3 bg-card shadow-sm p-5 md:p-6 border rounded-3xl">
          <div className="text-muted-foreground text-sm">
            Kiểm tra lại thông tin trước khi gửi. Sau khi tạo hồ sơ, bạn có thể
            sử dụng ứng dụng như bình thường.
          </div>
          <div className="flex md:flex-row flex-col gap-2 w-full md:w-auto">
            {isUpdateMode && onCancel ? (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                Hủy
              </Button>
            ) : null}
            <Button type="submit" className="min-w-40" disabled={isPending}>
              {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
              {isPending
                ? isUpdateMode
                  ? "Đang cập nhật..."
                  : "Đang tạo..."
                : isUpdateMode
                  ? "Lưu thay đổi"
                  : "Tạo hồ sơ"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
