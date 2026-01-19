import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchInputProps {
	placeholder?: string;
	debounceMs?: number;
	pageKey?: string;
	searchKey?: string;
}

export function SearchInput({
	placeholder = "Cari...",
	debounceMs = 500,
	pageKey = "page",
	searchKey = "search",
}: SearchInputProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [value, setValue] = useState(searchParams.get(searchKey) || "");

	useEffect(() => {
		const handler = setTimeout(() => {
			const params = new URLSearchParams(searchParams);

			if (value.trim()) {
				params.set(searchKey, value.trim());
			} else {
				params.delete(searchKey);
			}

			// 🔑 Reset page ke 1 setiap search berubah
			params.set(pageKey, "1");

			setSearchParams(params, { replace: true });
		}, debounceMs);

		return () => clearTimeout(handler);
	}, [value]);

	return (
		<div className="relative w-full">
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				className="pr-10"
			/>
			<FaSearch
				size={14}
				className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
			/>
		</div>
	);
}
