import { useQuery } from "@tanstack/react-query";
import { getRiwayatAktivitas, type GetRiwayatAktivitasParams } from "../model";

export function useGetRiwayatAktivitas(params: GetRiwayatAktivitasParams) {
	const query = useQuery({
		queryKey: ["manajemen-user", "kontrol-akses", "riwayat-aktivitas", params],
		queryFn: () => getRiwayatAktivitas(params),
		enabled: !!params,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	return {
		data: query.data?.data || [],
		meta: query.data?.meta,
		loading: query.isLoading,
		error: query.error,
	};
}
