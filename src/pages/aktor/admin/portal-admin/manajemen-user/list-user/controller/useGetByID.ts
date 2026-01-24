import { useQuery } from "@tanstack/react-query";
import { getManajemenUserByID } from "../model";
import { useSearchParams } from "react-router-dom";

export function useGetManajemenUserByID() {
	const [params] = useSearchParams();
	const user_id = params.get("user-id");

	const query = useQuery({
		queryKey: ["manajemen-user", user_id],
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
