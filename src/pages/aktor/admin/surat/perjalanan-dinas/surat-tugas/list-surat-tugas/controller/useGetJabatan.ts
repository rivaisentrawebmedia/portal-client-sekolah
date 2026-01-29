import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getSuratTugasJabatan,
	type GetSuratTugasJabatanParams,
	type SuratTugasJabatan,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetSuratTugasJabatan(params: GetSuratTugasJabatanParams) {
	const query = useQuery<PaginatedResponse<SuratTugasJabatan>>({
		queryKey: ["surat-tugas-jabatan", params],
		queryFn: () => getSuratTugasJabatan(params),
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
