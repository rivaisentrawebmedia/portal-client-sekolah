import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/provider/axios";
import { getRekapVisitByID, type GetRekapVisitParams } from "../model";
import type { Visit } from "../../list-visit/model";

export function useGetRekapVisitByID(params: GetRekapVisitParams) {
	const query = useQuery<PaginatedResponse<Visit>>({
		queryKey: ["rekap-visit", "visit", params],
		queryFn: () => getRekapVisitByID(params),
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
