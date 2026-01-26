import type { PaginatedResponse } from "@/provider/axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getGaleri, type Galeri } from "../model";

export function useGetGaleri() {
	const query = useQuery<PaginatedResponse<Galeri>>({
		queryKey: ["galeri"],
		queryFn: () => getGaleri(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data ?? [],
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
