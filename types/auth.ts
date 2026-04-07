export type User = {
    id: string
    email: string
    fullName: string
    phone: string
    isActive: boolean
    role: "PARENT" | "TUTOR" | "ADMIN"
    avatarUrl: string
    createdAt: string
}
