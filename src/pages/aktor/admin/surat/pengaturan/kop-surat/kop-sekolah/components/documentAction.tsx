import { AlertCircle, Download, Printer } from "lucide-react";

type DocumentActionsProps = {
	onOpen: () => void;
	onPrint: () => void;
	onDownload: () => void;
	disabled?: boolean;
};

export default function DocumentActions({
	onOpen,
	onPrint,
	onDownload,
	disabled = false,
}: DocumentActionsProps) {
	const baseButton =
		"flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors";

	const enabledStyle = "border-slate-300 text-slate-700 hover:bg-slate-100";

	const disabledStyle = "cursor-not-allowed border-slate-200 text-slate-400";

	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				onClick={onOpen}
				disabled={disabled}
				className={`${baseButton} ${disabled ? disabledStyle : enabledStyle}`}
			>
				<AlertCircle size={16} />
				Open
			</button>

			<button
				type="button"
				onClick={onPrint}
				disabled={disabled}
				className={`${baseButton} ${disabled ? disabledStyle : enabledStyle}`}
			>
				<Printer size={16} />
				Print
			</button>

			<button
				type="button"
				onClick={onDownload}
				disabled={disabled}
				className={`${baseButton} ${disabled ? disabledStyle : enabledStyle}`}
			>
				<Download size={16} />
				Download
			</button>
		</div>
	);
}
