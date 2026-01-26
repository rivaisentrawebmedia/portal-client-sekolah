import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/provider/axios";
import { getKelompok, type GetKelompokParams, type Kelompok } from "../model";

export function useGetKelompok(params: GetKelompokParams) {
	const query = useQuery<PaginatedResponse<Kelompok>>({
		queryKey: ["kelompok", params],
		queryFn: () => getKelompok(params),
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
