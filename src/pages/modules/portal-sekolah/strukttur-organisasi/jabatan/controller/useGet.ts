import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Jabatan, PaginatedResponse } from "../model";
import { getJabatan, type GetJabatanParams } from "../model/dataAPI";

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
