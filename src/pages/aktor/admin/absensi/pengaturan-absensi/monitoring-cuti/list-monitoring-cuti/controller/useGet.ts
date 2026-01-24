import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { MonitoringCuti, PaginatedResponse } from "../model";
import {
	getMonitoringCuti,
	type GetMonitoringCutiParams,
} from "../model/dataAPI";

export function useGetMonitoringCuti(params: GetMonitoringCutiParams) {
	const query = useQuery<PaginatedResponse<MonitoringCuti>>({
		queryKey: ["monitoring-cuti", params],
		queryFn: () => getMonitoringCuti(params),
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
