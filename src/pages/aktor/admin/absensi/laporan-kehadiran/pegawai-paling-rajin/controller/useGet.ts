import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getPegawaiPalingRajin,
	type GetPegawaiPalingRajinParams,
	type PegawaiPalingRajin,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetPegawaiPalingRajin(params: GetPegawaiPalingRajinParams) {
	const query = useQuery<PaginatedResponse<PegawaiPalingRajin>>({
		queryKey: ["pegawai-paling-rajin", params],
		queryFn: () => getPegawaiPalingRajin(params),
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
