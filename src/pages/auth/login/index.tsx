import AuthLayout from "@/layouts/auth-layout";
import { FormLogin } from "./components";

export default function LoginPage() {
	return (
		<>
			<AuthLayout
				description="Halo, selamat datang kembali. Silakan masukkan username dan password
				untuk melanjutkan"
			>
				<FormLogin />
			</AuthLayout>
		</>
	);
}
