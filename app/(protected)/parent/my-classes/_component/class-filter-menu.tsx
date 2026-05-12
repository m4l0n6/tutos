import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, ListFilter } from "lucide-react"

export const ClassFilter = () => {
    return (
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <Input placeholder="Search classes..." className="w-52"/>
          <Button variant="outline" className="border-dashed font-normal">
            <PlusCircle className="w-4 h-4" />
            Status
          </Button>
        </div>
        <Button variant="outline">
          <ListFilter className="w-4 h-4" />
          Filter
        </Button>
      </div>
    )
}