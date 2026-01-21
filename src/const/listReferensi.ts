import AxiosClient from "@/provider/axios";
import { useQuery } from "@tanstack/react-query";

export type Referensi = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
	nama_pangkat: string;
	nama_golongan: string;
	provinsi_id: string;
	kabupaten_id: string;
	kecamatan_id: string;
	desa_id: string;
};

export type GetReferensiParams = {
	url: string;
	provinsi_id?: string;
	kabupaten_id?: string;
	kecamatan_id?: string;
};

export const getReferensi = async ({
	url,
	kabupaten_id,
	kecamatan_id,
	provinsi_id,
}: GetReferensiParams): Promise<{ data: Referensi[] }> => {
	const res = await AxiosClient.get(`/referensi/${url}`, {
		params: {
			page: 1,
			provinsi_id,
			kabupaten_id,
			kecamatan_id,
		},
	});
	return res.data;
};

export function useGetReferensi(params: GetReferensiParams) {
	const query = useQuery({
		queryKey: ["referensi", params],
		queryFn: () => getReferensi(params),
		enabled: !!params, // ⬅️ penting
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	return {
		data: query.data?.data,
		loading: query.isLoading,
		error: query.error,
	};
}
