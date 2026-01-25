import { Toggle } from "@/components/ui/toggle";
import type { JamMasuk } from "../model";
import { useToggleLibur } from "../controller/useToggleLibur";

export function ToggleLibur({ detail }: { detail?: JamMasuk | null }) {
	const { mutate, isPending } = useToggleLibur();

	if (!detail) return null;

	const handleToggle = () => {
		mutate({
			payload: {
				...detail,
				is_libur: !detail.is_libur,
			},
		});
	};

	return (
		<div className="flex items-center justify-center flex-col gap-2 w-full">
			<Toggle
				pressed={detail.is_libur}
				disabled={isPending}
				onPressedChange={handleToggle}
				className="p-0 data-[state=on]:bg-transparent"
			>
				{detail.is_libur ? (
					<div className="flex flex-col gap-1 items-center justify-center">
						<div className="flex bg-[#27CD7F] items-center justify-end w-8 rounded-full p-0.5">
							<div className="w-3 h-3 bg-white rounded-full" />
						</div>
						<p className="text-[#888] text-xs">Libur</p>
					</div>
				) : (
					<div className="flex flex-col gap-1 items-center justify-center">
						<div className="flex bg-[#999999] items-center w-8 rounded-full p-0.5">
							<div className="w-3 h-3 bg-white rounded-full" />
						</div>
						<p className="text-[#888] text-xs">Tidak Libur</p>
					</div>
				)}
			</Toggle>
		</div>
	);
}
