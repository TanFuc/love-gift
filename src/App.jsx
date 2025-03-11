import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import Letter from "./components/Letter";
import SpecialLetter from "./components/SpecialLetter"; 

const bgMusic = new Howl({
  src: ["./src/assets/nhaccho.mp3"],
  loop: true,
  volume: 0.3,
});

const letters = [
  {
    id: 1,
    message: "Chúc chị Hân nhân ngày Quốc tế Phụ nữ 8/3 (hơi muộn :v) luôn vui vẻ, mạnh mẽ, xinh đẹp và đạt được mọi ước mơ trong cuộc sống nhaa! 💕",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgkKADaFJJAILjWal9TcXhocbHkPyhZi3rMg&s",
  },
  {
    id: 2,
    message: "Chúc chị Hân sinh nhật vui vẻ (hơi sớm :<), tràn ngập tiếng cười! Chúc chị tuổi mới nhiều thành công, hạnh phúc, mạnh khỏe và lấy chồng giàu nhaa! 🎂",
    image: "https://media.istockphoto.com/id/861496684/vi/vec-to/h%C3%ACnh-minh-h%E1%BB%8Da-vector-b%C3%A1nh-sinh-nh%E1%BA%ADt-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp.jpg?s=612x612&w=0&k=20&c=I5VZ-qUuAwX1KHTB3iQQCNC1oA8weYgEo2FGqDW0XOk=",
  },
];

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    return () => bgMusic.stop();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 30 + 10,
          duration: Math.random() * 3 + 2,
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
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
      {/* Hiệu ứng trái tim rơi */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: "100vh" }}
          transition={{ duration: heart.duration, ease: "easeInOut" }}
          className="absolute text-red-500"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg"
      >
        💌 Hộp Thư Yêu Thương 💌
      </motion.h1>

      <div className="flex items-center justify-center w-full max-w-4xl gap-12">
        <motion.div
          className="cursor-pointer w-44 h-32 bg-pink-400 rounded-lg flex items-center justify-center shadow-xl border-4 border-pink-500 transform hover:scale-110 transition"
          onClick={() => setSelectedLetter(letters[0])}
        >
          <span className="text-white text-2xl font-bold">📩</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-white text-2xl font-bold drop-shadow-md"
        >
          ✨ Chọn lá thư bạn muốn mở ✨
        </motion.div>

        <motion.div
          className="cursor-pointer w-44 h-32 bg-pink-400 rounded-lg flex items-center justify-center shadow-xl border-4 border-pink-500 transform hover:scale-110 transition"
          onClick={() => setSelectedLetter(letters[1])}
        >
          <span className="text-white text-2xl font-bold">📩</span>
        </motion.div>
      </div>

      {selectedLetter && selectedLetter.id === 1 && (
        <Letter letter={selectedLetter} onClose={() => setSelectedLetter(null)} />
      )}
      {selectedLetter && selectedLetter.id === 2 && (
        <SpecialLetter letter={selectedLetter} onClose={() => setSelectedLetter(null)} />
      )}

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
