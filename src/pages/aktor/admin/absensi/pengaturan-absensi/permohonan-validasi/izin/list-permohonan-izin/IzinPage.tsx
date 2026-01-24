import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import {
	ButtonTambah,
	FilterData,
	TabIzin,
	TablePermohonanIzin,
} from "./components";
import { useSearchParams } from "react-router-dom";
import type { GetPermohonanIzinParams } from "./model/dataAPI";
import {
	useGetPermohonanIzin,
	usePostStatusPermohonanIzin,
} from "./controller";
import { Pagination } from "@/components/common/pagination";
import { useState } from "react";
import { DialogData } from "../detail-permohonan-izin/components/button/DialogData";

export default function PermohonanIzinPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-pengajuan-izin");
	const limit = searchParams.get("limit-pengajuan-izin");
	const search = searchParams.get("search-pengajuan-izin");
	const statusParams = searchParams.get("status") || "draft";

	const paramsDefault: GetPermohonanIzinParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: statusParams,
	};

	const { data, loading, meta } = useGetPermohonanIzin(paramsDefault);

	const { checkedPool, setCheckedPool, isShow, setIsShow, onSubmit, disabled } =
		usePostStatusPermohonanIzin();

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
							label: "Permohonan Izin",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Permohonan Izin</p>
					<ButtonTambah />
				</div>
				<div className="flex flex-col">
					<TabIzin
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

						<TablePermohonanIzin
							data={data}
							loading={loading}
							limit={Number(limit)}
							page={Number(page)}
							search={search || ""}
							checked={checkedPool}
							setChecked={setCheckedPool}
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
							Anda akan mengajukan {checkedPool?.length} Permohonan izin. Apakah
							anda yakin untuk mengajukan Permohonan izin yang telah Anda pilih?
						</p>
					) : status === "dibatalkan" ? (
						<p>
							Anda akan membatalkan {checkedPool?.length} Permohonan izin.
							Apakah anda yakin untuk membatalkan Permohonan izin yang telah
							Anda pilih? Izin dapat diajukan kembali setelah ditolak.
						</p>
					) : status === "disetujui" ? (
						<p>
							{" "}
							Anda akan menyetujui {checkedPool?.length} Permohonan izin. Apakah
							anda yakin untuk menyetujui Permohonan izin yang telah Anda pilih?
						</p>
					) : status === "ditolak" ? (
						<p>
							Anda akan menolak {checkedPool?.length} Permohonan izin. Apakah
							anda yakin untuk menolak Permohonan izin yang telah Anda pilih?
						</p>
					) : (
						""
					)
				}
				label={
					status === "diajukan"
						? "Ajukan Permohonan Izin"
						: status === "dibatalkan"
							? "Batalkan Permohonan Izin"
							: status === "disetujui"
								? "Setujui Permohonan Izin"
								: status === "ditolak"
									? "Tolak Permohonan Izin"
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
