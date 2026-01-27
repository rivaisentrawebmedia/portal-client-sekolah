import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponseByID } from "@/provider/axios";
import { getVisitByID, type GetVisitParams } from "../model";
import type { Visit } from "../../list-visit/model";

export function useGetVisitByID(params: GetVisitParams) {
	const query = useQuery<PaginatedResponseByID<Visit>>({
		queryKey: ["visit", params],
		queryFn: () => getVisitByID(params),
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
