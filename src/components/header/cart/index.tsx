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
import { useDialogOpen } from "@/hooks/use-dialog-open";
import { BackpackIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { CartItem } from "./cart-item";

export const Cart = () => {
	const { products, sheetIsOpen, setSheetIsOpen, emptyCart } =
		useContext(CartContext);

	const { dialogIsOpen, setDialogIsOpen, handleDialogOpenClick } =
		useDialogOpen();

	return (
		<>
			<Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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

					{products.length > 0 ? (
						<div className="mt-8 flex flex-col gap-8 flex-1">
							{products.map((product) => (
								<CartItem key={product.id} product={product} />
							))}
						</div>
					) : (
						<p className="font-medium text-center text-sm">
							Você não possui nenhum item na mochila.
						</p>
					)}

					<div className="mt-auto">
						<Button className="w-full">Finalizar compra</Button>
					</div>
				</SheetContent>
			</Sheet>

			<AlertDialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Tem certeza disso?</AlertDialogTitle>
						<AlertDialogDescription>
							Ao confirmar, sua mochila será limpa!
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={emptyCart}>Continuar</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
