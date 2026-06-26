import React from "react";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../../styles";
import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";

const ServiceCard = ({ service }) => {
	return (
		<VerticalTimelineElement
			contentStyle={{
				background: "#363636",
				color: "#fff",
			}}
			contentArrowStyle={{ borderRight: "7px solid  #232631" }}
			// date={experience.date}
			iconStyle={{ background: service.iconBg }}
			icon={
				<div className="flex justify-center items-center w-full h-full">
					<img
						src={service.icon}
						alt={service.alt_img}
						className="w-[90%] h-[90%] object-contain"
					/>
				</div>
			}
		>
			<div>
				<h3 className="text-[#DAC5A7] text-[24px] font-bold">
					{service.title}
				</h3>
				<p
					className="text-[#fff] text-[16px] font-semibold"
					style={{ margin: 0 }}
				>
					{service.overview}
				</p>
			</div>

			<ul className="mt-5 list-disc ml-5 space-y-2">
				{service.descriptions.map((description, index) => (
					<li
						key={`description-point-${index}`}
						className="text-[#fff] text-[14px] pl-1 tracking-wider"
					>
						{description}
					</li>
				))}
			</ul>
		</VerticalTimelineElement>
	);
};

const Services = () => {
	return (
		<>
			<div variants={textVariant()} className="title_section flex items-center" id="faqs">
				<div className={styles.sectionSubText}><img src="./icon/icon3.png" alt="icon1" width="150" height="150"/></div>
				<h2 className={styles.sectionHeadText}>Các câu hỏi và giải đáp</h2>
			</div>

			<div className="mt-20 flex flex-col bg-ticket">
				<VerticalTimeline>
					{services.map((service, index) => (
						<ServiceCard key={`service-${index}`} service={service} />
					))}
				</VerticalTimeline>
			</div>
		</>
	);
};

export default SectionWrapper(Services, "services");
