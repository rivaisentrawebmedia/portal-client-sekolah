import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Profile, PaginatedResponse } from "../model";
import { getProfile } from "../model/dataAPI";

export function useGetProfile() {
	const query = useQuery<PaginatedResponse<Profile>>({
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
