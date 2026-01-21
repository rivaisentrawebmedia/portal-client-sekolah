import Select from "react-select";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

export type SelectOption<T = string | number> = {
	label: string;
	value: T;
};

interface SelectCommonProps {
	form: UseFormReturn<any>;
	name: string;

	label?: ReactNode;
	options: SelectOption[];

	isMulti?: boolean;
	isLoading?: boolean;
	disabled?: boolean;

	placeholder?: string;

	className?: string;
	labelClassName?: string;
	selectClassName?: string;
	fx?: (value: any) => void;

	isFixed?: boolean;
}

export function SelectCommon({
	form,
	name,
	label,
	options,
	isMulti = false,
	isLoading = false,
	disabled = false,
	placeholder = "Pilih data",
	className,
	labelClassName,
	selectClassName,
	fx,
	isFixed,
}: SelectCommonProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => {
				/**
				 * 🔹 Mapping value dari RHF ke react-select
				 */
				const selectedValue = isMulti
					? options.filter((opt) =>
							Array.isArray(field.value)
								? field.value.includes(opt.value)
								: false,
						)
					: (options.find((opt) => opt.value === field.value) ?? null);

				return (
					<FormItem className={className}>
						{label && (
							<FormLabel
								className={labelClassName}
								style={{
									fontWeight: "lighter",
									letterSpacing: "1px",
								}}
							>
								{label}
							</FormLabel>
						)}

						<FormControl>
							<Select
								className={selectClassName}
								classNamePrefix="react-select"
								options={options}
								isMulti={isMulti}
								isLoading={isLoading}
								isDisabled={disabled}
								placeholder={placeholder}
								menuPlacement="auto"
								menuPosition={isFixed ? "fixed" : "absolute"}
								value={selectedValue}
								onChange={(val) => {
									let newValue;
									if (isMulti) {
										newValue = Array.isArray(val)
											? val.map((v) => v.value)
											: [];
									} else {
										newValue = (val as SelectOption | null)?.value ?? "";
									}

									field.onChange(newValue);

									if (fx) fx(newValue);
								}}
								onBlur={field.onBlur}
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
