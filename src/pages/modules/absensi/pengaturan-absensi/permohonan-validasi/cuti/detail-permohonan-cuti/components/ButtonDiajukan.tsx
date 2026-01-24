import { ButtonBatalkan } from "./button/ButtonBatalkan";
import { ButtonSetuju } from "./button/ButtonSetuju";
import { ButtonTolak } from "./button/ButtonTolak";

export function ButtonDiajukan({
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
		<>
			<div className="flex flex-col md:flex-row md:items-center gap-2">
				<ButtonSetuju
					checkedPool={checkedPool}
					loading={loading}
					setCheckedPool={setCheckedPool}
					setIsShow={setIsShow}
					setStatus={setStatus}
				/>
				<ButtonTolak
					checkedPool={checkedPool}
					loading={loading}
					setCheckedPool={setCheckedPool}
					setStatus={setStatus}
					setIsShow={setIsShow}
				/>
				<ButtonBatalkan
					checkedPool={checkedPool}
					loading={loading}
					setCheckedPool={setCheckedPool}
					setStatus={setStatus}
					setIsShow={setIsShow}
				/>
			</div>
		</>
	);
}
