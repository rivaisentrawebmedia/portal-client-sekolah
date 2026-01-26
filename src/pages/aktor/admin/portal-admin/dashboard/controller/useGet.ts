import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getModul, type GetModulParams, type Modul } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetModul(params: GetModulParams) {
	const query = useQuery<PaginatedResponse<Modul>>({
		queryKey: ["modul", params],
		queryFn: () => getModul(params),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data ?? [],
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
