import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type NotifikasiPengajuanCuti, getDashboardNotifikasi } from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetNotifikasiCuti() {
	const query = useQuery<PaginatedResponse<NotifikasiPengajuanCuti>>({
		queryKey: ["pengajuan-cuti"],
		queryFn: () => getDashboardNotifikasi(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data ?? [],
		meta: query.data?.meta,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
