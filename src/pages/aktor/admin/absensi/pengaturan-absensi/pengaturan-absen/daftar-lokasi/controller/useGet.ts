import type { PaginatedResponse } from "@/provider/axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getDaftarLokasi, type DaftarLokasi } from "../model";

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
