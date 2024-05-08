export const formattedCurrency = (price: number) => {
	const formatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);

	return formatted;
};
