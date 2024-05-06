"use client";
import { useSearch } from "@/hooks/use-search";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";

export const Search = ({ placeholder }: { placeholder: string }) => {
	const { handleSearch, defaultValue } = useSearch();

	return (
		<div className="relative flex items-center">
			<MagnifyingGlassIcon className="absolute left-4 size-5" />
			<Input
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={defaultValue}
				className="pl-12"
			/>
		</div>
	);
};
