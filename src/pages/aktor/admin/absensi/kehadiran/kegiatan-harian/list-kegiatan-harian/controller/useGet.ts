import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getKegiatanHarian,
	type GetKegiatanHarianParams,
	type KegiatanHarian,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetKegiatanHarian(params: GetKegiatanHarianParams) {
	const query = useQuery<PaginatedResponse<KegiatanHarian>>({
		queryKey: ["kegiatan-harian", params],
		queryFn: () => getKegiatanHarian(params),
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
