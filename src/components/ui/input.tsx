import { cn } from "@/utils/cn";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-[#9EDAA0] h-9 w-full min-w0 rounded-md border bg-[#F6FFF5] px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:border-destructive aria-invalid:ring-destructive/20",
				// "disabled:pointer-events-none disabled:opacity-50",
				"disabled:pointer-events-none disabled:opacity-50 disabled:bg-[#f2f2f2] disabled:text-[#808080] disabled:border-[#ececec]",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
