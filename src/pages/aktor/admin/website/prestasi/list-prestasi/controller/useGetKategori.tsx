import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type KategoriPrestasi, getKategoriPrestasi } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetKategoriPrestasi() {
	const query = useQuery<PaginatedResponse<KategoriPrestasi>>({
		queryKey: ["kategori-prestasi"],
		queryFn: () => getKategoriPrestasi(),
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
