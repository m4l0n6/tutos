import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export function PromotionalBanner() {
  return (
    <section className="relative bg-primary bg-primary-container p-6 rounded-2xl overflow-hidden text-white">
      <div className="z-10 relative">
        <h3 className="mb-2 font-h2 text-xl">Ưu đãi hè 2024</h3>
        <p className="mb-4 text-label-sm text-on-primary-container/80">
          Giảm ngay 15% học phí khi đăng ký khóa ôn luyện thi đại học cấp tốc.
        </p>
        <Button
          size="sm"
          className="bg-white hover:bg-slate-50 shadow-lg px-4 py-2 rounded-lg font-bold text-primary text-xs"
        >
          Khám phá ngay
        </Button>
      </div>
      <Star className="-right-5 -bottom-5 absolute w-30 h-30 text-white/10" />
    </section>
  );
}
