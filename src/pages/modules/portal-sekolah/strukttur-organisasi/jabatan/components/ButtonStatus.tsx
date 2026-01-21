import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import type { Jabatan } from "../model";
import { usePostToggle } from "../controller/usePostToggleJabatan";

export function ToggleStatusClient({ detail }: { detail?: Jabatan }) {
	const [active, setActive] = useState(false);
	const { toggleAkses, disabled } = usePostToggle();

	useEffect(() => {
		setActive(!!detail?.is_utama);
	}, [detail?.is_utama]);

	const handleToggle = () => {
		if (!detail) return;

		const nextState = !active;

		// Optimistic UI
		setActive(nextState);

		toggleAkses(detail, nextState);
	};

	return (
		<div className="flex items-center justify-center gap-2 w-full">
			<Toggle
				pressed={active}
				disabled={disabled}
				onPressedChange={handleToggle}
				className="p-0 data-[state=on]:bg-transparent"
			>
				<div
					className={`flex w-8 rounded-full p-0.5 ${
						active ? "bg-[#27CD7F]" : "bg-[#999999]"
					}`}
				>
					<div className="w-3 h-3 bg-white rounded-full" />
				</div>
			</Toggle>
		</div>
	);
}
