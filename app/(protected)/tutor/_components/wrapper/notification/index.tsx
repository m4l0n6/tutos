import NotificationPopover from "@/components/common/notification/index"
import { useGetMyNotifications } from "@/hooks/queries/useNotificationQuery"

const Notification = () => {
  const { data = [] } = useGetMyNotifications()
  return <NotificationPopover data={data} />
}

export default Notification
