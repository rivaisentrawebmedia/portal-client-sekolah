import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { SPPD, UpdatePayload } from "./dataTypes";
import type { SPPDFormValues } from "./dataSchema";

export const getSPPD = async ({
	surat_tugas_id,
}: {
	surat_tugas_id: string;
}): Promise<PaginatedResponseByID<SPPD>> => {
	const res = await AxiosClient.get(
		`/surat/surat-tugas/${surat_tugas_id}/sppd`,
	);

	return res.data;
};

export async function postSPPD({
	payload,
	surat_tugas_id,
}: {
	payload: SPPDFormValues;
	surat_tugas_id: string;
}) {
	const res = await AxiosClient.post(
		`/surat/surat-tugas/${surat_tugas_id}/sppd`,
		payload,
	);
	return res.data;
}

export async function updateSPPD({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/surat/surat-tugas/${id}/sppd`, data);
	return res.data;
}
