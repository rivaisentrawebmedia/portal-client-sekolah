import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function DialogLogout({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const navigate = useNavigate();
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Logout</DialogTitle>
					<DialogDescription>
						Jika Anda logout, sesi Anda akan berakhir dan Anda harus login
						kembali untuk mengakses akun ini.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Batal
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							Cookies.remove("token");
							navigate("/login");
							onOpenChange(false);
						}}
					>
						Logout
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
