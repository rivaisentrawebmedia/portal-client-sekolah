import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type Pengumuman, getPengumumanByID } from "../model";
import type { PaginatedResponseByID } from "@/provider/axios";
import { usePathname } from "@/utils/usePathname";

export function useGetPengumumanByID() {
	const { fourthPathname } = usePathname();

	const query = useQuery<PaginatedResponseByID<Pengumuman>>({
		queryKey: ["pengumuman", fourthPathname],
		queryFn: () =>
			getPengumumanByID({
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
