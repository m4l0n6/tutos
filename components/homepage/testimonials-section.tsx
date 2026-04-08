import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";

type Testimonial = {
	quote: string;
	image: string;
	name: string;
	role: string;
	company?: string;
};

const testimonials: Testimonial[] = [
	{
		quote:
			"I found my mathematics tutor through this platform. The quality of instruction and personalized approach helped me improve my grades significantly.",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
		name: "Thảo Vy",
		role: "Student",
		company: "Đại học Bách Khoa HN",
	},
	{
		quote:
			"The scheduling system is incredibly convenient. My son has improved significantly in English within just a few months.",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
		name: "Ngọc Anh",
		role: "Parent",
		company: "Hà Nội",
	},

	{
		quote:
			"Exceptional platform for finding the right tutor. The verification process ensures quality and trust. Highly recommended!",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper",
		name: "Minh Quân",
		role: "Student",
		company: "THPT Lê Hồng Phong",
	},
	{
		quote:
			"As a tutor, this platform has made it so easy to manage my schedule and connect with serious students. The payment system is transparent and reliable.",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Stella",
		name: "Linh Phương",
		role: "Tutor",
		company: "STEM Expert",
	},
	{
		quote:
			"My daughter's confidence in Physics has completely changed thanks to her fantastic tutor. The progress tracking feature is amazing.",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
		name: "Hồng Hà",
		role: "Parent",
		company: "Hải Phòng",
	},
	{
		quote:
			"I've been teaching on this platform for over a year. The student base is engaged, and the infrastructure supports quality education.",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
		name: "Hải Yến",
		role: "Tutor",
		company: "English Specialist",
	},
	{
		quote:
			"Finally found a tutor who explains concepts in a way I understand. The before and after in my test scores speaks for itself!",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mason",
		name: "Tuấn Anh",
		role: "Student",
		company: "THPT Chuyên Hà Nội",
	},
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
	return (
		<section className="relative py-10">
			<div className="mx-auto max-w-5xl">
				<div className="flex flex-col justify-center items-center gap-4 mx-auto max-w-sm">
					<h2 className="font-bold text-3xl lg:text-4xl tracking-tighter">
						What our users say
					</h2>
					<p className="text-muted-foreground text-sm text-center">
						See what our customers have to say about us.
					</p>
				</div>

				<div
					className={cn(
						"flex justify-center gap-6 mt-10 max-h-160 overflow-hidden",
						"mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
					)}
				>
					<InfiniteSlider direction="vertical" speed={30} speedOnHover={15}>
						{firstColumn.map((testimonial) => (
							<TestimonialsCard
								key={testimonial.name}
								testimonial={testimonial}
							/>
						))}
					</InfiniteSlider>
					<InfiniteSlider
						className="hidden md:block"
						direction="vertical"
						speed={50}
						speedOnHover={25}
					>
						{secondColumn.map((testimonial) => (
							<TestimonialsCard
								key={testimonial.name}
								testimonial={testimonial}
							/>
						))}
					</InfiniteSlider>
					<InfiniteSlider
						className="hidden lg:block"
						direction="vertical"
						speed={35}
						speedOnHover={17}
					>
						{thirdColumn.map((testimonial) => (
							<TestimonialsCard
								key={testimonial.name}
								testimonial={testimonial}
							/>
						))}
					</InfiniteSlider>
				</div>
			</div>
		</section>
	);
}

function TestimonialsCard({
	testimonial,
	className,
	...props
}: React.ComponentProps<"figure"> & {
	testimonial: Testimonial;
}) {
	const { quote, image, name, role, company } = testimonial;
	return (
		<figure
			className={cn(
				"bg-card dark:bg-card/20 shadow-foreground/10 shadow-lg p-8 border rounded-3xl w-full max-w-xs",
				className
			)}
			{...props}
		>
			<blockquote>{quote}</blockquote>
			<figcaption className="flex items-center gap-2 mt-5">
				<Avatar className="rounded-full size-8">
					<AvatarImage alt={`${name}'s profile picture`} src={image} />
					<AvatarFallback>{name.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<cite className="font-medium not-italic leading-5 tracking-tight">
						{name}
					</cite>
					<span className="text-muted-foreground text-sm leading-5 tracking-tight">
						{role} {company && `, ${company}`}
					</span>
				</div>
			</figcaption>
		</figure>
	);
}
