import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home";
import AnalyticPage from "./pages/analytic";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ResetPassPage from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import DashboardPage from "./pages/dashboard";
import PrivateRoute from "./pages/privateRouter";
import DashboardDetailPage from "./pages/dashboard/detailPage";
import { ConfigProvider } from "antd";
import PersonalDetailPage from "./pages/personal/detailPage";
import OutInDetailPage from "./pages/out-in/detailPage";
import AdminRoute from "./pages/adminRouter";
import AdminDetailPage from "./pages/admin/ruttienPage";
import SixManagePage from "./pages/admin/655Page";
import { MoneyProvider } from "./context/MonetContext";

const App = () => {
	return (
		<>
			<Toaster />

			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#A3E635",
						color: "#fff",
						//borderRadius: 8,
					},
				}}
			>
				<MoneyProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/auth/login" element={<LoginPage />} />
							<Route path="/auth/register" element={<RegisterPage />} />
							<Route path="/auth/forgot-password" element={<ResetPassPage />} />
							<Route
								path="/auth/reset-password"
								element={<ResetPasswordPage />}
							/>
							<Route path="/analytic" element={<AnalyticPage />} />

							{/* 🔒 Route cần đăng nhập */}
							<Route
								path="/dashboard"
								element={
									<PrivateRoute>
										<DashboardPage />
									</PrivateRoute>
								}
							/>

							<Route
								path="/contract/detail/:id"
								element={
									<PrivateRoute>
										<DashboardDetailPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/personal/detail"
								element={
									<PrivateRoute>
										<PersonalDetailPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/out-in/detail"
								element={
									<PrivateRoute>
										<OutInDetailPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/19101994/admin"
								element={
									<AdminRoute>
										<AdminDetailPage />
									</AdminRoute>
								}
							/>
							<Route
								path="/19101994/manage-655"
								element={
									<AdminRoute>
										<SixManagePage />
									</AdminRoute>
								}
							/>
						</Routes>
					</BrowserRouter>
				</MoneyProvider>
			</ConfigProvider>
		</>
	);
};

export default App;
