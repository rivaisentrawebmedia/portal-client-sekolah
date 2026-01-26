import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getDashboard,
	type GetDashboardParams,
	type Dashboard,
} from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetDashboard(params: GetDashboardParams) {
	const query = useQuery<PaginatedResponseByID<Dashboard>>({
		queryKey: ["dashboard-absensi", params],
		queryFn: () => getDashboard(params),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
