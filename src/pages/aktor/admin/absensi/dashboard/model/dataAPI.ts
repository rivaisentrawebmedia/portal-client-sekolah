import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type { Dashboard, NotifikasiPengajuanCuti } from "./dataTypes";

export type GetDashboardParams = {
	tanggal: string;
};

export const getDashboard = async ({
	tanggal,
}: GetDashboardParams): Promise<PaginatedResponseByID<Dashboard>> => {
	const res = await AxiosClient.get("/presensi/laporan-hari-ini", {
		params: {
			tanggal,
		},
	});

	return res.data;
};

export const getDashboardNotifikasi = async (): Promise<
	PaginatedResponse<NotifikasiPengajuanCuti>
> => {
	const res = await AxiosClient.get("/presensi/pengajuan-cuti-izin");

	return res.data;
};
