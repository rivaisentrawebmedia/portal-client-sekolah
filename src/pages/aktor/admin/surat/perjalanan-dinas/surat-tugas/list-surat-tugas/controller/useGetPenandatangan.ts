import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getSuratTugasPenandaTangan,
	type GetSuratTugasPenandaTanganParams,
	type SuratTugasPenandaTangan,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetSuratTugasPenandatangan(
	params: GetSuratTugasPenandaTanganParams,
) {
	const query = useQuery<PaginatedResponse<SuratTugasPenandaTangan>>({
		queryKey: ["surat-tugaspenandatangan", params],
		queryFn: () => getSuratTugasPenandaTangan(params),
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
