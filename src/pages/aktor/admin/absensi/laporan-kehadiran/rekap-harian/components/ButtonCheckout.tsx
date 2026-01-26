import { useState } from "react";
import type { RekapHarian } from "../model";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export function ButtonCheckout({ rowData }: { rowData: RekapHarian }) {
	const [isShow, setIsShow] = useState(false);
	const [gambar, setGambar] = useState<string | null>(null);

	const openPreview = (src?: string) => {
		if (!src) return;
		setGambar(src);
		setIsShow(true);
	};

	return (
		<>
			<div className="flex flex-col gap-3">
				{/* Thumbnail */}
				<div className="flex gap-3">
					{[
						{
							src: rowData?.photo_checkout,
							label: "Check-out",
						},
						{
							src: rowData?.photo_checkout_lokasi,
							label: "Lokasi",
						},
					].map((item, idx) => (
						<button
							key={idx}
							type="button"
							onClick={() => openPreview(item.src)}
							className="group relative h-24 w-24 overflow-hidden rounded-lg border bg-muted"
						>
							{item.src ? (
								<img
									src={item.src}
									alt={item.label}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
									Tidak ada foto
								</div>
							)}

							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
							<span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
								{item.label}
							</span>
						</button>
					))}
				</div>

				{/* Info */}
				<div className="space-y-1 text-sm">
					<p className="font-medium text-foreground">
						Jam Masuk: {rowData?.checkout?.slice(0, 5) || "-"}
					</p>

					{rowData?.terlambat > 0 && (
						<p className="text-red-600 italic">
							Pulang cepat {rowData?.pulang_cepat} menit
						</p>
					)}

					<p className="text-muted-foreground">
						Lokasi: {rowData?.lokasi_checkout || "-"}
					</p>
				</div>
			</div>

			{/* Dialog Preview */}
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="max-w-3xl p-4">
					<DialogHeader>
						<DialogTitle>Bukti Check-out</DialogTitle>
					</DialogHeader>

					<div className="flex max-h-[70vh] items-center justify-center overflow-hidden rounded-lg bg-black">
						{gambar && (
							<img
								src={gambar}
								alt="Preview Checkout"
								className="max-h-[70vh] w-auto object-contain"
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
