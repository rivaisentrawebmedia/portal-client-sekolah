import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type PengumumanStats, getPengumumanStats } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetPengumumanStats() {
	const query = useQuery<PaginatedResponseByID<PengumumanStats>>({
		queryKey: ["pengumuman"],
		queryFn: () => getPengumumanStats(),
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
