import { useQuery } from "@tanstack/react-query";
import { getManajemenUserByID } from "../../manajemen-user/list-user/model";

export function useGetProfilUser(user_id: string) {
	const query = useQuery({
		queryKey: ["profile", user_id],
		queryFn: () => getManajemenUserByID(user_id || ""),
		enabled: !!user_id, // ⬅️ penting
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	return {
		data: query.data?.data,
		loading: query.isLoading,
		error: query.error,
	};
}
