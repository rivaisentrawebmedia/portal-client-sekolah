import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getManajemenUser,
	type GetManajemenUserParams,
	type ManajemenUser,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetManajemenUser(params: GetManajemenUserParams) {
	const query = useQuery<PaginatedResponse<ManajemenUser>>({
		queryKey: ["manajemen-user", params],
		queryFn: () => getManajemenUser(params),
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
