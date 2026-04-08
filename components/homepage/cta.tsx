import { Button } from "@/components/ui/button";
import { CreditCardIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
	return (
		<div className="relative flex flex-col justify-between gap-y-6 bg-card dark:bg-card/50 shadow-sm mx-auto mb-16 px-4 py-8 md:py-10 border rounded-4xl w-full max-w-3xl">
			<div className="space-y-2">
				<h2 className="font-semibold text-lg md:text-2xl text-center tracking-tight">
				Ready to Transform Your Learning?
			</h2>
			<p className="text-muted-foreground text-sm md:text-base text-center text-balance">
				Join thousands of students achieving their academic goals. No credit card required.
				</p>
			</div>
			<div className="flex justify-center items-center gap-2">
				<Link href="/login">
					<Button className="shadow" variant="secondary">
					Schedule Demo
				</Button>
				</Link>
				<Link href="/signup">
					<Button className="shadow">
					Get Started {" "}
						<ArrowRightIcon data-icon="inline-end" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
