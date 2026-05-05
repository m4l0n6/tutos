import { Button } from '@/components/ui/button';

interface ScheduleItem {
  time: string;
  subject: string;
  tutor: string;
  isActive: boolean;
}

interface WeeklyScheduleProps {
  currentDay: number;
  schedule: ScheduleItem[];
}

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const DAY_NUMBERS = [20, 21, 22, 23, 24, 25, 26];

export function WeeklySchedule({ currentDay, schedule }: WeeklyScheduleProps) {
  return (
    <section className="p-6 rounded-2xl glass-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-h2 text-on-surface">Lịch học tuần này</h2>
        <span className="text-primary material-symbols-outlined">calendar_month</span>
      </div>

      {/* Day selector grid */}
      <div className="gap-2 grid grid-cols-7 mb-8 text-center">
        {DAYS.map((day, idx) => (
          <div key={day} className="space-y-1">
            <p
              className={`text-[10px] uppercase ${
                idx + 1 === currentDay
                  ? 'text-primary font-bold'
                  : 'text-outline'
              }`}
            >
              {day}
            </p>
            <div
              className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-label-sm font-bold ${
                idx + 1 === currentDay
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : ''
              }`}
            >
              {DAY_NUMBERS[idx]}
            </div>
          </div>
        ))}
      </div>

      {/* Schedule timeline */}
      <div className="before:top-2 before:bottom-2 before:left-2 before:absolute relative space-y-6 before:bg-surface-container-highest before:w-0.5 before:content-['']">
        {schedule.map((item, idx) => (
          <div key={idx} className="relative pl-8">
            <div
              className={`absolute -left-1 top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
                item.isActive
                  ? 'bg-primary'
                  : 'bg-surface-dim'
              }`}
            ></div>
            <p
              className={`text-label-sm font-bold ${
                item.isActive ? 'text-primary' : 'text-outline-variant'
              }`}
            >
              {item.time}
            </p>
            <h4
              className={`font-h3 text-sm mt-1 ${
                item.isActive ? 'text-on-surface' : 'text-on-surface-variant'
              }`}
            >
              {item.subject}
            </h4>
            <p className="text-label-sm text-on-surface-variant italic">
              Gia sư: {item.tutor}
            </p>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="hover:bg-primary/5 mt-8 py-3 border-primary/20 rounded-xl w-full text-primary"
      >
        Toàn bộ lịch biểu
      </Button>
    </section>
  );
}
