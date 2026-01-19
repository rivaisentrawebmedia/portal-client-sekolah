import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { cn } from "@/utils/cn";

/* ---------------- Panel Group ---------------- */

interface ResizablePanelGroupProps
	extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
	autoSaveId?: string;
	onLayout?: (sizes: number[]) => void;
}

function ResizablePanelGroup({
	className,
	...props
}: ResizablePanelGroupProps) {
	return (
		<Group
			data-slot="resizable-panel-group"
			className={cn(
				"flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
				className
			)}
			{...props}
		/>
	);
}

/* ---------------- Panel ---------------- */

type ResizablePanelProps = React.ComponentProps<typeof Panel>;

function ResizablePanel(props: ResizablePanelProps) {
	return <Panel data-slot="resizable-panel" {...props} />;
}

/* ---------------- Handle ---------------- */

interface ResizableHandleProps extends React.ComponentProps<typeof Separator> {
	withHandle?: boolean;
}

function ResizableHandle({
	withHandle,
	className,
	...props
}: ResizableHandleProps) {
	return (
		<Separator
			data-slot="resizable-handle"
			className={cn(
				"bg-border relative flex w-px items-center justify-center",
				"data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
				className
			)}
			{...props}
		>
			{withHandle && (
				<div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
					<GripVerticalIcon className="size-2.5" />
				</div>
			)}
		</Separator>
	);
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
