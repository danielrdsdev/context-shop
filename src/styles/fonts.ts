import { Anton, Inter } from "next/font/google";

export const anton = Anton({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-anton",
});

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
