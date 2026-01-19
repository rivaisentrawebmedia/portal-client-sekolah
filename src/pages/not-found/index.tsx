import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="w-full flex min-h-[80vh] items-center justify-center bg-white px-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-gray-100"
			>
				<div className="flex justify-center mb-4">
					<div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
						<AlertTriangle className="w-8 h-8" />
					</div>
				</div>

				<h1 className="text-3xl font-semibold text-gray-800 mb-2">
					Halaman Tidak Ditemukan
				</h1>

				<p className="text-gray-600 text-sm mb-6 leading-relaxed">
					Sepertinya halaman yang kamu cari tidak tersedia atau telah
					dipindahkan. Silakan periksa kembali alamat URL atau kembali ke
					halaman sebelumnya.
				</p>

				<Button
					onClick={() => navigate(-1)}
					className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all shadow-sm"
				>
					<ArrowLeft className="w-4 h-4" />
					Kembali
				</Button>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.5 }}
					className="mt-6 text-center text-sm text-gray-500 italic"
				>
					— Syamil Dev —
				</motion.p>
			</motion.div>
		</div>
	);
}
