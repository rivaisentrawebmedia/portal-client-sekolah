import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponseByID } from "@/provider/axios";
import { getKopSurat, type KopSurat } from "../model";

export function useGetKopSurat() {
	const query = useQuery<PaginatedResponseByID<KopSurat>>({
		queryKey: ["kop-surat"],
		queryFn: () => getKopSurat(),
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
