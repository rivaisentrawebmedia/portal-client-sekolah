import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getSPPD, type SPPD } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";

export function useGetSPP() {
	const { fivethPathname } = usePathname();
	const query = useQuery<PaginatedResponseByID<SPPD>>({
		queryKey: ["sppd", fivethPathname],
		queryFn: () => getSPPD({ surat_tugas_id: fivethPathname || "" }),
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
