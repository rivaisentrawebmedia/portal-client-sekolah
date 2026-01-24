import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProfilOrganisasi, PaginatedResponse } from "../model";
import { getProfilOrganisasi } from "../model/dataAPI";

export function useGetProfilOrganisasi() {
	const query = useQuery<PaginatedResponse<ProfilOrganisasi>>({
		queryKey: ["profil-organisasi"],
		queryFn: () => getProfilOrganisasi(),
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
