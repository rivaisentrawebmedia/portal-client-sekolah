import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type TagBerita, getTagBerita } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetTagBerita() {
	const query = useQuery<PaginatedResponse<TagBerita>>({
		queryKey: ["tag-berita"],
		queryFn: () => getTagBerita(),
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
