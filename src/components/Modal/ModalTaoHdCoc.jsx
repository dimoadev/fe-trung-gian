import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import CustomSelect from '../CustomSelect';
import { join655 } from '../../api/spin-session/action';
import { useMoney } from '../../context/MonetContext';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { InputNumber } from 'antd';
import { Input } from 'antd';
import { Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
 const {TextArea} = Input;

export default function TaoHdCocModal({ open, onClose, id }) {
	const navigate = useNavigate();
	const [ticketCount, setTicketCount] = useState(null);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [content, setContent] = useState('');
	const { money, trigger } = useMoney();
	const ticketPrice = 10000;
	const total = ticketCount ? ticketCount?.value * ticketPrice : 0;

	const handleJoin = async () => {
		if (!ticketCount) {
			setError(true);
			setContent('Chọn số vé tham gia');
		} else if (total > money) {
			setError(true);
			setContent('Vượt số dư của bạn, vui lòng nạp thêm tiền để tham gia');
		} else {
			const res = await join655({
				id,
				data: { tickets: Number(ticketCount?.value) },
			});

			if (res?.status === 'success') {
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

	const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleGenerateTerms = async () => {
    setLoading(true);

    // Giả lập API AI
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const aiTerms = `
1. Bên A đặt cọc số tiền theo thỏa thuận.
2. Khoản đặt cọc không được hoàn lại nếu bên A đơn phương hủy giao dịch.
3. Hai bên cam kết thực hiện đúng nội dung đã thống nhất.
4. Mọi tranh chấp sẽ được giải quyết trên tinh thần thương lượng trước khi đưa ra pháp luật.
`;

    const current = form.getFieldValue("terms") || "";

    form.setFieldsValue({
      terms: current
        ? current + "\n\n" + aiTerms.trim()
        : aiTerms.trim(),
    });

    setLoading(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={false}
			centered
			title={<span className='text-lg font-semibold'>Tạo hợp đồng cọc</span>}
		>
			<div className='relative'>
				<Form form={form} layout='vertical' onFinish={onFinish}>
					<Form.Item
						label='Tiêu đề'
						name='title'
						rules={[{ required: true, message: 'Nhập tiêu đề' }]}
					>
						<Input placeholder='Nhập tiêu đề...' />
					</Form.Item>

					<Form.Item
						label='Giá cọc'
						name='depositPrice'
						rules={[{ required: true, message: 'Nhập giá cọc' }]}
					>
						<InputNumber
							className='w-full'
							min={0}
							formatter={(value) =>
								`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}
							parser={(value) => Number(value?.replace(/,/g, ''))}
							placeholder='Nhập giá cọc'
						/>
					</Form.Item>

					<Form.Item label='Mô tả' name='description'>
						<TextArea rows={4} placeholder='Nhập mô tả...' />
					</Form.Item>
					<Form.Item
  label="Ảnh"
  name="images"
  valuePropName="fileList"
  getValueFromEvent={(e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  }}
>
  <Upload
    listType="picture-card"
    beforeUpload={() => false} // Không upload ngay, chỉ lưu vào form
    multiple
    maxCount={5}
  >
    <div>
      <PlusOutlined />
      <div className="mt-2">Thêm ảnh</div>
    </div>
  </Upload>
</Form.Item>
					<Form.Item
						label={
							<div className='flex items-center justify-between w-full'>
								<span>Điều khoản</span>

								<Button
									size='small'
									type='primary'
									loading={loading}
									onClick={handleGenerateTerms}
								>
									Gen by AI
								</Button>
							</div>
						}
						name='terms'
					>
						<TextArea rows={10} placeholder='Nhập điều khoản...' />
					</Form.Item>

					<Space>
						<Button htmlType='reset'>Làm mới</Button>

						<Button type='primary' htmlType='submit'>
							Lưu
						</Button>
					</Space>
				</Form>

				{/* Overlay thành công */}
				{success && (
					<div className='absolute inset-0 z-[3] bg-gray-900 flex flex-col items-center justify-center text-white rounded-md'>
						<div className='text-center space-y-4 px-6'>
							<p className='text-lg font-medium'>Bạn đã tham gia thành công!</p>
							<button
								onClick={handleCloseSuccess}
								className='py-1 h-[40px] w-[110px] button_grey bg-transparent border border-solid border-grey-400 rounded-md hover:border-grey-300 hover:text-orange-100 '
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
