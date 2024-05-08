"use client";
import { Product } from "@/types";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type ICartContextProvider = {
	products: Product[];
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	handleAddToCart: (value: Product) => void;
	handleDeleteItemToCart: (id: string) => void;
	handleEmptyCard: () => void;
};

export const CartContext = createContext<ICartContextProvider>({
	products: [],
	isOpen: false,
	setIsOpen: () => {},
	handleAddToCart: () => {},
	handleDeleteItemToCart: () => {},
	handleEmptyCard: () => {},
});

export const CartContextProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setProducts(JSON.parse(localStorage.getItem("get-products") || "[]"));
	}, []);

	useEffect(() => {
		localStorage.setItem("get-products", JSON.stringify(products));
	}, [products]);

	const handleAddToCart = (value: Product) => {
		const alreadyExists = products.some((product) => product.id === value.id);

		if (alreadyExists) {
			toast.error("Produto já existe no seu carrinho!");
			return;
		}

		setProducts((prev) => [...prev, value]);

		setIsOpen((prev) => !prev);

		toast.success("Item adicionado com sucesso!");
	};

	const handleDeleteItemToCart = (id: string) => {
		setProducts((prev) => prev.filter((product) => product.id !== id));

		toast.success("Produto removido com sucesso!");
	};

	const handleEmptyCard = () => {
		setProducts([]);

		toast.success("Mochila esvaziada com sucesso!");
	};

	return (
		<CartContext.Provider
			value={{
				products,
				handleAddToCart,
				isOpen,
				setIsOpen,
				handleDeleteItemToCart,
				handleEmptyCard,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
