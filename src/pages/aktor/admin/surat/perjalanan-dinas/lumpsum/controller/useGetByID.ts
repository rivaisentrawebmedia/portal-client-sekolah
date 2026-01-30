import type { PaginatedResponseByID } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLumpsumSPPDByID, type LumpsumSPPDByID } from "../model";

export function useGetLumpsumSPPDByID() {
	const { fivethPathname, seventhPathname } = usePathname();
	const query = useQuery<PaginatedResponseByID<LumpsumSPPDByID>>({
		queryKey: ["lumpsum-sppd", fivethPathname],
		queryFn: () =>
			getLumpsumSPPDByID({
				surat_tugas_id: fivethPathname || "",
				pegawai_id: seventhPathname || "",
			}),
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
