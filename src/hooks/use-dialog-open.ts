import { useState } from "react";

export const useDialogOpen = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDialogOpenClick = () => {
		setIsDialogOpen((prev) => !prev);
	};
	return {
		isDialogOpen,
		setIsDialogOpen,
		handleDialogOpenClick,
	};
};
