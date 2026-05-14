
export type NotificationType = 
'CLASS_REQUEST_CREATED' 
| 'PAYMENT_COMPLETED' 
| 'PAYMENT_REFUND_REQUESTED' 
| 'CLASS_TRIAL_SELECTED' 
| 'CLASS_TRIAL_REJECTED' 
| 'CLASS_MATCH_CONFIRMED' 
| 'MATCH_PARTIAL_CONFIRM' 
| 'TUTOR_PROFILE_VERIFIED'

export type MNotification = {
    id: string
    userId: string
    title: string
    body: string
    isRead: boolean
    type: NotificationType
    metadata: TMetadata
    createdAt: string
}

export type TMetadata = {
    classId: string
    tutorId: string
}