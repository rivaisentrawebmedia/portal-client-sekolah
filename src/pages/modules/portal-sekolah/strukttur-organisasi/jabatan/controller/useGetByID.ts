import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedResponseRiwayat, RiwayatPejabat } from "../model";
import { getRiwayatPejabat } from "../model/dataAPI";
import { usePathname } from "@/utils/usePathname";

export function useGetJabatanByID() {
	const { fourthPathname } = usePathname();
	const id = fourthPathname || "";

	const query = useQuery<PaginatedResponseRiwayat<RiwayatPejabat>>({
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
