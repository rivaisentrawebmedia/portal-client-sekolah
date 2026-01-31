import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";
import { getDokumentasiSPPD, type DokumentasiSPPD } from "../model";

export function useGetDokumentasiSPPD() {
	const { fivethPathname } = usePathname();
	const query = useQuery<PaginatedResponse<DokumentasiSPPD>>({
		queryKey: ["dokumentasi-sppd", fivethPathname],
		queryFn: () => getDokumentasiSPPD({ surat_tugas_id: fivethPathname || "" }),
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
