import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRiwayatKehadiranByID, type RiwayatKehadiranByID } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";

export function useGetRiwayatKehadiranByID() {
	const { seventhPathname } = usePathname();
	const id = seventhPathname;

	const query = useQuery<PaginatedResponseByID<RiwayatKehadiranByID>>({
		queryKey: ["kehadiran", id],
		queryFn: () => getRiwayatKehadiranByID({ id: id || "" }),
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
