import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

const Notification = () => {
    return (
      <Button variant="ghost" size="icon" className="p-2">
        <Bell className="size-4" />
      </Button>
    )
}

export default Notification