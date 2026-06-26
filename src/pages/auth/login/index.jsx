import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { notification } from "antd";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { signInAccount, signInGoogle } from "../../../api/user/action";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useMoney } from "../../../context/MonetContext";

export default function LoginPage() {
	const [showLogin, setShowLogin] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	// const responseFacebook = (response) => {
	// 	console.log(response);
	// };
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});
	const { trigger } = useMoney();
	const onSubmit = async (data) => {
		const res = await signInAccount({
			data: {
				...data,
			},
		});

		if (res?.status === "success") {
			localStorage.setItem("token", res?.data?.accessToken);
			localStorage.setItem("refresh_token", res?.data?.refreshToken);
			localStorage.setItem("axu", JSON.stringify(res?.data?.user));
			trigger();
			navigate("/dashboard");
		} else {
			notification.error({
				message: "Đăng nhập thất bại!",
				description: res?.message || "Vui lòng thử lại.",
			});
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
			{/* Left side */}
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center">
				<div className="w-full mx-auto md:w-2/3 flex flex-col justify-center items-center px-8 md:px-16 py-10 space-y-6">
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
							Hãy cùng <span className="text-cyan-400">tham gia!</span>
						</h1>
						<p className="text-gray-400 mb-8">
							Đăng nhập JackpotClub để bắt đầu trải nghiệm.
						</p>
					</div>

					{/* Form */}
					<div className="w-full space-y-4">
						<div className="flex justify-center gap-4 flex-col">
							<GoogleOAuthProvider clientId="1055143084339-qdrd50fjq9nuocrajsprmasnb1dmkptg.apps.googleusercontent.com">
								<GoogleLogin
									onSuccess={async (credentialResponse) => {
										const res = await signInGoogle({
											data: {
												token: credentialResponse.credential,
												provider: "google",
											},
										});
										if (res?.status === "success") {
											localStorage.setItem("token", res?.data?.accessToken);
											localStorage.setItem(
												"refresh_token",
												res?.data?.refreshToken
											);
											localStorage.setItem(
												"axu",
												JSON.stringify(res?.data?.user)
											);
											trigger();
											navigate("/dashboard");
										} else {
											notification.error(
												"Đăng nhập thất bại, vui lòng thử lại!"
											);
										}
									}}
									onError={() =>
										notification.error("Đăng nhập thất bại, vui lòng thử lại!")
									}
								/>
							</GoogleOAuthProvider>
							{/* <FacebookLogin
								appId="25026231423674498"
								autoLoad={true}
								//fields="name,email,picture"
								//scope="public_profile,user_friends,user_actions.books"
								callback={responseFacebook}
								size="medium"
								cssClass="h-[38px] w-full bg-blue-600 text-white text-[14px] rounded-md hover:bg-blue-700 transition flex items-center justify-center"
							/> */}
						</div>

						<div className="relative flex items-center justify-center">
							<span className="absolute bg-black px-2 text-gray-500 text-sm">
								hoặc
							</span>
							<div className="w-full border-t border-gray-700 mt-3"></div>
						</div>
						{showLogin && (
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

								<div className="mt-2">
									<label className="block text-sm mb-1">Mật khẩu</label>
									<div className="relative">
										<input
											type={showPassword ? "text" : "password"}
											{...register("password", {
												required: "Mật khẩu không được để trống",
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
											{showPassword ? (
												<EyeOutlined />
											) : (
												<EyeInvisibleOutlined />
											)}
										</span>
										{errors.password && (
											<p className="text-red-500 text-sm mt-1">
												{errors.password.message}
											</p>
										)}
									</div>
								</div>

								<div className="flex items-center justify-between text-sm mt-2 mb-2">
									<label className="flex items-center space-x-2">
										<span></span>
									</label>
									<button
										href="/auth/forgot-password"
										onClick={() => navigate("/auth/forgot-password")}
										className="text-cyan-400 hover:underline"
									>
										Quên mật khẩu?
									</button>
								</div>

								<button
									type="submit"
									className="w-full bg-lime-400 hover:bg-lime-300 text-black font-medium py-2 rounded-md mt-2 transition"
								>
									Đăng nhập
								</button>
							</form>
						)}
					</div>
					<p className="text-center text-sm text-gray-400 mt-4">
						Đăng nhập bằng
						<button
							onClick={() => setShowLogin(true)}
							className="text-cyan-400 hover:underline ml-1"
						>
							Tài khoản
						</button>
					</p>
					<p className="text-center text-sm text-gray-400 mt-4">
						Bạn chưa có tài khoản?{" "}
						<button
							className="text-cyan-400 hover:underline"
							onClick={() => navigate("/auth/register")}
						>
							Đăng ký
						</button>
					</p>
				</div>
			</div>
			{/* Right side image */}
			<div className="hidden md:flex md:w-1/2">
				<img
					src="/image/imglogin.png"
					alt="Login background"
					className="object-cover w-full h-[100vh]"
				/>
			</div>
		</div>
	);
}
