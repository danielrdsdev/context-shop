import { socialLinks } from "@/config/nav";
import { Button } from "../ui/button";

export const Footer = () => {
	return (
		<footer className="py-8 space-y-4 flex items-center justify-center flex-col">
			<p className="text-muted-foreground text-sm">
				Made by{" "}
				<a
					href="https://danielrds.dev"
					target="_blank"
					rel="noreferrer noopener"
					className="text-primary font-medium hover:underline underline-offset-2"
				>
					Daniel Rodrigues
				</a>
			</p>

			<div className="flex items-center gap-2">
				{socialLinks.map((social) => (
					<Button key={social.href} asChild variant="ghost" size="icon">
						<a href={social.href} target="_blank" rel="noreferrer noopener">
							<social.icon className="size-5" />
							<span className="sr-only">Social Icon</span>
						</a>
					</Button>
				))}
			</div>
		</footer>
	);
};
