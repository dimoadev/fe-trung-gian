import { Flex, Pagination, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { historyOutAdmin } from "../../api/money/action";
import JoinNextDrawModal from "../../components/Modal/JoinModal";
import ModalConfirmRut from "../../components/Modal/ModalConfirmRut";
import { SpinCustom } from "../../components/SpinCustom";
import LayoutAdminComponent from "../../components/layout/adminSidebar";
import { ColorMapping, StatusMapping } from "../../constants/common";

const TabPeople = () => {
	const [openWithDrawn, setOpenWithDrawn] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);
	const [dataRow, setDataRow] = useState(null);

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
		const res = await historyOutAdmin({ page });
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
			<ModalConfirmRut
				open={openWithDrawn}
				onClose={() => setOpenWithDrawn(false)}
				data={dataRow}
				refetch={getList}
			/>
		</>
	);
};

export default function AdminDetailPage() {
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


	return (
		<div>
			<SpinCustom isLoading={isLoading} />
			<LayoutAdminComponent>
				<div className="dashboard-page">
					{/* Saved Scenarios */}
					<section className="saved-scenario-section mb-30">
						<p className="text-white text-lg">Trang xác nhận rút tiền</p>
						<Flex vertical={true} className="saved-container">
							<TabPeople />
						</Flex>
					</section>
				</div>
			</LayoutAdminComponent>
			<JoinNextDrawModal open={modalJoinOpen} onClose={onCloseModalJoin} />
		</div>
	);
}
