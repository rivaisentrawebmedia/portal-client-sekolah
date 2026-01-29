import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	SuratTugas,
	SuratTugasBendahara,
	SuratTugasByID,
	SuratTugasJabatan,
	SuratTugasPegawai,
	SuratTugasPenandaTangan,
	UpdatePayload,
} from "./dataTypes";
import type { SuratTugasFormValues } from "./dataSchema";

export type GetSuratTugasParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
	rentang_waktu?: string;
};

export type GetSuratTugasJabatanParams = {
	page: number;
	limit?: number;
	search?: string;
};

export type GetSuratTugasPenandaTanganParams = {
	page: number;
	limit?: number;
	search?: string;
	jabatan_id?: string;
};

export type GetSuratTugasPegawaiParams = {
	page: number;
	limit?: number;
	search?: string;
	jabatan_id?: string;
	tanggal_mulai?: string;
	tanggal_selesai?: string;
};

export const getSuratTugas = async ({
	page,
	limit,
	search,
	spam,
	rentang_waktu,
}: GetSuratTugasParams): Promise<PaginatedResponse<SuratTugas>> => {
	const res = await AxiosClient.get("/surat/surat-tugas", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
			rentang_waktu,
		},
	});

	return res.data;
};

export const getSuratTugasByID = async ({
	id,
}: {
	id: string;
}): Promise<PaginatedResponseByID<SuratTugasByID>> => {
	const res = await AxiosClient.get(`/surat/surat-tugas/${id}`);

	return res.data;
};

export const getSuratTugasJabatan = async ({
	page,
	limit,
	search,
}: GetSuratTugasJabatanParams): Promise<
	PaginatedResponse<SuratTugasJabatan>
> => {
	const res = await AxiosClient.get(`/surat/surat-tugas/jabatan-options`, {
		params: {
			page,
			limit,
			search,
		},
	});

	return res.data;
};

export const getSuratTugasPenandaTangan = async ({
	page,
	limit,
	search,
	jabatan_id,
}: GetSuratTugasPenandaTanganParams): Promise<
	PaginatedResponse<SuratTugasPenandaTangan>
> => {
	const res = await AxiosClient.get(
		`/surat/surat-tugas/penandatangan-options`,
		{
			params: {
				page,
				limit,
				search,
				jabatan_id,
			},
		},
	);

	return res.data;
};

export const getSuratTugasPegawai = async ({
	page,
	limit,
	search,
	jabatan_id,
	tanggal_mulai,
	tanggal_selesai,
}: GetSuratTugasPegawaiParams): Promise<
	PaginatedResponse<SuratTugasPegawai>
> => {
	const res = await AxiosClient.get(`/surat/surat-tugas/pegawai-options`, {
		params: {
			page,
			limit,
			search,
			jabatan_id,
			tanggal_mulai,
			tanggal_selesai,
		},
	});

	return res.data;
};

export const getSuratTugasBendahara = async (): Promise<
	PaginatedResponse<SuratTugasBendahara>
> => {
	const res = await AxiosClient.get(`/surat/surat-tugas/bendahara`);

	return res.data;
};

export async function postSuratTugas(payload: SuratTugasFormValues) {
	const res = await AxiosClient.post("/surat/surat-tugas", payload);
	return res.data;
}

export async function updateSuratTugas({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/surat/surat-tugas/${id}`, data);
	return res.data;
}

export async function deleteSuratTugas(id: string) {
	const res = await AxiosClient.delete(`/surat/surat-tugas/${id}`);
	return res.data;
}
