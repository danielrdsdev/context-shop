"use client";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types";
import { createContext } from "react";

export interface ProductWithQuantity extends Product {
	quantity: number;
}

export type ProductId = string;

type ICartContextProvider = {
	products: ProductWithQuantity[];
	sheetIsOpen: boolean;
	subtotal: number;
	setSheetIsOpen: (value: boolean) => void;
	addProductToCart: (value: ProductWithQuantity) => void;
	decreaseProductQuantity: (productId: ProductId) => void;
	increaseProductQuantity: (productId: ProductId) => void;
	deleteItemFromCart: (productId: ProductId) => void;
	emptyCart: () => void;
};

export const CartContext = createContext<ICartContextProvider>({
	products: [],
	sheetIsOpen: false,
	subtotal: 0,
	setSheetIsOpen: () => {},
	addProductToCart: () => {},
	decreaseProductQuantity: () => {},
	increaseProductQuantity: () => {},
	deleteItemFromCart: () => {},
	emptyCart: () => {},
});

export const CartContextProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const {
		products,
		addProductToCart,
		sheetIsOpen,
		setSheetIsOpen,
		subtotal,
		decreaseProductQuantity,
		increaseProductQuantity,
		deleteItemFromCart,
		emptyCart,
	} = useCart();

	return (
		<CartContext.Provider
			value={{
				products,
				addProductToCart,
				sheetIsOpen,
				setSheetIsOpen,
				subtotal,
				decreaseProductQuantity,
				increaseProductQuantity,
				deleteItemFromCart,
				emptyCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
