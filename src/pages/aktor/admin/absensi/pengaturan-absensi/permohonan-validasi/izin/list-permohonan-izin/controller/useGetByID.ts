import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PermohonanIzin, PaginatedResponseByID } from "../model";
import { getPermohonanIzinByID } from "../model/dataAPI";
import { usePathname } from "@/utils/usePathname";

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
