import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getSuratTugasPegawai,
	type GetSuratTugasPegawaiParams,
	type SuratTugasPegawai,
} from "../model";
import type { PaginatedResponse } from "@/provider/axios";

export function useGetSuratTugasPegawai(params: GetSuratTugasPegawaiParams) {
	const query = useQuery<PaginatedResponse<SuratTugasPegawai>>({
		queryKey: ["surat-tugas-pegawai", params],
		queryFn: () => getSuratTugasPegawai(params),
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
