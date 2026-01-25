import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { DaftarLokasi, PaginatedResponse } from "../model";
import { getDaftarLokasi } from "../model/dataAPI";

export function useGetDaftarLokasi() {
	const query = useQuery<PaginatedResponse<DaftarLokasi>>({
		queryKey: ["lokasi"],
		queryFn: () => getDaftarLokasi(),
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
