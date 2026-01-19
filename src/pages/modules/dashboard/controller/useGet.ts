import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Dashboard, PaginatedResponse } from "../model";
import { getDashboard } from "../model/dataAPI";

export function useGetDashboard() {
	const query = useQuery<PaginatedResponse<Dashboard>>({
		queryKey: ["dashboard"],
		queryFn: () => getDashboard(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});

	return {
		data: query.data?.data,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
