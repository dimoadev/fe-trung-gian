import LayoutComponent from "../../components/layout";
import { SpinCustom } from "../../components/SpinCustom";
import { PlusOutlined } from "@ant-design/icons";
import {
	Badge,
	Button,
	Dropdown,
	Flex,
	Pagination,
	Table,
	Tag,
	Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaEllipsisH, FaRegCopy, FaRegEdit } from "react-icons/fa";
import JoinNextDrawModal from "../../components/Modal/JoinModal";
import { useNavigate } from "react-router-dom";
import { getListSpin } from "../../api/spin-session/action";
import { ColorSessionMapping, StatusSessionMapping } from "../../constants/common";
import TaoHdCocModal from '../../components/Modal/ModalTaoHdCoc';

const { Title } = Typography;

export default function Home() {
	const navigate = useNavigate();
	const [listItem, setListItem] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [modalJoinOpen, setModalJoinOpen] = useState(false);

	function onCloseModalJoin() {
		setModalJoinOpen(false);
	}

	const items = [
		{
			key: "1",
			label: "Tham gia",
			icon: <FaRegCopy />,
		},
		{
			key: "2",
			label: "Chi tiết",
			icon: <FaRegEdit />,
		},
	];

	const itemsExpired = [
		{
			key: "2",
			label: "Chi tiết",
			icon: <FaRegEdit />,
		},
	];
	async function getList(page) {
		const response = await getListSpin({ page });
		if (response?.status === "success") {
		  setListItem(response?.data?.items);
		  setTotal(response?.data?.total);
		}
	}

	const handleMenuDropClick = async (info, row) => {
		switch (info.key) {
			case "1":
				setModalJoinOpen(true);
				break;
			case "2":
				navigate(`/655/detail/${row.id}`);
				break;
			default:
				console.log("Unknown action");
		}
	};

	// Cột của bảng
	const columns = [
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
			render: (row) => row && row !== "0" ? `${Number(row).toLocaleString()} VND` : "-",
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (row) => <Tag color={ColorSessionMapping[row]}>{StatusSessionMapping[row]}</Tag>,
		},
		{
			title: "Hành động",
			key: "actions",
			render: (_, row) => (
				<Dropdown
					trigger={["click"]}
					menu={{ items: row.status !== "PENDING" ? itemsExpired : items, onClick: (info) => handleMenuDropClick(info, row) }}
				>
					<FaEllipsisH style={{ cursor: "pointer" }} />
				</Dropdown>
			),
		},
	];

	useEffect(() => {
		  getList(page);
	}, [page]);

	return (
		<div>
			<SpinCustom isLoading={isLoading} />
			<LayoutComponent>
				<div className="dashboard-page">
					{/* Saved Scenarios */}
					<section className="saved-scenario-section mb-30">
						<Flex vertical={true} className="saved-container">
							<Flex justify="space-between">
								{" "}
								<Title level={4} style={{ marginTop: 0, color: "#fff" }}>
									Nhóm 6/55
								</Title>
								<button
									onClick={() => setModalJoinOpen(true)}
									className="button_downloadcv px-2 py-1"
								>
									Tham gia
								</button>
							</Flex>

							<div style={{ width: "100%", overflowX: "auto" }}>
								<Table
									dataSource={listItem || []}
									columns={columns}
									pagination={false}
									bordered
									scroll={{ x: 600 }}
									style={{ backgroundColor: "#000" }}
								/>
							</div>
							<Pagination
								showTotal={(total, range) =>
									`${range[0]}-${range[1]} tổng ${total}`
								}
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
						</Flex>
					</section>
				</div>
			</LayoutComponent>
			<TaoHdCocModal open={modalJoinOpen} onClose={onCloseModalJoin} id={listItem?.[0]?.id} />
		</div>
	);
}
