import type { PaginatedResponse } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLumpsumSPPD, type LumpsumSPPD } from "../model";

export function useGetLumpsumSPPD() {
	const { fivethPathname } = usePathname();
	const query = useQuery<PaginatedResponse<LumpsumSPPD>>({
		queryKey: ["lumpsum-sppd", fivethPathname],
		queryFn: () => getLumpsumSPPD({ surat_tugas_id: fivethPathname || "" }),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data || [],
		meta: query.data?.meta,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
