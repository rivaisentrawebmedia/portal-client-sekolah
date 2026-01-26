import type { PaginatedResponseByID } from "@/provider/axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getVisiMisi, type VisiMisi } from "../model";

export function useGetVisiMisi() {
	const query = useQuery<PaginatedResponseByID<VisiMisi>>({
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
