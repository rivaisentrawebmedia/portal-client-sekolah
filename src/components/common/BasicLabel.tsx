import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BasicLabelProps {
	label: ReactNode;
	value: ReactNode;
	isRow?: boolean;
	className?: string;
	labelClassName?: string;
	valueClassName?: string;
}

export function BasicLabel({
	label,
	value,
	isRow = false,
	className,
	labelClassName,
	valueClassName,
}: BasicLabelProps) {
	return (
		<div
			className={cn(
				"flex gap-1",
				isRow ? "flex-col md:flex-row md:items-start md:gap-4" : "flex-col",
				className
			)}
		>
			<p className={cn("text-sm text-[#888] md:min-w-[140px]", labelClassName)}>
				{label}
			</p>

			<div className={cn("text-sm text-gray-900 break-words", valueClassName)}>
				{value}
			</div>
		</div>
	);
}
