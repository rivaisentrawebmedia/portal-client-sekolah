import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponseJenisCuti, JenisCuti } from "../model";
import { getJenisCuti, type GetJenisCutiParams } from "../model/dataAPI";

export function useGetJenisCuti(params: GetJenisCutiParams) {
	const query = useQuery<PaginatedResponseJenisCuti<JenisCuti>>({
		queryKey: ["pengajuan-cuti", params],
		queryFn: () => getJenisCuti(params),
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
