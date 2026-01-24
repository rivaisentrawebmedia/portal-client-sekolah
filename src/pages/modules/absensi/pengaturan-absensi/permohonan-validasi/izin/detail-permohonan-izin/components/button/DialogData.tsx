import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";

export function DialogData({
	disabled,
	isShow,
	onSubmit,
	setIsShow,
	content,
	description,
	label,
	status,
	alasan,
}: {
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (
		status: "draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan",
		alasan_ditolak: string | undefined,
	) => void;
	disabled: boolean;
	isShow: boolean;
	label: string;
	description: ReactNode;
	content?: ReactNode;
	status: "draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan";
	alasan?: string;
}) {
	return (
		<Dialog open={isShow} onOpenChange={setIsShow}>
			<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>{label}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{content}

				<DialogFooter className="flex gap-2 flex-row justify-end">
					<Button
						type="button"
						variant="outline"
						disabled={disabled}
						onClick={() => setIsShow(false)}
					>
						Batal
					</Button>
					<Button
						type="button"
						variant={
							status === "ditolak" || status === "dibatalkan"
								? "destructive"
								: "default"
						}
						onClick={() => {
							onSubmit(status, alasan || undefined);
						}}
						disabled={disabled}
					>
						{label}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
