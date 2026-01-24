import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PermohonanIzin, PaginatedResponse } from "../model";
import {
	getPermohonanIzin,
	type GetPermohonanIzinParams,
} from "../model/dataAPI";

export function useGetPermohonanIzin(params: GetPermohonanIzinParams) {
	const query = useQuery<PaginatedResponse<PermohonanIzin>>({
		queryKey: ["pengajuan-izin", params],
		queryFn: () => getPermohonanIzin(params),
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
