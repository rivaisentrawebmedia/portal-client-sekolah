import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRiwayatKehadiran,
	type GetRiwayatKehadiranParams,
	type RiwayatKehadiran,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetRiwayatKehadiran(params: GetRiwayatKehadiranParams) {
	const query = useQuery<PaginatedResponse<RiwayatKehadiran>>({
		queryKey: ["kehadiran", params],
		queryFn: () => getRiwayatKehadiran(params),
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
