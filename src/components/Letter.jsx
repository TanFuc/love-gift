import { motion, AnimatePresence } from "framer-motion";
import GiftButton from "./GiftButton";

const Letter = ({ letter, onClose }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            scale: 0.6,
            opacity: 0,
            borderWidth: "0px",
            clipPath: "inset(50%)",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            borderWidth: "4px",
            clipPath: "inset(0%)",
          }}
          exit={{
            scale: 0.6,
            opacity: 0,
            borderWidth: "0px",
            clipPath: "inset(50%)",
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative w-[420px] bg-white rounded-2xl p-8 shadow-2xl border-4 border-pink-400 flex flex-col items-center text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hình ảnh thư xuất hiện chậm */}
          <motion.img
            src={letter.image}
            alt="Letter"
            className="w-full h-56 object-cover rounded-xl mb-5 shadow-lg"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />

          {/* Nội dung trượt từ từ */}
          <motion.p
            className="text-pink-600 font-bold text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            {letter.message}
          </motion.p>

          {/* Hộp quà xuất hiện mượt mà hơn */}
          <motion.div
            className="mt-6 flex gap-4"
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 10 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          >
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition transform hover:scale-105"
            >
              Đóng 💌
            </motion.button>

            <GiftButton onSelectGift={(gift) => alert(`Không có time nên chỉ đến được tới đây thôi, thông cảm nhó chị eo :3`)} />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Letter;
