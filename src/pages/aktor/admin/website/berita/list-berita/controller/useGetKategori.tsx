import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type KategoriBerita, getKategoriBerita } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetKategoriBerita() {
	const query = useQuery<PaginatedResponse<KategoriBerita>>({
		queryKey: ["kategori-berita"],
		queryFn: () => getKategoriBerita(),
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
