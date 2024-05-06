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
import { Product } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useContext, useState } from "react";

type CartItemProps = {
	product: Product;
};

export const CartItem = ({ product }: CartItemProps) => {
	const { handleDeleteItemToCart } = useContext(CartContext);
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenClick = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<div className="relative size-24 rounded-md overflow-hidden">
					<Image
						src={product.imageUrl}
						alt={product.name}
						fill
						sizes="96px"
						quality={80}
						className="object-cover aspect-square"
					/>
				</div>

				<div className="flex-1">
					<h2 className="font-semibold">{product.name}</h2>
					<p className="text-sm text-muted-foreground">
						{formattedCurrency(product.price)}
					</p>
				</div>

				<div className="ml-auto">
					<Button size="icon" variant="destructive" onClick={handleOpenClick}>
						<TrashIcon className="size-5" />
					</Button>
				</div>
			</div>

			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
						<AlertDialogAction
							onClick={() => handleDeleteItemToCart(product.id)}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
