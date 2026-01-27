import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRekapPerOrang,
	type GetRekapPerOrangParams,
	type RekapPerOrangByID,
} from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetRekapPerOrangByID(params: GetRekapPerOrangParams) {
	const query = useQuery<PaginatedResponseByID<RekapPerOrangByID>>({
		queryKey: ["laporan-per-orang", params],
		queryFn: () => getRekapPerOrang(params),
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
