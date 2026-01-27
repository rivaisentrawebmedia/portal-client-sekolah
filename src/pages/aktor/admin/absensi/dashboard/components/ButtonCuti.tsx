import type { NotifikasiPengajuanCuti } from "../model";
import { usePostStatusPermohonanCuti } from "../../pengaturan-absensi/permohonan-validasi/cuti/layout/controller";
import { useState } from "react";
import { DialogData } from "../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components/button/DialogData";
import {
	ButtonBatalkan,
	ButtonSetuju,
	ButtonTolak,
} from "../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components/button";

export function ButtonCuti({ item }: { item: NotifikasiPengajuanCuti }) {
	const { setCheckedPool, isShow, setIsShow, onSubmit, disabled, checkedPool } =
		usePostStatusPermohonanCuti();

	const [alasan, setAlasan] = useState<string>("");
	const [status, setStatus] = useState<
		"draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan"
	>();

	return (
		<>
			<div className="flex items-center gap-2">
				<ButtonSetuju
					checkedPool={[item?.id || ""]}
					loading={disabled}
					setCheckedPool={setCheckedPool}
					setIsShow={setIsShow}
					setStatus={setStatus}
				/>
				<ButtonTolak
					checkedPool={[item?.id || ""]}
					loading={disabled}
					setCheckedPool={setCheckedPool}
					setIsShow={setIsShow}
					setStatus={setStatus}
				/>
				<ButtonBatalkan
					checkedPool={[item?.id || ""]}
					loading={disabled}
					setCheckedPool={setCheckedPool}
					setIsShow={setIsShow}
					setStatus={setStatus}
				/>
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
