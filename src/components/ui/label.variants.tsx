import { cva } from "class-variance-authority";

export const labelVariants = cva(
	"flex items-center gap-2 leading-none font-medium select-none transition-colors \
   group-data-[disabled=true]:pointer-events-none \
   group-data-[disabled=true]:opacity-50 \
   peer-disabled:cursor-not-allowed \
   peer-disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "text-foreground",
				muted: "text-muted-foreground",
				error: "text-destructive",
				success: "text-emerald-600 dark:text-emerald-400",
				warning: "text-amber-600 dark:text-amber-400",
			},
			size: {
				sm: "text-xs",
				md: "text-sm",
				lg: "text-base",
			},
			weight: {
				normal: "font-normal",
				medium: "font-medium",
				semibold: "font-semibold",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
			weight: "medium",
		},
	}
);
