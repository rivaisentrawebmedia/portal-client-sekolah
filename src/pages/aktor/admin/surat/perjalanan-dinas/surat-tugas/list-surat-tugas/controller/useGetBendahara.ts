import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getSuratTugasBendahara, type SuratTugasBendahara } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetSuratTugasBendahara() {
	const query = useQuery<PaginatedResponse<SuratTugasBendahara>>({
		queryKey: ["surat-tugas-bendahara"],
		queryFn: () => getSuratTugasBendahara(),
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
