import { AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'success' | 'info';
  message: string;
  timestamp: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-h2 text-on-surface">Thông báo mới</h2>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="text-outline-variant w-5 h-5" />
        </Button>
      </div>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex gap-4 p-4 rounded-lg ${
              notif.type === 'success'
                ? 'bg-primary-container/5 border-l-4 border-primary'
                : 'bg-surface-container-low'
            }`}
          >
            {notif.type === 'success' ? (
              <CheckCircle2 className="mt-1 w-5 h-5 text-primary shrink-0" />
            ) : (
              <AlertCircle className="mt-1 w-5 h-5 text-tertiary shrink-0" />
            )}
            <div>
              <p className="text-body-md text-on-surface">{notif.message}</p>
              <p className="mt-1 text-outline text-label-sm">{notif.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
