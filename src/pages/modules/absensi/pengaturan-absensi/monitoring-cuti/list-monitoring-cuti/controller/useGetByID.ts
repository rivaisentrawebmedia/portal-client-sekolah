import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { MonitoringCutiByID, PaginatedResponseByID } from "../model";
import {
	getMonitoringCutiByID,
	type GetMonitoringCutiParamsByID,
} from "../model/dataAPI";

export function useGetMonitoringCutiByID(params: GetMonitoringCutiParamsByID) {
	const query = useQuery<PaginatedResponseByID<MonitoringCutiByID>>({
		queryKey: ["monitoring-cuti", params],
		queryFn: () => getMonitoringCutiByID(params),
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
