import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMading, type GetMadingParams, type Mading } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetMading(params: GetMadingParams) {
	const query = useQuery<PaginatedResponse<Mading>>({
		queryKey: ["mading", params],
		queryFn: () => getMading(params),
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
