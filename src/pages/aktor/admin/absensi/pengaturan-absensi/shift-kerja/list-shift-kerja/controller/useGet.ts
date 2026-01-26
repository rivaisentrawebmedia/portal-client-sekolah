import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getShiftKerja,
	type GetShiftKerjaParams,
	type ShiftKerja,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetShiftKerja(params: GetShiftKerjaParams) {
	const query = useQuery<PaginatedResponse<ShiftKerja>>({
		queryKey: ["shift-kerja", params],
		queryFn: () => getShiftKerja(params),
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
