import { Button, Flex, Modal, Row, Typography, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { confirmRequestOut, getBankAdmin } from "../../api/money/action";

export default function ModalConfirmRut({ open, onClose, data, refetch }) {
	const [expired, setExpired] = useState(false);
	const [dataBank, setDataBank] = useState(null);
	const [newAmount, setNewAmount] = useState(0);

	const { handleSubmit } = useForm({
		defaultValues: { amount: 0 },
	});

	const onSubmit = async () => {
		const number = Number(data?.amountOut) || 0;
		const res = await confirmRequestOut({ amount: number, userId: data?.userId, requestId: data?.id });
		if (res?.ledger?.id) {
			setNewAmount(res?.ledger?.afterAmount)
			setExpired(true);
		}
	};

	const handleOkExpired = () => {
		setExpired(false);
		onClose();
		refetch(1)
	};

	async function getBank(id) {
		const res = await getBankAdmin(id);
		if (res?.id) {
			setDataBank(res);
		}
	}

	useEffect(() => {
		if (data) {
			getBank(data?.userId);
		}
	}, [data]);

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={
				<div className="flex flex-col">
					<span className="text-lg font-semibold">Xác nhận rút tiền</span>
					<div className="flex items-center gap-1 mt-2 text-sm text-white"></div>
				</div>
			}
		>
			<div className="relative">
				{/* Step 1 */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
					<Flex vertical={true}>
						<Row gutter={20}>
							<Col md={12} sm={24} xs={24}>
								<div>
									<label className="block text-sm mb-1">Ngân hàng</label>
									<div className="relative">
										<p className="text-red-500 text-sm mt-1">
											{dataBank?.bank}
										</p>
									</div>
								</div>
								<div className="mt-2">
									<label className="block text-sm mb-1">Số tài khoản</label>
									<div className="relative">
										<p className="text-red-500 text-sm mt-1">
											{dataBank?.number}
										</p>
									</div>
								</div>

								<div className="mt-2">
									<label className="block text-sm mb-1">Tên tài khoản</label>
									<div className="relative">
										<p className="text-red-500 text-sm mt-1">
											{dataBank?.name}
										</p>
									</div>
								</div>
								<div className="mt-2">
									<label className="block text-sm mb-1">Số tiền rút</label>
									<div className="relative">
										<p className="text-red-500 text-sm mt-1">
											{data?.amountOut ? Number(data?.amountOut).toLocaleString() : ""}
										</p>
									</div>
								</div>
							</Col>
							<Col md={12} sm={24} xs={24}>
								{dataBank && (
									<img
										src={`https://qr.sepay.vn/img?acc=${dataBank.number}&bank=${
											dataBank.bank
										}&amount=${Number(data?.amountOut)}&template=compact`}
										width="180px"
										height="180px"
										alt="qr"
									/>
								)}
							</Col>
						</Row>
					</Flex>
					<div className="flex justify-end">
						<button
							className="rounded-md bg-lime-400 hover:bg-lime-300 px-2 py-1 text-white"
							type="submit"
						>
							Tiếp tục
						</button>
					</div>
				</form>

				{/* Overlay khi hết hạn */}
				{expired && (
					<div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-white rounded-md">
						<div className="text-center space-y-4 px-6">
							<p className="text-lg font-medium">
								Xác nhận rút tiền thành công! còn lại {Number(newAmount).toLocaleString()} VND
							</p>
							<Button type="primary" ghost onClick={handleOkExpired}>
								OK
							</Button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
}
