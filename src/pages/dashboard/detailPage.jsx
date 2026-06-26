import { Col, Flex, Pagination, Row, Table, Tabs, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { GoDot } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import {
	getListSpinByTicket,
	getListSpinByUser,
	sessionInfo655,
} from "../../api/spin-session/action";
import ResultBalls from "../../components/Ball/resultBall";
import LayoutComponent from "../../components/layout";
import JoinNextDrawModal from "../../components/Modal/JoinModal";
import { SpinCustom } from "../../components/SpinCustom";
import { Prize655 } from "../../constants/common";
import CountdownTimer from "../../components/CountDown";
import ResultComponent from "../../components/ResultComponent";

const { Title } = Typography;

const TabPeople = ({ id }) => {
	const [page, setPage] = useState(1);
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState(0);
	const columns = [
		{
			title: "STT",
			dataIndex: "userId",
			key: "description",
			render: (_, row, index) => index + 1,
		},
		{
			title: "Người tham gia",
			dataIndex: "name",
			key: "name",
			render: (_, row) => row?.name || row?.email,
		},
		{
			title: "Số vé",
			dataIndex: "count",
			key: "count",
			//render: (_, row) => formatNumber(row?.settleCommission),
		},
		{
			title: "Tiền chia thưởng",
			dataIndex: "id",
			key: "gci",
			render: (_, row) => "-",
		},
		{
			title: "Trạng thái",
			dataIndex: "allStatus",
			key: "netProfit",
			render: (status) => (
				<Tag color={status?.includes("PENDING") ? "orange" : "green"}>
					{status?.includes("PENDING") ? "Đang mua" : "Đã mua"}
				</Tag>
			),
		},
	];

	async function getList() {
		const response = await getListSpinByUser({ id, page });
		if (response?.status === "success") {
			setItems(response?.data?.items);
			setTotal(response?.data?.totalItems);
		}
	}

	useEffect(() => {
		if (id) {
			getList(id, page);
		}
	}, [page, id]);

	return (
		<>
			<div style={{ width: "100%", overflowX: "auto" }}>
				<Table
					dataSource={items || []}
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

const TabTicket = ({ id, resultNumber }) => {
	const [page, setPage] = useState(1);
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState(0);
	const result = resultNumber
		? resultNumber.split(",").map((num) => Number(num))
		: [];
	const columns = [
		{
			title: "STT",
			dataIndex: "id",
			key: "description",
			render: (_, row, index) => index + 1,
		},
		{
			title: "Số vé",
			dataIndex: "numbers",
			key: "gci",
			render: (row) => (
				<ResultBalls numbers={row?.split(",")} result={result} />
			),
		},
		{
			title: "Giải",
			dataIndex: "prizeType",
			key: "gci",
			render: (_, row) => Prize655[row?.prizeType] || "-",
		},
		{
			title: "Tiền giải thưởng",
			dataIndex: "prizeMoney",
			key: "gci",
			render: (_, row) =>
				`${Number(row?.prizeMoney).toLocaleString()} VND` || "-",
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "netProfit",
			render: (status) => (
				<Tag color={status === "PENDING" ? "orange" : "green"}>
					{status === "PENDING" ? "Đang mua" : "Đã mua"}
				</Tag>
			),
		},
	];

	async function getList() {
		const response = await getListSpinByTicket({ id, page });
		if (response?.status === "success") {
			setItems(response?.data?.items);
			setTotal(response?.data?.totalItems);
		}
	}

	useEffect(() => {
		if (id) {
			getList(id, page);
		}
	}, [page, id]);

	return (
		<>
			<div style={{ width: "100%", overflowX: "auto" }}>
				<Table
					dataSource={items || []}
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

export default function HomeDetail() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [modalJoinOpen, setModalJoinOpen] = useState(false);
	const [dataPrize, setDataPrize] = useState(null);
	const [dataSession, setDataSession] = useState(null);
	const [moneyEachTicket, setMoneyEachTicket] = useState(0);
	const { id } = useParams();
	function onCloseModalJoin() {
		setModalJoinOpen(false);
	}

	async function getDetail() {
		const res = await sessionInfo655({ id });

		if (res?.status === "success") {
			setDataPrize(res?.data?.count);
			setDataSession(res?.data?.session);
			if (res?.data?.session?.totalPrize) {
				const money =
					Number(res?.data?.session?.totalPrize) /
					(Number(res?.data?.session?.totalTickets) + 1);
				setMoneyEachTicket(Math.floor(money));
			}
		}
	}

	const itemsTabs = [
		{
			key: "1",
			label: "Người tham gia",
			children: <TabPeople id={id} />,
		},
		{
			key: "2",
			label: "Danh sách vé",
			children: <TabTicket id={id} resultNumber={dataSession?.resultNumbers} />,
		},
	];

	useEffect(() => {
		if (id) {
			getDetail();
		}
	}, [id]);
	return (
		<div>
			<SpinCustom isLoading={isLoading} />
			<LayoutComponent>
				<div className="dashboard-page">
					<button
						onClick={() => navigate("/dashboard")}
						className="py-1 h-[40px] w-[110px] button_grey bg-transparent border border-solid border-grey-400 rounded-md hover:border-grey-300 hover:text-orange-100 "
					>
						Trở lại
					</button>
					{/* Saved Scenarios */}
					<section className="saved-scenario-section mb-30">
						
						<Flex vertical={true} className="saved-container">
							{" "}
							<div className="mb-3 bg-gray-800 p-4 rounded-lg w-full">
								<Title level={4} style={{ marginTop: 0, color: "#fff" }}>
									Thông tin chi tiết kỳ này
								</Title>
								<Row gutter={[16, 16]} className="mt-2">
							<Col md={12} sm={24} xs={24}><p>
									Người tham gia: {dataSession?.participants.toLocaleString()}
								</p>
								<p>Số vé : {dataSession?.totalTickets.toLocaleString()}</p>

								<ul>
									Chi tiết giải thưởng
									<li className="pl-1 flex gap-1 items-center">
										<GoDot /> Jackpot 1: {dataPrize?.specialCount || 0}
									</li>
									<li className="pl-1 flex gap-1 items-center">
										<GoDot /> Jackpot 2: {dataPrize?.consolationCount || 0}
									</li>
									<li className="pl-1 flex gap-1 items-center">
										<GoDot /> Giải nhất: {dataPrize?.firstCount || 0}
									</li>
									<li className="pl-1 flex gap-1 items-center">
										<GoDot /> Giải nhì:{" "}
										{Number(dataPrize?.secondCount).toLocaleString() || 0}
									</li>
									<li className="pl-1 flex gap-1 items-center">
										<GoDot /> Giải ba:{" "}
										{Number(dataPrize?.thirdCount).toLocaleString() || 0}
									</li>
								</ul>
								<p>
									Tổng giải thưởng:{" "}
									{Number(dataSession?.totalPrize).toLocaleString()} VND
								</p>
								<p>
									Mỗi vé tham gia nhận:{" "}
									{Number(moneyEachTicket)?.toLocaleString()} VND
								</p></Col>
							<Col md={12} sm={24} xs={24}>{dataSession?.status === "PENDING" ? <CountdownTimer />  : <ResultComponent number={dataSession?.resultNumbers ?? "0,0,0,0,0,0"} />}</Col>
						</Row>
								
							</div>
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
