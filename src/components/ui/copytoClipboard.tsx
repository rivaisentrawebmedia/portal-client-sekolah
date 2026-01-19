import clsx from "clsx";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type CopyTeksProps = {
	text: string;
	className?: string;
	showToast?: boolean;
};

export function CopyTeks({ text, className, showToast = true }: CopyTeksProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);

			if (showToast) {
				toast.success("Teks berhasil disalin");
			}

			setTimeout(() => setCopied(false), 1200);
		} catch {
			toast.error("Gagal menyalin teks");
		}
	};

	return (
		<div className="flex items-center gap-2 max-w-full">
			<p
				className={clsx(
					"truncate text-sm italic text-muted-foreground",
					className
				)}
				title={text}
			>
				{text}
			</p>

			<button
				type="button"
				onClick={handleCopy}
				aria-label="Salin teks"
				className={clsx(
					"flex h-6 w-6 items-center justify-center rounded-md border transition",
					"hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
				)}
			>
				{copied ? (
					<Check className="h-3 w-3 text-emerald-500" />
				) : (
					<Copy className="h-3 w-3" />
				)}
			</button>
		</div>
	);
}
