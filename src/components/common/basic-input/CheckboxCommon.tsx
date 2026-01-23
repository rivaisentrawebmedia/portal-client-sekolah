import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

export function CheckboxCommon({
	form,
	name,
	label,
	className,
	disabled,
	labelClassname,
}: {
	form: UseFormReturn<any>;
	name: string;
	label?: ReactNode;
	className?: string;
	disabled?: boolean;
	labelClassname?: string;
}) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					<FormControl>
						<div className="flex items-center gap-3">
							<Checkbox
								checked={!!field.value}
								onCheckedChange={field.onChange}
								disabled={disabled}
							/>
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
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
