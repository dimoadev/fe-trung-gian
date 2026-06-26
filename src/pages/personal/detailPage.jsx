import { Flex, Pagination, Table, Tabs, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { historyJoined, historyWin } from "../../api/money/action";
import LayoutComponent from "../../components/layout";
import JoinNextDrawModal from "../../components/Modal/JoinModal";
import { SpinCustom } from "../../components/SpinCustom";

const { Title } = Typography;

const TabPeople = () => {
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);

	const columns = [
		{
			title: "STT",
			dataIndex: "stt",
			key: "description",
			render: (_, row, index) => index + 1,
		},
		{
			title: "Kỳ tham gia",
			dataIndex: "sessionId",
			key: "sessionId",
			//render: (_, row) => dayjs(row?.timePeriod).format("MM/YYYY"),
		},
		{
			title: "Số vé",
			dataIndex: "ticket",
			key: "ticket",
			//render: (_, row) => formatNumber(row?.settleCommission),
		},
		{
			title: "Ngày tham gia",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (_, row) => dayjs(row.createdAt).format("DD-MM-YYYY HH:mm"),
		},
	];

	async function getList(page) {
		const res = await historyJoined({ page });
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

const TabTicket = () => {
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);

	const columns = [
		{
			title: "STT",
			dataIndex: "stt",
			key: "description",
			render: (_, row, index) => index + 1,
		},
		{
			title: "Kỳ tham gia",
			dataIndex: "sessionId",
			key: "sessionId",
			//render: (_, row) => formatNumber(row?.settleCommission),
		},
		{
			title: "Số vé",
			dataIndex: "ticket",
			key: "ticket",
		},
		{
			title: "Tiền giải thưởng",
			dataIndex: "prizeMoney",
			key: "prizeMoney",
			render: (row) => (row ? `${Number(row).toLocaleString()} VND` : "-"),
		},
		{
			title: "Ngày tham gia",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (_, row) => dayjs(row.createdAt).format("DD-MM-YYYY HH:mm"),
		},
	];

	async function getList(page) {
		const res = await historyWin({ page });
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

export default function PersonalDetailPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [modalJoinOpen, setModalJoinOpen] = useState(false);

	function onCloseModalJoin() {
		setModalJoinOpen(false);
	}

	const itemsTabs = [
		{
			key: "1",
			label: "Lịch sử tham gia",
			children: <TabPeople />,
		},
		{
			key: "2",
			label: "Lịch sử trúng thưởng",
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
							{" "}
							<Title level={4} style={{ marginTop: 0, color: "#fff" }}>
								Thông tin cá nhân
							</Title>
							<p>Email: hoanghoai12@gmail.com</p>
							{/* <p>Số lần tham gia : 50</p>
							<p>Tổng giải thưởng: 40,000,000</p> */}
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
