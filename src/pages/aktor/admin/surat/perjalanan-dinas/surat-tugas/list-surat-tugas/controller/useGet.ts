import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getSuratTugas,
	type GetSuratTugasParams,
	type SuratTugas,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetSuratTugas(params: GetSuratTugasParams) {
	const query = useQuery<PaginatedResponse<SuratTugas>>({
		queryKey: ["surat-tugas", params],
		queryFn: () => getSuratTugas(params),
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
