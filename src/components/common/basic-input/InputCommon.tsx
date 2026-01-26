import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, Timer } from "lucide-react";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

export function InputCommon({
	form,
	name,
	className,
	disabled,
	placeholder,
	type = "text",
	label,
	labelClassname,
	fx,
}: {
	form: UseFormReturn<any>;
	name: string;
	label?: ReactNode;
	placeholder?: string;
	className?: string;
	type?: React.HTMLInputTypeAttribute | undefined;
	disabled?: boolean;
	labelClassname?: string;
	fx?: (value: any) => void;
}) {
	return (
		<>
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
							<div className="relative flex-1	">
								<Input
									className="flex-1 bg-white"
									type={type}
									disabled={disabled}
									placeholder={placeholder || "Masukkan teks"}
									{...field}
									onChange={(e) => {
										field.onChange(e);
										fx?.(e.target.value);
									}}
								/>
								{type === "date" && (
									<Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
								)}

								{type === "time" && (
									<Timer className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
								)}
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
