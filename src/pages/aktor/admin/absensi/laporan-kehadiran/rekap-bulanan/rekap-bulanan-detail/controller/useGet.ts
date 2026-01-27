import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRekapBulanan,
	type GetRekapBulananParams,
	type RekapBulananByID,
} from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetRekapBulananByID(params: GetRekapBulananParams) {
	const query = useQuery<PaginatedResponseByID<RekapBulananByID>>({
		queryKey: ["laporan-bulanan", params],
		queryFn: () => getRekapBulanan(params),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
