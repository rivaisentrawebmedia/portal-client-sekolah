import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { HariLibur, PaginatedResponse } from "../model";
import { getHariLibur, type GetHariLiburParams } from "../model/dataAPI";

export function useGetHariLibur(params: GetHariLiburParams) {
	const query = useQuery<PaginatedResponse<HariLibur>>({
		queryKey: ["hari-libur", params],
		queryFn: () => getHariLibur(params),
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
