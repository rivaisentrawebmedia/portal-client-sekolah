import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type { KegiatanHarian, UpdatePayload } from "./dataTypes";
import type { KegiatanHarianFormValues } from "./dataSchema";

export type GetKegiatanHarianParams = {
	pegawai_id: string;
	tahun: string;
	bulan: string;
};

export const getKegiatanHarian = async ({
	bulan,
	pegawai_id,
	tahun,
}: GetKegiatanHarianParams): Promise<PaginatedResponse<KegiatanHarian>> => {
	const res = await AxiosClient.get("/presensi/kegiatan-harian", {
		params: {
			bulan,
			pegawai_id,
			tahun,
		},
	});

	return res.data;
};

export const getKegiatanHarianByID = async ({
	id,
	tahun,
}: {
	id: string;
	tahun: string;
}): Promise<PaginatedResponseByID<KegiatanHarian>> => {
	const res = await AxiosClient.get(`/presensi/kegiatan-harian/${id}`, {
		params: {
			tahun: tahun,
		},
	});

	return res.data;
};

export async function postKegiatanHarian(payload: KegiatanHarianFormValues) {
	const res = await AxiosClient.post("/presensi/kegiatan-harian", payload);
	return res.data;
}

export async function updateKegiatanHarian({ id, data, tahun }: UpdatePayload) {
	const res = await AxiosClient.put(`/presensi/kegiatan-harian/${id}`, data, {
		params: {
			tahun,
		},
	});
	return res.data;
}

export async function deleteKegiatanHarian({
	id,
	tahun,
}: {
	id: string;
	tahun: string;
}) {
	const res = await AxiosClient.delete(`/presensi/kegiatan-harian/${id}`, {
		params: {
			tahun,
		},
	});
	return res.data;
}
