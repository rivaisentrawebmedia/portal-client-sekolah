import clsx from "clsx";

export function LoadingSpinner({ className }: { className?: string }) {
	return (
		<div
			className={clsx(
				"flex flex-col items-center justify-center py-4",
				className,
			)}
		>
			<div className="mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
			<p className="text-sm text-gray-500">Memuat data…</p>
		</div>
	);
}
