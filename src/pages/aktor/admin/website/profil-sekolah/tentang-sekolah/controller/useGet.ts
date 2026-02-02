import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTentangSekolah, type TentangSekolah } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetTentangSekolah() {
	const query = useQuery<PaginatedResponseByID<TentangSekolah>>({
		queryKey: ["tentang-sekolah"],
		queryFn: () => getTentangSekolah(),
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
