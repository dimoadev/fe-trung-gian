import React, { useState, useEffect } from 'react';
import { FaClock, FaCalendarAlt, FaHourglassHalf, FaStopwatch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = { ...prevTime };
          if (newTime.seconds > 0) {
            newTime.seconds--;
          } else {
            newTime.seconds = 59;
            if (newTime.minutes > 0) {
              newTime.minutes--;
            } else {
              newTime.minutes = 59;
              if (newTime.hours > 0) {
                newTime.hours--;
              } else {
                newTime.hours = 23;
                if (newTime.days > 0) {
                  newTime.days--;
                } else {
                  clearInterval(interval);
                  setIsRunning(false);
                  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }
              }
            }
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setTimeLeft({ days: 30, hours: 0, minutes: 0, seconds: 0 });
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const TimeUnit = ({ value, unit, icon }) => (
    <motion.div
      className="flex flex-col items-center p-4 bg-gradient-to-br from-green-500 to-indigo-600 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="text-4xl font-bold text-white mb-2">{value.toString().padStart(2, '0')}</div>
      <div className="flex items-center text-purple-100">
        {icon}
        <span className="ml-1 text-sm">{unit}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="rounded-xl flex items-center justify-center  bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
      <div className="rounded-xl bg-white bg-opacity-20 p-8 backdrop-filter backdrop-blur-lg w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-8 animate-pulse">Chủ nhật 12/03/2025</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <TimeUnit value={timeLeft.days} unit="Ngày" icon={<FaCalendarAlt className="text-purple-200" />} />
          <TimeUnit value={timeLeft.hours} unit="Giờ" icon={<FaClock className="text-purple-200" />} />
          <TimeUnit value={timeLeft.minutes} unit="Phút" icon={<FaHourglassHalf className="text-purple-200" />} />
          <TimeUnit value={timeLeft.seconds} unit="Giây" icon={<FaStopwatch className="text-purple-200" />} />
        </div>
        {/* <div className="flex justify-center space-x-4">
          <motion.button
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
          >
            Start
          </motion.button>
          <motion.button
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStop}
          >
            Stop
          </motion.button>
        </div> */}
      </div>
    </div>
  );
};

export default CountdownTimer;