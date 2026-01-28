import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type Berita, getBeritaByID } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";

export function useGetBeritaByID() {
	const { fourthPathname } = usePathname();

	const query = useQuery<PaginatedResponseByID<Berita>>({
		queryKey: ["berita", fourthPathname],
		queryFn: () =>
			getBeritaByID({
				id: fourthPathname || "",
			}),
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
