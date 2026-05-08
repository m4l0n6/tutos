import { useQuery, useMutation } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type {
  ISubject,
  IDayOfWeek,
  ILevel,
  ITimeSlots,
} from "@/types/master-data"

export const classKeys = {
    subject: ["subject"] as const,
    dayOfWeek: ["dayOfWeek"] as const,
    level: ["level"] as const,
    timeSlots: ["timeSlots"] as const,
}

export function useGetSubjects() {
    return useQuery({
      queryKey: classKeys.subject,
      queryFn: () =>
        api
          .get("/master-data/subjects")
          .then((res) => res.data.data as ISubject[]),
      staleTime: 1000 * 60 * 60,
    })
}

export function useGetDaysOfWeek() {
    return useQuery({
      queryKey: classKeys.dayOfWeek,
      queryFn: () =>
        api
          .get("/master-data/days-of-week")
          .then((res) => res.data.data as IDayOfWeek[]),
      staleTime: 1000 * 60 * 60,
    })
}

export function useGetLevels() {
    return useQuery({
      queryKey: classKeys.level,
      queryFn: () =>
        api
          .get("/master-data/levels")
          .then((res) => res.data.data as ILevel[]),
      staleTime: 1000 * 60 * 60,
    })
}

export function useGetTimeSlots() {
    return useQuery({
      queryKey: classKeys.timeSlots,
      queryFn: () =>
        api
          .get("/master-data/timeslots")
          .then((res) => res.data.data as ITimeSlots[]),
      staleTime: 1000 * 60 * 60,
    })
}