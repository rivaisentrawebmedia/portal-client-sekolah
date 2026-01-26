import type { PaginatedResponse } from "@/provider/axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getJamMasuk, type JamMasuk } from "../model";

export function useGetJamMasuk() {
	const query = useQuery<PaginatedResponse<JamMasuk>>({
		queryKey: ["pengaturan-absensi-hari"],
		queryFn: () => getJamMasuk(),
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
