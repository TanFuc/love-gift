import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SpecialLetter = ({ letter, onClose }) => {
  const [showGift, setShowGift] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleConfirm = () => {
    setShowGift(false);
    setTimeout(() => {
      setShowNotification(true);
    }, 300);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-[450px] bg-yellow-100 rounded-2xl p-10 shadow-2xl border-4 border-yellow-500 flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click lan ra ngoài
      >
        <motion.img
          src={letter.image}
          alt="Special Letter"
          className="w-full h-56 object-cover rounded-xl mb-5 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />

        <motion.p
          className="text-yellow-600 font-bold text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          🎉 {letter.message} 🎉
        </motion.p>

        <motion.button
          onClick={() => setShowGift(true)}
          className="mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          🎁 Quà tặng nè
        </motion.button>

        <motion.button
          onClick={onClose}
          className="mt-4 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2 }}
        >
          Tui muốn thoát
        </motion.button>
      </motion.div>

      {/* Hộp quà */}
      <AnimatePresence>
        {showGift && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowGift(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-72 h-72 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex flex-col items-center justify-center shadow-xl p-6 text-white font-bold text-center relative"
              onClick={(e) => e.stopPropagation()} // Ngăn chặn click tắt popup
            >  
              Thử lòng Mẫn Nhi vậy thôi, ai ngờ mẫn nhi chưa tới ngày mà đã đòi quà?   

              <motion.button
                onClick={handleConfirm}
                className="mt-4 px-5 py-2 bg-yellow-300 text-red-800 font-bold rounded-lg shadow-md hover:bg-yellow-400 transition transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                ✅ Xác nhận nhận quà
              </motion.button>

              <motion.button
                onClick={() => setShowGift(false)}
                className="mt-4 px-5 py-2 bg-white text-pink-600 font-bold rounded-lg shadow-md hover:bg-pink-200 transition transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Đóng hộp quà 🎀
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thông báo xác nhận */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowNotification(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-80 bg-white rounded-xl p-6 shadow-xl text-center"
              onClick={(e) => e.stopPropagation()} // Ngăn chặn click tắt popup
            >  
              Em đã bảo là chưa tới ngày mà sao ngang dữ ta :)))  

              <motion.button
                onClick={() => setShowNotification(false)}
                className="mt-4 px-5 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Lui về hậu cung đi
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpecialLetter;
