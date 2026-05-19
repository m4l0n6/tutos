import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/axios"

export type PaymentType = "DEPOSIT" | "BALANCE"

interface CreatePaymentPayload {
  classId: string
  type: PaymentType
  method?: string
}

interface CreatePaymentResponse {
  paymentUrl: string
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: (payload: CreatePaymentPayload) => {
      const body = {
        ...payload,
        method: payload.method ?? "vnpay",
      }

      return api
        .post<{ data: CreatePaymentResponse }>("/payments/create", body)
        .then((res) => res.data.data)
    },
    onSuccess: ({ paymentUrl }) => {
      window.open(paymentUrl, "_blank")
    },
  })
}
