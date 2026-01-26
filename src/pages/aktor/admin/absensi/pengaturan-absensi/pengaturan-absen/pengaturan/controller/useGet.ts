import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getPengaturanAbsensi,
	type PaginatedResponse,
	type PengaturanAbsensi,
} from "../model";

export function useGetPengaturanAbsensi() {
	const query = useQuery<PaginatedResponse<PengaturanAbsensi>>({
		queryKey: ["pengaturan-absensi"],
		queryFn: () => getPengaturanAbsensi(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data,
		meta: query.data?.meta,
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
