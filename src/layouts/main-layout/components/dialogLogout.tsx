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
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
import { useState } from "react";

export function DialogLogout({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		try {
			setLoading(true);

			// 🔹 HIT API LOGOUT
			await AxiosClient.post("/portal-sekolah/logout");

			// 🔹 HAPUS TOKEN
			Cookies.remove("token");

			// 🔹 REDIRECT
			navigate("/login");

			onOpenChange(false);
		} catch (error: any) {
			toast.error(
				error?.response?.data?.error || "Gagal logout, silakan coba lagi",
			);
		} finally {
			setLoading(false);
		}
	};

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
					<Button
						variant="outline"
						disabled={loading}
						onClick={() => onOpenChange(false)}
					>
						Batal
					</Button>
					<Button
						variant="destructive"
						disabled={loading}
						onClick={handleLogout}
					>
						{loading ? "Logging out..." : "Logout"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
