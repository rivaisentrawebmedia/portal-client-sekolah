import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { usePathname } from "@/utils/usePathname";
import type { PaginatedResponseByID } from "@/provider/axios";
import { getPermohonanIzinByID, type PermohonanIzin } from "../model";

export function useGetPermohonanIzinByID() {
	const { sixthPathname } = usePathname();

	const query = useQuery<PaginatedResponseByID<PermohonanIzin>>({
		queryKey: ["pengajuan-izin", sixthPathname],
		queryFn: () => getPermohonanIzinByID({ id: sixthPathname || "" }),
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
