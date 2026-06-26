import React, { useEffect } from "react";
import Tilt from "react-tilt";
import ScrollReveal from "scrollreveal";

import { afterlifes, beforelifes, cardAbouts } from "../../constants";
import { styles } from "../../styles";
import { fadeIn } from "../../utils/motion";

import { SectionWrapper } from "../../hoc/index";

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

const Servic = () => {
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
      <div className="life" id="services">
        <div className="mb-14 title_section title_section_life flex items-center">
          <div className={styles.sectionSubText}><img src="./icon/icon1.png" alt="icon1" width="150" height="150"/></div>
          <h2 className={styles.sectionHeadText}>Cách hoạt động</h2>
        </div>
        <div className="mt-14 flex flex-wrap lg:gap-10 gap-2 mb-14">
        {cardAbouts.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
        <div className="life_container grid">
          <div className="journey">
            <div className="timeline">
              {afterlifes.map((beforelife) => (
                <div
                  key={beforelife.date}
                  className="timeline_item cursor-pointer"
                >
                  <div className="circle_dot"></div>
                  <h2 className="timeline_title">{beforelife.title}</h2>
                  <p className="timeline_text">{beforelife.description}</p>
                  {/* <span className="timeline_date">📆 {beforelife.date}</span> */}
                </div>
              ))}
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Servic, "servic");
