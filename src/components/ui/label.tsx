import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { labelVariants } from "./label.variants";

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
	VariantProps<typeof labelVariants>;

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	LabelProps
>(({ className, variant, size, weight, ...props }, ref) => {
	return (
		<LabelPrimitive.Root
			ref={ref}
			data-slot="label"
			className={cn(labelVariants({ variant, size, weight }), className)}
			{...props}
		/>
	);
});

Label.displayName = "Label";

export { Label };
