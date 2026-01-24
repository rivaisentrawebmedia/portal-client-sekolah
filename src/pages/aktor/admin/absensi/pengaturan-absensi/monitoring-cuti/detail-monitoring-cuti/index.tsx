import { useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { InformasiPegawai } from "../../permohonan-validasi/cuti/detail-permohonan-cuti/components";
import {
	FilterData,
	TabCuti,
	TablePermohonanCuti,
} from "../../permohonan-validasi/cuti/layout/components";
import type { GetMonitoringCutiParamsByID } from "../list-monitoring-cuti/model/dataAPI";
import { useGetMonitoringCutiByID } from "../list-monitoring-cuti/controller";
import { usePostStatusPermohonanCuti } from "../../permohonan-validasi/cuti/layout/controller";
import { useState } from "react";
import { Pagination } from "@/components/common/pagination";
import { usePathname } from "@/utils/usePathname";
import { DialogData } from "../../permohonan-validasi/cuti/detail-permohonan-cuti/components/button/DialogData";

export default function DetailMonitoringCutiPage() {
	const { fivethPathname } = usePathname();
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-pengajuan-cuti");
	const limit = searchParams.get("limit-pengajuan-cuti");
	const search = searchParams.get("search-pengajuan-cuti");
	const statusParams = searchParams.get("status") || "draft";
	const userParams = searchParams.get("user-id");
	const periodeParams = searchParams.get("periode-cuti-id");

	const paramsDefault: GetMonitoringCutiParamsByID = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: statusParams,
		pegawai_id: fivethPathname || "",
		periode_cuti_id: periodeParams || "",
	};

	const { data, loading, meta } = useGetMonitoringCutiByID(paramsDefault);

	const { checkedPool, setCheckedPool, isShow, setIsShow, onSubmit, disabled } =
		usePostStatusPermohonanCuti();

	const listStatus = [
		"draft",
		"diajukan",
		"dibatalkan",
		"disetujui",
		"ditolak",
	];

	const [alasan, setAlasan] = useState<string>("");
	const [status, setStatus] = useState<
		"draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan"
	>();

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
							label: "Monitoring Sisa Cuti",
							to: `/admin/presensi/pengaturan-absensi/monitoring-sisa-cuti?${searchParams.toString()}`,
						},
						{
							label: "Detail Sisa Cuti",
						},
					]}
				/>

				<>
					<p className="text-2xl text-[#1E5916] font-medium">
						Detail Sisa Cuti
					</p>

					<InformasiPegawai />
				</>

				<div className="flex flex-col gap-0">
					<TabCuti
						listStatus={listStatus}
						statusParams={statusParams}
						meta={meta}
					/>

					<div className="flex flex-col gap-4 p-4 border-x border-b border-primary">
						<FilterData
							checkedPool={checkedPool}
							loading={loading}
							setIsShow={setIsShow}
							statusParams={statusParams}
							setCheckedPool={setCheckedPool}
							setStatus={setStatus}
						/>

						<TablePermohonanCuti
							data={data}
							loading={loading}
							limit={Number(limit)}
							page={Number(page)}
							search={search || ""}
							checked={checkedPool}
							setChecked={setCheckedPool}
							user_id={userParams || ""}
						/>
						{data?.length > 0 && (
							<Pagination meta={meta} pageKey={`page-${statusParams}`} />
						)}
					</div>
				</div>
			</div>

			<DialogData
				disabled={disabled}
				isShow={isShow}
				onSubmit={onSubmit}
				setIsShow={setIsShow}
				status={status || "diajukan"}
				description={
					status === "diajukan" ? (
						<p>
							Anda akan mengajukan {checkedPool?.length} Permohonan cuti. Apakah
							anda yakin untuk mengajukan Permohonan cuti yang telah Anda pilih?
						</p>
					) : status === "dibatalkan" ? (
						<p>
							Anda akan membatalkan {checkedPool?.length} Permohonan cuti.
							Apakah anda yakin untuk membatalkan Permohonan cuti yang telah
							Anda pilih? Cuti dapat diajukan kembali setelah ditolak.
						</p>
					) : status === "disetujui" ? (
						<p>
							{" "}
							Anda akan menyetujui {checkedPool?.length} Permohonan cuti. Apakah
							anda yakin untuk menyetujui Permohonan cuti yang telah Anda pilih?
						</p>
					) : status === "ditolak" ? (
						<p>
							Anda akan menolak {checkedPool?.length} Permohonan cuti. Apakah
							anda yakin untuk menolak Permohonan cuti yang telah Anda pilih?
						</p>
					) : (
						""
					)
				}
				label={
					status === "diajukan"
						? "Ajukan Permohonan Cuti"
						: status === "dibatalkan"
							? "Batalkan Permohonan Cuti"
							: status === "disetujui"
								? "Setujui Permohonan Cuti"
								: status === "ditolak"
									? "Tolak Permohonan Cuti"
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
