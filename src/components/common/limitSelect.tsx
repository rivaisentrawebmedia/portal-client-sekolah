import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

interface LimitSelectProps {
	options?: number[];
	limitKey?: string;
	pageKey?: string;
}

export function LimitSelect({
	options = [10, 20, 50, 100],
	limitKey = "limit",
	pageKey = "page",
}: LimitSelectProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentLimit = searchParams.get(limitKey) ?? options[0].toString();

	const handleChange = (value: string) => {
		const params = new URLSearchParams(searchParams);

		params.set(limitKey, value);
		params.set(pageKey, "1"); // reset page

		setSearchParams(params, { replace: true });
	};

	return (
		<Select value={currentLimit} onValueChange={handleChange}>
			<SelectTrigger className="">
				<SelectValue placeholder="Per halaman" />
			</SelectTrigger>

			<SelectContent>
				{options.map((opt) => (
					<SelectItem key={opt} value={opt.toString()}>
						{opt}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
