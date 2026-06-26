import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../api/user/action";
import { notification } from "antd";

export default function ResetPassPage() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = async (data) => {
		const res = await resetPassword({
			data: {
				...data,
			},
		});
		if (res?.status === "success") {
			notification.success({
				message: "Yêu cầu đặt lại mật khẩu thành công!",
				description: "Vui lòng kiểm tra email của bạn.",
			});
			navigate("/auth/login");
		} else {
			notification.error({
				message: "Yêu cầu đặt lại mật khẩu thất bại!",
				description: "Vui lòng thử lại.",
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
							Quên <span className="text-cyan-400">mật khẩu!</span>
						</h1>
						<p className="text-gray-400 mb-8">
							Nhập email để nhận mật khẩu đăng nhập mới.
						</p>
					</div>

					{/* Form */}
					<div className="w-full space-y-4">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div>
								<label className="block text-sm mb-1">Email</label>
								<div className="relative">
									<input
										type="email"
										{...register("email", {
											required: "Email không được để trống",
											pattern: {
												value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
												message: "Email không hợp lệ",
											},
										})}
										className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
											errors.email
												? "border-red-500 focus:ring-red-300"
												: "focus:ring-cyan-400"
										}`}
										placeholder="Nhập email của bạn"
									/>
									{errors.email && (
										<p className="text-red-500 text-sm mt-1">
											{errors.email.message}
										</p>
									)}
								</div>
							</div>
							<button
								type="submit"
								className=" mt-3 w-full bg-lime-400 hover:bg-lime-300 text-black font-medium py-2 rounded-md mt-2 transition"
							>
								Gửi yêu cầu
							</button>
						</form>
					</div>
					<p className="text-center text-sm text-gray-400 mt-4"></p>
					<p className="text-center text-sm text-gray-400 mt-4">
						Bạn đã có tài khoản?{" "}
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
					src="/image/fogotpass.png"
					alt="Login background"
					className="object-cover w-full h-[100vh]"
				/>
			</div>
		</div>
	);
}
