import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { StatusAbsen, PaginatedResponse } from "../model";
import { getStatusAbsen, type GetStatusAbsenParams } from "../model/dataAPI";

export function useGetStatusAbsen(params: GetStatusAbsenParams) {
	const query = useQuery<PaginatedResponse<StatusAbsen>>({
		queryKey: ["pegawai-absensi", params],
		queryFn: () => getStatusAbsen(params),
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
