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
import { createContract, uploadMedia } from '../../api/contract/action';
import { message } from 'antd';
import { Select } from 'antd';
import { Typography } from 'antd';
import { useEffect } from 'react';
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

export default function TaoHdCocModal({ open, onClose }) {
	const navigate = useNavigate();
	const [ticketCount, setTicketCount] = useState(null);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [idSuccess, setIdSucess] = useState(null);
	const { money, trigger } = useMoney();
	const ticketPrice = 10000;
	const total = ticketCount ? ticketCount?.value * ticketPrice : 0;

	// const handleJoin = async () => {
	// 	if (!ticketCount) {
	// 		setError(true);
	// 		setContent('Chọn số vé tham gia');
	// 	} else if (total > money) {
	// 		setError(true);
	// 		setContent('Vượt số dư của bạn, vui lòng nạp thêm tiền để tham gia');
	// 	} else {
	// 		const res = await join655({
	// 			id,
	// 			data: { tickets: Number(ticketCount?.value) },
	// 		});

	// 		if (res?.status === 'success') {
	// 			setSuccess(true);
	// 			trigger();
	// 		}
	// 	}
	// };

	const handleCloseSuccess = () => {
		setSuccess(false);
		setTicketCount(null);
		onClose();
		navigate(`/contract/detail/${idSuccess}`);
	};

	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleGenerateTerms = async () => {
		setLoading(true);

		// Giả lập API AI
		await new Promise((resolve) => setTimeout(resolve, 1200));

		// 		const aiTerms = `
		// 1. Bên A đặt cọc số tiền theo thỏa thuận.
		// 2. Khoản đặt cọc không được hoàn lại nếu bên A đơn phương hủy giao dịch.
		// 3. Hai bên cam kết thực hiện đúng nội dung đã thống nhất.
		// 4. Mọi tranh chấp sẽ được giải quyết trên tinh thần thương lượng trước khi đưa ra pháp luật.
		// `;

		const aiTerms = `HỢP ĐỒNG ĐẶT CỌC MUA BÁN ĐIỆN THOẠI
Bên đặt cọc (Bên A): [Điền tên người mua] - SĐT: [Điền SĐT]
Bên nhận đặt cọc (Bên B): [Điền tên người bán] - SĐT: [Điền SĐT]
Hai bên thống nhất thỏa thuận nội dung đặt cọc như sau:
1. Tài sản mua bán 
Tên sản phẩm: Điện thoại iPhone 14 Pro Max.Màu sắc: Màu đỏ.Tình trạng: Bên B cam kết máy nguyên zin (chưa qua sửa chữa, chưa thay thế linh kiện).
2. Giá bán và số tiền đặt cọc
Giá bán chính thức: .................................... VNĐ.
Số tiền đặt cọc: .................................... VNĐ.
Số tiền còn lại phải thanh toán: .................................... VNĐ.
3. Thời hạn giao nhậnBên B giao máy và Bên A thanh toán nốt số tiền còn lại vào ngày: ..../..../2026.4. 
Cam kết trách nhiệm
Nếu Bên A không mua: Mất toàn bộ số tiền đã đặt cọc.
Nếu Bên B không bán hoặc máy không đúng cam kết (không nguyên zin, sai màu): Bên B phải hoàn trả lại tiền cọc
`;

		const current = form.getFieldValue('terms') || '';

		form.setFieldsValue({
			terms: current ? current + '\n\n' + aiTerms.trim() : aiTerms.trim(),
		});

		setLoading(false);
	};

	const onFinish = async (values) => {
		try {
			// Upload tất cả ảnh
			const imageUrls = await Promise.all(
				(values.images || []).map(async (file) => {
					// Nếu ảnh đã upload từ trước thì giữ nguyên
					if (file.url) {
						return file.url;
					}

					const res = await uploadMedia({
						file,
					});
					console.log('res', res);
					return res.url;
				})
			);

			// Payload tạo contract
			const payload = {
				title: values.title,
				depositPrice: values.depositPrice,
				description: values.description,
				terms: values.terms,
				type: values.type,
				images: imageUrls,
			};

			const res = await createContract(payload);
			if (res.status === 'success') {
				// message.success('Tạo hợp đồng thành công');
				// onClose();
				// trigger();
				setSuccess(true);
				setIdSucess(res.data.id);
			}
		} catch (err) {
			console.error(err);
			message.error('Có lỗi xảy ra');
		}
	};

	function askGoogleAI() {
		// 1. Lấy giá trị user đã nhập vào các ô Input
		const title = form.getFieldValue('title') || '';
		const content = form.getFieldValue('description') || '';

		// Kiểm tra nếu user chưa nhập gì thì cảnh báo và dừng lại
		if (!title && !content) {
			alert('Vui lòng nhập tiêu đề hoặc nội dung trước khi hỏi AI!');
			return;
		}

		// 2. Tạo câu lệnh Prompt theo yêu cầu của bạn
		const promptText = `Viết hợp đồng cọc ngắn gọn cho sản phẩm sau. title: ${title}, mô tả: "${content}"`;

		// 3. Mã hóa chuỗi văn bản sang định dạng URL (để không bị lỗi ký tự đặc biệt, dấu cách)
		const encodedPrompt = encodeURIComponent(promptText);

		// 4. Tạo URL dẫn thẳng đến khung chat của Google Gemini kèm theo câu lệnh
		const geminiUrl = `https://google.com?q=${encodedPrompt}`;

		// 5. Mở tab mới với URL vừa tạo
		window.open(geminiUrl, '_blank');
	}
	const CONTRACT_TYPES = {
		SEND_GOOD: {
			label: 'HĐ cọc mua hàng',
			description:
				'HĐ cọc mua hàng: Dùng khi khách hàng chốt mua và đặt cọc một khoản tiền cụ thể để đảm bảo việc giao dịch hàng hóa diễn ra đúng hẹn.',
		},
		KEEP_SEAT: {
			label: 'HĐ cọc giữ chỗ',
			description:
				'HĐ cọc giữ chỗ: Dùng trong giai đoạn đầu khi sản phẩm chưa mở bán chính thức, giúp khách hàng ưu tiên chọn vị trí hoặc số lượng trước.',
		},
	};
	const type = Form.useWatch('type', form);
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
						label='Loại HĐ'
						name='type'
						extra={
							type ? (
								<Typography.Text
									type='secondary'
									style={{
										marginBottom: 0,
										fontStyle: 'italic',
										color: '#d6d6d6',
									}}
								>
									{CONTRACT_TYPES[type].description}
								</Typography.Text>
							) : null
						}
						rules={[{ required: true, message: 'Vui lòng chọn loại hợp đồng' }]}
					>
						<Select
							placeholder='Chọn loại...'
							allowClear
							showSearch
							optionFilterProp='label'
						>
							<Select.Option value='SEND_GOOD' label='HĐ cọc mua hàng'>
								HĐ cọc mua hàng
							</Select.Option>
							<Select.Option value='KEEP_SEAT' label='HĐ cọc giữ chỗ'>
								HĐ cọc giữ chỗ
							</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						label='Tiêu đề'
						name='title'
						rules={[{ required: true, message: 'Nhập tiêu đề' }]}
					>
						<Input placeholder='Nhập tiêu đề...' />
					</Form.Item>

					<Form.Item
						label='Giá cọc (VNĐ)'
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
						label='Ảnh'
						name='images'
						valuePropName='fileList'
						getValueFromEvent={(e) => {
							if (Array.isArray(e)) return e;
							return e?.fileList;
						}}
					>
						<Upload
							listType='picture-card'
							beforeUpload={() => false} // Không upload ngay, chỉ lưu vào form
							multiple
							maxCount={5}
						>
							<div className='flex items-center flex-col justify-center'>
								<PlusOutlined class='text-white text-center' />
								<div className='mt-2 text-white'>Thêm ảnh</div>
							</div>
						</Upload>
					</Form.Item>
					<Form.Item
						label={
							<div className='flex items-center justify-between w-full'>
								<span className='mr-2'>Điều khoản</span>

								<Button
									size='small'
									type='primary'
									loading={loading}
									onClick={handleGenerateTerms}
									//onClick={askGoogleAI}
								>
									Tạo bởi AI
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
						<div className='flex flex-col items-center justify-center text-center space-y-4 px-6'>
							<p className='text-lg font-medium'>Tạo hợp đồng thành công!</p>
							<button
								onClick={handleCloseSuccess}
								className='py-1 h-[40px] w-[210px] button_grey bg-transparent border border-solid border-grey-400 rounded-md hover:border-grey-300 hover:text-orange-100 '
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
