import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRekapBulanan,
	type GetRekapBulananParams,
	type RekapBulanan,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetRekapBulanan(params: GetRekapBulananParams) {
	const query = useQuery<PaginatedResponse<RekapBulanan>>({
		queryKey: ["laporan-bulanan", params],
		queryFn: () => getRekapBulanan(params),
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
