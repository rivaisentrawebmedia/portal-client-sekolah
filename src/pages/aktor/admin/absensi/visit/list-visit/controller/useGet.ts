import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getVisit, type GetVisitParams, type Visit } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetVisit(params: GetVisitParams) {
	const query = useQuery<PaginatedResponse<Visit>>({
		queryKey: ["visit", params],
		queryFn: () => getVisit(params),
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
