import { Modal } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createSession } from '../../api/money/action';
import { useAuth } from '../../hook/useAuth';
import { updateStatusContract } from '../../api/contract/action';

export default function ConfirmTermModal({ open, onClose, contract, callBack }) {
	const { control, handleSubmit, reset } = useForm();

	const { user } = useAuth();

	const onSubmit = async () => {
		const progress = JSON.parse(contract.progress.replace(/'/g, '"'));
		progress.push('CONFIRM_TERM');
		const res = await updateStatusContract({
			id: contract.id,
			data: {
				status: 'CONFIRM_TERM',
				progress: `['${progress.join("','")}']`,
			},
		});

		if (res.status === 'success') {
			onClose();
			callBack();
		}
	};

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={
				<div className='flex flex-col'>
					<span className='text-lg font-semibold'>Xác nhận điều khoản</span>
					<div className='flex items-center gap-1 mt-2 text-sm text-white'></div>
				</div>
			}
		>
			<div className='relative'>
				<form className='space-y-4 mt-4'>
					<label className='block text-sm font-medium text-gray-700'>
						Sau khi xác nhận điều khoản, không thể chỉnh sửa hợp đồng
						<br />
						Bên A sẽ tiến hành cọc tiền sau bước này
					</label>
					{/* <p className="text-sm text-white italic">Bấm tiếp tục để quét mã chuyển khoản</p> */}
					<div className='flex gap-2 justify-end'>
						<button
							className='rounded-md bg-gray-400 hover:bg-gray-300 px-2 py-1 text-white'
							type='submit'
						>
							Hủy
						</button>
						<button
							className='rounded-md bg-lime-400 hover:bg-lime-300 px-2 py-1 text-white'
						    onClick={onSubmit}
						>
							Tiếp tục
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}
