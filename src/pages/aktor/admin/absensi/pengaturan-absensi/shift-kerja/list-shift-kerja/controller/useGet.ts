import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ShiftKerja, PaginatedResponse } from "../model";
import { getShiftKerja, type GetShiftKerjaParams } from "../model/dataAPI";

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
