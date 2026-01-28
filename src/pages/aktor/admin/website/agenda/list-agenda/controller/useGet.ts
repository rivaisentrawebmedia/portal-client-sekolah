import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAgenda, type GetAgendaParams, type Agenda } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetAgenda(params: GetAgendaParams) {
	const query = useQuery<PaginatedResponse<Agenda>>({
		queryKey: ["agenda", params],
		queryFn: () => getAgenda(params),
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
