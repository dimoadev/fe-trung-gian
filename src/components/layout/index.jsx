"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { Flex, Grid, Image, Layout, Menu, Typography } from "antd";
import dayjs from "dayjs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DepositModal from "../Modal/ModalNapTien";
import "./dashboard.css";
import "./style.css";
import { useMoney } from "../../context/MonetContext";

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const { useBreakpoint } = Grid;
const LayoutComponent = ({ isSetting, children }) => {
	const navigate = useNavigate();

	const location = useLocation();
	const path = location.pathname;
	const [collapsed, setCollapsed] = useState(false);
	const [openDeposit, setOpenDeposit] = useState(false);

	const { money: balance, trigger } = useMoney();

	const screens = useBreakpoint();
	const isMobile = !screens.md;

	const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);

	const onLockout = () => {
		localStorage.removeItem("axu");
		localStorage.removeItem("token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("mmxo");
		trigger();
		navigate("/");
	};

	function onCloseDeposit() {
		setOpenDeposit(false);
	}

	const itemsSidebar = [
		getItem(
			"HĐ cọc của tôi",
			"1",
			<Image
				src="/image/icon55.png"
				width={26}
				height={26}
				alt="icon-support"
				preview={false}
			/>
		),
		
		{
			type: "divider",
		},
		getItem(
			"Tài khoản",
			"4",
			<Image
				src="/faq/icon1.png"
				width={26}
				height={26}
				alt="icon-support"
				preview={false}
			/>
		),
		getItem(
			"Nạp - Rút",
			"5",
			<Image
				src="/faq/icon3.png"
				width={26}
				height={26}
				alt="icon-support"
				preview={false}
			/>
		),
	];

	const handleMenuClick = (e) => {
		if (e.key === "1") {
			navigate("/dashboard");
		}
		if (e.key === "4") {
			navigate("/personal/detail");
		}
		if (e.key === "5") {
			navigate("/out-in/detail");
		}
	};

	function checkActive(path) {
		if (path === "/dashboard") {
			return "1";
		}
		
		if (path === "/personal/detail") {
			return "4";
		}
		if (path === "/out-in/detail") {
			return "5";
		}
	}

	return (
		<>
			{isMobile && (
				<button
					onClick={() => setMobileMenuVisible(true)}
					style={{
						position: "fixed",
						top: 8,
						left: 10,
						zIndex: 1001,
						background: "transparent",
						border: "1px solid #ccc",
						borderRadius: 4,
						padding: 8,
						display: mobileMenuVisible ? "none" : "block",
					}}
				>
					☰
				</button>
			)}

			<Layout
				style={{
					minHeight: "100vh",
					maxWidth: "2100px",
					backgroundColor: "#141619",
				}}
				className="layout-component"
			>
				{!isMobile ? (
					<Sider
						width="300px"
						theme="light"
						style={{ backgroundColor: "#0d0d0f" }}
						collapsible
						trigger={null}
						collapsed={collapsed}
					>
						<Link
							to="/"
							className="flex items-center gap-2 mb-10"
							onClick={() => {
								setActive("");
								window.screenTop(0, 0);
							}}
						>
							<img src="/logo2.png" alt="logo" width="34" height="34" />
							<p className="text-white text-[18px] font-bold cursor-pointer flex">
								<span className="orbitron text-xl">JackpotClub</span>
							</p>
						</Link>
						<Menu
							onClick={handleMenuClick}
							theme="dark"
							defaultSelectedKeys={["1"]}
							selectedKeys={[checkActive(path)]}
							mode="inline"
							items={itemsSidebar}
						/>
						<div className="logo-bottom" onClick={onLockout}>
							<Image
								src={"/icon/log-out.svg"}
								alt="logo"
								width={30}
								height={30}
								className="img-logo-bottom"
								preview={false}
							/>
							<span className="text-d">Đăng xuất</span>
						</div>
					</Sider>
				) : (
					mobileMenuVisible && (
						<div
							style={{
								position: "fixed",
								top: 0,
								left: 0,
								width: "300px",
								height: "100vh",
								backgroundColor: "#141619",
								zIndex: 1000,
								boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
								overflowY: "auto",
							}}
						>
							<div
								style={{
									padding: 16,
									borderBottom: "1px solid #ccc",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div className="flex gap-1 items-center">
									<img src={"/logo2.png"} alt="logo" className="h-[40px]" />
									<p className="text-white text-[18px] font-bold cursor-pointer flex">
										<span className="orbitron text-xl">JackpotClub</span>
									</p>
								</div>{" "}
								<button onClick={() => setMobileMenuVisible(false)}>✕</button>
							</div>

							<Menu
								onClick={handleMenuClick}
								theme="dark"
								defaultSelectedKeys={["1"]}
								mode="inline"
								items={itemsSidebar}
							/>
							<div className="logo-bottom-mobile" onClick={onLockout}>
								<Image
									src={"/icon/log-out.svg"}
									alt="logo"
									width={30}
									height={30}
									className="img-logo-bottom"
									preview={false}
								/>
								Đăng xuất
							</div>
						</div>
					)
				)}
				<Layout style={{ backgroundColor: "#141619" }}>
					<Header className="layout-header">
						<Flex
							vertical={false}
							align={isMobile ? "start" : "center"}
							justify="space-between"
							style={{ width: "100%" }}
							gap={isMobile ? "small" : undefined}
						>
							<Flex vertical={true}>
								{collapsed ? (
									<p>&nbsp;</p>
								) : (
									<>
										<Title
											level={5}
											style={{
												marginBottom: isMobile ? 0 : undefined,
												color: "#fff",
											}}
										>
											Good morning, Hoàng Hoài
										</Title>
										<Paragraph className="m-0 text-white">
											{dayjs().format("MM/DD/YYYY")}
										</Paragraph>
									</>
								)}
							</Flex>
							<Flex
								align="center"
								gap={isMobile ? "small" : "middle"}
								style={{ marginTop: isMobile ? 8 : 0 }}
							>
								<Flex align="center" gap="small" >
									{!isMobile && (
										<span className="m-0">
											Tài khoản: {balance.toLocaleString()}
											<span
												style={{
													color: "#FACC15",
													textShadow: "0 0 5px #FFD700, 0 0 8px #FFD700",
												}}
											>
												VND
											</span>
										</span>
									)}
								</Flex>
								<Flex align="center">
									<button
										onClick={() => setOpenDeposit(true)}
										className="py-1 h-[40px] w-[110px] button_downloadcv bg-transparent border border-solid border-lime-400 rounded-md hover:border-lime-300 hover:text-orange-100 "
									>
										Nạp tiền
									</button>
								</Flex>
							</Flex>
						</Flex>
					</Header>
					<Content className="layout-content">{children}</Content>
				</Layout>
				{!isMobile && (
					<>
						{" "}
						<button
							className="button-collapse"
							style={{
								left: collapsed ? "65px" : "288px",
								transition: "left 0.4s ease",
								top: collapsed ? "85px" : "128px",
								position: "fixed",
							}}
							onClick={() => setCollapsed(!collapsed)}
						>
							{collapsed ? (
								<RightOutlined color="#969696" size={18} />
							) : (
								<LeftOutlined color="#969696" size={18} />
							)}
						</button>
					</>
				)}
			</Layout>
			<DepositModal open={openDeposit} onClose={onCloseDeposit} />
		</>
	);
};

export default LayoutComponent;
