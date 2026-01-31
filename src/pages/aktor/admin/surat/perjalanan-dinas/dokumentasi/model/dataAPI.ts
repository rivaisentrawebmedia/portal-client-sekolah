import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { DokumentasiSPPD } from "./dataTypes";

export const getDokumentasiSPPD = async ({
	surat_tugas_id,
}: {
	surat_tugas_id: string;
}): Promise<PaginatedResponse<DokumentasiSPPD>> => {
	const res = await AxiosClient.get(
		`/surat/surat-tugas/${surat_tugas_id}/dokumentasi`,
	);

	return res.data;
};

export async function postDokumentasiSPPD({
	file,
	surat_tugas_id,
}: {
	file: File;
	surat_tugas_id: string;
}) {
	const formData = new FormData();
	formData.append("file", file);

	const res = await AxiosClient.post(
		`/surat/surat-tugas/${surat_tugas_id}/dokumentasi`,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		},
	);

	return res.data;
}

export async function deleteDokumentasiSPPD({
	surat_tugas_id,
	dokumen_id,
}: {
	surat_tugas_id: string;
	dokumen_id: string;
}) {
	const res = await AxiosClient.delete(
		`/surat/surat-tugas/${surat_tugas_id}/dokumentasi/${dokumen_id}`,
	);
	return res.data;
}
