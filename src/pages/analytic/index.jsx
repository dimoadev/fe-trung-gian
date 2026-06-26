import { Navbar } from "../../components";
import { sendTelegramMess } from "../../components/Footer/Footer";
import { toast } from "react-hot-toast";

const AnalyticPage = () => {
	return (
		<div class="bg-primary text-white">
			<Navbar />
			<section class="bg-[#363636] text-white py-16 px-6 text-center mt-16">
				<h1 class="text-4xl font-bold mb-4">
					Giải pháp Tùy chỉnh & Phân tích Dữ liệu
				</h1>
				<p class="text-lg max-w-3xl mx-auto">
					Chúng tôi giúp doanh nghiệp tự động hóa quy trình và khai thác dữ liệu
					hiệu quả hơn – nhờ vào công cụ tùy chỉnh và phân tích thông minh.
				</p>
			</section>

			<section class="py-16 px-6 max-w-6xl mx-auto">
				<h2 class="text-3xl font-semibold mb-6">🔧 Công cụ tùy chỉnh là gì?</h2>
				<p class="text-white text-lg mb-6">
					Là phần mềm được xây dựng riêng theo quy trình đặc thù của từng doanh
					nghiệp – không phải phần mềm đại trà ngoài thị trường.
				</p>
				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-[#363636] p-6 shadow rounded-xl">
						<h3 class="font-semibold text-xl text-[#DAC5A7] mb-2">
							🎯 Vấn đề thường gặp
						</h3>
						<ul class="list-disc list-inside text-white space-y-2">
							<li>Phần mềm sẵn có thừa hoặc thiếu chức năng</li>
							<li>Quy trình đang làm bằng Excel rất mất thời gian</li>
							<li>Không theo dõi được hiệu suất công việc</li>
						</ul>
					</div>
					<div class="bg-[#363636] p-6 shadow rounded-xl">
						<h3 class="font-semibold text-xl text-[#DAC5A7] mb-2">
							✅ Bạn sẽ nhận được
						</h3>
						<ul class="list-disc list-inside text-white space-y-2">
							<li>Công cụ phù hợp hoàn toàn với quy trình nội bộ</li>
							<li>Tự động hóa thao tác nhập liệu, xuất file</li>
							<li>Giao diện dễ dùng, nhân viên không cần đào tạo nhiều</li>
						</ul>
					</div>
				</div>
			</section>

			<section class="bg-primary py-16 px-6">
				<div class="max-w-6xl mx-auto">
					<h2 class="text-3xl font-semibold mb-6">
						📊 Phân tích dữ liệu là gì?
					</h2>
					<p class="text-white text-lg mb-8">
						Là việc thu thập, tổng hợp, xử lý và trình bày dữ liệu giúp ban lãnh
						đạo ra quyết định chính xác hơn, nhanh hơn.
					</p>
					<div class="grid md:grid-cols-3 gap-6">
						<div class="bg-[#363636] p-4 rounded shadow text-center">
							<img
								src="https://source.unsplash.com/300x200/?analytics,dashboard"
								alt="Dashboard"
								class="rounded mb-2 w-full"
							/>
							<h4 class="text-[#DAC5A7] font-semibold">
								Dashboard theo thời gian thực
							</h4>
							<p class="text-sm text-gray-600">
								Xem ngay số liệu hôm nay, tuần này, tháng này.
							</p>
						</div>
						<div class="bg-[#363636] p-4 rounded shadow text-center">
							<img
								src="https://source.unsplash.com/300x200/?charts,data"
								alt="Charts"
								class="rounded mb-2 w-full"
							/>
							<h4 class="text-[#DAC5A7] font-semibold">Biểu đồ minh bạch</h4>
							<p class="text-sm text-gray-600">
								So sánh hiệu suất giữa các chi nhánh, sản phẩm.
							</p>
						</div>
						<div class="bg-[#363636] p-4 rounded shadow text-center">
							<img
								src="https://source.unsplash.com/300x200/?automation,workflow"
								alt="Automation"
								class="rounded mb-2 w-full"
							/>
							<h4 class="text-[#DAC5A7] font-semibold">Báo cáo tự động</h4>
							<p class="text-sm text-gray-600">
								Email định kỳ gửi báo cáo cho quản lý không cần thao tác tay.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section class="py-16 px-6 max-w-5xl mx-auto">
				<h2 class="text-3xl font-semibold text-center mb-10">
					💡 Trước và Sau khi dùng giải pháp
				</h2>
				<div class="grid md:grid-cols-2 gap-8 text-sm">
					<div class="bg-[#363636] border border-red-200 p-6 rounded-xl">
						<h3 class="text-red-600 font-bold mb-3">🚫 Trước khi có công cụ</h3>
						<ul class="list-disc list-inside text-[#DAC5A7] space-y-2">
							<li>Nhập Excel thủ công, dễ sai sót</li>
							<li>Không biết rõ hiệu suất hoạt động</li>
							<li>Mất thời gian tổng hợp báo cáo</li>
							<li>Phụ thuộc con người, không nhất quán</li>
						</ul>
					</div>
					<div class="bg-[#363636] border border-green-200 p-6 rounded-xl">
						<h3 class="text-green-600 font-bold mb-3">✅ Sau khi triển khai</h3>
						<ul class="list-disc list-inside text-[#DAC5A7] space-y-2">
							<li>Dữ liệu tập trung, dễ tra cứu</li>
							<li>Báo cáo và biểu đồ tự động</li>
							<li>Giảm thao tác, tiết kiệm thời gian</li>
							<li>Ra quyết định dựa trên dữ liệu thật</li>
						</ul>
					</div>
				</div>
			</section>

			<section class="bg-[#363636] text-white py-16 px-6 text-center">
				<h2 class="text-3xl font-bold mb-4">
					Bạn có muốn tự động hóa & tối ưu dữ liệu doanh nghiệp?
				</h2>
				<p class="text-lg mb-6">
					Liên hệ để chúng tôi tư vấn miễn phí và demo công cụ thực tế phù hợp
					với doanh nghiệp của bạn.
				</p>
				<a
					href="#contact"
					class="bg-[#363636] text-[#DAC5A7] px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-100 transition"
				>
					Liên hệ ngay
				</a>
			</section>

			<section id="contact" class="py-16 px-6 max-w-4xl mx-auto">
				<h2 class="text-2xl font-semibold mb-6 text-center">
					📬 Liên hệ tư vấn
				</h2>
				<form
					class="grid gap-6"
					onSubmit={async (e) => {
						e.preventDefault();
						const formData = new FormData(e.target);
						const data = Object.fromEntries(formData.entries());
						console.log(data);
						const message = `Thông tin Khách Hàng \n Name: ${data.name} \n Email: ${data.contact} \n Noi dung: ${data.message}`;
						await sendTelegramMess({ data: message });
						setTimeout(() => {
							toast.success(
								"Cảm ơn bạn. Chúng tôi sẽ sớm liên lạc lại cho bạn trong thời gian sớm nhất."
							);
							setLoading(false);
						}, 1000);
					}}
				>
					<input
						type="text"
						name="name"
						placeholder="Họ và tên"
						class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<input
						type="text"
						name="contact"
						placeholder="Email hoăc Số điện thoại"
						class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<textarea
						name="message"
						rows="5"
						placeholder="Nội dung cần tư vấn"
						class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					></textarea>
					<button
						type="submit"
						class="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
					>
						Gửi liên hệ
					</button>
				</form>
			</section>

			<footer class="bg-gray-800 text-gray-300 py-6 text-center text-sm">
				© 2025 TerraXcode - Giải pháp tùy chỉnh & phân tích dữ liệu cho doanh
				nghiệp.
			</footer>
		</div>
	);
};
export default AnalyticPage;
