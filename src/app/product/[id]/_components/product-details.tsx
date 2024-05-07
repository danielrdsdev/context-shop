"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { formattedCurrency } from "@/helpers/format-currency";
import { Product } from "@/types";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useProduct } from "../_hooks/use-product";

type ProductDetailsProps = {
	product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
	const {
		handleAddToCartClick,
		handleDecreaseProduct,
		handleIncreaseProduct,
		handleOpenClick,
		isOpen,
		setIsOpen,
		amount,
	} = useProduct();

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:bg-muted/40 lg:border lg:p-8 lg:rounded-lg">
				<div className="relative w-full h-[20rem] lg:h-[30rem] rounded-lg overflow-hidden">
					<Image
						src={product.imageUrl}
						alt={product.name}
						fill
						sizes="500px"
						className="object-cover aspect-square"
					/>
				</div>
				<div className="lg:py-16 space-y-8">
					<div className="space-y-1.5">
						<h1 className="font-semibold tracking-tight text-xl lg:text-3xl">
							{product.name}
						</h1>
						<p className="text-muted-foreground text-sm lg:text-base">
							{product.description}
						</p>
					</div>

					<div className="flex items-center">
						<Button
							size="icon"
							variant="outline"
							onClick={handleDecreaseProduct}
							disabled={amount === 1}
						>
							<MinusIcon className="size-4" />
							<span className="sr-only">Button plus</span>
						</Button>

						<span className="w-10 flex items-center justify-center">
							{amount}
						</span>

						<Button
							size="icon"
							variant="outline"
							onClick={handleIncreaseProduct}
						>
							<PlusIcon className="size-4" />
							<span className="sr-only">Button plus</span>
						</Button>
					</div>
					<p className="text-xl lg:text-3xl font-semibold">
						{formattedCurrency(product.price)}
					</p>
					<Button className="w-full" onClick={handleOpenClick}>
						Comprar produto
					</Button>
				</div>
			</div>

			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirmar compra do produto</AlertDialogTitle>
						<AlertDialogDescription>
							Ao confirmar, o produto irá para o seu carrinho.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={() => handleAddToCartClick(product)}>
							Continuar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
