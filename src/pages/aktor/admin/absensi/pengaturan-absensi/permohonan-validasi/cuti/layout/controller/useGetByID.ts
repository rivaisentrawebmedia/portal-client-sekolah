import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PermohonanCuti, PaginatedResponseByID } from "../model";
import { getPermohonanCutiByID } from "../model/dataAPI";
import { usePathname } from "@/utils/usePathname";

export function useGetPermohonanCutiByID() {
	const { sixthPathname } = usePathname();

	const query = useQuery<PaginatedResponseByID<PermohonanCuti>>({
		queryKey: ["pengajuan-cuti", sixthPathname],
		queryFn: () => getPermohonanCutiByID({ id: sixthPathname || "" }),
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
