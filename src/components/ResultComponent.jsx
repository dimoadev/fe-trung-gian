import React, { useState, useEffect } from 'react';
import { FaClock, FaCalendarAlt, FaHourglassHalf, FaStopwatch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ResultComponent = ({number}) => {

  const [numberResult, setNumberResult] = useState([]);

  useEffect(() => {
    const x = number?.split(",")?.map((num) => num.length === 1 ? `0${num}` : num);
    setNumberResult(x);
  }, [number]);

  const TimeUnit = ({ value }) => (
    <motion.div
      className="hover:animate-bounce flex flex-col items-center p-2 bg-gradient-to-br from-yellow-500 to-indigo-900 rounded-full shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="text-4xl font-bold text-white">{value}</div>
    </motion.div>
  );

  const TimeSUnit = ({ value }) => (
    <motion.div
      className="hover:animate-bounce flex flex-col items-center p-2 bg-gradient-to-br from-red-500 to-indigo-900 rounded-full shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="text-4xl font-bold text-white">{value}</div>
    </motion.div>
  );

  return (
    <div className="rounded-xl flex items-center justify-center  bg-gradient-to-r from-blue-400 via-cyan-500 to-green-500 animate-gradient-x">
      <div className="rounded-xl bg-white bg-opacity-20 p-8 backdrop-filter backdrop-blur-lg w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Kết quả</h1>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
          {numberResult&& numberResult.map((num, index) => <TimeUnit value={num} key={index}/>)}
          <TimeSUnit value={"11"}  />
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

export default ResultComponent;