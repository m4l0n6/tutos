"use client"

import * as React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { MClass } from "@/types/classes"
import {
  getClassApplicationErrorMessage,
  useCreateClassApplication,
} from "@/hooks/queries/useClassApplicationQuery"

interface ClassApplyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classData: MClass
  onSuccess?: () => void
}

export function ClassApplyModal({
  open,
  onOpenChange,
  classData,
  onSuccess,
}: ClassApplyModalProps) {
  const [coverLetter, setCoverLetter] = useState("")
  const [proposedRate, setProposedRate] = useState<number | "">("")
  const [coverError, setCoverError] = useState<string | null>(null)
  const [rateError, setRateError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { mutateAsync, isPending } = useCreateClassApplication()

  const countWords = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return 0
    return trimmed.split(/\s+/).length
  }

  const maxWords = 150

  const handleClose = (newOpen: boolean) => {
    if (!newOpen) {
      setCoverLetter("")
      setProposedRate("")
      setCoverError(null)
      setRateError(null)
      setSubmitError(null)
    }
    onOpenChange(newOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCoverError(null)
    setRateError(null)
    setSubmitError(null)

    const words = countWords(coverLetter)
    if (!coverLetter.trim()) {
      setCoverError("Vui lòng nhập Cover Letter")
    }

    if (words > maxWords) {
      setCoverError(`Cover letter tối đa ${maxWords} từ. Hiện có ${words} từ.`)
    }

    const rate = Number(proposedRate)
    if (proposedRate === "" || Number.isNaN(rate)) {
      setRateError("Vui lòng nhập Proposed Rate")
    } else if (rate <= 0) {
      setRateError("Proposed Rate phải lớn hơn 0")
    }

    if (
      coverLetter.trim() === "" ||
      words > maxWords ||
      rate <= 0 ||
      Number.isNaN(rate)
    ) {
      return
    }

    const payload = {
      classId: classData.id,
      coverLetter: coverLetter.trim(),
      proposedRate: rate,
    }

    try {
      await mutateAsync(payload)
      toast.success("Gửi đơn ứng tuyển thành công!")
      handleClose(false)
      onSuccess?.()
    } catch (err) {
      console.error(err)
      const message = getClassApplicationErrorMessage(err)
      setSubmitError(message)
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ứng tuyển lớp: {classData.name}</DialogTitle>
          <DialogDescription className="text-body-md text-on-surface-variant">
            {classData.category?.name} · {classData.level?.name}
          </DialogDescription>
        </DialogHeader>

        <form id="class-apply-form" onSubmit={handleSubmit} className="mt-4">
          <Field>
            <FieldLabel htmlFor="coverLetter">Cover Letter</FieldLabel>
            <Textarea
              id="coverLetter"
              placeholder="Viết vài dòng giới thiệu..."
              value={coverLetter}
              onChange={(e) => {
                setCoverLetter(e.target.value)
                if (coverError) setCoverError(null)
                if (submitError) setSubmitError(null)
              }}
              className="resize-none"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              {countWords(coverLetter)} / {maxWords} từ
            </p>
            {coverError && (
              <p className="mt-1 text-sm text-destructive">{coverError}</p>
            )}
          </Field>

          <Field className="mt-4">
            <FieldLabel htmlFor="proposedRate">
              Proposed Rate (VND/h)
            </FieldLabel>
            <Input
              id="proposedRate"
              type="number"
              min={0}
              placeholder="Nhập mức đề xuất"
              value={proposedRate}
              onChange={(e) => {
                setProposedRate(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
                if (rateError) setRateError(null)
                if (submitError) setSubmitError(null)
              }}
            />
            {rateError && (
              <p className="mt-1 text-sm text-destructive">{rateError}</p>
            )}
          </Field>

          {submitError && (
            <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {submitError}
            </p>
          )}

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Hủy
              </Button>
            </DialogClose>

            <div className="ml-auto">
              <Button
                type="submit"
                form="class-apply-form"
                disabled={isPending}
              >
                {isPending ? <Spinner /> : null}
                {isPending ? "Đang gửi..." : "Gửi đơn"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ClassApplyModal
