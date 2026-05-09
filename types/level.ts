import { ICategory } from "./category"

export type ILevel = {
  id: string
  categoryId: string
  name: string
  createdAt: string
  updatedAt: string
  category: ICategory
}

export type TLevelClassRequest = {
  id: string
  catalogId: string
  name: string
  createAt: string
  updateAt: string
  category: ICategory
}

export type TLevelClass = {
  id: string
  name: string
}
