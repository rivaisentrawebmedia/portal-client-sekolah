import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	ChartRiwayatKehadiran,
	RiwayatKehadiran,
	RiwayatKehadiranByID,
	RiwayatKehadiranPerBulan,
	UpdatePayload,
} from "./dataTypes";

export type GetRiwayatKehadiranParams = {
	pegawai_id: string;
	tahun: string;
};

export type GetRiwayatKehadiranPerBulanParams = {
	pegawai_id: string;
	tahun: string;
	bulan: string;
};

export const getRiwayatKehadiran = async ({
	pegawai_id,
	tahun,
}: GetRiwayatKehadiranParams): Promise<PaginatedResponse<RiwayatKehadiran>> => {
	const res = await AxiosClient.get("/presensi/riwayat-kehadiran", {
		params: {
			pegawai_id,
			tahun,
		},
	});

	return res.data;
};

export const getRiwayatKehadiranByID = async ({
	id,
}: {
	id: string;
}): Promise<PaginatedResponseByID<RiwayatKehadiranByID>> => {
	const res = await AxiosClient.get(`/presensi/kehadiran/${id}`);

	return res.data;
};

export const getRiwayatKehadiranPerBulan = async ({
	pegawai_id,
	tahun,
	bulan,
}: GetRiwayatKehadiranPerBulanParams): Promise<
	PaginatedResponse<RiwayatKehadiranPerBulan>
> => {
	const res = await AxiosClient.get("/presensi/riwayat-kehadiran-per-bulan", {
		params: {
			pegawai_id,
			tahun,
			bulan,
		},
	});

	return res.data;
};

export const getRiwayatKehadiranPerBulanChart = async ({
	pegawai_id,
	tahun,
	bulan,
}: GetRiwayatKehadiranPerBulanParams): Promise<
	PaginatedResponseByID<ChartRiwayatKehadiran>
> => {
	const res = await AxiosClient.get(
		"/presensi/riwayat-kehadiran-per-bulan-chart",
		{
			params: {
				pegawai_id,
				tahun,
				bulan,
			},
		},
	);

	return res.data;
};

export async function updateRiwayatKehadiran({
	id,
	data,
	tahun,
}: UpdatePayload) {
	const res = await AxiosClient.put(`/presensi/kehadiran/${id}`, data, {
		params: {
			tahun,
		},
	});
	return res.data;
}
