import { useState } from "react";
import type { Pengumuman } from "../model";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function SlideGambar({ data }: { data: Pengumuman }) {
	const images = data?.gambar ?? [];
	const [idx, setIdx] = useState(0);

	if (!images.length) {
		return (
			<div className="flex h-40 items-center justify-center rounded-md border border-dashed text-sm text-gray-400">
				Tidak ada gambar
			</div>
		);
	}

	const isFirst = idx === 0;
	const isLast = idx === images.length - 1;

	const current = images[idx];

	return (
		<div className="relative w-40 overflow-hidden rounded-md">
			<img
				src={current?.id}
				alt={current?.label || `Gambar ${idx + 1}`}
				className="h-30 w-full transition-all duration-300"
			/>

			{/* Navigation */}
			<div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
				<button
					type="button"
					disabled={isFirst}
					onClick={() => setIdx((prev) => Math.max(prev - 1, 0))}
					className="pointer-events-auto rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 disabled:opacity-40"
				>
					<FaChevronLeft />
				</button>

				<button
					type="button"
					disabled={isLast}
					onClick={() =>
						setIdx((prev) => Math.min(prev + 1, images.length - 1))
					}
					className="pointer-events-auto rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 disabled:opacity-40"
				>
					<FaChevronRight />
				</button>
			</div>

			{/* Indicator */}
			<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
				{images.map((_, i) => (
					<span
						key={i}
						className={`h-1.5 w-1.5 rounded-full transition ${
							i === idx ? "bg-white" : "bg-white/50"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
