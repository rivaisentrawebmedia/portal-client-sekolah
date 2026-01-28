import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type KategoriMading, getKategoriMading } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetKategoriMading() {
	const query = useQuery<PaginatedResponse<KategoriMading>>({
		queryKey: ["kategori-mading"],
		queryFn: () => getKategoriMading(),
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
