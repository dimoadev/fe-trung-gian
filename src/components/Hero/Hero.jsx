import { motion } from "framer-motion";
import { styles } from "../../styles";
//import { ComputersCanvas } from "../canvas";
import Typed from "react-typed";
import { fadeIn, slideIn } from "../../utils/motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
if (window) {
  setShow(true)
}
  }, [])
  return (
    <>
      <section className="relative w-full max-w-7xl h-screen mx-auto grid grid-cols-1 mt-[70px] md:mt-0 md:grid-cols-2" id="home">
        <div
          className={` mx-auto flex items-center p-6`}
        >
          {/* <div className="flex flex-col justify-center items-center mt-1">
            <div className="w-5 h-5 rounded-full bg-[#fff]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div> */}
          <div>
            <h1 className={`${styles.heroHeadText} exo text-white mb-5 p-0`}>
            Cùng nhau rinh giải 
            </h1>
            {/* <p className={`${styles.heroSubText} text-white-100 exo`} style={{fontWeight: 200}}>
              Phần mềm &nbsp;
              <Typed
                strings={[
                  "",
                  "quản lý doanh nghiệp",
                  "quản lý dự án",
                  "thương mại điện tử",
                  "thanh toán trực tuyến",
                  "thống kê xử lí số liệu",
                  "số hóa lưu trữ tập trung"
                ]}
                typeSpeed={75}
                backSpeed={60}
                loop={true}
                className="text-[#DAC5A7]"
              />
            </p> */}
            <p className={`${styles.heroSubText} mt-1 text-white-100 exo font-light`} style={{fontWeight: 200}}>
           "Một cây làm chẳng nên non ba cây chụm lại nên hòn núi cao" <br></br>
           Chúng ta cùng tận dụng sự may mắn của hàng trăm nghìn người để giật giải độc đắc!

            </p>
            <a
            variants={fadeIn("bottom", "", 1, 1)}
            href="/auth/login"
            className="button_downloadcv mt-6 max-w-[150px]"
          >
            Bắt đầu ngay
          </a>
          </div>
        </div>
        <motion.div
        variants={slideIn("right", "tween", 0, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
      </motion.div>
        {/* <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div> */}
      </section>
    </>
  );
};

export default Hero;
