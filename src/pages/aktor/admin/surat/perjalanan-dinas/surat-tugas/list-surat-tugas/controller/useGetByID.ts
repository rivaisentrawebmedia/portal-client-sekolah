import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getSuratTugasByID, type SuratTugasByID } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";

export function useGetSuratTugasByID() {
	const { fivethPathname } = usePathname();
	const query = useQuery<PaginatedResponseByID<SuratTugasByID>>({
		queryKey: ["surat-tugas", fivethPathname],
		queryFn: () => getSuratTugasByID({ id: fivethPathname || "" }),
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
