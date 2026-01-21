import type { Jabatan, RiwayatPejabat } from "../model";
import { useUpdateJabatan } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormJabatan } from "./FormData";
import { Button } from "@/components/ui/button";
import { JokoEditCalendar } from "@/assets/icons/JokoEditCalendar";

export function ButtonEditMasaJabatan({
	rowData,
}: {
	rowData: RiwayatPejabat | undefined;
}) {
	const { disabled, form, isShow, onSubmit, setIsShow, setSelected } =
		useUpdateJabatan();

	return (
		<>
			<Button
				type="button"
				className="border-[#1E5916] justify-start w-full text-[#1E5916]"
				onClick={() => {
					const data: Jabatan = {
						created_at: rowData?.created_at || "",
						id: rowData?.id || "",
						is_mapel: rowData?.is_mapel || false,
						is_utama: rowData?.is_utama || false,
						is_walas: rowData?.is_walas || false,
						kelompok_jabatan: rowData?.kolompok_jabatan || "",
						kelompok_jabatan_id: rowData?.kelompok_jabatan_id || "",
						mulai: rowData?.mulai || "",
						nama: rowData?.nama || "",
						pejabat_id: rowData?.pejabat_id || "",
						pejabat_nama: rowData?.pejabat_nama || "",
						pejabat_nip: rowData?.pejabat_nip || "",
						pejabat_photo: rowData?.pejabat_photo || "",
						selesai: rowData?.selesai || "",
						updated_at: rowData?.updated_at || "",
					};
					setSelected(data || null);
					setIsShow(true);
				}}
				variant="outline"
			>
				<JokoEditCalendar />
				Edit Masa Jabatan
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md md:max-w-[50%]  rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Edit Jabatan</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah Jabatan ini?
						</DialogDescription>
					</DialogHeader>

					<FormJabatan
						disabled={disabled}
						form={form}
						onSubmit={onSubmit}
						setIsShow={setIsShow}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
