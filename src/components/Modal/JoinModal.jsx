import React, { useState } from "react";
import { Modal, Button } from "antd";
import CustomSelect from "../CustomSelect";
import { join655 } from "../../api/spin-session/action";
import { useMoney } from "../../context/MonetContext";
import { useNavigate } from "react-router-dom";

export default function JoinNextDrawModal({ open, onClose, id }) {
	const navigate = useNavigate();
	const [ticketCount, setTicketCount] = useState(null);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [content, setContent] = useState("");
	const { money, trigger } = useMoney();
	const ticketPrice = 10000;
	const total = ticketCount ? ticketCount?.value * ticketPrice : 0;

	const handleJoin = async () => {
		if (!ticketCount) {
			setError(true);
			setContent("Chọn số vé tham gia");
		} else if (total > money) {
			setError(true);
			setContent("Vượt số dư của bạn, vui lòng nạp thêm tiền để tham gia");
		} else {
			const res = await join655({
				id,
				data: { tickets: Number(ticketCount?.value) },
			});

			if (res?.status === "success") {
				setSuccess(true);
				trigger();
			}
		}
	};

	const handleCloseSuccess = () => {
		setSuccess(false);
		setTicketCount(null);
		onClose();
		navigate(`/655/detail/${id}`);
	};

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={
				<span className="text-lg font-semibold">Tham gia kỳ quay kế tiếp</span>
			}
		>
			<div className="relative">
				{/* Nội dung modal */}
				<div className="space-y-4 mt-3">
					<label className="block text-sm font-medium text-gray-700">
						Chọn số vé tham gia
					</label>
					<CustomSelect
						options={Array.from({ length: 10 }, (_, i) => ({
							value: i + 1,
							label: i + 1,
						}))}
						placeholder="Chọn số vé"
						//error={fieldState.error ? fieldState.error.message : ""}
						value={ticketCount ?? undefined}
						onChange={(value) => {
							if (value) {
								setError(false);
							}
							setTicketCount(value);
						}}
					/>
					{error && <p className="text-red-600 text-sm">{content}</p>}
					{ticketCount && (
						<p className="text-white text-sm">
							Số tiền cần thanh toán:{" "}
							<span className="font-semibold text-blue-600">
								{total.toLocaleString()} VND
							</span>
						</p>
					)}

					<div className="flex justify-end gap-2 mt-4">
						<Button onClick={onClose}>Hủy</Button>
						<button
							onClick={() => handleJoin()}
							className="button_downloadcv px-2 py-1 text-white"
						>
							Tham gia
						</button>
					</div>
				</div>

				{/* Overlay thành công */}
				{success && (
					<div className="absolute inset-0 z-[3] bg-gray-900 flex flex-col items-center justify-center text-white rounded-md">
						<div className="text-center space-y-4 px-6">
							<p className="text-lg font-medium">Bạn đã tham gia thành công!</p>
							<button
								onClick={handleCloseSuccess}
								className="py-1 h-[40px] w-[110px] button_grey bg-transparent border border-solid border-grey-400 rounded-md hover:border-grey-300 hover:text-orange-100 "
							>
								Xem chi tiết
							</button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
}
