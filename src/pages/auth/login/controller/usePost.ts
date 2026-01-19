import AxiosClient from "@/provider/axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../model";

export function usePostLogin() {
	const navigate = useNavigate();
	const [num1, setNum1] = useState<number>();
	const [num2, setNum2] = useState<number>();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const [isRemember, setIsRemember] = useState(false);

	const getRandomNumberBelow20 = (): number => {
		return Math.floor(Math.random() * 10); // hasil 0–9
	};

	const generateCaptchaNumbers = () => {
		const a = getRandomNumberBelow20();
		const b = getRandomNumberBelow20();
		setNum1(a);
		setNum2(b);
	};

	useEffect(() => {
		generateCaptchaNumbers();
	}, []);

	function handleCheckedIsRemember(value: boolean) {
		setIsRemember(value);
	}

	const handleSave = async () => {
		const values = form.watch();

		const payload: LoginFormValues = {
			hasil: values?.hasil,
			email: values?.email,
			password: values?.password,
		};

		if ((num1 || 0) + (num2 || 0) !== Number(values?.hasil)) {
			return toast.error("Hasil penjumlahan salah");
		}

		// buat loading toast
		const toastId = toast.loading("Sedang login...");

		try {
			const res = await AxiosClient.post("/login", payload);

			if (res.status === 200) {
				Cookies.set("token", res?.data?.data?.token);

				toast.update(toastId, {
					render: "Login berhasil",
					type: "success",
					isLoading: false,
					autoClose: 3000,
				});

				setTimeout(() => {
					navigate("/modules");
				}, 1000);
			}
		} catch (err: any) {
			toast.update(toastId, {
				render:
					err?.response?.data?.errors?.email ||
					"Terjadi kesalahan, silakan coba lagi.",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		}
	};

	return {
		form,
		handleSave,
		handleCheckedIsRemember,
		isRemember,
		num1,
		num2,
	};
}
