import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { usePathname } from "@/utils/usePathname";
import type { PaginatedResponseByID } from "@/provider/axios";
import { getKegiatanHarianByID, type KegiatanHarian } from "../model";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export function useGetKegiatanHarianByID() {
	const [params] = useSearchParams();
	const tahun = params?.get("tahun") || dayjs().locale("id").format("YYYY");

	const { seventhPathname } = usePathname();

	const query = useQuery<PaginatedResponseByID<KegiatanHarian>>({
		queryKey: ["kegiatan-harian", seventhPathname],
		queryFn: () =>
			getKegiatanHarianByID({ id: seventhPathname || "", tahun: tahun }),
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
