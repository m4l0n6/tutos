import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type {
  IDayOfWeek,
} from "@/types/master-data"

import type { ISubject } from "@/types/subject"
import type { ICategory } from "@/types/category"
import type { ILevel } from "@/types/level"

export const classKeys = {
    categories: ["categories"] as const,
    subject: (categoryId?: string) => [
      "subject",
      ...(categoryId ? [categoryId] : []),
    ] as const,
    level: (categoryId?: string) => [
      "level",
      ...(categoryId ? [categoryId] : []),
    ] as const,
    dayOfWeek: ["dayOfWeek"] as const,
}

export function useGetCategories() {
    return useQuery({
      queryKey: classKeys.categories,
      queryFn: () =>
        api
          .get("/master-data/categories")
          .then((res) => res.data.data as ICategory[]),
      staleTime: 1000 * 60 * 60,
    })
}

export function useGetSubjects(categoryId?: string) {
    return useQuery({
      queryKey: classKeys.subject(categoryId),
      queryFn: () => {
        const params = categoryId ? { categoryId } : {}
        return api
          .get("/master-data/subjects", { params })
          .then((res) => res.data.data as ISubject[])
      },
      staleTime: 1000 * 60 * 60,
      enabled: !!categoryId,
    })
}

export function useGetLevels(categoryId?: string) {
  return useQuery({
    queryKey: classKeys.level(categoryId),
    queryFn: () => {
      const params = categoryId ? { categoryId } : {}
      return api
        .get("/master-data/levels", { params })
        .then((res) => res.data.data as ILevel[])
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!categoryId,
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


