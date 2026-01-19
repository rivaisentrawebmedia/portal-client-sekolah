import { X } from "lucide-react";

export function LinkModal({
	isOpen,
	url,
	onChangeUrl,
	onSaveLink,
	onRemoveLink,
	closeModal,
}: {
	isOpen: boolean;
	url: string;
	onChangeUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSaveLink: () => void;
	onRemoveLink: () => void;
	closeModal: () => void;
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
				<div className="mb-3 flex items-center justify-between">
					<h3 className="text-sm font-semibold">Edit Link</h3>
					<button type="button" onClick={closeModal}>
						<X className="h-4 w-4" />
					</button>
				</div>

				<input
					autoFocus
					value={url}
					onChange={onChangeUrl}
					placeholder="https://example.com"
					className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>

				<div className="mt-4 flex justify-between">
					<button
						type="button"
						onClick={onRemoveLink}
						className="text-sm text-red-600 hover:underline"
					>
						Hapus
					</button>

					<div className="flex gap-2">
						<button
							type="button"
							onClick={closeModal}
							className="rounded-md border px-3 py-1.5 text-sm"
						>
							Batal
						</button>
						<button
							type="button"
							onClick={onSaveLink}
							className="rounded-md bg-primary px-3 py-1.5 text-sm text-white"
						>
							Simpan
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
