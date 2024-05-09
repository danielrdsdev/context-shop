"use client";
import { ThemeProvider } from "next-themes";
import { CartContextProvider } from "./cart";

export const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<CartContextProvider>{children}</CartContextProvider>
		</ThemeProvider>
	);
};
