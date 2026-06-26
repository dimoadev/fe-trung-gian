import { Button, Flex, Modal } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateStatusTicket655 } from "../../api/spin-session/action";
import SixBalls from "../Ball/SixBalls";

export default function ModalMuaVe({ open, onClose, data, refetch }) {
	const [expired, setExpired] = useState(false);

	const { handleSubmit } = useForm();

	const onSubmit = async () => {
		const res = await updateStatusTicket655({ id: data?.id });
		if (res?.id) {
			setExpired(true);
		}
	};

	const handleOkExpired = () => {
		setExpired(false);
		onClose();
		refetch(1)
	};

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={
				<div className="flex flex-col">
					<span className="text-lg font-semibold">Mua vé 6/55</span>
					<div className="flex items-center gap-1 mt-2 text-sm text-white"></div>
				</div>
			}
		>
			<div className="relative">
				{/* Step 1 */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
					<Flex vertical={true}>
						<SixBalls numbers={data?.numbers?.split(",")} />
					</Flex>
					<div className="flex justify-end">
						<button
							className="rounded-md bg-lime-400 hover:bg-lime-300 px-2 py-1 text-white"
							type="submit"
						>
							Cập nhật trạng thái Đã mua
						</button>
					</div>
				</form>

				{/* Overlay khi hết hạn */}
				{expired && (
					<div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-white rounded-md">
						<div className="text-center space-y-4 px-6">
							<p className="text-lg font-medium">
								Đã mua vé & cập nhật trạng thái thành công!
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
