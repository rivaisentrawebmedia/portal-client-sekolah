import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { JamMasuk, PaginatedResponse } from "../model";
import { getJamMasuk } from "../model/dataAPI";

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
