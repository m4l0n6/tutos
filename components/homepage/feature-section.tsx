import { cn } from "@/lib/utils";
import type React from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { LayoutDashboardIcon, TerminalIcon, ShieldCheckIcon, FileTextIcon } from "lucide-react";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};

export function FeatureSection() {
	return (
		<div className="flex flex-col justify-center gap-12 mx-auto px-4 md:px-8 py-4 w-full max-w-5xl">
			<div className="space-y-2 mx-auto max-w-2xl text-center">
				<h2 className="font-bold text-3xl md:text-5xl tracking-tight">
					Why Choose Our Platform?
				</h2>
				<p className="text-muted-foreground text-sm md:text-base leading-relaxed">
					Everything you need to find, manage, and succeed with your tutoring journey.
				</p>
			</div>

			<div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10">
				{features.map((feature) => (
					<FeatureCard feature={feature} key={feature.title} />
				))}
			</div>
		</div>
	);
}

function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn(
				"relative flex flex-col justify-between gap-6 bg-background shadow-xs px-6 pt-8 pb-6",
				// Gradient inspired by testimonials
				"dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
				className
			)}
			{...props}
		>
			{/* Extended Borders */}
			<div className="-left-px absolute -inset-y-4 bg-border w-px" />
			<div className="-right-px absolute -inset-y-4 bg-border w-px" />
			<div className="-top-px absolute -inset-x-4 bg-border h-px" />
			<div className="-right-4 -bottom-px -left-4 absolute bg-border h-px" />

			{/* Corner Decor */}
			<DecorIcon className="size-3.5" position="top-left" />

			<div
				className={cn(
					"z-10 relative flex justify-center items-center bg-muted/20 p-3 border rounded-lg w-fit",
					"[&_svg]:size-5 [&_svg]:stroke-[1.5] [&_svg]:text-foreground"
				)}
			>
				{feature.icon}
			</div>

			<div className="z-10 relative space-y-2">
				<h3 className="font-medium text-foreground text-base">
					{feature.title}
				</h3>
				<p className="text-muted-foreground text-xs leading-relaxed">
					{feature.description}
				</p>
			</div>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Find Qualified Tutors",
		icon: (
			<LayoutDashboardIcon
			/>
		),
		description: "Browse verified tutors with detailed profiles and ratings.",
	},
	{
		title: "Easy Scheduling",
		icon: (
			<TerminalIcon
			/>
		),
		description: "Book sessions and manage your calendar seamlessly.",
	},
	{
		title: "Secure Payments",
		icon: (
			<ShieldCheckIcon
			/>
		),
		description: "Safe and transparent payment processing for every session.",
	},
	{
		title: "Progress Tracking",
		icon: (
			<FileTextIcon
			/>
		),
		description: "Monitor learning progress with detailed reports and feedback.",
	},
];
