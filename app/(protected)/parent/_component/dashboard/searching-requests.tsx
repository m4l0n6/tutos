import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { ChevronRight, BookOpen } from 'lucide-react';

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
        <h2 className="font-h2 text-on-surface">Classes Looking for Tutors</h2>
        <a className="font-label-sm text-primary hover:underline cursor-pointer">
          Xem tất cả
        </a>
      </div>
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="flex md:flex-row flex-col justify-between md:items-center gap-4">
            <div className="flex flex-1 items-center gap-4 min-w-0">
              <div className="flex justify-center items-center bg-surface-container rounded-lg w-12 h-12 shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-h3 text-on-surface truncate">{request.subject}</h3>
                <p className="text-label-sm text-on-surface-variant truncate">
                  Học sinh: {request.student} • {request.frequency}
                </p>
              </div>
            </div>

            <div className="flex justify-end items-center gap-3 md:gap-4 shrink-0">
              <AvatarGroup size={32} max={3} renderOverflow={(count) => (
                <div className="flex justify-center items-center bg-primary-container rounded-full w-8 h-8 font-bold text-[10px] text-white">
                  +{count}
                </div>
              )}>
                {request.tutorAvatars.map((avatar, idx) => (
                  <Avatar key={idx}>
                    <AvatarImage src={avatar} alt="tutor" />
                  </Avatar>
                ))}
              </AvatarGroup>
              <Badge className="bg-primary-container/10 px-3 py-1 rounded-full text-primary whitespace-nowrap">
                Searching
              </Badge>
              <button className="p-2 text-outline hover:text-primary transition-colors shrink-0" title="Chi tiết">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
