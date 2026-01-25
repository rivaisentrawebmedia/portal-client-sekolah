import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ShiftKerja } from "../model";
import { getShiftKerjaByID } from "../model/dataAPI";
import { usePathname } from "@/utils/usePathname";

export function useGetShiftKerjaByID() {
	const { fivethPathname } = usePathname();

	const query = useQuery<{ data: ShiftKerja }>({
		queryKey: ["shift-kerja", fivethPathname],
		queryFn: () =>
			getShiftKerjaByID({
				id: fivethPathname || "",
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
