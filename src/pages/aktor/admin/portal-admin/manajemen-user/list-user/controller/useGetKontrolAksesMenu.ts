import { useQuery } from "@tanstack/react-query";
import { getKontrolAksesMenu } from "../model";
import { useSearchParams } from "react-router-dom";

export function useGetKontrolAksesMenu(modul_id: string) {
	const [params] = useSearchParams();
	const user_id = params.get("user-id");

	const query = useQuery({
		queryKey: [
			"manajemen-user",
			"kontrol-akses",
			"kontrol-akses-menu",
			user_id,
			modul_id,
		],
		queryFn: () => getKontrolAksesMenu(user_id || "", modul_id),
		enabled: !!user_id && !!modul_id,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	return {
		data: query.data?.data,
		loading: query.isLoading,
		error: query.error,
	};
}
