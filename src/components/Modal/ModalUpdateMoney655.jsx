import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import {
	sessionInfo655,
	sessionInfo655Admin,
	splitMoney655Admin,
	updateInfoSession655,
	updateMoneyTicket655,
} from "../../api/spin-session/action";
import { GrNext } from "react-icons/gr";
import { GoDot } from "react-icons/go";

export default function Update655MoneyModal({ open, onClose, refetch, data }) {
	const [expired, setExpired] = useState(false);
	const [step, setStep] = useState(1);
	const [dataPrize, setDataPrize] = useState(null);
	const [dataSession, setDataSession] = useState(null);
	const { control, handleSubmit, reset, register, errors } = useForm({
		defaultValues: { resultNumbers: "", specialNumber: 0 },
	});

	const onSubmit = async (formData) => {
		const x = formData.resultNumbers.replaceAll(",", "");
		const numberX = Number(x) || 0;
		const y = formData.specialNumber.replaceAll(",", "");
		const numberY = Number(y) || 0;
		const res = await updateMoneyTicket655({
			id: data.id,
			data: {
				special: numberX,
				second: numberY,
			},
		});
		if (res?.ok) {
			// setExpired(true);
			// refetch(1)
			setStep(2);
		}
	};

	const handleOkExpired = () => {
		setExpired(false);
		reset({});
		onClose();
		refetch(1);
	};
	async function fechDataSession() {
		const resx = await sessionInfo655Admin({ id: data.id });
		if (resx?.status === "success") {
			setDataSession(resx?.data);
			const result = resx?.data;
			let totalMoney = 0;
			if (result.count.specialCount && result.count.specialCount !== "0") {
				for (let i = 0; i < result.special?.length; i++) {
					totalMoney += Number(result.special[i].prizeMoney);
				}
			}
			if (result.count.consolationCount  && result.count.consolationCount !== "0") {
				for (let i = 0; i < result?.consolation.length; i++) {
					totalMoney += Number(result?.consolation[i].prizeMoney);
				}
			}
			if (result.count.firstCount  && result.count.firstCount !== "0") {
				totalMoney += result.count.firstCount * 37000000;
			}
			if (result.count.secondCount  && result.count.secondCount !== "0") {
				totalMoney += result.count.secondCount * 500000;
			}
			if (result.count.thirdCount  && result.count.thirdCount !== "0") {
				totalMoney += result.count.thirdCount * 50000;
			}
			const totalPeople = result.session.totalTickets;
			const moneyPerPerson = Math.floor(totalMoney / (totalPeople + 1));
			setDataPrize({
				totalMoney,
				moneyPerPerson,
			});
		}
	}
	async function handleSplitMoney() {
		const res = await splitMoney655Admin({ id: data.id });
		if (res?.ok) {
			setExpired(true);
			refetch(1);
		}
	}

	useEffect(() => {
		if (open && step === 2) {
			fechDataSession();
		}
	}, [open, step]);

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={
				<div className="flex flex-col">
					<span className="text-lg font-semibold">Cập nhật tiền thắng</span>
					<div className="flex items-center gap-1 mt-2 text-sm text-white">
						<span
							className={step >= 1 ? "text-cyan-400 font-medium" : ""}
							onClick={() => setStep(1)}
						>
							Bước 1
						</span>
						<span>
							<GrNext />
						</span>
						<span
							className={step === 2 ? "text-cyan-400 font-medium" : ""}
							onClick={() => setStep(2)}
						>
							Bước 2
						</span>
					</div>
				</div>
			}
		>
			<div className="relative">
				{/* Step 1 */}
				{step === 1 && (
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
						<label className="block text-sm font-medium text-gray-700">
							Nhập kết quả jackpot 1
						</label>
						<Controller
							name="resultNumbers"
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
										placeholder="Nhập số tiền giải đặc biệt"
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

						<label className="block text-sm font-medium text-gray-700">
							Nhập kết quả jackpot 2
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
				)}

				{/* Step 2 */}
				{step === 2 && (
					<div className="flex flex-col space-y-4 mt-4 text-white">
						<p>
							Người tham gia:{" "}
							{dataSession?.session?.participants.toLocaleString()}
						</p>
						<p>Số vé : {dataSession?.session?.totalTickets.toLocaleString()}</p>
						<ul>
							Chi tiết giải thưởng
							<li className="pl-1 flex gap-1 items-center">
								<GoDot /> Jackpot 1: {dataSession?.count?.specialCount || 0}
							</li>
							<li className="pl-1 flex gap-1 items-center">
								<GoDot /> Jackpot 2: {dataSession?.count?.consolationCount || 0}
							</li>
							<li className="pl-1 flex gap-1 items-center">
								<GoDot /> Giải nhất: {dataSession?.count?.firstCount || 0}
							</li>
							<li className="pl-1 flex gap-1 items-center">
								<GoDot /> Giải nhì:{" "}
								{Number(dataSession?.count?.secondCount).toLocaleString() || 0}
							</li>
							<li className="pl-1 flex gap-1 items-center">
								<GoDot /> Giải khuyến khích:{" "}
								{Number(dataSession?.count?.thirdCount).toLocaleString() || 0}
							</li>
						</ul>
						<p>
							Tổng giải thưởng:
							{dataPrize?.totalMoney.toLocaleString()}
						</p>
						<p>
							Mỗi vé được chia : {dataPrize?.moneyPerPerson.toLocaleString()}
						</p>
						<div className="flex justify-end">
							<button
								className="rounded-md bg-lime-400 hover:bg-lime-300 px-2 py-1 text-white"
								onClick={() => handleSplitMoney()}
							>
								CHia thưởng
							</button>
						</div>
					</div>
				)}

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
