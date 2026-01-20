import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import type { KontrolAkses } from "../../../../list-user/model";
import { usePostToggle } from "../../../../list-user/controller";

export function ToggleStatusClient({ detail }: { detail?: KontrolAkses }) {
	const [active, setActive] = useState(false);
	const { toggleAkses, disabled } = usePostToggle();

	useEffect(() => {
		setActive(!!detail?.is_active);
	}, [detail?.is_active]);

	const handleToggle = () => {
		if (!detail?.id) return;

		const nextState = !active;

		// Optimistic UI
		setActive(nextState);

		toggleAkses(detail.id, nextState);
	};

	return (
		<div className="flex items-center gap-2 rounded-md  w-full">
			<Toggle
				pressed={active}
				disabled={disabled}
				onPressedChange={handleToggle}
				variant="default"
				className="p-0 data-[state=on]:bg-transparent"
			>
				{active ? (
					<>
						<div className="flex bg-[#27CD7F] items-center justify-end w-8 rounded-full p-0.5">
							<div className="w-3 h-3 bg-white rounded-full" />
						</div>
						<p className="text-[#27CD7F]">Belum Aktif</p>
					</>
				) : (
					<>
						<div className="flex bg-[#999999] items-center w-8 rounded-full p-0.5">
							<div className="w-3 h-3 bg-white rounded-full" />
						</div>
						<p className="text-[#999999]">Belum Aktif</p>
					</>
				)}
			</Toggle>
		</div>
	);
}
