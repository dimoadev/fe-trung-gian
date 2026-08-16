import { Modal, Input, message as messageAntd } from 'antd';
import React, { useState } from 'react';
import { complainContract } from '../../api/contract/action';

export default function ComplainModal({ open, onClose, contractId, callBack }) {
	const [reason, setReason] = useState('');

	const onSubmit = async () => {
		if (!reason.trim()) {
			messageAntd.warning('Vui lòng nhập nguyên nhân khiếu nại');
			return;
		}
		const res = await complainContract({
			id: contractId,
			data: {
				reasonCancel: reason.trim(),
				status: 'COMPLAIN',
			},
		});
		if (res?.status === 'success') {
			messageAntd.success('Gửi khiếu nại thành công!');
			setReason('');
			onClose();
			callBack?.();
		} else {
			messageAntd.error(res?.message || 'Gửi khiếu nại thất bại, vui lòng thử lại!');
		}
	};

	return (
		<Modal
			open={open}
			onCancel={() => {
				setReason('');
				onClose();
			}}
			footer={false}
			centered
			title={
				<div className='flex flex-col'>
					<span className='text-lg font-semibold'>Khiếu nại hợp đồng</span>
				</div>
			}
		>
			<div className='relative'>
				<div className='space-y-4 mt-4'>
					<label className='block text-sm font-medium text-gray-700'>
						Nguyên nhân khiếu nại
					</label>
					<Input.TextArea
						rows={4}
						value={reason}
						onChange={(e) => setReason(e.target.value)}
						placeholder='Nhập nguyên nhân khiếu nại...'
					/>
					<div className='flex gap-2 justify-end'>
						<button
							className='rounded-md bg-gray-400 hover:bg-gray-300 px-4 py-2 text-white'
							onClick={() => {
								setReason('');
								onClose();
							}}
						>
							Hủy
						</button>
						<button
							className='rounded-md bg-cyan-400 hover:bg-cyan-300 px-4 py-2 text-white'
							onClick={() => onSubmit()}
						>
							Gửi khiếu nại
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}
