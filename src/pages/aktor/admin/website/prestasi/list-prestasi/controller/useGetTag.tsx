import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type TagPrestasi, getTagPrestasi } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetTagPrestasi() {
	const query = useQuery<PaginatedResponse<TagPrestasi>>({
		queryKey: ["tag-prestasi"],
		queryFn: () => getTagPrestasi(),
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
