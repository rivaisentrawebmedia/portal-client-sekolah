import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getRiwayatKehadiranPerBulanChart,
	type ChartRiwayatKehadiran,
	type GetRiwayatKehadiranPerBulanParams,
} from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetRiwayatKehadiranPerBulanChart(
	params: GetRiwayatKehadiranPerBulanParams,
) {
	const query = useQuery<PaginatedResponseByID<ChartRiwayatKehadiran>>({
		queryKey: ["kehadiran-chart", params],
		queryFn: () => getRiwayatKehadiranPerBulanChart(params),
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
