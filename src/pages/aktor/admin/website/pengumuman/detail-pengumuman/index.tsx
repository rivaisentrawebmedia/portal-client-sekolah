import { ArrowBack } from "@/components/common/ArrowBack";
import { useGetPengumumanByID } from "../list-pengumuman/controller";
import { convertFromSnakeCase } from "@/utils/helpers";
import {
	ButtonEdit,
	ButtonKembaliKeDraft,
	ButtonPublishPengumuman,
	SlideGambar,
} from "./components";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import { BasicLabel } from "@/components/common/BasicLabel";
import { HtmlPreview } from "@/utils/safeHTML";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";

export default function DetailPengumumanPage() {
	const [params] = useSearchParams();
	const { data, loading } = useGetPengumumanByID();

	if (loading) {
		return <DetailPengumumanSkeleton />;
	}
	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-4">
					<ArrowBack
						link={`/admin/website/pengumuman?${params?.toString()}`}
						title="Detail Pengumuman"
						background="#F5F9FF"
						border="#F5F9FF"
						text="#276CCD"
					/>
					<div className="flex gap-2 flex-1 md:justify-end md:flex-row flex-col md:items-center">
						<p>
							Status:{" "}
							<span className="text-[#888]">
								{convertFromSnakeCase(data?.status || "")}
							</span>
						</p>
						<div className="flex items-center gap-2">
							<ButtonEdit id={data?.id} />
							{data?.status === "draft" ? (
								<ButtonPublishPengumuman rowData={data} />
							) : (
								<ButtonKembaliKeDraft rowData={data} />
							)}
						</div>
					</div>
				</div>
				<p className="text-[#888]">
					Terakhir diedit:{" "}
					{data?.updated_at
						? dayjs(data?.updated_at).locale("id").format("DD-MM-YYYY HH:mm:ss")
						: ""}
				</p>
				<Separator />
				<BasicLabel
					label="Judul"
					value={data?.judul || "-"}
					labelClassName="text-sm"
					valueClassName="font-medium text-lg"
				/>
				{(data?.gambar || [])?.length > 0 && (
					<div className="flex items-center justify-center">
						<SlideGambar data={data} />
					</div>
				)}
				<BasicLabel
					label="Tanggal"
					className="flex flex-col gap-2 md:flex-row"
					value={
						data?.created_at
							? dayjs(data?.created_at)
									.locale("id")
									.format("DD-MM-YYYY HH:mm:ss")
							: ""
					}
				/>
				<BasicLabel
					label="Kategori"
					className="flex flex-col gap-2 md:flex-row"
					value={data?.kategori_pengumuman || ""}
				/>
				<BasicLabel
					label="Tag"
					className="flex flex-col gap-2 md:flex-row"
					value={data?.tag?.map((item) => item?.label).join(", ") || ""}
				/>
				<div className="flex flex-col gap-2">
					<p className="text-[#888] text-sm">Isi Pengumuman</p>
					<HtmlPreview html={data?.isi || ""} />
				</div>
			</div>
		</>
	);
}

function DetailPengumumanSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			{/* Header */}
			<div className="flex flex-col gap-2 md:flex-row md:justify-between">
				<Skeleton className="h-6 w-40" />
				<div className="flex gap-2">
					<Skeleton className="h-8 w-20" />
					<Skeleton className="h-8 w-32" />
				</div>
			</div>

			{/* Updated at */}
			<Skeleton className="h-4 w-60" />

			<Separator />

			{/* Judul */}
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-8 w-3/4" />
			</div>

			{/* Gambar */}
			<div className="flex justify-center">
				<Skeleton className="h-[220px] w-full max-w-xl rounded-md" />
			</div>

			{/* Tanggal */}
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-5 w-48" />
			</div>

			{/* Kategori */}
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-5 w-40" />
			</div>

			{/* Isi */}
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />
				<Skeleton className="h-4 w-2/3" />
			</div>
		</div>
	);
}
