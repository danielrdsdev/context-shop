export const formattedCurrency = (price: string) => {
	const formatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(Number(price));

	return formatted;
};
