import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRiwayatKehadiranPerBulan,
	type GetRiwayatKehadiranPerBulanParams,
	type RiwayatKehadiranPerBulan,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetRiwayatKehadiranPerBulan(
	params: GetRiwayatKehadiranPerBulanParams,
) {
	const query = useQuery<PaginatedResponse<RiwayatKehadiranPerBulan>>({
		queryKey: ["kehadiran-per-bulan", params],
		queryFn: () => getRiwayatKehadiranPerBulan(params),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data ?? [],
		meta: query.data?.meta,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
