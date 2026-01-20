import { useQuery } from "@tanstack/react-query";
import { getKontrolAkses } from "../model";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function useGetKontrolAkses() {
	const [params] = useSearchParams();
	const user_id = params.get("user-id");

	const [modul, setModul] = useState<string | undefined>(undefined);

	const query = useQuery({
		queryKey: ["manajemen-user", "kontrol-akses", user_id],
		queryFn: () => getKontrolAkses(user_id || ""),
		enabled: !!user_id,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	/**
	 * ✅ Set modul pertama jika:
	 * - data sudah ada
	 * - modul belum diset
	 */
	useEffect(() => {
		if (!modul && query.data?.data?.length) {
			setModul(query.data.data[0].id);
		}
	}, [query.data, modul]);

	return {
		data: query.data?.data,
		modul,
		setModul,
		loading: query.isLoading,
		error: query.error,
	};
}
