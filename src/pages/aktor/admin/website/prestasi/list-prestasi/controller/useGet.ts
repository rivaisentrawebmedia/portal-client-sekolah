import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPrestasi, type GetPrestasiParams, type Prestasi } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetPrestasi(params: GetPrestasiParams) {
	const query = useQuery<PaginatedResponse<Prestasi>>({
		queryKey: ["prestasi", params],
		queryFn: () => getPrestasi(params),
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
