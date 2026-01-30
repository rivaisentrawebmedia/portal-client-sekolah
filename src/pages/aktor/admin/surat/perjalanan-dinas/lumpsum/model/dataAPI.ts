import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type { LumpsumSPPDFormValues } from "./dataSchema";
import type { LumpsumSPPD, LumpsumSPPDByID } from "./dataTypes";

export const getLumpsumSPPD = async ({
	surat_tugas_id,
}: {
	surat_tugas_id: string;
}): Promise<PaginatedResponse<LumpsumSPPD>> => {
	const res = await AxiosClient.get(
		`/surat/surat-tugas/${surat_tugas_id}/lumpsum`,
	);

	return res.data;
};

export const getLumpsumSPPDByID = async ({
	surat_tugas_id,
	pegawai_id,
}: {
	surat_tugas_id: string;
	pegawai_id: string;
}): Promise<PaginatedResponseByID<LumpsumSPPDByID>> => {
	const res = await AxiosClient.get(
		`/surat/surat-tugas/${surat_tugas_id}/lumpsum/${pegawai_id}`,
	);

	return res.data;
};

export async function postLumpsumSPPD({
	payload,
	surat_tugas_id,
}: {
	payload: LumpsumSPPDFormValues;
	surat_tugas_id: string;
}) {
	const res = await AxiosClient.post(
		`/surat/surat-tugas/${surat_tugas_id}/lumpsum`,
		payload,
	);
	return res.data;
}
