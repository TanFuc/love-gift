import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";

const bgMusic = new Howl({
  src: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"],
  loop: true,
  volume: 0.5,
});

const letters = [
  {
    id: 1,
    message: "Chúc bạn một ngày 8/3 đầy hạnh phúc và yêu thương! 💕",
    image: "https://source.unsplash.com/300x200/?flowers"
  },
  {
    id: 2,
    message: "Chúc mừng sinh nhật! Chúc bạn tuổi mới tràn đầy niềm vui và thành công! 🎂",
    image: "https://source.unsplash.com/300x200/?birthday"
  }
];

const Letter = ({ letter, onClose }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="absolute w-80 bg-white rounded-lg p-6 shadow-2xl border border-pink-400 flex flex-col items-center text-center"
    >
      <img src={letter.image} alt="Letter" className="w-full h-48 object-cover rounded-lg mb-4" />
      <p className="text-pink-600 font-semibold text-lg">{letter.message}</p>
      <button onClick={onClose} className="mt-4 px-5 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition">Đóng</button>
    </motion.div>
  );
};

const FallingHearts = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500 text-xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: "100vh", opacity: 1 }}
          transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 20}%` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    return () => bgMusic.stop();
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 to-pink-500 overflow-hidden text-center px-4">
      <FallingHearts />
      
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg"
      >
        💌 Hộp Thư Yêu Thương 💌
      </motion.h1>

      <div className="flex items-center justify-center w-full max-w-4xl gap-12">
        {/* Lá thư bên trái */}
        <motion.div
          className="cursor-pointer w-44 h-32 bg-pink-400 rounded-lg flex items-center justify-center shadow-xl border-4 border-pink-500 transform hover:scale-110 transition"
          onClick={() => setSelectedLetter(letters[0])}
        >
          <span className="text-white text-2xl font-bold">📩</span>
        </motion.div>

        {/* Phần trung tâm */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-white text-2xl font-bold drop-shadow-md"
        >
          ✨ Chọn lá thư bạn muốn mở ✨
        </motion.div>

        {/* Lá thư bên phải */}
        <motion.div
          className="cursor-pointer w-44 h-32 bg-pink-400 rounded-lg flex items-center justify-center shadow-xl border-4 border-pink-500 transform hover:scale-110 transition"
          onClick={() => setSelectedLetter(letters[1])}
        >
          <span className="text-white text-2xl font-bold">📩</span>
        </motion.div>
      </div>

      {selectedLetter && <Letter letter={selectedLetter} onClose={() => setSelectedLetter(null)} />}

      <button
        onClick={toggleMusic}
        className="mt-8 px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow-lg transition hover:bg-pink-200"
      >
        {isPlaying ? "🔊 Tắt nhạc" : "🎶 Bật nhạc"}
      </button>
    </div>
  );
};

export default App;
