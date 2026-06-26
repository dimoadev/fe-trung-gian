import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { registerAccount } from "../../../api/user/action";

export default function ResetPasswordPage() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = async (data) => {
		const res = await registerAccount({
			data: {
				...data,
			},
		});
		if (res?.status === "success") {
			notification.success({
				message: "Cập nhật mật khẩu thành công! Vui lòng đăng nhập.",
			});
			navigate("/auth/login");
		} else {
			notification.error({
				message: res?.message || "Cập nhật mật khẩu thất bại! Vui lòng thử lại.",
			});
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
			{/* Left side */}
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center">
				<div className="w-full mx-auto md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 py-10 space-y-6">
					{/* Logo */}
					<div className="w-full flex justify-start">
						<div className="rounded-md flex items-center justify-center">
							<img
								src="/logo2.png"
								alt="Login background"
								className="w-[50px] h-[50px]"
							/>
						</div>
					</div>

					{/* Header */}
					<div className="w-full">
						<h1 className="text-3xl md:text-4xl font-semibold mb-2">
							Cập nhật <span className="text-cyan-400">mật khẩu!</span>
						</h1>
						<p className="text-gray-400 mb-8">
							Tạo mật khẩu mới cho tài khoản của bạn.
						</p>
					</div>

					{/* Form */}
					<form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
						{/* Password */}
						<div>
							<label className="block text-sm mb-1">Mật khẩu</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									{...register("password", {
										required: "Mật khẩu không được để trống",
										minLength: {
											value: 6,
											message: "Mật khẩu phải ít nhất 6 ký tự",
										},
									})}
									className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
										errors.password
											? "border-red-500 focus:ring-red-300"
											: "focus:ring-cyan-400"
									}`}
								/>
								<span
									className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-white"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
								</span>
								{errors.password && (
									<p className="text-red-500 text-sm mt-1">
										{errors.password.message}
									</p>
								)}
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label className="block text-sm mb-1">Xác nhận mật khẩu</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? "text" : "password"}
									{...register("confirmPassword", {
										required: "Vui lòng xác nhận mật khẩu",
										validate: (value) =>
											value === watch("password", "") || "Mật khẩu không khớp",
									})}
									className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
										errors.confirmPassword
											? "border-red-500 focus:ring-red-300"
											: "focus:ring-cyan-400"
									}`}
								/>
								<span
									className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-white"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? (
										<EyeOutlined />
									) : (
										<EyeInvisibleOutlined />
									)}
								</span>
								{errors.confirmPassword && (
									<p className="text-red-500 text-sm mt-1">
										{errors.confirmPassword.message}
									</p>
								)}
							</div>
						</div>

						<button
							type="submit"
							className="w-full bg-lime-400 hover:bg-lime-300 text-black font-medium py-2 rounded-md mt-2 transition"
						>
							Lưu
						</button>
					</form>

					<p className="text-center text-sm text-gray-400 mt-4">
						Bạn đã có tài khoản?
						<button
							className="text-cyan-400 hover:underline"
							onClick={() => navigate("/auth/login")}
						>
							Đăng nhập
						</button>
					</p>
				</div>
			</div>

			{/* Right side image */}
			<div className="hidden md:flex md:w-1/2">
				<img
					src="/image/resetpass.png"
					alt="Login background"
					className="object-cover w-full h-[100vh]"
				/>
			</div>
		</div>
	);
}
