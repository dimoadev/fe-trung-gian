import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "scrollreveal";
import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";
import { staggerContainer, textVariant } from "../../utils/motion";
import { styles } from "../../styles";

const Tech = () => {
	useEffect(() => {
		ScrollReveal({
			distance: "60px",
			duration: 1000,
			delay: 200,
			reset: false,
			mobile: true,
		});
		ScrollReveal().reveal(".balls_tech", {
			distance: "50px",
			duration: 1250,
			origin: "bottom",
		});
	}, []);
	return (
		<motion.section
			variants={staggerContainer()}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.25 }}
			className={`${styles.padding} max-w-7xl mx-auto relative z-0 hidden md:block`}
		>
			<div>
				{/* <div variants={textVariant()} className="title_section">
					<p className={styles.sectionSubText}>Framework</p>
					<h2 className={styles.sectionHeadText}>Ngôn ngữ lập trình</h2>
				</div> */}
				<div className="flex flex-row flex-wrap justify-center gap-10 mt-14 balls_tech">
					{technologies.map((technology) => (
						<div className="w-28 h-28" key={technology.name}>
							
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
};

export default Tech;
