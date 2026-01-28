import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type MadingStats, getMadingStats } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetMadingStats() {
	const query = useQuery<PaginatedResponseByID<MadingStats>>({
		queryKey: ["mading"],
		queryFn: () => getMadingStats(),
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
