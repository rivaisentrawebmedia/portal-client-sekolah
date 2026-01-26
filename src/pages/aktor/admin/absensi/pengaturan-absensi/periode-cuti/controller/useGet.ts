import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getPeriodeCuti,
	type GetPeriodeCutiParams,
	type PeriodeCuti,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetPeriodeCuti(params: GetPeriodeCutiParams) {
	const query = useQuery<PaginatedResponse<PeriodeCuti>>({
		queryKey: ["periode-cuti", params],
		queryFn: () => getPeriodeCuti(params),
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
