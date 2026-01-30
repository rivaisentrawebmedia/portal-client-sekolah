import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getJenisBiaya,
	type GetJenisBiayaParams,
	type JenisBiaya,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetJenisBiaya(params: GetJenisBiayaParams) {
	const query = useQuery<PaginatedResponse<JenisBiaya>>({
		queryKey: ["jenis-biaya", params],
		queryFn: () => getJenisBiaya(params),
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
