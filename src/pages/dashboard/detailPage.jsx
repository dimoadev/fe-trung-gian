import {
	CloseCircleFilled,
	ContainerOutlined,
	DollarOutlined,
	EditOutlined,
	MailOutlined,
	PhoneOutlined,
	PictureOutlined,
	PlusOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Button,
	Card,
	Col,
	Divider,
	Empty,
	Form,
	Image,
	Input,
	Modal,
	Row,
	Space,
	Spin,
	Tag,
	Typography,
	Upload,
	message as messageAntd,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../../socket';
import {
	addPartyB,
	detailContract,
	getChatGroup,
	uploadMedia,
} from '../../api/contract/action';
import { findUserByMailPhone } from '../../api/user/action';
import LayoutComponent from '../../components/layout';
import JoinNextDrawModal from '../../components/Modal/JoinModal';
import CocTienModal from '../../components/Modal/ModalCocTien';
import ConfirmTermModal from '../../components/Modal/ModalConfirmTerm';
import ComplainModal from '../../components/Modal/ModalComplain';
import TaoHdCocModal from '../../components/Modal/ModalTaoHdCoc';
import StepProgress from '../../components/Progress';
import CountDownTimer from '../../components/CountDownTimer';
import { SpinCustom } from '../../components/SpinCustom';
import { sendTelegramMessage } from '../../constants/common';

const { Title, Text, Paragraph } = Typography;

export default function HomeDetail() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [modalJoinOpen, setModalJoinOpen] = useState(false);
	const [contract, setContract] = useState(null);
	const [depositModal, setDepositModal] = useState(false);
	const [confirmTermModal, setConfirmTermModal] = useState(false);
	const [complainModal, setComplainModal] = useState(false);
	const [, forceUpdate] = useState(0);
	const [addPartyModal, setAddPartyModal] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [modalEditOpen, setModalEditOpen] = useState(false);
	const [typeConfirm, setTypeConfirm] = useState('CONFIRM_TERM');
	const [chat, setChat] = useState([]);
	const { id } = useParams();
	const user = JSON.parse(localStorage.getItem('axu') || '{}');
	function onCloseModalJoin() {
		setModalJoinOpen(false);
	}

	function onCloseModalEdit() {
		setModalEditOpen(false);
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
	const [images, setImages] = useState([]);
	const [cursorPos, setCursorPos] = useState(0);
	const [mentionOpen, setMentionOpen] = useState(false);
	const [mentionStart, setMentionStart] = useState(0);
	const [mentionQuery, setMentionQuery] = useState('');
	const textareaRef = useRef(null);
	const chatRef = useRef(null);

	const MENTION_OPTIONS = [{ value: '@admin', label: 'Admin' }];
	const mentionOptions = MENTION_OPTIONS.filter(
		(option) =>
			option.value.toLowerCase().includes(mentionQuery.toLowerCase()) ||
			option.label.toLowerCase().includes(mentionQuery.toLowerCase())
	);

	function updateMention(value, pos) {
		const textBefore = value.slice(0, pos);
		const match = textBefore.match(/@(\w*)$/);
		if (match) {
			setMentionOpen(true);
			setMentionStart(pos - match[0].length);
			setMentionQuery(match[1]);
		} else {
			setMentionOpen(false);
			setMentionQuery('');
		}
	}

	function handleMessageChange(e) {
		const value = e.target.value;
		const pos = e.target.selectionStart;
		setMessage(value);
		setCursorPos(pos);
		updateMention(value, pos);
	}

	function insertMention(mention) {
		const newValue =
			message.slice(0, mentionStart) +
			mention +
			' ' +
			message.slice(cursorPos);
		setMessage(newValue);
		setMentionOpen(false);
		setMentionQuery('');
		if (textareaRef.current) {
			textareaRef.current.focus();
			const newPos = mentionStart + mention.length + 1;
			textareaRef.current.setSelectionRange(newPos, newPos);
		}
	}

	function renderMessageWithMention(text) {
		const parts = String(text || '').split(/(@admin)/gi);
		return parts.map((part, index) =>
			/^@admin$/i.test(part) ? (
				<span
					key={index}
					className='bg-blue-200 text-blue-800 font-semibold rounded px-1'
				>
					{part}
				</span>
			) : (
				<span key={index}>{part}</span>
			)
		);
	}

	async function sendMessage() {
		const text = message.trim();
		if (!text && !images.length) return;

		let uploadedUrls = [];
		console.log('images', images);
		if (images.length) {
			uploadedUrls = await Promise.all(
				images.map(async (file) => {
					const res = await uploadMedia({ file });
					return res?.url;
				})
			);
		}

		if (text.includes('@admin')) {
			sendTelegramMessage(`Hợp đồng https://cms.trunggian.io.vn/contract/detail/${id} tag`);
		}
		socket.emit('send-message', {
			contractId: id,
			message: text,
			images: uploadedUrls.filter(Boolean),
		});
		setMessage('');
		setImages([]);
		setMentionOpen(false);
	}

	function handleKeyDown(e) {
		if (e.key === 'Escape') {
			setMentionOpen(false);
			return;
		}
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (mentionOpen && mentionOptions.length) {
				insertMention(mentionOptions[0].value);
				return;
			}
			sendMessage();
		}
	}

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [chat]);

	useEffect(() => {
		if (id) {
			setIsLoading(true);
			getDetail();
			getDetailChatGroup();
		}
	}, [id]);

	useEffect(() => {
		socket.emit('join-room', {
			contractId: id,
		});

		return () => {
			socket.emit('leave-room', {
				contractId: id,
			});
		};
	}, [id]);

	const typeSuccess = {
		CONFIRM_TERM: 'Đã xác nhận điều khoản',
		WAITING_SHIPMENT: 'Đã xác nhận gửi hàng',
		DEPOSITED: 'Đã cọc',
		SHIPPED: 'Đã nhận hàng',
		B_WITHDRAW: 'Rút tiền về tk thành công!'
	};
	useEffect(() => {
		socket.on('new-message', (message) => {
			setChat((prev) => [...prev, message]);
		});

		socket.on('update-status-success', (message) => {
			getDetail();
			getDetailChatGroup();
			messageAntd.open({
				type: 'success',
				content: typeSuccess[message.type]
			});
		});

		return () => {
			socket.off('new-message');
			socket.off('update-status-success');
		};
	}, []);

	useEffect(() => {
		if (contract) {
			try {
				const progress = JSON.parse(contract.progress.replace(/'/g, '"'));
				const stepKey = progress[progress.length - 1];
				const stepIndex = steps.find((step) => step.key === stepKey);
				setCurrentStep(stepIndex?.id ?? 1);
			} catch (e) {
				setCurrentStep(1);
			}
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
		{ id: 3, label: 'Xác nhận điều khoản', key: 'CONFIRM_TERM' },
		{ id: 4, label: 'Cọc tiền', key: 'DEPOSITED' },
		{ id: 5, label: 'Xác nhận gửi hàng', key: 'WAITING_SHIPMENT' },
		{ id: 6, label: 'Xác nhận nhận hàng', key: 'SHIPPED' },
		{ id: 7, label: 'Hủy', key: 'CANCELLED' },
		{ id: 8, label: 'Thời gian giờ', key: 'WAITING_TIME' },
		{ id: 9, label: 'Khiếu nại', key: 'COMPLAIN' },
		{ id: 10, label: 'Hoàn thành', key: 'COMPLETED' },
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
			title: 'Bước 3: Xác nhận điều khoản',
			content:
				'Bên B đọc và xác nhận điều khoản, trao đổi nội dung dưới khung chat để bên A cập nhật nội dung hợp đồng, sau khi bên B xác nhận điều khoản thì hợp đồng sẽ không thể chỉnh sửa được nữa',
		},
		{
			title: 'Bước 4: Tiến hành cọc tiền',
			content:
				'Bên A thực hiện chuyển tiền cọc vào hệ thống để kích hoạt hợp đồng và đảm bảo an toàn giao dịch.',
		},
		{
			title: 'Bước 5: Xác nhận gửi hàng',
			content:
				"Đợi bên B chuẩn bị và gửi hàng. Sau khi gửi, bên B sẽ nhấn nút 'Đã gửi hàng' để cập nhật trạng thái.",
		},
		{
			title: 'Bước 6: Xác nhận nhận hàng & Rút tiền',
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
			title: 'Bước 7: Hoàn thành hợp đồng',
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
						className='py-1 h-[40px] w-[110px] bg-gray-200 border border-solid border-grey-400 rounded-md'
					>
						Trở lại
					</button>
					<div className='max-w-7xl mx-auto mt-2 md:p-6'>
						{/* ================= HEADER ================= */}

						<Card className='rounded-xl shadow-sm'>
							<div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
								<Title level={3} className='!mb-0 !text-xl md:!text-2xl'>
									Chi tiết hợp đồng
								</Title>
								<div className='w-full md:w-[200px]'>
									{(contract?.status === 'OPEN' ||
										contract?.status === 'PARTY_JOINED') &&
										user.id === contract?.partyA.id && (
											<Button
												type='primary'
												icon={<EditOutlined />}
												size='large'
												block
												onClick={() => {
													setModalEditOpen(true);
												}}
											>
												Chỉnh sửa HĐ
											</Button>
										)}
								</div>
							</div>

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
											{CONTRACT_TYPES[contract?.type]?.label}
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
										<Text type='secondary'>Ngày đến hạn</Text>

										<Paragraph className='mt-2 whitespace-pre-wrap'>
											{dayjs(contract?.expiredDate).format('DD/MM/YYYY')}
										</Paragraph>
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
												src={`https://api.trunggian.io.vn${img.url}`}
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
								<Card
									title='BÊN A'
									className='rounded-xl shadow-sm min-h-[300px]'
								>
									<Space align='start' className='w-full h-auto md:h-[110px]'>
										<Avatar size={72} icon={<UserOutlined />} />

										<div className='min-w-0 break-words'>
											<Title level={5} className='!mb-1'>
												{contract?.partyA?.name}
											</Title>

											<div className='text-gray-500 break-all'>
												<PhoneOutlined />

												<span className='ml-2'>
													{contract?.partyA?.phone || '09xxxxxx'}
												</span>
											</div>
											<div className='text-gray-500 break-all'>
												<MailOutlined />

												<span className='ml-2'>
													{contract?.partyA?.email || 'xxx@mail.com'}
												</span>
											</div>

											<div className='mt-3'>
												{contract?.status === 'DEPOSITED' && (
													<Tag color='green'>Đã cọc tiền</Tag>
												)}
											</div>
										</div>
									</Space>

									<Divider />
									{user.id === contract?.partyA.id ? (
										contract?.status === 'CONFIRM_TERM' ? (
											<Button
												type='primary'
												icon={<DollarOutlined />}
												size='large'
												block
												onClick={() => setDepositModal(true)}
											>
												Cọc tiền
											</Button>
										) : contract?.status === 'WAITING_SHIPMENT' ? (
											<Button
												type='primary'
												icon={<DollarOutlined />}
												size='large'
												block
												onClick={() => {
													setTypeConfirm('SHIPPED');
													setConfirmTermModal(true);
												}}
											>
												Xác nhận nhận hàng
											</Button>
										) : contract?.status === 'WAITING_TIME' ? (
											<Button
												type='primary'
												danger
												icon={<CloseCircleFilled />}
												size='large'
												block
												onClick={() => setComplainModal(true)}
											>
												Khiếu nại
											</Button>
										) : contract?.status === 'CANCELLED' ? (
											<Button
												type='primary'
												icon={<DollarOutlined />}
												size='large'
												block
												onClick={() => {
													setTypeConfirm('B_WITHDRAW');
													setConfirmTermModal(true);
												}}
											>
												Rút tiền
											</Button>
										) : (
											<></>
										)
									) : (
										<></>
									)}
								</Card>
							</Col>

							{/* ================= PARTY B ================= */}

							<Col xs={24} lg={12}>
								<Card
									title='BÊN B'
									className='rounded-xl shadow-sm min-h-[300px]'
								>
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
											<Space align='start' className='h-[110px]'>
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
												</div>
											</Space>

											<Divider />

											{user.id === contract?.partyB.id ? (
												contract?.status === 'PARTY_JOINED' ? (
													<Button
														type='primary'
														icon={<ContainerOutlined />}
														size='large'
														block
														onClick={() => {
															setTypeConfirm('CONFIRM_TERM');
															setConfirmTermModal(true);
														}}
													>
														Xác nhận điều khoản
													</Button>
												) : contract?.status === 'DEPOSITED' ? (
													<Button
														type='primary'
														icon={<ContainerOutlined />}
														size='large'
														block
														onClick={() => {
															setTypeConfirm('WAITING_SHIPMENT');
															setConfirmTermModal(true);
														}}
													>
														Xác nhận gửi hàng
													</Button>
												) : contract?.status === 'SHIPPED' ? 
													<Button
														type='primary'
														icon={<ContainerOutlined />}
														size='large'
														block
														onClick={() => {
															setTypeConfirm('B_WITHDRAW');
															setConfirmTermModal(true);
														}}
													>
														Rút tiền cọc về TK
												</Button> : contract?.status === 'WAITING_TIME' ? (
													(() => {
														const withdrawTime = dayjs(
															contract?.expiredDate
														).add(2, 'day');
														const canWithdraw = dayjs().isAfter(withdrawTime);
														return (
															<div className='relative'>
																<Button
																	type='primary'
																	icon={<ContainerOutlined />}
																	size='large'
																	block
																	disabled={!canWithdraw}
																	style={
																		!canWithdraw ? { opacity: 0.4 } : {}
																	}
																	onClick={() => {
																		setTypeConfirm('B_WITHDRAW');
																		setConfirmTermModal(true);
																	}}
																>
																	Rút tiền cọc về TK
																</Button>
																{!canWithdraw && (
																	<div className='absolute inset-0 z-10 flex items-center justify-center text-xs font-semibold text-white bg-black/60 rounded-md'>
																		Rút sau:{' '}
																		<CountDownTimer
																			targetDate={withdrawTime.toISOString()}
																			onComplete={() =>
																				forceUpdate((x) => x + 1)
																			}
																			className='ml-1'
																		/>
																	</div>
																)}
															</div>
														);
													})()
												) : (
													<></>
												)
											) : (
												<></>
											)}
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
								{stepDescriptions?.map((item, index) => (
									<div key={index}>
										<h4 className='text-sm font-bold text-slate-800 mb-1'>
											{item?.title}
										</h4>
										<div className='text-xs text-slate-600 leading-relaxed'>
											{item?.content}
										</div>
									</div>
								))}
							</div>
							<StepProgress
								steps={steps}
								currentStep={currentStep}
								status={contract?.status}
							/>
						</Card>

						<Card
							className='mt-6 rounded-xl shadow-sm'
							title='Trao đổi giữa các bên'
						>
							<div
							ref={chatRef}
							className='h-[450px] overflow-y-auto border rounded-lg p-5 bg-gray-50'
						>
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
													<div className='break-words'>
													{renderMessageWithMention(item.message)}
												</div>
												{item.images?.length > 0 && (
													<div className='flex flex-wrap gap-2 mt-2'>
														{item.images.map((img) => (
															<Image
																key={img}
																src={
																	typeof img === 'string' &&
																	img.startsWith('http')
																		? img
																		: `https://api.trunggian.io.vn${img}`
																}
																width={140}
																height={140}
																style={{ objectFit: 'cover' }}
																className='rounded-lg'
															/>
														))}
													</div>
												)}
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

						<div className='mt-5'>
							{images.length > 0 && (
								<div className='flex flex-wrap gap-3 mb-3'>
									{images.map((img, index) => (
										<div key={index} className='relative'>
											<Image
												src={URL.createObjectURL(img)}
												width={64}
												height={64}
												style={{ objectFit: 'cover' }}
												className='rounded-md'
											/>
											<CloseCircleFilled
												className='absolute -top-2 -right-2 text-red-500 text-lg cursor-pointer bg-white rounded-full'
												onClick={() =>
													setImages((prev) =>
														prev.filter((_, i) => i !== index)
													)
												}
											/>
										</div>
									))}
								</div>
							)}

							<div className='relative'>
								<Input.TextArea
									ref={textareaRef}
									rows={2}
									value={message}
									placeholder='Nhập tin nhắn... Có thể dùng @admin để yêu cầu hỗ trợ.'
									onChange={handleMessageChange}
									onKeyDown={handleKeyDown}
									onSelect={(e) => setCursorPos(e.target.selectionStart)}
								/>

								{mentionOpen && mentionOptions.length > 0 && (
									<div className='absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg w-56 z-10 overflow-hidden'>
										{mentionOptions.map((option) => (
											<div
												key={option.value}
												className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-blue-50'
												onMouseDown={(e) => {
													e.preventDefault();
													insertMention(option.value);
												}}
											>
												<Avatar
													size={24}
													icon={<UserOutlined />}
												/>
												<span className='text-sm font-medium'>
													{option.label}
												</span>
												<span className='ml-auto text-xs text-gray-400'>
													{option.value}
												</span>
											</div>
										))}
									</div>
								)}
							</div>

							<div className='flex items-center justify-between mt-3'>
								<Upload
									accept='image/*'
									multiple
									showUploadList={false}
									beforeUpload={(file) => {
										setImages((prev) => [...prev, file]);
										return false;
									}}
								>
									<Button icon={<PictureOutlined />}>Ảnh</Button>
								</Upload>

								<Button
									type='primary'
									size='large'
									onClick={sendMessage}
								>
									Gửi
								</Button>
							</div>
						</div>
						</Card>
						{/* ================= Deposit Modal ================= */}
						<CocTienModal
							open={depositModal}
							onClose={() => setDepositModal(false)}
							amount={Number(contract?.depositPrice)}
							contractId={id}
							callBack={() => {
								setTypeConfirm('DEPOSITED');
								socket.emit('update-status-contract', {
									contractId: id,
									type: 'DEPOSITED'
								});
							}}
						/>

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
									messageAntd.open({
										type: 'success',
										content: "Thêm bên B thành công!",
									});
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
			<TaoHdCocModal
				open={modalEditOpen}
				onClose={onCloseModalEdit}
				isEdit={true}
				dataContract={contract}
			/>
			<ConfirmTermModal
				open={confirmTermModal}
				onClose={() => setConfirmTermModal(false)}
				contract={contract}
				callBack={() => {
					if (typeConfirm === 'B_WITHDRAW') {
						messageAntd.open({
							type: 'success',
							content: typeSuccess[typeConfirm],
						});
					} else {
						socket.emit('update-status-contract', {
							contractId: id,
							type: typeConfirm
						});
					}
				}}
				type={typeConfirm}
			/>
			<ComplainModal
				open={complainModal}
				onClose={() => setComplainModal(false)}
				contractId={id}
				callBack={() => {
					socket.emit('update-status-contract', {
						contractId: id,
						type: 'COMPLAIN'
					});
				}}
			/>
		</div>
	);
}
