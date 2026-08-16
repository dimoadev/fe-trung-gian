import { Button, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import { updatePhone } from "../../api/user/action";

export default function ModalUpdatePhone({ open, onClose }) {
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		const clean = phone.replace(/\s+/g, "");
		if (!clean) {
			setError("Vui lòng nhập số điện thoại");
			return;
		}
		if (!/^(0|\+84)\d{9,10}$/.test(clean)) {
			setError("Số điện thoại không hợp lệ");
			return;
		}

		setLoading(true);
		try {
			const res = await updatePhone({ data: { phone: clean } });
			if (res?.status === "success") {
				const user = JSON.parse(localStorage.getItem("axu") || "{}");
				localStorage.setItem("axu", JSON.stringify({ ...user, phone: clean }));
				notification.success({ message: "Lưu số điện thoại thành công!" });
				setPhone("");
				setError("");
				onClose();
			} else {
				setError(res?.message || "Không thể lưu số điện thoại, vui lòng thử lại.");
			}
		} catch (err) {
			setError("Đã có lỗi xảy ra, vui lòng thử lại.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			closable={false}
			maskClosable={false}
			keyboard={false}
			title={<span className="text-lg font-semibold">Cập nhật số điện thoại</span>}
		>
			<div className="space-y-4 mt-3">
				<p className="text-sm">
					Vui lòng nhập số điện thoại để tiếp tục sử dụng ứng dụng.
				</p>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Số điện thoại
					</label>
					<Input
						placeholder="Nhập số điện thoại"
						value={phone}
						maxLength={12}
						onChange={(e) => {
							setPhone(e.target.value);
							setError("");
						}}
						onPressEnter={handleSave}
					/>
					{error && <p className="text-red-600 text-sm mt-1">{error}</p>}
				</div>
				<div className="flex justify-end gap-2 mt-4">
					<Button type="primary" onClick={handleSave} loading={loading}>
						Lưu
					</Button>
				</div>
			</div>
		</Modal>
	);
}
