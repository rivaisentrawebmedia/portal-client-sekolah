import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type PrestasiStats, getPrestasiStats } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetPrestasiStats() {
	const query = useQuery<PaginatedResponseByID<PrestasiStats>>({
		queryKey: ["prestasi"],
		queryFn: () => getPrestasiStats(),
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
