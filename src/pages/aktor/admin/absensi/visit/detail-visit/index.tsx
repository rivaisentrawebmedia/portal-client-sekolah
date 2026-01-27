import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { useSearchParams } from "react-router-dom";
import { usePathname } from "@/utils/usePathname";
import { InformasiPegawai } from "../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components";
import type { GetVisitParams } from "./model";
import { useGetVisitByID } from "./controller";
import { BasicLabel } from "@/components/common/BasicLabel";
import dayjs from "dayjs";
import { convertFromSnakeCase } from "@/utils/helpers";
import { usePostStatusVisit } from "../list-visit/controller";
import { useState } from "react";
import { DialogData } from "../list-visit/components";
import { CheckCircle, XCircle } from "lucide-react";

export default function VisitDetailPage() {
	const { fourthPathname } = usePathname();
	const [searchParams] = useSearchParams();

	const paramsDefault: GetVisitParams = {
		id: fourthPathname || "",
	};

	const { data, loading } = useGetVisitByID(paramsDefault);

	const { checkedPool, setCheckedPool, isShow, setIsShow, onSubmit, disabled } =
		usePostStatusVisit();

	const [alasan, setAlasan] = useState<string>("");
	const [status, setStatus] = useState<"diajukan" | "disetujui" | "ditolak">();

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/admin/presensi",
						},
						{
							label: "Visit",
							to: `/admin/presensi/visit?${searchParams.toString()}`,
						},
						{
							label: "Detail VIsit Pegawai",
						},
					]}
				/>
				<div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Detail Visit</p>
					<div className="flex gap-2 items-center">
						<p className="hidden md:block">
							Status:{" "}
							<span className="font-bold text-primary">
								{convertFromSnakeCase(data?.status || "")}
							</span>
						</p>
						<div className="flex items-center gap-2">
							<button
								type="button"
								disabled={loading}
								onClick={() => {
									setStatus("disetujui");
									setCheckedPool([data?.id || ""]);
									setIsShow(true);
								}}
								className="flex justify-center items-center text-nowrap gap-2 px-3 disabled:bg-emerald-300 rounded-md py-1.5 bg-emerald-500 text-white"
							>
								<CheckCircle size={14} />
								Setuju (1)
							</button>
							<button
								type="button"
								onClick={() => {
									setStatus("ditolak");
									setCheckedPool([data?.id || ""]);
									setIsShow(true);
								}}
								disabled={loading}
								className="flex justify-center items-center text-nowrap gap-2 px-3 disabled:bg-rose-300 rounded-md py-1.5 bg-rose-500 text-white"
							>
								<XCircle size={14} />
								Tolak (1)
							</button>
						</div>
					</div>
				</div>

				<InformasiPegawai />

				<div className="flex flex-col gap-4 p-4 border bg-[#eaf4ec] border-[#1e5916] rounded-md">
					<p className="text-lg text-primary">Detail Visit</p>

					<BasicLabel
						label="Tanggal & Waktu Visit"
						value={
							data?.tanggal_diajukan
								? dayjs(data?.tanggal_diajukan)
										.locale("id")
										.format("DD MMMM YYYY HH:mm:ss")
								: "-"
						}
					/>
					<BasicLabel label="Lokasi Visit" value={data?.lokasi || "-"} />
					<BasicLabel label="Tujuan Visit" value={data?.tujuan_visit || "-"} />

					<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
						<BasicLabel
							label="Foto Diri"
							value={
								<img
									src={data?.photo_diri}
									alt="Foto Diri"
									className="w-full rounded-md"
								/>
							}
						/>

						<BasicLabel
							label="Foto Lokasi"
							value={
								<img
									src={data?.photo_lokasi}
									alt="Foto Lokasi"
									className="w-full rounded-md"
								/>
							}
						/>
					</div>
				</div>
			</div>

			<DialogData
				disabled={disabled}
				isShow={isShow}
				onSubmit={onSubmit}
				setIsShow={setIsShow}
				status={status || "disetujui"}
				description={
					status === "disetujui" ? (
						<p>
							Anda akan menyetujui {checkedPool?.length} Visit. Apakah anda
							yakin untuk mengajukan Visit yang telah Anda pilih?
						</p>
					) : status === "ditolak" ? (
						<p>
							Anda akan menolak {checkedPool?.length} Visit. Apakah anda yakin
							untuk menolak Visit yang telah Anda pilih?
						</p>
					) : (
						""
					)
				}
				label={
					status === "disetujui"
						? "Setujui Visit"
						: status === "ditolak"
							? "Tolak Visit"
							: ""
				}
				alasan={alasan}
				content={
					status === "ditolak" ? (
						<div className="flex flex-col gap-2">
							<label
								style={{
									fontWeight: "lighter",
									letterSpacing: "1px",
								}}
								className="text-md text-[#CD2738]"
							>
								Alasan Penolakan*
							</label>
							<textarea
								className="w-full rounded-md border border-[#CD2738] p-2 text-sm"
								rows={4}
								placeholder="Tuliskan alasan penolakan..."
								value={alasan}
								onChange={(e) => setAlasan(e.target.value)}
							/>
						</div>
					) : (
						<></>
					)
				}
			/>
		</>
	);
}
