import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type TagMading, getTagMading } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetTagMading() {
	const query = useQuery<PaginatedResponse<TagMading>>({
		queryKey: ["tag-mading"],
		queryFn: () => getTagMading(),
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
