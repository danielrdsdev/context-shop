import { useState } from "react";

export const useDialogOpen = () => {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);

	const handleDialogOpenClick = () => {
		setDialogIsOpen((prev) => !prev);
	};
	return {
		dialogIsOpen,
		setDialogIsOpen,
		handleDialogOpenClick,
	};
};
