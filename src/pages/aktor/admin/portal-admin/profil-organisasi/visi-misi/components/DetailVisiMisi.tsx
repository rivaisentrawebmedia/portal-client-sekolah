import type { VisiMisi } from "../model";
import { HtmlPreview } from "@/utils/safeHTML";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
} from "@/components/ui/empty";

export function DetailVisiMisi({
	data,
	loading,
}: {
	data: VisiMisi | undefined;
	loading: boolean;
}) {
	/* LOADING STATE */
	if (loading) {
		return (
			<div className="flex flex-col gap-6">
				{Array.from({ length: 3 }).map((_, idx) => (
					<div key={idx} className="flex flex-col gap-4">
						<div className="flex flex-col gap-4 md:flex-row md:items-center">
							<Skeleton className="h-4 w-24" />
							<hr className="border-t w-full" />
						</div>

						<div className="flex flex-col gap-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-5/6" />
							<Skeleton className="h-4 w-4/6" />
						</div>
					</div>
				))}
			</div>
		);
	}

	/* EMPTY STATE */
	if (!loading && !data) {
		return (
			<Empty className="border border-dashed">
				<EmptyHeader>
					<EmptyTitle>Visi, Misi & Tujuan belum tersedia</EmptyTitle>
					<EmptyDescription>
						Data visi, misi, dan tujuan belum diisi.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		);
	}

	return (
		<>
			<div className="flex flex-col gap-2">
				{/* VISI */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center">
					<p className="text-nowrap text-[#1E5916]">Visi</p>
					<hr className="border-t w-full" />
				</div>

				{data?.visi ? (
					<HtmlPreview html={data.visi} />
				) : (
					<p className="text-sm text-muted-foreground italic">
						Visi belum diisi
					</p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				{/* MISI */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center">
					<p className="text-nowrap text-[#1E5916]">Misi</p>
					<hr className="border-t w-full" />
				</div>

				{data?.misi ? (
					<HtmlPreview html={data.misi} />
				) : (
					<p className="text-sm text-muted-foreground italic">
						Misi belum diisi
					</p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				{/* TUJUAN */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center">
					<p className="text-nowrap text-[#1E5916]">Tujuan</p>
					<hr className="border-t w-full" />
				</div>

				{data?.tujuan ? (
					<HtmlPreview html={data.tujuan} />
				) : (
					<p className="text-sm text-muted-foreground italic">
						Tujuan belum diisi
					</p>
				)}
			</div>
		</>
	);
}
