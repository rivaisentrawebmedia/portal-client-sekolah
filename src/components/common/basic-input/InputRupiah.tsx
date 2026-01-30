import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatRupiah, parseRupiah } from "@/utils/helpers";
import { useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

export function InputRupiah({
	form,
	name,
	className,
	disabled,
	placeholder,
	label,
	labelClassname,
	fx,
}: {
	form: UseFormReturn<any>;
	name: string;
	label?: ReactNode;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	labelClassname?: string;
	fx?: (value: number) => void;
}) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => {
				const [displayValue, setDisplayValue] = useState("");

				const formatted = useMemo(
					() => formatRupiah(field.value),
					[field.value],
				);

				useEffect(() => {
					setDisplayValue(formatted);
				}, [formatted]);

				return (
					<FormItem className={className}>
						{label && (
							<FormLabel
								className={labelClassname}
								style={{ fontWeight: "lighter", letterSpacing: "1px" }}
							>
								{label}
							</FormLabel>
						)}

						<FormControl>
							<div className="relative">
								{/* PREFIX */}
								<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
									Rp
								</span>

								<Input
									type="text"
									inputMode="numeric"
									className="pl-10 bg-white"
									disabled={disabled}
									placeholder={placeholder || "0"}
									value={displayValue}
									onChange={(e) => {
										const raw = e.target.value;
										setDisplayValue(raw);

										const numberValue = parseRupiah(raw);
										field.onChange(numberValue);
										fx?.(numberValue);
									}}
									onBlur={() => {
										setDisplayValue(formatRupiah(field.value));
									}}
								/>
							</div>
						</FormControl>

						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
