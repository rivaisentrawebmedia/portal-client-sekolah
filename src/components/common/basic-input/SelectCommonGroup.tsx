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
import type { SelectOption } from "./SelectCommon";

/* ================= TYPES ================= */

export type SelectGroupOption<T = string | number> = {
	label: string;
	options: SelectOption<T>[];
};

type SelectOptions<T = string | number> =
	| SelectOption<T>
	| SelectGroupOption<T>;

interface SelectCommonProps<T = string | number> {
	form: UseFormReturn<any>;
	name: string;

	label?: ReactNode;
	options: SelectOptions<T>[];

	isMulti?: boolean;
	isLoading?: boolean;
	disabled?: boolean;
	placeholder?: string;

	className?: string;
	labelClassName?: string;
	selectClassName?: string;

	fx?: (value: T | T[]) => void;
}

/* ================= COMPONENT ================= */

export function SelectCommonGroup<T = string | number>({
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
}: SelectCommonProps<T>) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => {
				/**
				 * 🔹 Flatten options (untuk cocokkan value RHF)
				 */
				const flatOptions: SelectOption<T>[] = options.flatMap((opt) =>
					"options" in opt ? opt.options : opt,
				);

				/**
				 * 🔹 Mapping RHF value → react-select value
				 */
				const selectedValue = isMulti
					? flatOptions.filter((opt) =>
							Array.isArray(field.value)
								? field.value.includes(opt.value)
								: false,
						)
					: (flatOptions.find((opt) => opt.value === field.value) ?? null);

				return (
					<FormItem className={className}>
						{label && <FormLabel className={labelClassName}>{label}</FormLabel>}

						<FormControl>
							<Select
								className={selectClassName}
								classNamePrefix="react-select"
								options={options}
								isMulti={isMulti}
								isLoading={isLoading}
								isDisabled={disabled}
								placeholder={placeholder}
								value={selectedValue}
								onChange={(val) => {
									let newValue: any;

									if (isMulti) {
										newValue = Array.isArray(val)
											? val.map((v) => v.value)
											: [];
									} else {
										newValue = (val as SelectOption<T> | null)?.value ?? "";
									}

									field.onChange(newValue);
									fx?.(newValue);
								}}
								onBlur={field.onBlur}
								menuPlacement="auto"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
