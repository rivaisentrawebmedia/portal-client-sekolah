import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getPermohonanCuti,
	type GetPermohonanCutiParams,
	type PermohonanCuti,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetPermohonanCuti(params: GetPermohonanCutiParams) {
	const query = useQuery<PaginatedResponse<PermohonanCuti>>({
		queryKey: ["pengajuan-cuti", params],
		queryFn: () => getPermohonanCuti(params),
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
