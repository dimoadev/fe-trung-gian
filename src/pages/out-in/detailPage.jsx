import {
	Col,
	Flex,
	message,
	Pagination,
	Row,
	Table,
	Tabs,
	Tag,
	Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	getBank,
	historyIn,
	historyOut,
	saveBank,
} from "../../api/money/action";
import CustomSelect from "../../components/CustomSelect";
import LayoutComponent from "../../components/layout";
import JoinNextDrawModal from "../../components/Modal/JoinModal";
import WithdrawnModal from "../../components/Modal/ModalRutTien";
import { SpinCustom } from "../../components/SpinCustom";
import {
	ColorMapping,
	sepayBanks,
	StatusMapping,
} from "../../constants/common";

const { Title } = Typography;

const TabPeople = () => {
	const [openWithDrawn, setOpenWithDrawn] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);
	const [showNoti, setShowNoti] = useState(false);

	const [dataBank, setDataBank] = useState(null);

	const columns = [
		{
			title: "Số tiền rút",
			dataIndex: "amountOut",
			key: "year",
			render: (_, row) => Number(row.amountOut).toLocaleString(),
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
			render: (data) => (
				<Tag color={ColorMapping[data]}>{StatusMapping[data]}</Tag>
			),
		},
	];

	async function getList(page) {
		const res = await historyOut({ page });
		if (res.status === "success") {
			setTotal(res.data.total);
			setData(res.data.items);
		}
	}

	async function getDataBank() {
		const res = await getBank();
		if (res.id) {
			setDataBank(res);
		}
	}

	useEffect(() => {
		getList(page);
	}, [page]);

	useEffect(() => {
		getDataBank();
	}, []);

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
		if (showNoti) {
			const res = await saveBank({ data });
			if (res?.status === "success") {
				setDataBank(res?.data);
				message.success({ content: "Lưu tài khoản ngân hàng thành công!" });
			} else {
				message.error({ content: "Gặp sự cố, vui lòng thử lại!" });
			}
		} else {
			setShowNoti(true);
		}
	};

	useEffect(() => {
		if (dataBank) {
			reset({ ...dataBank });
		}
	}, [dataBank]);

	return (
		<>
			<Flex vertical={true}>
				{" "}
				<Title level={4} style={{ marginTop: 0, color: "#fff" }}>
					Thông tin tài khoản nhận tiền
				</Title>
				<Row gutter={20}>
					<Col md={12} sm={24} xs={24}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div>
								<label className="block text-sm mb-1">Ngân hàng</label>
								<div className="relative">
									<Controller
										name="bank"
										control={control}
										rules={{ required: "Vui lòng chọn ngân hàng" }}
										render={({ field }) => (
											<CustomSelect
												{...field}
												options={sepayBanks || []}
												value={sepayBanks.find(
													(opt) => opt.value === field.value
												)}
												onChange={(val) => field.onChange(val?.value)}
												placeholder="Chọn ngân hàng"
												isDisabled={dataBank}
											/>
										)}
									/>
									{errors.bank && (
										<p className="text-red-500 text-sm mt-1">
											{errors.bank.message}
										</p>
									)}
								</div>
							</div>
							<div className="mt-2">
								<label className="block text-sm mb-1">Số tài khoản</label>
								<div className="relative">
									<input
										type="number"
										{...register("number", {
											required: "Số tk không được để trống",
										})}
										className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
											errors.number
												? "border-red-500 focus:ring-red-300"
												: "focus:ring-cyan-400"
										}`}
										placeholder="Nhập số tk "
										disabled={dataBank}
									/>
									{errors.number && (
										<p className="text-red-500 text-sm mt-1">
											{errors.number.message}
										</p>
									)}
								</div>
							</div>

							<div className="mt-2">
								<label className="block text-sm mb-1">Tên tài khoản</label>
								<div className="relative">
									<input
										type="text"
										{...register("name", {
											required: "Tên không được để trống",
										})}
										className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
											errors.name
												? "border-red-500 focus:ring-red-300"
												: "focus:ring-cyan-400"
										}`}
										placeholder="Nhập tên tài khoản"
										disabled={dataBank}
									/>
									{errors.name && (
										<p className="text-red-500 text-sm mt-1">
											{errors.name.message}
										</p>
									)}
								</div>
							</div>

							<div className="mt-2">
								{showNoti && (
									<p>
										⚠️ Lưu ý Stk ngân hàng chỉ lưu 1 lần duy nhất <br /> nếu
										muốn thay đổi vui lòng liên hệ admin hỗ trợ
									</p>
								)}
							</div>

							{!dataBank && (
								<button
									type="submit"
									className="w-full border border-lime-400 hover:border-lime-700 text-white font-medium py-2 rounded-md mt-2 transition"
								>
									{showNoti ? "Tiếp tục" : "Lưu"}
								</button>
							)}
						</form>
					</Col>
					<Col md={12} sm={24} xs={24}>
						{dataBank && (
							<img
								src={`https://qr.sepay.vn/img?acc=${dataBank.number}&bank=${dataBank.bank}&template=compact`}
								width="180px"
								height="180px"
								alt="qr"
							/>
						)}
					</Col>
				</Row>
			</Flex>

			<Flex justify="end" align="center">
				<button
					onClick={() => setOpenWithDrawn(true)}
					className="button_downloadcv px-2 py-1"
				>
					Rút tiền
				</button>
			</Flex>
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
			<WithdrawnModal
				open={openWithDrawn}
				onClose={() => setOpenWithDrawn(false)}
				refetch={getList}
			/>
		</>
	);
};

const TabTicket = () => {
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);

	const columns = [
		{
			title: "Số tiền nạp",
			dataIndex: "amount",
			key: "year",
			render: (_, row) => Number(row.amount).toLocaleString(),
		},
		{
			title: "Ngày nạp",
			dataIndex: "createdAt",
			key: "gci",
			render: (row) => dayjs(row).format("DD-MM-YYYY HH:mm"),
		},
		{
			title: "Nội dung",
			dataIndex: "reason",
			key: "reason",
			render: (row) => row?.includes("Nap tien") ? "Nạp tiền" : row,
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "netProfit",
			render: () => <Tag color={"green"}>{"Thành công"}</Tag>,
		},
	];

	async function getList(page) {
		const res = await historyIn({ page });
		if (res.status === "success") {
			setTotal(res.data.total);
			setData(res.data.items);
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
		</>
	);
};

export default function OutInDetailPage() {
	const [listItemScenario, setListItemScenario] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [modalJoinOpen, setModalJoinOpen] = useState(false);
	const [dataCopy, setDataCopy] = useState({
		data: {},
		type: "",
	});

	function onCloseModalJoin() {
		setModalJoinOpen(false);
	}

	async function getListScenario(page, limit) {
		// const response = await listScenario({ params: { page, limit } });
		// if (response?.status === 200) {
		//   setListItemScenario(response?.data?.data?.items);
		//   setTotal(response?.data?.data?.totalItems);
		// }
	}

	// Cột của bảng

	// useEffect(() => {
	// 	// if (user?.salesBusiness) {
	// 	//   getListScenario(page, limit);
	// 	// }
	// }, [page, limit]);
	const itemsTabs = [
		{
			key: "1",
			label: "Rút tiền",
			children: <TabPeople />,
		},
		{
			key: "2",
			label: "Lịch sử nạp tiền",
			children: <TabTicket />,
		},
	];

	return (
		<div>
			<SpinCustom isLoading={isLoading} />
			<LayoutComponent>
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
			</LayoutComponent>
			<JoinNextDrawModal open={modalJoinOpen} onClose={onCloseModalJoin} />
		</div>
	);
}
