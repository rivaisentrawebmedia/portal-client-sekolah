import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type Prestasi, getPrestasiByID } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";

export function useGetPrestasiByID() {
	const { fourthPathname } = usePathname();

	const query = useQuery<PaginatedResponseByID<Prestasi>>({
		queryKey: ["prestasi", fourthPathname],
		queryFn: () =>
			getPrestasiByID({
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
