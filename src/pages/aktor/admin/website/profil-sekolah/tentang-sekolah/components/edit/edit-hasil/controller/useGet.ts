import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { HasilSekolah } from "../model";
import { getHasilSekolah } from "../model/dataAPI";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetHasilSekolah() {
	const query = useQuery<PaginatedResponseByID<HasilSekolah>>({
		queryKey: ["hasil-sekolah"],
		queryFn: () => getHasilSekolah(),
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
