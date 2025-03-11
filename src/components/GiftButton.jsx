import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GiftButton = ({ onSelectGift }) => {
  const [showGiftSelection, setShowGiftSelection] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

  // Danh sách quà tặng
  const gifts = [
    {
      name: "Dây buộc tóc 🎀",
      imageSelect: "https://product.hstatic.net/1000006063/product/sc2407c_1149ffc4b821453aa3e8f453ffd9e8af_1024x1024.jpg",
      imageConfirm: "https://png.pngtree.com/png-clipart/20250107/original/pngtree-festive-cat-in-santa-hat-with-christmas-gifts-clipart-png-image_18852336.png",
    },
    {
      name: "Lại là buộc tóc 🎀",
      imageSelect: "https://product.hstatic.net/1000006063/product/sc2407c_1149ffc4b821453aa3e8f453ffd9e8af_1024x1024.jpg",
      imageConfirm: "https://inkythuatso.com/uploads/thumbnails/800/2022/05/meo-ngo-nghinh-voi-nhung-chiec-mu-trai-cay-165650-11-15-44-44.jpg",
    },
    {
      name: "Cũng là dây buộc tóc luôn :)) 🎀",
      imageSelect: "https://product.hstatic.net/1000006063/product/sc2407c_1149ffc4b821453aa3e8f453ffd9e8af_1024x1024.jpg",
      imageConfirm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScb0z5k25TXI3EV7iKYK9YCvrtM2yow31hUw&s",
    },
  ];

  return (
    <>
      <motion.button
        onClick={() => setShowGiftSelection(true)}
        className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
      >
        Chọn Quà 🎁
      </motion.button>

      <AnimatePresence>
        {showGiftSelection && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            onClick={() => setShowGiftSelection(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-[350px] bg-white rounded-2xl p-6 shadow-2xl border-4 border-yellow-500 flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-yellow-600 font-bold text-xl mb-4">
                Chọn Quà 🎁
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {gifts.map((gift, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                    onClick={() => {
                      setSelectedGift(gift);
                      setShowGiftSelection(false);
                    }}
                  >
                    <motion.img
                      src={gift.imageSelect}
                      alt={gift.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <p className="text-sm font-medium mt-2">{gift.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedGift && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-[350px] bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center"
            >
              <h2 className="text-yellow-600 font-bold text-xl mb-4">
                Bạn đã chọn {selectedGift.name}! Vui lòng liên hệ anh Phúc để đòi quà nhé :)))
              </h2>
              <img src={selectedGift.imageConfirm} alt={selectedGift.name} className="w-32 h-32 object-cover rounded-lg mb-4" />
              <button
                onClick={() => {
                  onSelectGift(selectedGift);
                  setSelectedGift(null);
                }}
                className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
              >
                Xác nhận 🎉
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GiftButton;
