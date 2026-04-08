"use client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons";

type FooterLink = {
	title: string;
	href: string;
	icon?: ReactNode;
};

type FooterSection = {
	label: string;
	links: FooterLink[];
};

const footerLinks: FooterSection[] = [
	{
		label: "Product",
		links: [
			{ title: "Features", href: "#" },
			{ title: "Pricing", href: "#" },
			{ title: "Testimonials", href: "#" },
			{ title: "Integration", href: "#" },
		],
	},
	{
		label: "Company",
		links: [
			{ title: "FAQs", href: "#" },
			{ title: "About Us", href: "#" },
			{ title: "Privacy Policy", href: "#" },
			{ title: "T&S", href: "#" },
		],
	},
	{
		label: "Resources",
		links: [
			{ title: "Blog", href: "#" },
			{ title: "Changelog", href: "#" },
			{ title: "Brand", href: "#" },
			{ title: "Help", href: "#" },
		],
	},
	{
		label: "Social Links",
		links: [
			{
				title: "Facebook",
				href: "#",
				icon: (
					<FacebookIcon
					/>
				),
			},
			{
				title: "Instagram",
				href: "#",
				icon: (
					<InstagramIcon
					/>
				),
			},
			{
				title: "Youtube",
				href: "#",
				icon: (
					<YoutubeIcon
					/>
				),
			},
			{
				title: "LinkedIn",
				href: "#",
				icon: (
					<LinkedinIcon />
				),
			},
		],
	},
];

export function Footer() {
	return (
		<footer
			className={cn(
				"relative flex flex-col justify-center items-center mx-auto px-6 md:px-8 border-t rounded-t-4xl md:rounded-t-6xl w-full max-w-5xl",
				"dark:bg-[radial-gradient(35%_128px_at_50%_0%,--theme(--color-foreground/.1),transparent)]"
			)}
		>
			<div className="top-0 right-1/2 left-1/2 absolute bg-foreground/20 rounded-full w-1/3 h-px -translate-x-1/2 -translate-y-1/2 blur" />

			<div className="gap-8 lg:gap-8 grid lg:grid-cols-3 py-6 md:py-8 w-full">
				<AnimatedContainer className="space-y-4">
					<Logo />
					<p className="mt-8 md:mt-0 text-muted-foreground text-sm">
						Choose the best tutors
					</p>
				</AnimatedContainer>

				<div className="gap-8 grid grid-cols-2 md:grid-cols-4 lg:col-span-2 mt-10 lg:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs">{section.label}</h3>
								<ul className="space-y-2 mt-4 text-muted-foreground text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												className="inline-flex items-center [&_svg]:me-1 [&_svg]:size-4 hover:text-foreground duration-250"
												href={link.href}
												key={`${section.label}-${link.title}`}
											>
												{link.icon}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
			<div className="bg-linear-to-r via-border w-full h-px" />
			<div className="flex justify-center items-center py-4 w-full">
				<p className="text-muted-foreground text-sm">
					&copy; {new Date().getFullYear()} Tutos, All rights reserved
				</p>
			</div>
		</footer>
	);
}

function AnimatedContainer({
	className,
	delay = 0.1,
	children,
}: {
	delay?: number;
	className?: string;
	children: ReactNode;
}) {
	return (
		<div
			className={className}
		>
			{children}
		</div>
	);
}
