"use client";
import { Product } from "@/types";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export interface ProductWithQuantity extends Product {
	quantity: number;
}

type ICartContextProvider = {
	products: ProductWithQuantity[];
	sheetIsOpen: boolean;
	subtotal: number;
	setSheetIsOpen: (value: boolean) => void;
	addProductToCart: (value: ProductWithQuantity) => void;
	decreaseProductQuantity: (productId: string) => void;
	increaseProductQuantity: (productId: string) => void;
	deleteItemFromCart: (productId: string) => void;
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
	const [products, setProducts] = useState<ProductWithQuantity[]>([]);
	const [sheetIsOpen, setSheetIsOpen] = useState(false);

	useEffect(() => {
		setProducts(JSON.parse(localStorage.getItem("get-products") || "[]"));
	}, []);

	useEffect(() => {
		localStorage.setItem("get-products", JSON.stringify(products));
	}, [products]);

	const subtotal = useMemo(() => {
		return products.reduce((acc, product) => {
			return acc + Number(product.price) * product.quantity;
		}, 0);
	}, [products]);

	const addProductToCart = (product: ProductWithQuantity) => {
		const alreadyExists = products.some(
			(cartProduct) => cartProduct.id === product.id,
		);

		setSheetIsOpen((prev) => !prev);

		toast.success("Item adicionado com sucesso!");

		if (alreadyExists) {
			setProducts((prev) =>
				prev.map((cartProduct) => {
					if (cartProduct.id === product.id) {
						return {
							...cartProduct,
							quantity: cartProduct.quantity + product.quantity,
						};
					}

					return cartProduct;
				}),
			);

			return;
		}

		setProducts((prev) => [...prev, product]);
	};

	const decreaseProductQuantity = (productId: string) => {
		setProducts((prev) =>
			prev
				.map((cartProduct) => {
					if (cartProduct.id === productId) {
						return {
							...cartProduct,
							quantity: cartProduct.quantity - 1,
						};
					}

					return cartProduct;
				})
				.filter((cartProduct) => cartProduct.quantity > 0),
		);
	};

	const increaseProductQuantity = (productId: string) => {
		setProducts((prev) =>
			prev.map((cartProduct) => {
				if (cartProduct.id === productId) {
					return {
						...cartProduct,
						quantity: cartProduct.quantity + 1,
					};
				}

				return cartProduct;
			}),
		);
	};

	const deleteItemFromCart = (productId: string) => {
		setProducts((prev) => prev.filter((product) => product.id !== productId));

		toast.success("Produto removido com sucesso!");
	};

	const emptyCart = () => {
		setProducts([]);

		toast.success("Mochila esvaziada com sucesso!");
	};

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
