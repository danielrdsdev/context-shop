import { ProductId, ProductWithQuantity } from "@/components/providers/cart";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const useCart = () => {
	const [products, setProducts] = useState<ProductWithQuantity[]>([]);
	const [sheetIsOpen, setSheetIsOpen] = useState(false);

	useEffect(() => {
		try {
			setProducts(JSON.parse(localStorage.getItem("get-products") || "[]"));
		} catch (error) {
			console.error("Failed to parse products from localStorage", error);
		}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem("get-products", JSON.stringify(products));
		} catch (error) {
			console.error("Failed to save products to localStorage", error);
		}
	}, [products]);

	const subtotal = useMemo(() => {
		return products.reduce((acc, product) => {
			return acc + product.price * product.quantity;
		}, 0);
	}, [products]);

	const addProductToCart = useCallback(
		(product: ProductWithQuantity) => {
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
		},
		[products],
	);

	const decreaseProductQuantity = useCallback((productId: ProductId) => {
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
	}, []);

	const increaseProductQuantity = useCallback((productId: ProductId) => {
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
	}, []);

	const deleteItemFromCart = useCallback((productId: ProductId) => {
		setProducts((prev) => prev.filter((product) => product.id !== productId));

		toast.success("Produto removido com sucesso!");
	}, []);

	const emptyCart = useCallback(() => {
		setProducts([]);

		toast.success("Mochila esvaziada com sucesso!");
	}, []);

	return {
		products,
		addProductToCart,
		sheetIsOpen,
		setSheetIsOpen,
		subtotal,
		decreaseProductQuantity,
		increaseProductQuantity,
		deleteItemFromCart,
		emptyCart,
	};
};
