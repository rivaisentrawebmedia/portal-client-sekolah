import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { TujuanSekolah } from "../model";
import { getTujuanSekolah } from "../model/dataAPI";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetTujuanSekolah() {
	const query = useQuery<PaginatedResponseByID<TujuanSekolah>>({
		queryKey: ["tujuan-sekolah"],
		queryFn: () => getTujuanSekolah(),
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
