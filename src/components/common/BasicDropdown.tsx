import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ReactNode } from "react";

export type DropdownItem = {
	type?: "item" | "label" | "separator" | "group" | "sub";
	label?: string;
	onSelect?: () => void;
	shortcut?: string;
	disabled?: boolean;
	items?: DropdownItem[]; // untuk group & sub
};

type BasicDropdownProps = {
	trigger: ReactNode;
	items: DropdownItem[];
	align?: "start" | "center" | "end";
	width?: string;
};

export function BasicDropdown({
	trigger,
	items,
	align = "start",
	width = "w-56",
}: BasicDropdownProps) {
	const renderItems = (items: DropdownItem[]) =>
		items.map((item, idx) => {
			switch (item.type) {
				case "label":
					return <DropdownMenuLabel key={idx}>{item.label}</DropdownMenuLabel>;

				case "separator":
					return <DropdownMenuSeparator key={idx} />;

				case "group":
					return (
						<DropdownMenuGroup key={idx}>
							{item.items && renderItems(item.items)}
						</DropdownMenuGroup>
					);

				case "sub":
					return (
						<DropdownMenuSub key={idx}>
							<DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									{item.items && renderItems(item.items)}
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					);

				default:
					return (
						<DropdownMenuItem
							key={idx}
							onSelect={item.onSelect}
							disabled={item.disabled}
						>
							{item.label}
							{item.shortcut && (
								<DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
							)}
						</DropdownMenuItem>
					);
			}
		});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent className={width} align={align}>
				{renderItems(items)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
