import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Kelompok, PaginatedResponse } from "../model";
import { getKelompok, type GetKelompokParams } from "../model/dataAPI";

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
