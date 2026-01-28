import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type TagAgenda, getTagAgenda } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetTagAgenda() {
	const query = useQuery<PaginatedResponse<TagAgenda>>({
		queryKey: ["tag-agenda"],
		queryFn: () => getTagAgenda(),
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
