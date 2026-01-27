import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRekapPerOrang,
	type GetRekapPerOrangParams,
	type RekapPerOrang,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetRekapPerOrang(params: GetRekapPerOrangParams) {
	const query = useQuery<PaginatedResponse<RekapPerOrang>>({
		queryKey: ["rekap-per-orang", params],
		queryFn: () => getRekapPerOrang(params),
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
