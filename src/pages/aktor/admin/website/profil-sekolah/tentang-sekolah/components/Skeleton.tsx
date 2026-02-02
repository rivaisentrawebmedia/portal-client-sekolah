import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function TentangSekolahSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<Skeleton className="h-7 w-48" />
				<Skeleton className="h-9 w-32" />
			</div>

			{/* Identitas */}
			<div className="flex items-center gap-2">
				<Skeleton className="h-4 w-40" />
				<Separator />
			</div>

			<div className="flex flex-col gap-4 md:flex-row">
				{/* Foto */}
				<Skeleton className="w-[240px] h-[320px] rounded-md" />

				{/* Labels */}
				<div className="flex flex-col gap-3 flex-1">
					{Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className="flex flex-col md:flex-row gap-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-4 w-full md:w-2/3" />
						</div>
					))}
				</div>
			</div>

			{/* Tujuan / Sasaran / Hasil */}
			{Array.from({ length: 3 }).map((_, i) => (
				<div key={i} className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Skeleton className="h-4 w-32" />
						<Separator />
					</div>

					<div className="flex flex-col gap-4 md:flex-row">
						<Skeleton className="w-[240px] h-[320px] rounded-md" />
						<div className="flex flex-col gap-2 flex-1">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-5/6" />
							<Skeleton className="h-4 w-4/6" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
