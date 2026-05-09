import { ICategory } from "./category"

export type ISubject = {
    id: string
    categoryId: string
    name: string
    createdAt: string
    updatedAt: string
    category: ICategory
}

export type TSubjectClassRequest = {
  id: string
  catalogId: string
  name: string
  createAt: string
  updateAt: string
  category: ICategory
}

export type TSubjectClass = {
    id: string
    name: string
}
