import type { PaginatedResponseByID } from "@/provider/axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProfilOrganisasi, type ProfilOrganisasi } from "../model";

export function useGetProfilOrganisasi() {
	const query = useQuery<PaginatedResponseByID<ProfilOrganisasi>>({
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
