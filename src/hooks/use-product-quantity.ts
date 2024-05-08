import { useState } from "react";

export const useProductQuantity = () => {
	const [quantity, setQuantity] = useState(1);

	const handleIncreaseQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleDecreaseQuantity = () => {
		if (quantity === 1) {
			return;
		}

		setQuantity((prev) => prev - 1);
	};

	return {
		handleDecreaseQuantity,
		handleIncreaseQuantity,
		quantity,
	};
};
