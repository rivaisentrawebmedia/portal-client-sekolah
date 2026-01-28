import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type KategoriPengumuman, getKategoriPengumuman } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetKategoriPengumuman() {
	const query = useQuery<PaginatedResponse<KategoriPengumuman>>({
		queryKey: ["kategori-pengumuman"],
		queryFn: () => getKategoriPengumuman(),
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
