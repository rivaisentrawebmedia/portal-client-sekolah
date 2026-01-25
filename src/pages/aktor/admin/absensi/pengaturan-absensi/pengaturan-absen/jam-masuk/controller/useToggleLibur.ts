import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { JamMasuk } from "../model";
import AxiosClient from "@/provider/axios";

export function useToggleLibur() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ payload }: { payload: JamMasuk }) =>
			AxiosClient.post("/presensi/pengaturan-absensi-hari", payload),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["pengaturan-absensi-hari"],
			});
		},
	});
}
