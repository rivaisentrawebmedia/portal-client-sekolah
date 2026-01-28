import { JokoArrowBack } from "@/assets/icons/JokoArrowBack";
import { useNavigate } from "react-router-dom";

export function ArrowBack({
	link,
	title,
	background = "#F6FFF5",
	border = "#9EDAA0",
	text = "#1E5916",
}: {
	title: string;
	link: string;
	border?: string;
	background?: string;
	text?: string;
}) {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				if (link) {
					navigate(link);
				}
			}}
			type="button"
			className="flex items-center gap-2.5 w-fit"
		>
			<div
				className="flex border rounded-full items-center justify-center w-10 h-10"
				style={{
					borderColor: border,
					backgroundColor: background,
				}}
			>
				<JokoArrowBack />
			</div>
			<p
				className="text-2xl text-left font-medium"
				style={{
					color: text,
				}}
			>
				{title}
			</p>
		</button>
	);
}
