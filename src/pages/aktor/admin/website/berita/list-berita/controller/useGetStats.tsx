import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type BeritaStats, getBeritaStats } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetBeritaStats() {
	const query = useQuery<PaginatedResponseByID<BeritaStats>>({
		queryKey: ["berita"],
		queryFn: () => getBeritaStats(),
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
