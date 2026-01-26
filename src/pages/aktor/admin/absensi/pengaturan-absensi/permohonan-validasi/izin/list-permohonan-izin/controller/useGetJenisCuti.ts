import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getJenisIzin,
	type GetJenisIzinParams,
	type JenisIzin,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetJenisIzin(params: GetJenisIzinParams) {
	const query = useQuery<PaginatedResponse<JenisIzin>>({
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
