import { BasicLabel } from "@/components/common/BasicLabel";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProfilOrganisasi } from "../model";

export function DetailKontak({
	data,
	loading,
}: {
	data: ProfilOrganisasi | undefined;
	loading: boolean;
}) {
	return (
		<>
			{/* HEADER */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center">
				<p className="text-nowrap text-[#1E5916]">Kontak</p>
				<hr className="border-t w-full" />
			</div>

			{/* LOADING STATE */}
			{loading ? (
				<div className="flex flex-col gap-4">
					{Array.from({ length: 4 }).map((_, idx) => (
						<div key={idx} className="flex flex-col gap-2 md:flex-row">
							<Skeleton className="h-4 w-full md:w-1/5" />
							<Skeleton className="h-4 w-full md:flex-1" />
						</div>
					))}
				</div>
			) : (
				<>
					{/* DATA STATE */}
					<BasicLabel
						label="Telepon"
						value={data?.no_telp || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
					<BasicLabel
						label="Email"
						value={data?.email || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
					<BasicLabel
						label="URL Portal Sekolah"
						value={data?.url_portal_sekolah || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
					<BasicLabel
						label="URL Website"
						value={data?.url_web || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
				</>
			)}
		</>
	);
}
