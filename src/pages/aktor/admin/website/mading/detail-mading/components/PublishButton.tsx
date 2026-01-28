import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ButtonEdit({ id }: { id: string | undefined }) {
	const navigate = useNavigate();

	return (
		<>
			<Button
				type="button"
				variant={"outline"}
				className="border-[#276CCD] text-[#276CCD] hover:text-[#276CCD]"
				onClick={() => {
					navigate(`/admin/website/mading/${id}/edit`);
				}}
			>
				<Pencil size={12} />
				Edit Mading
			</Button>

			<Separator orientation="vertical" />
		</>
	);
}
