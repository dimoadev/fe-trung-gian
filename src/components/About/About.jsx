import React, { useEffect } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import ScrollReveal from "scrollreveal";

import { styles } from "../../styles";
import { abouts, cardAbouts, beforelifes, afterlifes } from "../../constants";
import { fadeIn, textVariant } from "../../utils/motion";

import { SectionWrapper } from "../../hoc/index";

import Avatar from "/founder.png";
import "./index.css";

const ServiceCard = ({ index, title, icon }) => (
	<Tilt className="lg:w-[250px] w-[48%] lg:mx-auto ">
		<div
			variants={fadeIn("right", "spring", index * 0.5, 0.75)}
			className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card about_service_card"
		>
			<div
				options={{
					max: 45,
					scale: 1,
					speed: 450,
				}}
				className="bg-tertiary rounded-[20px] lg:py-5 lg:px-12 lg:min-h-[280px] flex justify-evenly items-center flex-col"
			>
				<img
					src={icon}
					alt="web-development"
					className="w-16 h-16 object-contain"
				/>

				<h3 className="text-white xs:text-[20px] text-[14px] font-bold text-center">
					{title}
				</h3>
			</div>
		</div>
	</Tilt>
);

const About = () => {
	useEffect(() => {
		ScrollReveal({
			distance: "60px",
			duration: 1000,
			delay: 200,
			reset: false,
			mobile: true,
		});
		ScrollReveal().reveal(".title_section", {
			distance: "50px",
			duration: 1250,
			origin: "top",
		});
		ScrollReveal().reveal(".img_avatar", {
			distance: "",
			origin: "",
			delay: 100,
		});
		ScrollReveal().reveal(".about_description", {
			distance: "",
			origin: "",
			delay: 300,
		});
		ScrollReveal().reveal(".button_downloadcv", {
			origin: "bottom",
			delay: 600,
		});
		ScrollReveal().reveal(".about_box", {
			origin: "left",
			interval: 300,
		});
		ScrollReveal().reveal(".timeline_item", {
			origin: "left",
			interval: 100,
		});
		ScrollReveal().reveal(".life_title", {
			origin: "left",
			interval: 100,
		});
		ScrollReveal().reveal(".title_section_life", {
			delay: 100,
			origin: "left",
			interval: 100,
		});
		ScrollReveal().reveal(".about_service_card", {
			delay: 400,
			duration: 750,
			origin: "left",
			interval: 300,
		});
	}, []);

	return (
		<>
			<div className="title_section flex items-center">
				<div className={styles.sectionSubText}><img src="./icon/icon2.png" alt="icon1" width="150" height="150"/></div>
				<h2 className={styles.sectionHeadText}>Tổng Quan.</h2>
			</div>

			<div className="avatar_overview mt-4">
				<div className="flex flex-col items-center justify-center">
					<img
						className="green-pink-gradient p-[1px] rounded-[20px] shadow-card img_avatar"
						width="400"
						variants={fadeIn("", "", 0.1, 1)}
						src={Avatar}
					/>
					<p className="mt-1">Founder</p>
				</div>

				<div>
					<p
						variants={fadeIn("", "", 0.3, 1)}
						className="text-secondary text-[17px] max-w-3xl leading-[30px] about_description font-light"
					>
						{/* Chúng tôi là một công ty có trụ sở tại Đà Nẵng, Việt Nam. <br />{" "} */}
						Khởi đầu từ mong muốn tạo ra một sân chơi cho những người đam mê
						và muốn chinh phục giải jackpot, chúng tôi đã cùng
						nhau xây dựng trang web này để kết nối cộng đồng thực hiện ước mơ
						đó.
					</p>
					<div className="about_info grid grid-cols-3 gap-2 mt-4">
						{abouts.map((about, index) => (
							<div
								key={about.title}
								className="about_box green-pink-gradient  shadow-card cursor-pointer"
								variants={fadeIn("right", "spring", index * 0.2, 0.75)}
							>
								<img className="about_icon" src={about.icon} />
								<h3 className="about_title">{about.title}</h3>
								<span className="about_subtitle" style={{ fontSize: "24px" }}>
									{about.subtitle}
								</span>
							</div>
						))}
					</div>
					<a
						variants={fadeIn("bottom", "", 1, 1)}
						href="#contact"
						className="button_downloadcv mt-6"
					>
						Liên hệ
					</a>
				</div>
			</div>
		</>
	);
};

export default SectionWrapper(About, "about");
