import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { SasaranSekolah } from "../model";
import { getSasaranSekolah } from "../model/dataAPI";
import type { PaginatedResponseByID } from "@/provider/axios";

export function useGetSasaranSekolah() {
	const query = useQuery<PaginatedResponseByID<SasaranSekolah>>({
		queryKey: ["sasaran-sekolah"],
		queryFn: () => getSasaranSekolah(),
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
