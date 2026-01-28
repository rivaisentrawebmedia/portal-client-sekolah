import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type KategoriAgenda, getKategoriAgenda } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetKategoriAgenda() {
	const query = useQuery<PaginatedResponse<KategoriAgenda>>({
		queryKey: ["kategori-agenda"],
		queryFn: () => getKategoriAgenda(),
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
