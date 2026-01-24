import { ButtonAjukanIzin } from "./button/ButtonAjukanIzin";

export function ButtonDraft({
	checkedPool,
	loading,
	setIsShow,
	setCheckedPool,
	setStatus,
}: {
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
	checkedPool: string[];
	loading: boolean;
	setCheckedPool: React.Dispatch<React.SetStateAction<string[]>>;
	setStatus: React.Dispatch<
		React.SetStateAction<
			"draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan" | undefined
		>
	>;
}) {
	return (
		<div className="flex items-center gap-2">
			<ButtonAjukanIzin
				checkedPool={checkedPool}
				loading={loading}
				setCheckedPool={setCheckedPool}
				setIsShow={setIsShow}
				setStatus={setStatus}
			/>
		</div>
	);
}
