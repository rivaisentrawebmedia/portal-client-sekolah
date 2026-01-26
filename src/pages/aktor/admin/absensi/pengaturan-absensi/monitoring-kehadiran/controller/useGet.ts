import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getMonitoringKehadiran,
	type GetMonitoringKehadiranParams,
	type MonitoringKehadiran,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetMonitoringKehadiran(
	params: GetMonitoringKehadiranParams,
) {
	const query = useQuery<PaginatedResponse<MonitoringKehadiran>>({
		queryKey: ["monitoring-kehadiran", params],
		queryFn: () => getMonitoringKehadiran(params),
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
