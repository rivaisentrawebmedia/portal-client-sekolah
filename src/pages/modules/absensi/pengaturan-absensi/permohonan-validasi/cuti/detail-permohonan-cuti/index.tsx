import { Hourglass } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
	useGetPermohonanCutiByID,
	usePostStatusPermohonanCuti,
} from "../layout/controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";

import { convertSlugToText } from "@/utils/helpers";
import {
	ButtonDiajukan,
	ButtonDibatalkan,
	ButtonDraft,
	DetailCuti,
	InformasiPegawai,
} from "./components";
import { DialogData } from "./components/button/DialogData";
import { useState } from "react";

export default function DetailPermohonanCutiPage() {
	const [searchParams] = useSearchParams();

	const { data: detail, loading } = useGetPermohonanCutiByID();

	const { setCheckedPool, isShow, setIsShow, onSubmit, disabled, checkedPool } =
		usePostStatusPermohonanCuti();

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
							to: "/modules/presensi",
						},
						{
							label: "Permohonan Cuti",
							to: `/modules/presensi/pengaturan-absensi/permohonan-validasi/cuti?${searchParams.toString()}`,
						},
						{
							label: "Edit Permohonan Cuti",
						},
					]}
				/>

				<>
					<div className="flex flex-col gap-4 md:flex-row md:justify-between">
						<p className="text-2xl text-[#1E5916] font-medium">
							Detail Permohonan Cuti
						</p>
						<div className="flex md:flex-row flex-col md:items-center gap-2">
							<div className="flex items-center gap-2">
								<p>Status:</p>
								<div className="flex items-center gap-1">
									<Hourglass size={14} color="#2769CD" />
									<p>{convertSlugToText(detail?.status)}</p>
								</div>
							</div>
							{detail?.status === "draft" ? (
								<ButtonDraft
									checkedPool={[detail?.id || ""]}
									loading={loading}
									setCheckedPool={setCheckedPool}
									setIsShow={setIsShow}
									setStatus={setStatus}
								/>
							) : detail?.status === "diajukan" ? (
								<ButtonDiajukan
									checkedPool={[detail?.id || ""]}
									loading={loading}
									setCheckedPool={setCheckedPool}
									setStatus={setStatus}
									setIsShow={setIsShow}
								/>
							) : detail?.status === "dibatalkan" ? (
								<ButtonDibatalkan
									checkedPool={[detail?.id || ""]}
									loading={loading}
									setCheckedPool={setCheckedPool}
									setStatus={setStatus}
									setIsShow={setIsShow}
								/>
							) : (
								<></>
							)}
						</div>
					</div>

					<InformasiPegawai />
					<DetailCuti detail={detail} loading={loading} />
				</>
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
