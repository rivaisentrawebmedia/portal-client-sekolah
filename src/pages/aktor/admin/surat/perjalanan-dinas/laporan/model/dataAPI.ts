import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { LaporanSPPD } from "./dataTypes";
import type { LaporanSPPDFormValues } from "./dataSchema";

export const getLaporanSPPD = async ({
	surat_tugas_id,
}: {
	surat_tugas_id: string;
}): Promise<PaginatedResponseByID<LaporanSPPD>> => {
	const res = await AxiosClient.get(
		`/surat/surat-tugas/${surat_tugas_id}/laporan`,
	);

	return res.data;
};

export async function postLaporanSPPD({
	payload,
	surat_tugas_id,
}: {
	payload: LaporanSPPDFormValues;
	surat_tugas_id: string;
}) {
	const res = await AxiosClient.post(
		`/surat/surat-tugas/${surat_tugas_id}/laporan`,
		payload,
	);
	return res.data;
}
