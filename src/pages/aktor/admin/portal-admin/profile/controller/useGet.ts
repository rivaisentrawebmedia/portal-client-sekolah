import type { PaginatedResponseByID } from "@/provider/axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProfile, type Profile } from "../model";

export function useGetProfile() {
	const query = useQuery<PaginatedResponseByID<Profile>>({
		queryKey: ["profile"],
		queryFn: () => getProfile(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});

	return {
		data: query.data?.data,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
