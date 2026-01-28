import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBerita, type GetBeritaParams, type Berita } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetBerita(params: GetBeritaParams) {
	const query = useQuery<PaginatedResponse<Berita>>({
		queryKey: ["berita", params],
		queryFn: () => getBerita(params),
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
