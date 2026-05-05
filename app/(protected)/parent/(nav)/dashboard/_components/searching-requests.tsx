import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface SearchingRequest {
  id: string;
  subject: string;
  student: string;
  frequency: string;
  tutorAvatars: string[];
  additionalTutors: number;
}

interface SearchingRequestsProps {
  requests: SearchingRequest[];
}

export function SearchingRequests({ requests }: SearchingRequestsProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-h2 text-on-surface">Lớp học đang tìm gia sư</h2>
        <a className="font-label-sm text-primary hover:underline cursor-pointer">
          Xem tất cả
        </a>
      </div>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 p-5 rounded-xl glass-card"
          >
            <div className="flex flex-1 items-center gap-4">
              <div className="flex justify-center items-center bg-surface-container rounded-lg w-12 h-12 shrink-0">
                <span className="text-primary material-symbols-outlined">
                  calculate
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-h3 text-on-surface truncate">{request.subject}</h3>
                <p className="text-label-sm text-on-surface-variant truncate">
                  Học sinh: {request.student} • {request.frequency}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between md:justify-end items-center gap-6 w-full md:w-auto">
              <div className="flex items-center -space-x-2">
                {request.tutorAvatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    className="border-2 border-white rounded-full w-8 h-8 object-cover"
                    src={avatar}
                    alt="tutor"
                  />
                ))}
                {request.additionalTutors > 0 && (
                  <div className="flex justify-center items-center bg-primary-container border-2 border-white rounded-full w-8 h-8 font-bold text-[10px] text-white">
                    +{request.additionalTutors}
                  </div>
                )}
              </div>
              <Badge className="bg-primary-container/10 px-3 py-1 rounded-full text-primary">
                Đang tìm
              </Badge>
              <button className="p-2 text-outline hover:text-primary transition-colors shrink-0" title="Chi tiết">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
