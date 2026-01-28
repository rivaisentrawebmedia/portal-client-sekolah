import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type AgendaStats, getAgendaStats } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetAgendaStats() {
	const query = useQuery<PaginatedResponseByID<AgendaStats>>({
		queryKey: ["agenda"],
		queryFn: () => getAgendaStats(),
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
