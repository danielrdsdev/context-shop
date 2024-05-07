import { CartContext } from "@/components/providers/cart";
import { Product } from "@/types";
import { useContext, useState } from "react";

export const useProduct = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [amount, setAmount] = useState(1);
	const { handleAddToCart } = useContext(CartContext);

	const handleIncreaseProduct = () => {
		setAmount((prev) => prev + 1);
	};

	const handleDecreaseProduct = () => {
		if (amount === 1) {
			return;
		}

		setAmount((prev) => prev - 1);
	};

	const handleOpenClick = () => {
		setIsOpen((prev) => !prev);
	};

	const handleAddToCartClick = (product: Product) => {
		handleAddToCart(product);
	};
	return {
		handleAddToCartClick,
		handleOpenClick,
		handleDecreaseProduct,
		handleIncreaseProduct,
		isOpen,
		setIsOpen,
		amount,
	};
};
