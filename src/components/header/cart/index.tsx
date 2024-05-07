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
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { BackpackIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { CartItem } from "./cart-item";

export const Cart = () => {
	const { products, isOpen, setIsOpen, handleEmptyCard } =
		useContext(CartContext);

	const [dialogOpen, setDialogOpen] = useState(false);

	const handleDialogOpenClick = () => {
		setDialogOpen((prev) => !prev);
	};

	return (
		<>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="relative">
						<BackpackIcon className="size-5" />
						<span className="sr-only">Cart icon</span>
						{products.length > 0 && (
							<span className="absolute -left-2 -top-2 size-5 text-sm font-medium rounded-full bg-primary text-primary-foreground flex items-center justify-center">
								{products.length}
							</span>
						)}
					</Button>
				</SheetTrigger>
				<SheetContent className="flex flex-col h-full">
					<SheetHeader>
						<SheetTitle>Sua mochila ({products.length})</SheetTitle>
						{products.length > 0 && (
							<SheetDescription>
								<Button variant="link" onClick={handleDialogOpenClick}>
									Esvaziar mochila
								</Button>
							</SheetDescription>
						)}
					</SheetHeader>

					<div className="mt-8 flex flex-col gap-8 flex-1">
						{products.map((product) => (
							<CartItem key={product.id} product={product} />
						))}
					</div>

					<div className="mt-auto">
						<Button className="w-full">Finalizar compra</Button>
					</div>
				</SheetContent>
			</Sheet>

			<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Tem certeza disso?</AlertDialogTitle>
						<AlertDialogDescription>
							Ao confirmar, sua mochila será limpa!
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={handleEmptyCard}>
							Continuar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
