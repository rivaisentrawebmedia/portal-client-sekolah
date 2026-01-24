import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import type { StatusAbsen } from "../model";
import { usePostToggleStatusAbsensi } from "../controller";

export function ToggleStatusAbsensi({ detail }: { detail?: StatusAbsen }) {
	const [active, setActive] = useState(false);

	const { mutate, isPending } = usePostToggleStatusAbsensi();

	useEffect(() => {
		setActive(!!detail?.perlu_absen);
	}, [detail?.perlu_absen]);

	const handleToggle = () => {
		if (!detail?.id) return;

		const nextState = !active;

		// optimistic UI
		setActive(nextState);

		mutate(
			{
				payload: {
					id: detail.id,
					perlu_absensi: nextState,
				},
			},
			{
				onError: () => {
					// rollback kalau gagal
					setActive((prev) => !prev);
				},
			},
		);
	};

	return (
		<div className="flex items-center gap-2 rounded-md w-full">
			<Toggle
				pressed={active}
				disabled={isPending}
				onPressedChange={handleToggle}
				variant="default"
				className="p-0 data-[state=on]:bg-transparent"
			>
				{active ? (
					<div className="flex bg-[#27CD7F] items-center justify-end w-8 rounded-full p-0.5">
						<div className="w-3 h-3 bg-white rounded-full" />
					</div>
				) : (
					<div className="flex bg-[#999999] items-center w-8 rounded-full p-0.5">
						<div className="w-3 h-3 bg-white rounded-full" />
					</div>
				)}
			</Toggle>
		</div>
	);
}
