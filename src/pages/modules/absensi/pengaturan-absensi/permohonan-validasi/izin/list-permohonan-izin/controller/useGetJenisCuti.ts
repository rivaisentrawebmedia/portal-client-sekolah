import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponseJenisIzin, JenisIzin } from "../model";
import { getJenisIzin, type GetJenisIzinParams } from "../model/dataAPI";

export function useGetJenisIzin(params: GetJenisIzinParams) {
	const query = useQuery<PaginatedResponseJenisIzin<JenisIzin>>({
		queryKey: ["pengajuan-izin", params],
		queryFn: () => getJenisIzin(params),
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
