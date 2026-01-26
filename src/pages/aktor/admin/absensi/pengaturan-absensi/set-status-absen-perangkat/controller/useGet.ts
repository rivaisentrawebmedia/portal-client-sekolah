import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getStatusAbsen,
	type GetStatusAbsenParams,
	type StatusAbsen,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

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
