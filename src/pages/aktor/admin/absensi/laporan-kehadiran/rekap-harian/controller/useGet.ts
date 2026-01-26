import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRekapHarian,
	type GetRekapHarianParams,
	type RekapHarian,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetRekapHarian(params: GetRekapHarianParams) {
	const query = useQuery<PaginatedResponse<RekapHarian>>({
		queryKey: ["laporan-hari-ini-detail", params],
		queryFn: () => getRekapHarian(params),
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
