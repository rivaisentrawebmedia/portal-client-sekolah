import Select, {
	type OptionProps,
	type SingleValueProps,
	type SingleValue,
	type MultiValue,
	components,
} from "react-select";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

export type PegawaiOption = {
	value: string; // id pegawai
	label: string; // nama
	photo?: string | null;
	jabatan?: string | null;
};

interface SelectPegawaiCommonProps {
	form: UseFormReturn<any>;
	name: string;

	label?: ReactNode;
	options: PegawaiOption[];

	isMulti?: boolean;
	isLoading?: boolean;
	disabled?: boolean;

	placeholder?: string;

	className?: string;
	labelClassName?: string;
	selectClassName?: string;

	fx?: (value: string | string[]) => void;
	isFixed?: boolean;
}

export function SelectPegawaiCommon({
	form,
	name,
	label,
	options,
	isMulti = false,
	isLoading = false,
	disabled = false,
	placeholder = "Pilih Pegawai",
	className,
	labelClassName,
	selectClassName,
	fx,
	isFixed,
}: SelectPegawaiCommonProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => {
				const selectedValue = isMulti
					? options.filter((opt) =>
							Array.isArray(field.value)
								? field.value.includes(opt.value)
								: false,
						)
					: (options.find((opt) => opt.value === field.value) ?? null);

				const handleChange = (
					val: SingleValue<PegawaiOption> | MultiValue<PegawaiOption>,
				) => {
					if (isMulti) {
						const values = (val as MultiValue<PegawaiOption>).map(
							(v) => v.value,
						);
						field.onChange(values);
						fx?.(values);
						return;
					}

					const value = (val as SingleValue<PegawaiOption>)?.value ?? "";
					field.onChange(value);
					fx?.(value);
				};

				return (
					<FormItem className={className}>
						{label && (
							<FormLabel
								className={labelClassName}
								style={{ fontWeight: "lighter", letterSpacing: "1px" }}
							>
								{label}
							</FormLabel>
						)}

						<FormControl>
							<Select<PegawaiOption, boolean>
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
								components={{
									Option: PegawaiOptionItem,
									SingleValue: PegawaiSingleValue,
								}}
								onChange={handleChange}
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

export function PegawaiSingleValue(props: SingleValueProps<PegawaiOption>) {
	const { data } = props;

	return (
		<components.SingleValue {...props}>
			<div className="flex items-center gap-2">
				<img
					src={data.photo || "/avatar-placeholder.png"}
					alt={data.label}
					className="h-6 w-6 rounded-full object-cover"
				/>
				<span className="text-sm">{data.label}</span>
			</div>
		</components.SingleValue>
	);
}

export function PegawaiOptionItem(props: OptionProps<PegawaiOption, boolean>) {
	const { data } = props;

	return (
		<components.Option {...props}>
			<div className="flex items-center gap-3">
				<img
					src={data.photo || "/avatar-placeholder.png"}
					alt={data.label}
					className="h-8 w-8 rounded-full object-cover"
				/>

				<div className="flex flex-col">
					<span className="text-sm font-medium">{data.label}</span>
					{data.jabatan && (
						<span className="text-xs text-gray-500">{data.jabatan}</span>
					)}
				</div>
			</div>
		</components.Option>
	);
}
