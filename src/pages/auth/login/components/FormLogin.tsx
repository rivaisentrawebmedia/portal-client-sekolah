import { Form } from "@/components/ui/form";
import { usePostLogin } from "../controller";
import { InputCommon } from "@/components/common/basic-input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { toast } from "react-toastify";

export function FormLogin() {
	const { form, handleSave, num1, num2, handleCheckedIsRemember, isRemember } =
		usePostLogin();
	return (
		<>
			<section>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSave)}
						className="flex flex-col gap-4"
					>
						<InputCommon
							form={form}
							name="email"
							placeholder="Masukkan Email"
							type="email"
							label="Email"
						/>

						<InputCommon
							form={form}
							name="password"
							placeholder="Masukkan Password Anda"
							type="password"
							label="Password"
						/>

						<InputCommon
							form={form}
							name="hasil"
							placeholder="Masukkan hasil perhitungan "
							type="text"
							label={`Hasil dari ${num1} + ${num2}`}
						/>

						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={isRemember}
									onChange={(e) => {
										console.log(e);
										handleCheckedIsRemember(e.target.checked);
									}}
									className=" accent-[#1E5916]"
									id="toggle"
								/>
								<Label htmlFor="toggle" className="pb-1">
									Ingat Saya
								</Label>
							</div>
							<Link
								to={"/lupa-password"}
								className="text-primary hover:text-primary/50 duration-300 transition-colors underline underline-offset-4"
							>
								Lupa Password?
							</Link>
						</div>

						<Button
							type="submit"
							onClick={async () => {
								const isValid = await form.trigger();
								if (!isValid) {
									const invalidFields = Object.entries(
										form.formState.errors,
									).map(([field, error]) => ({
										field,
										error: error?.message,
									}));
									return toast.error(invalidFields?.[0]?.error?.toString());
								}
							}}
							className="bg-[#1E5916] text-white flex items-center gap-2 rounded-full hover:bg-[#1E5916]/80"
						>
							<LogIn />
							<p>Masuk</p>
						</Button>
					</form>
				</Form>
			</section>
		</>
	);
}
