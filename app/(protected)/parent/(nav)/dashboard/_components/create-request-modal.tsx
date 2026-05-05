'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperContent,
  StepperTitle,
} from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CreateRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  // Step 1
  studentName: string;
  grade: string;
  school: string;
  academicLevel: string;
  // Step 2
  subject: string;
  sessionsPerWeek: number;
  modality: string;
  availableTime: string;
  // Step 3
  tutorLevel: string;
  tutorGender: string;
  area: string;
  notes: string;
}

const STEPS = ['Thông tin học sinh', 'Yêu cầu học tập', 'Tiêu chuẩn gia sư'];

export function CreateRequestModal({ open, onOpenChange }: CreateRequestModalProps) {
  const [currentStep, setCurrentStep] = useState(STEPS[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    grade: 'Lớp 6',
    school: '',
    academicLevel: 'Khá',
    subject: '',
    sessionsPerWeek: 2,
    modality: 'offline',
    availableTime: '',
    tutorLevel: 'Sinh viên (Ưu tiên các trường TOP)',
    tutorGender: 'Không yêu cầu',
    area: '',
    notes: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sessionsPerWeek' ? parseInt(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
    // Sau 2 giây, đóng modal
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(STEPS[0]);
      onOpenChange(false);
    }, 2000);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setCurrentStep(STEPS[0]);
      setIsSubmitted(false);
    }
    onOpenChange(newOpen);
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col justify-center items-center py-12 text-center">
            <div className="bg-primary/10 mb-4 p-4 rounded-full">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h2 className="mb-2 font-bold text-h2 text-primary">Gửi yêu cầu thành công!</h2>
            <p className="text-body-md text-on-surface-variant">
              Chúng tôi sẽ xét duyệt yêu cầu của bạn và phản hồi trong vòng 24h.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-8 max-w-6xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-h1 text-primary">Gửi yêu cầu thuê gia sư</DialogTitle>
          <DialogDescription className="text-body-md text-on-surface-variant">
            Vui lòng điền đầy đủ thông tin để chúng tôi tìm kiếm gia sư phù hợp nhất cho con bạn.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Stepper value={currentStep} onValueChange={setCurrentStep} orientation="horizontal">
            {/* Indicators only in StepperList */}
            <StepperList className="flex gap-4 mb-8 pb-2 overflow-x-auto">
              {STEPS.map((step) => (
                <StepperItem key={step} value={step} className="flex items-center min-w-max">
                  <StepperTrigger className="flex flex-col items-center gap-2">
                    <StepperIndicator />
                    <StepperTitle className="text-sm whitespace-nowrap">{step}</StepperTitle>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>
              ))}
            </StepperList>

            {/* Content outside StepperList */}
            {/* Step 1: Thông tin học sinh */}
            <StepperContent value={STEPS[0]} className="mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName" className="font-label-sm">
                    Họ và tên học sinh
                  </Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    placeholder="Nhập họ tên đầy đủ"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="gap-4 grid grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="font-label-sm">
                      Lớp
                    </Label>
                    <Select value={formData.grade} onValueChange={(v) => handleSelectChange('grade', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i + 1} value={`Lớp ${i + 1}`}>
                            Lớp {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="academicLevel" className="font-label-sm">
                      Học lực hiện tại
                    </Label>
                    <Select
                      value={formData.academicLevel}
                      onValueChange={(v) => handleSelectChange('academicLevel', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yếu/Kém (Cần bồi dưỡng gấp)">
                          Yếu/Kém (Cần bồi dưỡng gấp)
                        </SelectItem>
                        <SelectItem value="Trung bình">Trung bình</SelectItem>
                        <SelectItem value="Khá">Khá</SelectItem>
                        <SelectItem value="Giỏi">Giỏi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school" className="font-label-sm">
                    Trường đang theo học
                  </Label>
                  <Input
                    id="school"
                    name="school"
                    placeholder="Tên trường tiểu học/THCS/THPT"
                    value={formData.school}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </StepperContent>

            {/* Step 2: Yêu cầu học tập */}
            <StepperContent value={STEPS[1]} className="mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-label-sm">
                    Môn học cần gia sư
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="VD: Toán, Ngữ Văn, Tiếng Anh..."
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="gap-4 grid grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sessionsPerWeek" className="font-label-sm">
                      Số buổi / tuần
                    </Label>
                    <Input
                      id="sessionsPerWeek"
                      name="sessionsPerWeek"
                      type="number"
                      min="1"
                      max="7"
                      value={formData.sessionsPerWeek}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-label-sm">Hình thức học</Label>
                    <RadioGroup value={formData.modality} onValueChange={(v) => handleSelectChange('modality', v)}>
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value="offline" id="offline" />
                        <Label htmlFor="offline" className="font-body-md cursor-pointer">
                          Tại nhà
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className="font-body-md cursor-pointer">
                          Trực tuyến
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableTime" className="font-label-sm">
                    Thời gian rảnh
                  </Label>
                  <Input
                    id="availableTime"
                    name="availableTime"
                    placeholder="VD: Tối thứ 2, sáng Chủ Nhật"
                    value={formData.availableTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </StepperContent>

            {/* Step 3: Tiêu chuẩn gia sư */}
            <StepperContent value={STEPS[2]} className="mt-6">
              <div className="space-y-4">
                <div className="gap-4 grid grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tutorLevel" className="font-label-sm">
                      Trình độ mong muốn
                    </Label>
                    <Select
                      value={formData.tutorLevel}
                      onValueChange={(v) => handleSelectChange('tutorLevel', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sinh viên (Ưu tiên các trường TOP)">
                          Sinh viên (Ưu tiên TOP)
                        </SelectItem>
                        <SelectItem value="Giáo viên (Đang đứng lớp)">
                          Giáo viên (Đang đứng lớp)
                        </SelectItem>
                        <SelectItem value="Bất kỳ">Bất kỳ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tutorGender" className="font-label-sm">
                      Giới tính gia sư
                    </Label>
                    <Select
                      value={formData.tutorGender}
                      onValueChange={(v) => handleSelectChange('tutorGender', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                        <SelectItem value="Không yêu cầu">Không yêu cầu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area" className="font-label-sm">
                    Khu vực (Quận/Huyện)
                  </Label>
                  <Input
                    id="area"
                    name="area"
                    placeholder="VD: Quận Cầu Giấy, Hà Nội"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="font-label-sm">
                    Ghi chú thêm
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Yêu cầu riêng về kinh nghiệm, tính cách gia sư..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>
            </StepperContent>
          </Stepper>

          {/* Navigation Buttons - outside Stepper, inside form */}
          <div className="flex justify-between gap-3 mt-6 pt-6 border-t">
            {currentStep !== STEPS[0] && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setCurrentStep(
                    STEPS[STEPS.indexOf(currentStep) - 1],
                  )
                }
              >
                Quay lại
              </Button>
            )}
            {currentStep !== STEPS[STEPS.length - 1] ? (
              <Button
                type="button"
                className="bg-primary hover:bg-primary/90 ml-auto"
                onClick={() =>
                  setCurrentStep(
                    STEPS[STEPS.indexOf(currentStep) + 1],
                  )
                }
              >
                Tiếp theo
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 ml-auto"
              >
                Gửi yêu cầu
                <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
