import AxiosClient from "@/provider/axios";
import { useQuery } from "@tanstack/react-query";

export type Referensi = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
	nama_pangkat: string;
	nama_golongan: string;
};

export const getReferensi = async (
	url: string,
): Promise<{ data: Referensi[] }> => {
	const res = await AxiosClient.get(`/referensi/${url}`, {
		params: {
			page: 1,
		},
	});
	return res.data;
};

export function useGetReferensi(url: string) {
	const query = useQuery({
		queryKey: ["referensi", url],
		queryFn: () => getReferensi(url || ""),
		enabled: !!url, // ⬅️ penting
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	return {
		data: query.data?.data,
		loading: query.isLoading,
		error: query.error,
	};
}
