import { formattedCurrency } from "@/helpers/format-currency";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

type ProductCardProps = {
	product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<div className="bg-muted/50 border rounded-md p-6 space-y-4">
			<div className="relative w-full h-[15rem] rounded-md overflow-hidden">
				<Image
					src={product.imageUrl[0]}
					alt={product.name}
					fill
					quality={100}
					sizes="(max-width: 648px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover aspect-square"
				/>
			</div>

			<div className="space-y-2">
				<div>
					<h2 className="text-lg font-semibold tracking-tight">
						{product.name}
					</h2>
					<p className="text-muted-foreground text-sm line-clamp-2">
						{product.description}
					</p>
				</div>

				<p>{formattedCurrency(product.price)}</p>
			</div>

			<Button className="w-full" asChild>
				<Link href={`/product/${product.id}`}>Ver produto</Link>
			</Button>
		</div>
	);
};
