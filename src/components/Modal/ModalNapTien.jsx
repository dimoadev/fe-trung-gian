import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { GrNext } from "react-icons/gr";
import { createSession, getSessionByCode } from "../../api/money/action";
import { useAuth } from "../../hook/useAuth";
import { useMoney } from "../../context/MonetContext";

export default function DepositModal({ open, onClose }) {
	const [step, setStep] = useState(1);
	const [amount, setAmount] = useState(null);
	const [timeLeft, setTimeLeft] = useState(180); // 3 phút
	const [expired, setExpired] = useState(false);
	const [content, setContent] = useState(
		"Mã đã hết hạn. Xin hãy tạo lại phiên giao dịch khác."
	);

	const { trigger } = useMoney();

	const [code, setCode] = useState("");
	const { control, handleSubmit, reset } = useForm({
		defaultValues: { amount: 0 },
	});

	const { user } = useAuth();

	const renderQr = () => {
		const x = amount.replaceAll(",", "");
		const number = Number(x) || 0;
		return `https://qr.sepay.vn/img?acc=SEPHVHVHIAO&bank=OCB&amount=${number}&des=${code}&template=compact`;
	};

	useEffect(() => {
		if (step === 2 && timeLeft > 0 && !expired) {
			const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
			return () => {
				clearInterval(timer);
			};
		} else if (timeLeft === 0) {
			setExpired(true);
			setCode(null);
		}
	}, [step, timeLeft, expired]);

	useEffect(() => {
		if (step === 2 && code && !expired) {
			const sessionInterval = setInterval(async () => {
				const res = await getSessionByCode(code);
				if (res?.data?.status === "SUCCESS") {
					setContent("Nạp tiền thành công");
					trigger();
					setExpired(true);
					clearInterval(sessionInterval);
				}
			}, 2000);

			return () => {
				clearInterval(sessionInterval);
			};
		}
	}, [step, expired, code]);

	const onSubmit = async (data) => {
		setAmount(data.amount);
		const x = data.amount.replaceAll(",", "");
		const number = Number(x) || 0;
		const res = await createSession({
			userId: user.id,
			amount: number,
		});

		if (res?.status === "success") {
			setStep(2);
			setCode(res.data.code);
		}
	};

	const handleOkExpired = () => {
		setExpired(false);
		setStep(1);
		setTimeLeft(180);
		setAmount(null);
		setCode(null);
		reset({});
		onClose();
	};

	const formatTime = (seconds) => {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s < 10 ? `0${s}` : s}`;
	};

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={
				<div className="flex flex-col">
					<span className="text-lg font-semibold">Nạp tiền</span>
					<div className="flex items-center gap-1 mt-2 text-sm text-white">
						<span className={step >= 1 ? "text-cyan-400 font-medium" : ""}>
							Bước 1
						</span>
						<span>
							<GrNext />
						</span>
						<span className={step === 2 ? "text-cyan-400 font-medium" : ""}>
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
							Nhập số tiền cần nạp
						</label>
						<Controller
							name="amount"
							control={control}
							rules={{
								required: "Vui lòng nhập số tiền",
								validate: (v) => {
									const x = String(v).replaceAll(",", "");
									const number = Number(x) || 0;
									console.log(number, "number");
									if (number < 1) {
										return "Số tiền phải lớn hơn 0";
									}
									if (!Number.isInteger(number)) {
										return "Số tiền phải là số nguyên";
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
				)}

				{/* Step 2 */}
				{step === 2 && (
					<div className="flex flex-col items-center justify-center space-y-4 mt-4">
						{/* <QRCode value={`deposit:${amount}`} size={180} /> */}
						<img src={renderQr()} width="180px" height="180px" alt="qr" />
						<p className="text-white">Quét mã sau để nạp tiền</p>
						<p className="text-white">
							Mã QR hết hạn sau:{" "}
							<span className="font-semibold text-cyan-400">
								{formatTime(timeLeft)}
							</span>
						</p>
					</div>
				)}

				{/* Overlay khi hết hạn */}
				{expired && (
					<div className="absolute inset-0 bg-gray-900 z-3 flex flex-col items-center justify-center text-white rounded-md">
						<div className="text-center space-y-4 px-6">
							<p className="text-lg font-medium">{content}</p>
							<Button type="primary" variant="outlined" ghost onClick={handleOkExpired}>
								OK
							</Button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
}
