import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { VisiMisi, PaginatedResponse } from "../model";
import { getVisiMisi } from "../model/dataAPI";

export function useGetVisiMisi() {
	const query = useQuery<PaginatedResponse<VisiMisi>>({
		queryKey: ["visi-misi"],
		queryFn: () => getVisiMisi(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data ?? undefined,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
