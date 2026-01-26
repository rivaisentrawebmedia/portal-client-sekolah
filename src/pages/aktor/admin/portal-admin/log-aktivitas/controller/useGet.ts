import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { LogAktivitas } from "../model";
import { getLogAktivitas, type GetLogAktivitasParams } from "../model/dataAPI";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetLogAktivitas(params: GetLogAktivitasParams) {
	const query = useQuery<PaginatedResponse<LogAktivitas>>({
		queryKey: ["log-aktivitas", params],
		queryFn: () => getLogAktivitas(params),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});

	return {
		data: query.data?.data ?? [],
		meta: query.data?.meta,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
