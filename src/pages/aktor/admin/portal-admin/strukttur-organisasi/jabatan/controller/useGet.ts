import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getJabatan, type GetJabatanParams, type Jabatan } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetJabatan(params: GetJabatanParams) {
	const query = useQuery<PaginatedResponse<Jabatan>>({
		queryKey: ["jabatan", params],
		queryFn: () => getJabatan(params),
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
