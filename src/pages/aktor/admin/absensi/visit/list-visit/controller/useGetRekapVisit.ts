import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRekapVisit,
	type GetRekapVisitParams,
	type RekapVisit,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetRekapVisit(params: GetRekapVisitParams) {
	const query = useQuery<PaginatedResponse<RekapVisit>>({
		queryKey: ["rekap-visit", params],
		queryFn: () => getRekapVisit(params),
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
