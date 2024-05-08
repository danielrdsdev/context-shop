import { CartContext, ProductWithQuantity } from "@/components/providers/cart";
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
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useContext, useState } from "react";

type CartItemProps = {
	product: ProductWithQuantity;
};

export const CartItem = ({ product }: CartItemProps) => {
	const {
		decreaseProductQuantity,
		increaseProductQuantity,
		deleteItemFromCart,
	} = useContext(CartContext);
	const [dialogIsOpen, setDialogIsOpen] = useState(false);

	const handleDialogOpenClick = () => {
		setDialogIsOpen((prev) => !prev);
	};

	const handleDecreaseProductQuantity = () => {
		decreaseProductQuantity(product.id);
	};
	const handleIncreaseProductQuantity = () => {
		increaseProductQuantity(product.id);
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<div className="relative size-24 rounded-md overflow-hidden">
					<Image
						src={product.imageUrl[0]}
						alt={product.name}
						fill
						sizes="96px"
						quality={80}
						className="object-cover aspect-square"
					/>
				</div>

				<div className="flex-1 flex flex-col overflow-hidden">
					<h2 className="font-semibold truncate">{product.name}</h2>
					<p className="text-sm text-muted-foreground">
						{formattedCurrency(product.price)}
					</p>

					<div className="flex items-center">
						<Button
							size="icon"
							variant="outline"
							onClick={handleDecreaseProductQuantity}
							disabled={product.quantity === 1}
						>
							<MinusIcon className="size-4" />
							<span className="sr-only">Button plus</span>
						</Button>

						<span className="w-10 flex items-center justify-center">
							{product.quantity}
						</span>

						<Button
							size="icon"
							variant="outline"
							onClick={handleIncreaseProductQuantity}
						>
							<PlusIcon className="size-4" />
							<span className="sr-only">Button plus</span>
						</Button>
					</div>
				</div>

				<div className="ml-auto">
					<Button
						size="icon"
						variant="destructive"
						onClick={handleDialogOpenClick}
					>
						<TrashIcon className="size-5" />
					</Button>
				</div>
			</div>

			<AlertDialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Tem certeza que deseja continuar?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Ao confirmar, o item será removido da sua mochila.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={() => deleteItemFromCart(product.id)}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
