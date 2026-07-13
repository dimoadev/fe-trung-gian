import {
	Col,
	Flex,
	Pagination,
	Row,
	Table,
	Tabs,
	Tag,
	Typography,
	Card,
	Avatar,
	Button,
	Divider,
	Modal,
	Form,
	Input,
	InputNumber,
	Image,
	Empty,
	Space,
} from 'antd';
import { useEffect, useState } from 'react';
import { GoDot } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getListSpinByTicket,
	getListSpinByUser,
	sessionInfo655,
} from '../../api/spin-session/action';
import ResultBalls from '../../components/Ball/resultBall';
import LayoutComponent from '../../components/layout';
import JoinNextDrawModal from '../../components/Modal/JoinModal';
import { SpinCustom } from '../../components/SpinCustom';
import { Prize655 } from '../../constants/common';
import CountdownTimer from '../../components/CountDown';
import ResultComponent from '../../components/ResultComponent';
import {
	addPartyB,
	detailContract,
	getChatGroup,
	sendChatContract,
	updateContract,
} from '../../api/contract/action';
import {
	UserOutlined,
	DollarOutlined,
	PhoneOutlined,
	PlusOutlined,
	MailOutlined,
	ContainerOutlined,
} from '@ant-design/icons';
import { socket } from '../../../socket';
import { Spin } from 'antd';
import { findUserByMailPhone } from '../../api/user/action';
import StepProgress from '../../components/Progress';
import dayjs from 'dayjs';
import DepositModal from '../../components/Modal/ModalNapTien';
import CocTienModal from '../../components/Modal/ModalCocTien';

const { Title, Text, Paragraph } = Typography;

export default function HomeDetail() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [modalJoinOpen, setModalJoinOpen] = useState(false);
	const [contract, setContract] = useState(null);
	const [depositModal, setDepositModal] = useState(false);
	const [addPartyModal, setAddPartyModal] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [chat, setChat] = useState([]);
	const { id } = useParams();
	const user = JSON.parse(localStorage.getItem('axu') || '{}');
	function onCloseModalJoin() {
		setModalJoinOpen(false);
	}

	async function getDetail() {
		const res = await detailContract({ id });
		if (res?.status === 'success') {
			setContract(res.data);
		}
		setIsLoading(false);
	}

	async function getDetailChatGroup() {
		const res = await getChatGroup({ id });
		if (res?.status === 'success' && res.data.length) {
			setChat(res.data);
		}
	}

	const [message, setMessage] = useState('');

	useEffect(() => {
		if (id) {
			setIsLoading(true);
			getDetail();
			getDetailChatGroup();
		}
	}, [id]);

	useEffect(() => {
		socket.emit('join-room', {
			contractId: Number(id),
		});

		return () => {
			socket.emit('leave-room', {
				contractId: Number(id),
			});
		};
	}, []);

	useEffect(() => {
		socket.on('new-message', (message) => {
			console.log(message, 'message');
			setChat((prev) => [...prev, message]);
		});

		return () => {
			socket.off('new-message');
		};
	}, []);

	useEffect(() => {
		if (contract) {
			const progress = JSON.parse(contract.progress.replace(/'/g, '"'));
			const stepKey = progress[progress.length - 1];
			const stepIndex = steps.find((step) => step.key === stepKey);
			console.log(progress, stepKey, stepIndex, 'stepIndex');
			setCurrentStep(stepIndex.id);
		}
	}, [contract]);


	const [keyword, setKeyword] = useState('');
	const [loadingUser, setLoadingUser] = useState(false);
	const [userResult, setUserResult] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	useEffect(() => {
		if (!keyword.trim()) {
			setUserResult(null);
			setSelectedUser(null);
			return;
		}

		const timer = setTimeout(async () => {
			try {
				setLoadingUser(true);

				const res = await findUserByMailPhone({
					keyword,
				});
				if (res) {
					setUserResult(res);
				} else {
					setUserResult(null);
					setSelectedUser(null);
				}
			} finally {
				setLoadingUser(false);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [keyword]);

	const steps = [
		{ id: 1, label: 'Tạo HD', key: 'OPEN' },
		{ id: 2, label: 'Thêm bên B', key: 'PARTY_JOINED' },
		{ id: 3, label: 'Cọc tiền', key: 'DEPOSITED' },
		{ id: 4, label: 'Chờ gửi hàng', key: 'WAITING_SHIPMENT' },
		{ id: 5, label: 'Đã gửi', key: 'SHIPPED' },
		{ id: 6, label: 'Hoàn thành', key: 'COMPLETED' },
	];

	// Object chứa nội dung mô tả chi tiết cho từng bước giúp hướng dẫn người dùng
	const stepDescriptions = [
		{
			title: 'Bước 1: Tạo hợp đồng',
			content:
				'Vui lòng nhập đầy đủ và chính xác các điều khoản, giá trị hợp đồng trước khi gửi.',
		},
		{
			title: 'Bước 2: Thêm bên B',
			content:
				'Bên B kiểm tra các thông tin hợp đồng, chat với bên A để chỉnh sửa trước khi tiến hành cọc tiền.',
		},
		{
			title: 'Bước 3: Tiến hành cọc tiền',
			content:
				'Bên A thực hiện chuyển tiền cọc vào hệ thống để kích hoạt hợp đồng và đảm bảo an toàn giao dịch.',
		},
		{
			title: 'Bước 4: Chờ gửi hàng',
			content:
				"Đợi bên B chuẩn bị và gửi hàng. Sau khi gửi, bên B sẽ nhấn nút 'Đã gửi hàng' để cập nhật trạng thái.",
		},
		{
			title: 'Bước 5: Xác nhận nhận hàng & Rút tiền',
			content: (
				<>
					Sau khi bên A nhận được hàng thì cập nhật trạng thái đã nhận, bên B sẽ
					có thể rút tiền về ngay lập tức. Nếu sau{' '}
					<span className='font-bold text-amber-600'>48 giờ</span> kể từ khi bên
					B gửi xác nhận mà bên A không phản hồi hoặc không liên lạc được, hệ
					thống sẽ tự động chuyển thành hoàn thành để bên B rút tiền về.
					<div className='mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 font-medium text-xs'>
						⚠️ Lưu ý: Đây là step quan trọng, mọi khiếu nại và thắc mắc cần tag
						admin vào để giải quyết trước khi quá muộn.
					</div>
				</>
			),
		},
		{
			title: 'Bước 6: Hoàn thành hợp đồng',
			content:
				'Sau khi bên A đã nhận hàng và bên B đã nhận được tiền, hợp đồng chính thức khép lại thành công.',
		},
	];

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
	return (
		<div>
			<SpinCustom isLoading={isLoading} />
			<LayoutComponent>
				<div className='dashboard-page'>
					<button
						onClick={() => navigate('/dashboard')}
						className='py-1 h-[40px] w-[110px] button_grey bg-transparent border border-solid border-grey-400 rounded-md hover:border-grey-300 hover:text-orange-100 '
					>
						Trở lại
					</button>
					<div className='max-w-7xl mx-auto p-6'>
						{/* ================= HEADER ================= */}

						<Card className='rounded-xl shadow-sm'>
							<Title level={3}>Chi tiết hợp đồng</Title>

							<Divider />

							<Row gutter={[32, 24]}>
								<Col xs={24} lg={16}>
									<div>
										<Text type='secondary'>Tiêu đề</Text>

										<Title level={4} className='!mt-1'>
											{contract?.title}
										</Title>
									</div>

									<div className='mt-6'>
										<Text type='secondary'>Loại hợp đồng</Text>

										<Paragraph className='mt-2 whitespace-pre-wrap'>
											{CONTRACT_TYPES[contract?.type]?.description}
										</Paragraph>
									</div>

									<div className='mt-6'>
										<Text type='secondary'>Tiền cọc</Text>

										<div className='text-2xl font-bold text-red-500 mt-1'>
											{Number(contract?.depositPrice)?.toLocaleString('en-US')}{' '}
											VNĐ
										</div>
									</div>

									<div className='mt-6'>
										<Text type='secondary'>Mô tả</Text>

										<Paragraph className='mt-2 whitespace-pre-wrap'>
											{contract?.description}
										</Paragraph>
									</div>

									<div className='mt-6'>
										<Text type='secondary'>Điều khoản</Text>

										<Paragraph className='mt-2 whitespace-pre-wrap'>
											{contract?.terms}
										</Paragraph>
									</div>
								</Col>

								{/* gallery */}

								<Col xs={24} lg={8}>
									<Text type='secondary'>Hình ảnh</Text>

									<div className='grid grid-cols-2 gap-3 mt-3'>
										{contract?.images?.map((img) => (
											<Image
												key={img}
												src={img}
												className='rounded-lg object-cover'
											/>
										))}
									</div>
								</Col>
							</Row>
						</Card>

						{/* ================= PARTY ================= */}

						<Row gutter={[24, 24]} className='mt-6'>
							{/* ================= PARTY A ================= */}

							<Col xs={24} lg={12}>
								<Card title='BÊN A' className='rounded-xl shadow-sm'>
									<Space align='start'>
										<Avatar size={72} icon={<UserOutlined />} />

										<div>
											<Title level={5} className='!mb-1'>
												{contract?.partyA?.name}
											</Title>

											<div className='text-gray-500'>
												<PhoneOutlined />

												<span className='ml-2'>
													{contract?.partyA?.phone || '09xxxxxx'}
												</span>
											</div>
											<div className='text-gray-500'>
												<MailOutlined />

												<span className='ml-2'>
													{contract?.partyA?.email || 'xxx@mail.com'}
												</span>
											</div>

											<div className='mt-3'>
												{contract?.partyA?.deposited ? (
													<Tag color='green'>Đã cọc tiền</Tag>
												) : (
													<Tag color='red'>Chưa cọc</Tag>
												)}
											</div>
										</div>
									</Space>

									<Divider />
									<Button
										type='primary'
										icon={<DollarOutlined />}
										size='large'
										block
										onClick={() => setDepositModal(true)}
										style={{
											visibility:
												!contract?.partyA?.deposited &&
												user.id === contract?.partyA.id
													? 'visible'
													: 'hidden',
										}}
									>
										Cọc tiền
									</Button>
								</Card>
							</Col>

							{/* ================= PARTY B ================= */}

							<Col xs={24} lg={12}>
								<Card title='BÊN B' className='rounded-xl shadow-sm'>
									{!contract?.partyB ? (
										<div className='py-1'>
											<Empty description='Chưa có bên B' />

											<Button
												type='primary'
												icon={<PlusOutlined />}
												block
												size='large'
												onClick={() => setAddPartyModal(true)}
												className='mt-[18px]'
											>
												Thêm bên B
											</Button>
										</div>
									) : (
										<>
											<Space align='start'>
												<Avatar size={72} icon={<UserOutlined />} />

												<div>
													<Title level={5} className='!mb-1'>
														{contract?.partyB.name}
													</Title>

													<div className='text-gray-500'>
														<PhoneOutlined />

														<span className='ml-2'>
															{contract?.partyB.phone || '09xxxxxx'}
														</span>
													</div>
													<div className='text-gray-500'>
														<MailOutlined />

														<span className='ml-2'>
															{contract?.partyB.email || 'xxx@mail.com'}
														</span>
													</div>

													{/* <div className='mt-3'>
														{contract?.partyA.deposited ? (
															<Tag color='green'>Đã cọc tiền</Tag>
														) : (
															<Tag color='red'>Chưa cọc</Tag>
														)}
													</div> */}
												</div>
											</Space>

											<Divider />

											<Button
												type='primary'
												icon={<ContainerOutlined />}
												size='large'
												block
												onClick={() => setDepositModal(true)}
												style={{
													visibility:
														contract?.partyB && user.id === contract?.partyB.id
															? 'visible'
															: 'hidden',
												}}
											>
												Gửi hàng
											</Button>
										</>
									)}
								</Card>
							</Col>
						</Row>

						<Card
							className='mt-6 rounded-xl shadow-sm'
							title='Tiến trình hợp đồng'
						>
							<div className='mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl transition-all duration-300'>
								{stepDescriptions.map((item) => (
									<>
										<h4 className='text-sm font-bold text-slate-800 mb-1'>
											{item.title}
										</h4>
										<div className='text-xs text-slate-600 leading-relaxed'>
											{item.content}
										</div>
									</>
								))}
							</div>
							<StepProgress steps={steps} currentStep={currentStep} />
						</Card>

						<Card
							className='mt-6 rounded-xl shadow-sm'
							title='Trao đổi giữa các bên'
						>
							<div className='h-[450px] overflow-y-auto border rounded-lg p-5 bg-gray-50'>
								{chat.map((item) => {
									const isMe = user.id === item.sender?.id;
									const isSystem = item.senderType === 'SYSTEM';
									return (
										<div
											key={item.id}
											className={`flex mb-5 items-start gap-2 ${
												isMe
													? 'flex-row-reverse justify-start'
													: 'justify-start'
											}`}
										>
											{/* Khối Icon / Avatar */}
											<div className='flex-shrink-0'>
												{isSystem ? (
													// Icon Hệ thống (Ví dụ dùng icon bánh răng hoặc bạn thay bằng icon SVG của bạn)
													<div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm'>
														⚙️
													</div>
												) : (
													// Avatar User (Tròn tượng trưng)
													<div className='w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs overflow-hidden font-semibold'>
														<UserOutlined />
													</div>
												)}
											</div>

											{/* Khối Nội dung Tin nhắn + Thời gian */}
											<div
												className={`flex flex-col max-w-[70%] ${
													isMe ? 'items-end' : 'items-start'
												}`}
											>
												{/* Bong bóng chat */}
												<div
													className={`rounded-xl px-4 py-3 shadow text-sm ${
														isSystem
															? 'bg-yellow-100 text-yellow-900'
															: isMe
															? 'bg-white text-gray-800'
															: 'bg-blue-500 text-white'
													}
					`}
												>
													{!isMe && !isSystem && (
														<div className='font-semibold mb-1 text-xs opacity-75'>
															{item.name}
														</div>
													)}
													<div className='break-words'>{item.message}</div>
												</div>

												{/* Thời gian hiển thị phía dưới tin nhắn */}
												<span className='text-[10px] text-gray-400 mt-1 px-1'>
													{dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}{' '}
													{/* Thay bằng trường thời gian thực tế của bạn */}
												</span>
											</div>
										</div>
									);
								})}
							</div>

							<div className='flex gap-3 mt-5'>
								<Input.TextArea
									rows={2}
									value={message}
									placeholder='Nhập tin nhắn... Có thể dùng @admin để yêu cầu hỗ trợ.'
									onChange={(e) => setMessage(e.target.value)}
								/>

								<Button
									type='primary'
									size='large'
									className='h-auto'
									onClick={async () => {
										if (!message) return;
										socket.emit('send-message', {
											contractId: Number(id),
											message,
										});
										setMessage('');
									}}
								>
									Gửi
								</Button>
							</div>
						</Card>
						{/* ================= Deposit Modal ================= */}
						<CocTienModal  open={depositModal} onClose={() => setDepositModal(false)} amount={Number(contract?.depositPrice)}/>

						{/* ================= Add Party Modal ================= */}

						<Modal
							title='Thêm bên B'
							open={addPartyModal}
							onCancel={() => {
								setAddPartyModal(false);
								setKeyword('');
								setUserResult(null);
								setSelectedUser(null);
							}}
							okText='Thêm'
							okButtonProps={{
								disabled: !selectedUser,
							}}
							onOk={async () => {
								const progress = JSON.parse(
									contract.progress.replace(/'/g, '"')
								);
								progress.push('PARTY_JOINED');
								const res = await addPartyB({
									id,
									data: {
										partyBId: selectedUser.id,
										progress: `['${progress.join("','")}']`,
									},
								});

								if (res.status === 'success') {
									getDetail();
									getDetailChatGroup();
									setAddPartyModal(false);
									setKeyword('');
									setUserResult(null);
									setSelectedUser(null);
								}
							}}
						>
							<Form layout='vertical'>
								<Form.Item label='Email hoặc số điện thoại'>
									<Input
										placeholder='Nhập email hoặc số điện thoại'
										value={keyword}
										onChange={(e) => {
											setKeyword(e.target.value);
											setSelectedUser(null);
										}}
									/>
								</Form.Item>

								<Spin spinning={loadingUser}>
									{userResult ? (
										<>
											<Paragraph
												type='secondary'
												className=''
												style={{
													marginBottom: 0,
													fontStyle: 'italic',
													color: '#d6d6d6',
												}}
											>
												Chọn người dùng và nhấn thêm
											</Paragraph>
											<Card
												hoverable
												onClick={() => setSelectedUser(userResult)}
												style={{
													border:
														selectedUser?.id === userResult.id
															? '2px solid #1677ff'
															: undefined,
													cursor: 'pointer',
												}}
											>
												<div>
													<b>{userResult.name}</b>
												</div>
												<div>{userResult.phone}</div>
												<div>{userResult.email}</div>
											</Card>
										</>
									) : (
										keyword &&
										!loadingUser && (
											<Empty
												description='Không tìm thấy người dùng'
												image={Empty.PRESENTED_IMAGE_SIMPLE}
											/>
										)
									)}
								</Spin>
							</Form>
						</Modal>
					</div>
				</div>
			</LayoutComponent>
			<JoinNextDrawModal open={modalJoinOpen} onClose={onCloseModalJoin} />
		</div>
	);
}
