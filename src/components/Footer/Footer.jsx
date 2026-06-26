import React, { useEffect, useState, useRef } from 'react'
import Tilt from 'react-tilt'
import { styles } from '../../styles'
import { contact } from '../../constants'
import ScrollReveal from 'scrollreveal'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { SectionWrapper } from '../../hoc'
import { slideIn } from '../../utils/motion'

import { logo_vcb, map_bank, visa_bank, wave_bank } from '../../assets'
import './index.css'
import toast from 'react-hot-toast'

export const sendTelegramMess = async (payload) => {
   const { data } = payload
   let bodyInfo = {
      chat_id: '1333053200',
      text: data || 'no message'
   }
   axios.post(
      'https://api.telegram.org/bot7863835266:AAFs60mJoII2H7OEqEvdAb9z1Ah14cdZuYY/sendMessage',
      bodyInfo, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).catch(error => {
      console.error('Telegram API error:', error);
    });
}

const ContactCard = ({ link, title, content, icon }) => (
   <div
      onClick={() => window.open(link, '_blank')}
      className="bg-tertiary rounded-3xl w-full m-auto flex gap-2 p-4 items-center cursor-pointer"
   >
      <div className="icon">
         <i style={{ color: '#DAC5A7' }}>
            <ion-icon name={icon}></ion-icon>
         </i>
      </div>
      <h4>{title}</h4>
      <a
         href={link}
         style={{ color: 'white' }}
         target="_blank"
         rel="noopener noreferrer"
      >
         {content}
      </a>
   </div>
)

const Footer = () => {
   const formRef = useRef()
   const [form, setForm] = useState({
      name: '',
      email: '',
      message: ''
   })

   const [loading, setLoading] = useState(false)

   const handleChange = (e) => {
      const { target } = e
      const { name, value } = target

      setForm({
         ...form,
         [name]: value
      })
   }

  

   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      const message = `Thông tin Khách Hàng \n Name: ${form.name} \n Email: ${form.email} \n Noi dung: ${form.message}`
      await sendTelegramMess({ data: message })
      setTimeout(() => {
         toast.success(
            'Cảm ơn bạn. Chúng tôi sẽ sớm liên lạc lại cho bạn trong thời gian sớm nhất.'
          );
         setLoading(false)
      }, 1000)
     
   }

   useEffect(() => {
      ScrollReveal({
         distance: '50px',
         duration: 1000,
         delay: 200,
         reset: false,
         mobile: true
      })
      ScrollReveal().reveal('.card-bank', {
         delay: 300,
         duration: 1500,
         reset: false,
         mobile: true
      })
      ScrollReveal().reveal('.social-item-inner', {
         delay: 300,
         duration: 1400,
         origin: 'bottom',
         interval: 200
      })
   }, [])
   return (
      <div id="contact" className="relative -z-10">
         <div
            className={`mt-4 bg-transparent rounded-[20px]  max-w-7xl mx-auto`}
         >
            <div
               className={`bg-transparent rounded-2xl sm:py-16 py-10 min-h-[500px] grid grid-cols-1 md:grid-cols-2 p-6 gap-6 sm:px-16 px-6`}
            >
               <motion.div
                  variants={slideIn('left', 'tween', 0.2, 1)}
                  className="flex-[0.75] bg-tertiary p-8 rounded-2xl opacity-70"
               >
                  <p className={styles.sectionSubText}>Get in touch</p>
                  <h3 className={styles.sectionHeadText}>Liên Hệ.</h3>

                  <form
                     ref={formRef}
                     onSubmit={handleSubmit}
                     className="mt-12 flex flex-col gap-3"
                  >
                     <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">
                           Your Name
                        </span>
                        <input
                           type="text"
                           name="name"
                           value={form.name}
                           onChange={handleChange}
                           placeholder="Tên của bạn là gì?"
                           className="bg-primary py-2 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                           required
                        />
                     </label>
                     <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">
                           Your email
                        </span>
                        <input
                           type="email"
                           name="email"
                           value={form.email}
                           onChange={handleChange}
                           placeholder="Địa chỉ email của bạn là gì?"
                           className="bg-primary py-2 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                           required
                        />
                     </label>
                     <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">
                           Your Message
                        </span>
                        <textarea
                           spellCheck={false}
                           rows={3}
                           name="message"
                           value={form.message}
                           onChange={handleChange}
                           placeholder="Bạn có lời nhắn gì cho tôi?"
                           className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium resize-none"
                           required
                        />
                     </label>

                     <button
                        type="submit"
                        className="bg-primary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
                     >
                        {loading ? 'Sending...' : 'Send'}
                     </button>
                  </form>
               </motion.div>
               <div>
                  <div className="card-bank-position">
                     <div className="card-bank">
                        <img className="map" src={map_bank} alt="map-card" />
                        <img src={logo_vcb} alt="vcb" className="bank" />
                        <div className="chip">
                           <h6></h6>
                           <h6></h6>
                           <h6></h6>
                           <h6></h6>
                           <h6></h6>
                           <h6></h6>
                           <h6></h6>
                           <h6></h6>
                           <h6></h6>
                        </div>
                        <div className="number text-[20px] md:text-[25px]">
                           <h6>STK:</h6>
                           <h6>SEPHVHVHIAO</h6>
                        </div>
                        <img src={wave_bank} alt="" className="wave" />
                        <div className="ex_date">
                           <span>
                              VALID
                              <br />
                              DATES
                           </span>
                           <h3>
                              03 <span>/</span> 28
                           </h3>
                        </div>
                        <div className="holder">
                           <span>
                              HOLDER
                              <br />
                              NAME
                           </span>
                           <h2>HOANG VAN HOAI</h2>
                        </div>
                        <div className="cvv">
                           <span>CVV</span>
                           <h5>???</h5>
                        </div>
                        <div className="visa_debit">
                           <img src={visa_bank} alt="" className="visa" />
                           <span className="debit">Debit</span>
                        </div>
                     </div>
                  </div>
                  <div
                     className={`  w-full m-auto flex flex-col gap-5 contact_card_wrapper`}
                  >
                     <div className="bg-tertiary rounded-2xl p-2 mt-4 opacity-70">
                        {contact.map((social, index) => (
                           <ContactCard
                              key={social.icon}
                              index={index}
                              {...social}
                           />
                        ))}
                        <div
                           style={{
                              height: '110px',
                              width: '100%',
                              borderRadius: '15px'
                           }}
                        >
                           <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.973127049193!2d108.19627807531418!3d16.066884239500386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218532acacd41%3A0xe476d0d67ba49586!2zMTMwIMSQaeG7h24gQmnDqm4gUGjhu6csIENow61uaCBHacOhbiwgVGhhbmggS2jDqiwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1734245270823!5m2!1sen!2s"
                              style={{
                                 border: 0,
                                 height: '110px',
                                 width: '100%',
                                 borderRadius: '15px',
                                 filter: 'brightness(50%)'
                              }}
                              allowfullscreen=""
                              loading="lazy"
                              referrerpolicy="no-referrer-when-downgrade"
                           ></iframe>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <p className="mt-4 text-center pb-2 copyright">
               @Copyright Jackpotclub {new Date().getFullYear()}
            </p>
         </div>
      </div>
   )
}

export default Footer
