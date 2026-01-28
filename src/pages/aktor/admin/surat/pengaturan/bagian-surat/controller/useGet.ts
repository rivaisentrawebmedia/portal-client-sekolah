import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getBagianSurat,
	type GetBagianSuratParams,
	type BagianSurat,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetBagianSurat(params: GetBagianSuratParams) {
	const query = useQuery<PaginatedResponse<BagianSurat>>({
		queryKey: ["bagian-surat", params],
		queryFn: () => getBagianSurat(params),
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
