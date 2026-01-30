import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAnggaran, type GetAnggaranParams, type Anggaran } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetAnggaran(params: GetAnggaranParams) {
	const query = useQuery<PaginatedResponse<Anggaran>>({
		queryKey: ["anggaran", params],
		queryFn: () => getAnggaran(params),
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
