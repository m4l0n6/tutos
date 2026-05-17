"use client"

import { Stat, StatIndicator, StatLabel, StatValue } from "@/components/ui/stat"
import { Clock, GraduationCap, Wallet } from "lucide-react"

export const TutorStats = () => {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <Stat>
        <StatIndicator variant="icon" color="success">
          <GraduationCap className="size-4" />
        </StatIndicator>
        <StatLabel>Lớp đang dạy</StatLabel>
        <StatValue>03</StatValue>
      </Stat>

      <Stat>
        <StatIndicator variant="icon" color="warning">
          <Clock className="size-4" />
        </StatIndicator>
        <StatLabel>Yêu cầu chờ duyệt</StatLabel>
        <StatValue>02</StatValue>
      </Stat>

      <Stat>
        <StatIndicator variant="icon" color="info">
          <Wallet className="size-4" />
        </StatIndicator>
        <StatLabel>Tổng tiền nhận tháng này dự kiến</StatLabel>
        <StatValue>4.200k VNĐ</StatValue>
      </Stat>
      <Stat>
        <StatIndicator variant="icon" color="info">
          <Wallet className="size-4" />
        </StatIndicator>
        <StatLabel>Tổng tiền nhận tháng này dự kiến</StatLabel>
        <StatValue>4.200k VNĐ</StatValue>
      </Stat>
    </section>
  )
}
