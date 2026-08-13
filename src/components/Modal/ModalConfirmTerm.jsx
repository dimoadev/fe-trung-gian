import { Modal } from 'antd';
import React from 'react';
import {
	updateStatusContract,
	withdrawContract,
} from '../../api/contract/action';

export default function ConfirmTermModal({
	open,
	onClose,
	contract,
	callBack,
	type,
}) {
	const onSubmit = async () => {
		if (type === 'B_WITHDRAW') {
			const res = await withdrawContract({
				id: contract.id,
			});
			if (res.status === 'success') {
				onClose();
				callBack();
			}
		} else {
			const progress = JSON.parse(contract.progress.replace(/'/g, '"'));
			progress.push(type);
			const res = await updateStatusContract({
				id: contract.id,
				data: {
					status: type,
					progress: `['${progress.join("','")}']`,
				},
			});
			if (res.status === 'success') {
				onClose();
				callBack();
			}
		}
	};
	const CONTENT = {
		CONFIRM_TERM: {
			title: 'Xác nhận điều khoản',
			description:
				'Sau khi xác nhận điều khoản, không thể chỉnh sửa hợp đồng <br /> Bên A sẽ tiến hành cọc tiền sau bước này',
		},
		WAITING_SHIPMENT: {
			title: 'Xác nhận gửi hàng',
			description:
				'Sau khi xác nhận gửi hàng, yêu cầu bên A kiểm tra nhận hàng rồi xác nhận nhận hàng <br /> Sau khi bên A xác nhận đã nhận hàng bạn sẽ được rút tiền cọc về tài khoản',
		},
		SHIPPED: {
			title: 'Xác nhận nhận hàng',
			description:
				'Sau khi xác nhận nhận hàng <br /> Bên B sẽ được rút tiền cọc về tài khoản',
		},
		B_WITHDRAW: {
			title: 'Xác nhận rút tiền',
			description:
				'Sau khi xác nhận <br /> Tiền cọc sẽ về tài khoản của bạn <br /> Bạn cần vào mục nạp rút để rút về tk ngân hàng của mình ',
		},
	};
	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={
				<div className='flex flex-col'>
					<span className='text-lg font-semibold'>{CONTENT[type].title}</span>
					<div className='flex items-center gap-1 mt-2 text-sm text-white'></div>
				</div>
			}
		>
			<div className='relative'>
				<div className='space-y-4 mt-4'>
					<label className='block text-sm font-medium text-gray-700'>
						<div
							dangerouslySetInnerHTML={{ __html: CONTENT[type].description }}
						/>
					</label>
					{/* <p className="text-sm text-white italic">Bấm tiếp tục để quét mã chuyển khoản</p> */}
					<div className='flex gap-2 justify-end'>
						<button className='rounded-md bg-gray-400 hover:bg-gray-300 px-2 py-1 text-white'>
							Hủy
						</button>
						<button
							className='rounded-md bg-cyan-400 hover:bg-cyan-300 px-2 py-1 text-white'
							onClick={() => onSubmit()}
						>
							Tiếp tục
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}
