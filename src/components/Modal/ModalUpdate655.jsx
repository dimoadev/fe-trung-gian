import { Button, Modal } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { updateInfoSession655 } from "../../api/spin-session/action";

export default function Update655Modal({ open, onClose, refetch, data }) {
	const [expired, setExpired] = useState(false);
	const { control, handleSubmit, reset, register, errors } = useForm({
		defaultValues: { resultNumbers: "", specialNumber: 0 },	
	});

	const onSubmit = async (formData) => {
		const resultNumbers = formData?.resultNumbers.split(",").map((item) => Number(item.trim()));
		const res = await updateInfoSession655({ id: data.id, data: {
			resultNumbers,
			specialNumber: Number(formData.specialNumber),
		} });
		if (res?.ok) {
			setExpired(true);
			refetch(1)
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
					<span className="text-lg font-semibold">Cập nhật kết quả</span>
					<div className="flex items-center gap-1 mt-2 text-sm text-white"></div>
				</div>
			}
		>
			<div className="relative">
				{/* Step 1 */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
					<label className="block text-sm font-medium text-gray-700">
						Nhập kết quả
					</label>
					<input
						type="text"
						{...register("resultNumbers", {
							required: "Không được để trống",
						})}
						className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
							errors?.resultNumbers
								? "border-red-500 focus:ring-red-300"
								: "focus:ring-cyan-400"
						}`}
						placeholder="Nhập kết quả, cách nhau bởi dấu phẩy (ví dụ: 12, 34, 56)"
					/>
					{errors?.resultNumbers && (
						<p className="text-red-500 text-sm mt-1">
							{errors?.resultNumbers.message}
						</p>
					)}
					<label className="block text-sm font-medium text-gray-700">
						Số đặc biệt
					</label>
					<Controller
						name="specialNumber"
						control={control}
						rules={{
							required: "Vui lòng nhập số đặc biệt",
						}}
						render={({ field, fieldState }) => (
							<div>
								<NumericFormat
									{...field}
									thousandSeparator=","
									allowNegative={false}
									decimalScale={0}
									className="border text-white w-full rounded-md px-3 py-2 focus:border-none focus:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
									placeholder="Nhập số đặc biệt"
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
								Cập nhật thông tin thành công!
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
