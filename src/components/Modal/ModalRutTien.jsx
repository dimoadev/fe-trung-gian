import { Button, Modal } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { createRequestOut } from "../../api/money/action";
import { useMoney } from "../../context/MonetContext";

export default function WithdrawnModal({ open, onClose, refetch }) {
	const [expired, setExpired] = useState(false);
	const { money: balance } = useMoney();
	const { control, handleSubmit, reset } = useForm({
		defaultValues: { amount: 0 },
	});

	const onSubmit = async (data) => {
		const x = data.amount.replaceAll(",", "");
		const number = Number(x) || 0;
		const res = await createRequestOut({ amount: number });
		if (res?.status === "success") {
			setExpired(true);
		}
	};

	const handleOkExpired = () => {
		setExpired(false);
		reset({});
		onClose();
		refetch(1);
	};

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={
				<div className="flex flex-col">
					<span className="text-lg font-semibold">Rút tiền</span>
					<div className="flex items-center gap-1 mt-2 text-sm text-white"></div>
				</div>
			}
		>
			<div className="relative">
				{/* Step 1 */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
					<label className="block text-sm font-medium text-gray-700">
						Nhập số tiền cần rút
					</label>
					<Controller
						name="amount"
						control={control}
						rules={{
							required: "Vui lòng nhập số tiền",
							validate: (v) => {
								const x = v.replaceAll(",", "");
								const number = Number(x) || 0;
								// if (number < 10000) {
								// 	return "Vui lòng nhập số tiền lớn hơn 10,000 VND"
								// }
								if (number > balance) {
									return "Vượt số tiền của bạn";
								}
								return true;
							},
						}}
						render={({ field, fieldState }) => (
							<div>
								<NumericFormat
									{...field}
									thousandSeparator=","
									allowNegative={false}
									decimalScale={0}
									className="border text-white w-full rounded-md px-3 py-2 focus:border-none focus:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
									placeholder="Nhập số tiền"
									onValueChange={(values) =>
										field.onChange(Number(values.value))
									}
								/>
								{fieldState.error && (
									<p className="text-red-500 text-sm mt-1">
										{fieldState.error.message}
									</p>
								)}
							</div>
						)}
					/>
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
								Tạo lệnh rút tiền thành công!
							</p>
							<p>Giao dịch sẽ được xử lý trong khoảng 4 giờ tới</p>
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
