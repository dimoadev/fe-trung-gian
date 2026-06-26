import { Flex, Pagination, Table, Tabs, Tag, Typography, Row, Col } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import JoinNextDrawModal from "../../components/Modal/JoinModal";
import ModalConfirmRut from "../../components/Modal/ModalConfirmRut";
import { SpinCustom } from "../../components/SpinCustom";
import { ColorSessionMapping, StatusSessionMapping } from "../../constants/common";
import { useForm } from "react-hook-form";
import {
	create655,
	getListSpin,
	listTicket655Admin,
	update655Running,
	update655Waiting,
} from "../../api/spin-session/action";
import ModalMuaVe from "../../components/Modal/ModalMuaVe";
import LayoutAdminComponent from "../../components/layout/adminSidebar";
import Update655Modal from "../../components/Modal/ModalUpdate655";
import Update655MoneyModal from "../../components/Modal/ModalUpdateMoney655";

const { Title } = Typography;

const TabPeople = () => {
	const [openWithDrawn, setOpenWithDrawn] = useState(false);
	const [openMoneyModal, setOpenMoneyModal] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);
	const [dataRow, setDataRow] = useState(null);

	// Cột của bảng
	const columns = [
		{
			title: "Id",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Kì",
			dataIndex: "code",
			key: "code",
		},
		{
			title: "Số người tham gia",
			dataIndex: "participants",
			key: "participants",
			//render: (_, row) => dayjs(row?.timePeriod).format("MM/YYYY"),
		},
		{
			title: "Tổng số vé",
			dataIndex: "totalTickets",
			key: "totalTickets",
			//render: (_, row) => formatNumber(row?.settleCommission),
		},
		{
			title: "Tổng giải thưởng",
			dataIndex: "totalPrize",
			key: "totalPrize",
			render: (row) => row !== "0" ? row : "-",
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (row) => <Tag color={ColorSessionMapping[row]}>{StatusSessionMapping[row]}</Tag>,
		},
		{
			title: "Hành động",
			dataIndex: "totalPrize",
			key: "totalPrize",
			render: (_, row) => <div className="flex gap-2 z-2">{row?.status === "WAITING_RESULT" || row?.status === "RUNNING" && <button className="border rounded p-1 border-red-200" 
				onClick={() => {
				setDataRow(row);
				setOpenWithDrawn(true);
			}}
			>Update số</button>} {row?.status === "RUNNING" && <button onClick={() => {
				setDataRow(row);
				setOpenMoneyModal(true);
			}} className="border rounded p-1 border-green-200">Update tiền</button>}</div>,
		},
	];

	async function getList(page) {
		const response = await getListSpin({ page });
		if (response?.status === "success") {
			setData(response?.data?.items);
		  setTotal(response?.data?.total);
		}
	}

	useEffect(() => {
		getList(page);
	}, [page]);

	return (
		<>
			<div style={{ width: "100%", overflowX: "auto" }}>
				<Table
					dataSource={data || []}
					columns={columns}
					pagination={false}
					bordered
					scroll={{ x: 600 }}
					style={{ backgroundColor: "#000" }}
				/>
			</div>
			<Pagination
				showTotal={(total, range) => `${range[0]}-${range[1]} tổng ${total}`}
				defaultPageSize={20}
				defaultCurrent={1}
				current={page}
				pageSize={20}
				total={total}
				onChange={(newPage) => {
					setPage(newPage);
				}}
				showSizeChanger={false}
				align="end"
				className="mt-1"
			/>
			<Update655Modal
				open={openWithDrawn}
				onClose={() => setOpenWithDrawn(false)}
				data={dataRow}
				refetch={getList}
			/>
			<Update655MoneyModal
				open={openMoneyModal}
				onClose={() => setOpenMoneyModal(false)}
				data={dataRow}
				refetch={getList}
			/>
		</>
	);
};

const TabTicket = () => {
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);
	const [idSession, setIdSession] = useState(null);
	const [openWithDrawn, setOpenWithDrawn] = useState(false);
	const [dataRow, setDataRow] = useState(null);

	const columns = [
		{
			title: "Số vé",
			dataIndex: "numbers",
			key: "year",
			
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "gci",
			render: (row) => dayjs(row).format("DD-MM-YYYY HH:mm"),
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "netProfit",
			render: () => <Tag color={"orange"}>{"Đang chờ mua"}</Tag>,
		},
	];

	async function getList(page) {
		const res = await listTicket655Admin({ page });
		if (res.status === "success") {
			setTotal(res.data.totalItems);
			setData(res.data.items);
		}
	}

	useEffect(() => {
		getList(page);
	}, [page]);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = async (data) => {
		const res = await create655(data);
		if (res?.status === "success") {
			message.success({ content: "Tạo phiên thành công!" });
		} else {
			message.error({ content: "Gặp sự cố, vui lòng thử lại!" });
		}
	};

	return (
		<>
			<Flex vertical={true}>
				{" "}
				<Title level={4} style={{ marginTop: 0, color: "#fff" }}>
					Tạo phiên
				</Title>
				<Row gutter={20}>
					<Col xs={24} md={12}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mt-2">
								<label className="block text-sm mb-1">Số phiên</label>
								<div className="relative">
									<input
										type="text"
										{...register("code", {
											required: "Tên không được để trống",
										})}
										className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
											errors.code
												? "border-red-500 focus:ring-red-300"
												: "focus:ring-cyan-400"
										}`}
										placeholder="Nhập tên tài khoản"
									/>
									{errors.code && (
										<p className="text-red-500 text-sm mt-1">
											{errors.code.message}
										</p>
									)}
								</div>
							</div>

							<div className="mt-2"></div>

							<button
								type="submit"
								className="w-full border border-lime-400 hover:border-lime-700 text-white font-medium py-2 rounded-md mt-2 transition"
							>
								Tạo phiên
							</button>
						</form>
					</Col>
					<Col xs={24} md={12}>
					<div>
					<input
										type="text"
										value={idSession}
										onChange={(e) => setIdSession(e.target.value)}
										className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
										 "focus:ring-cyan-400"
										}`}
										placeholder="Nhập id"
									/>
					</div>
						<div className="mt-2">
							<button
								onClick={() => idSession && update655Waiting({id: idSession})}
								className="w-full border border-lime-400 hover:border-lime-700 text-white font-medium py-2 rounded-md mt-2 transition"
							>
								Cập nhật status chờ quay
							</button>
						</div>
						<div>
							<button
								onClick={() => idSession && update655Running({id: idSession})}
								className="w-full border border-lime-400 hover:border-lime-700 text-white font-medium py-2 rounded-md mt-2 transition"
							>
								Cập nhật status chia thưởng
							</button>
						</div>
					</Col>
				</Row>
			</Flex>
			<div style={{ width: "100%", overflowX: "auto" }}>
				<Table
					dataSource={data || []}
					columns={columns}
					pagination={false}
					bordered
					scroll={{ x: 600 }}
					style={{ backgroundColor: "#000" }}
					onRow={(record, rowIndex) => {
						return {
							onClick: () => {
								setDataRow(record);
								setOpenWithDrawn(true);
							},
						};
					}}
				/>
			</div>
			<Pagination
				showTotal={(total, range) => `${range[0]}-${range[1]} tổng ${total}`}
				defaultPageSize={20}
				defaultCurrent={1}
				current={page}
				pageSize={20}
				total={total}
				onChange={(newPage) => {
					setPage(newPage);
				}}
				showSizeChanger={false}
				align="end"
				className="mt-1"
			/>
			<ModalMuaVe
				open={openWithDrawn}
				onClose={() => setOpenWithDrawn(false)}
				data={dataRow}
				refetch={getList}
			/>
		</>
	);
};

export default function SixManagePage() {
	const [isLoading, setIsLoading] = useState(false);
	const [modalJoinOpen, setModalJoinOpen] = useState(false);


	function onCloseModalJoin() {
		setModalJoinOpen(false);
	}

	const itemsTabs = [
		{
			key: "1",
			label: "Các kỳ 655",
			children: <TabPeople />,
		},
		{
			key: "2",
			label: "Vé 655",
			children: <TabTicket />,
		},
	];

	return (
		<div>
			<SpinCustom isLoading={isLoading} />
			<LayoutAdminComponent>
				<div className="dashboard-page">
					{/* Saved Scenarios */}
					<section className="saved-scenario-section mb-30">
						<Flex vertical={true} className="saved-container">
							<Tabs
								defaultActiveKey="1"
								items={itemsTabs}
								style={{ color: "white" }}
							/>
						</Flex>
					</section>
				</div>
			</LayoutAdminComponent>
			<JoinNextDrawModal open={modalJoinOpen} onClose={onCloseModalJoin} />
		</div>
	);
}
