import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { usePathname } from "@/utils/usePathname";
import type { PaginatedResponseByID } from "@/provider/axios";
import { getRiwayatPejabat, type RiwayatPejabat } from "../model";

export function useGetJabatanByID() {
	const { fourthPathname } = usePathname();
	const id = fourthPathname || "";

	const query = useQuery<PaginatedResponseByID<RiwayatPejabat>>({
		queryKey: ["riwayat-pejabat", id],
		queryFn: () => getRiwayatPejabat({ id }),
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
