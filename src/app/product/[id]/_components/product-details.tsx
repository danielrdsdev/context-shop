"use client";
import { CartContext } from "@/components/providers/cart";
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
import { useDialogOpen } from "@/hooks/use-dialog-open";
import { useProductQuantity } from "@/hooks/use-product-quantity";
import { Product } from "@/types";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useContext, useState } from "react";

type ProductDetailsProps = {
	product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
	const { isDialogOpen, setIsDialogOpen, handleDialogOpenClick } =
		useDialogOpen();
	const [currentImage, setCurrentImage] = useState(product.imageUrl[0]);
	const { quantity, handleDecreaseQuantity, handleIncreaseQuantity } =
		useProductQuantity();
	const { addProductToCart } = useContext(CartContext);

	const handleChangeImage = (image: string) => {
		setCurrentImage(image);
	};

	const handleAddProductToCart = () => {
		addProductToCart({ ...product, quantity });
	};

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:bg-muted/40 lg:border lg:p-8 lg:rounded-lg">
				<div className="relative w-full h-[20rem] lg:h-[30rem] rounded-lg overflow-hidden">
					<Image
						src={currentImage as string}
						alt={product.name}
						fill
						sizes="500px"
						className="object-cover aspect-square"
					/>

					<div className="absolute bottom-3 flex w-full items-center justify-center">
						<div className="flex gap-4 rounded-lg p-2 lg:p-3 bg-background/80 backdrop-blur-sm">
							{product.imageUrl.map((imageUrl, i) => (
								<button
									key={`Imagem  ${i + 1}`}
									onClick={() => handleChangeImage(imageUrl)}
									type="button"
									data-active={imageUrl === currentImage}
									className="size-12 lg:size-16 rounded-lg overflow-hidden flex items-center justify-center bg-muted border-2 border-transparent data-[active=true]:border-primary"
								>
									<Image
										src={imageUrl}
										alt={`Imagem  ${i}`}
										width={80}
										height={80}
										sizes="80px"
										className="object-cover aspect-square w-full h-full"
									/>
								</button>
							))}
						</div>
					</div>
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
							onClick={handleDecreaseQuantity}
							disabled={quantity === 1}
						>
							<MinusIcon className="size-4" />
							<span className="sr-only">Button plus</span>
						</Button>

						<span className="w-10 flex items-center justify-center">
							{quantity}
						</span>

						<Button
							size="icon"
							variant="outline"
							onClick={handleIncreaseQuantity}
						>
							<PlusIcon className="size-4" />
							<span className="sr-only">Button plus</span>
						</Button>
					</div>
					<p className="text-xl lg:text-3xl font-semibold">
						{formattedCurrency(product.price)}
					</p>
					<Button className="w-full" onClick={handleDialogOpenClick}>
						Comprar produto
					</Button>
				</div>
			</div>

			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirmar compra do produto</AlertDialogTitle>
						<AlertDialogDescription>
							Ao confirmar, o produto irá para o seu carrinho.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={handleAddProductToCart}>
							Continuar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
