import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponseByID } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";
import { getLaporanSPPD, type LaporanSPPD } from "../model";

export function useGetLaporanSPPD() {
	const { fivethPathname } = usePathname();
	const query = useQuery<PaginatedResponseByID<LaporanSPPD>>({
		queryKey: ["laporan-sppd", fivethPathname],
		queryFn: () => getLaporanSPPD({ surat_tugas_id: fivethPathname || "" }),
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
