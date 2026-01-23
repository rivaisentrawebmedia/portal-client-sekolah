import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMenu, type GetMenuParams } from "../model/dataAPI";
import type { Menu, PaginatedResponse } from "../model/dataType";

export function useGetMenu() {
	const modul_id = localStorage.getItem("modul-id") || "";

	const params: GetMenuParams = {
		modul_id: modul_id,
	};

	const query = useQuery<PaginatedResponse<Menu>>({
		queryKey: ["menu", params],
		queryFn: () => getMenu(params),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // ✅ v5 replacement
	});

	return {
		data: query.data?.data ?? [],
		loading: query.isLoading || query.isFetching,
		error: query.error,
	};
}
