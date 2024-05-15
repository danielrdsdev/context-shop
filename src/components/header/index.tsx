import { Link } from "next-view-transitions";
import { Cart } from "./cart";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
	return (
		<header className="h-20 border-b sticky top-0 z-50 bg-background/80 backdrop-blur">
			<div className="h-full flex items-center justify-between container">
				<Link href="/" className="font-anton text-2xl">
					Context <span className="text-primary">Shop</span>
				</Link>

				<div className="flex items-center gap-4">
					<ModeToggle />
					<Cart />
				</div>
			</div>
		</header>
	);
};
