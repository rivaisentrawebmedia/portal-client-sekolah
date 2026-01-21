import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

type RadioOption = {
	label: ReactNode;
	value: string | boolean;
};

export function RadioCommon({
	form,
	name,
	label,
	options,
	disabled,
	className,
	labelClassname,
}: {
	form: UseFormReturn<any>;
	name: string;
	label?: ReactNode;
	options: RadioOption[];
	disabled?: boolean;
	className?: string;
	labelClassname?: string;
}) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					{label && (
						<FormLabel
							className={labelClassname}
							style={{
								fontWeight: "lighter",
								letterSpacing: "1px",
							}}
						>
							{label}
						</FormLabel>
					)}

					<FormControl>
						<RadioGroup
							disabled={disabled}
							className="flex gap-2"
							value={String(field.value)}
							onValueChange={(val) => {
								// ⬇️ convert balik ke boolean kalau perlu
								const parsed =
									val === "true" ? true : val === "false" ? false : val;

								field.onChange(parsed);
							}}
						>
							{options.map((opt, idx) => (
								<FormItem
									key={idx}
									className="flex items-center gap-2 space-y-0"
								>
									<FormControl>
										<RadioGroupItem
											value={String(opt.value)}
											disabled={disabled}
										/>
									</FormControl>
									<FormLabel className="cursor-pointer">{opt.label}</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
