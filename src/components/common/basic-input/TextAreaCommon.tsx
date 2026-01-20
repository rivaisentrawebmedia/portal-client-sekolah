import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

export function TextareaCommon({
	form,
	name,
	label,
	placeholder,
	className,
	disabled,
	labelClassname,
	rows = 4,
}: {
	form: UseFormReturn<any>;
	name: string;
	label?: ReactNode;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	labelClassname?: string;
	rows?: number;
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
						<Textarea
							{...field}
							className="flex-1"
							rows={rows}
							disabled={disabled}
							placeholder={placeholder || "Masukkan teks"}
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
