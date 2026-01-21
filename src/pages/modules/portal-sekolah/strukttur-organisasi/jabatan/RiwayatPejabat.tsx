import { ArrowBack } from "@/components/common/ArrowBack";
import { useGetJabatanByID } from "./controller";
import { DetailJabatan } from "./components";
import { convertSlugToText, getInitials } from "@/utils/helpers";
import dayjs from "dayjs";

export default function RiwayatJabatanPage() {
	const { data, loading } = useGetJabatanByID();
	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<ArrowBack
					link={`/modules/struktur-organisasi/jabatan`}
					title={`Riwayat Pejabat - ${data?.nama}`}
				/>

				<DetailJabatan data={data} loading={loading} />

				<p className="text-lg font-medium text-[#1E5916]">Riwayat Jabatan</p>

				{loading ? (
					<RiwayatSkeleton />
				) : !data?.riwayat || data.riwayat.length === 0 ? (
					<RiwayatEmpty />
				) : (
					<div className="flex flex-col gap-0">
						{data.riwayat.map((item, idx) => (
							<div key={idx} className="flex w-full flex-col gap-0">
								<div className="flex items-center gap-2">
									{item?.photo_1 ? (
										<img
											src={item.photo_1}
											alt={item.label_1}
											className="h-7 w-7 rounded-full border object-cover"
										/>
									) : (
										<div className="flex h-7 w-7 text-xs items-center justify-center rounded-full bg-[#1E5916]">
											<p className="text-white">{getInitials(item?.label_1)}</p>
										</div>
									)}

									<div className="flex items-center gap-1 text-sm">
										{item.action === "menjabat" ? (
											<p>
												<span className="font-semibold text-[#1E5916]">
													{item.label_1}
												</span>{" "}
												{convertSlugToText(item.action)} sebagai{" "}
												{item.nama_jabatan} terhitung mulai{" "}
												{dayjs(item.mulai).locale("id").format("DD MMMM YYYY")}{" "}
												sampai{" "}
												{dayjs(item.selesai)
													.locale("id")
													.format("DD MMMM YYYY")}
											</p>
										) : (
											<p>
												<span className="font-semibold text-[#1E5916]">
													{item.label_1}
												</span>{" "}
												{convertSlugToText(item.action)} digantikan oleh{" "}
												<span className="font-semibold text-[#1E5916]">
													{item.label_2}
												</span>{" "}
												pada{" "}
												{dayjs(item.mulai).locale("id").format("DD MMMM YYYY")}
											</p>
										)}
									</div>
								</div>

								{idx < data.riwayat.length - 1 && (
									<div className="pl-3">
										<div className="h-6 w-[1px] bg-[#C0C2CC]" />
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}

function RiwayatSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			{Array.from({ length: 3 }).map((_, idx) => (
				<div key={idx} className="flex gap-3 animate-pulse">
					<div className="h-7 w-7 rounded-full bg-gray-200" />

					<div className="flex-1 space-y-2">
						<div className="h-3 w-3/4 rounded bg-gray-200" />
						<div className="h-3 w-1/2 rounded bg-gray-200" />
					</div>
				</div>
			))}
		</div>
	);
}

function RiwayatEmpty() {
	return (
		<div className="flex flex-col items-center justify-center py-10 text-center gap-2">
			<p className="text-sm text-gray-500">Belum ada riwayat jabatan</p>
			<p className="text-xs text-gray-400">
				Riwayat akan muncul setelah terjadi perubahan jabatan
			</p>
		</div>
	);
}
