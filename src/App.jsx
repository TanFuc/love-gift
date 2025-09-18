import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";

/*
  SurpriseRomanceCompactOptimized
  - Compact, balanced layout: left avatar column (fixed), center content, right details column.
  - Removed unnecessary bottom whitespace and tightened vertical spacing.
  - Better avatar presentation (rounded, ring, captions) with accessible controls.
  - Gift cards: clearer thumbnail + text layout, stronger focus states, keyboard accessible.
  - Canvas/responsive confetti and controlled particle counts for performance.
  - Minor UX: clipboard feedback, accessible labels.
*/

const bgMusic = new Howl({
  src: ["/assets/romantic-loop.mp3"],
  loop: true,
  volume: 0.16,
  html5: true,
});
const chime = new Howl({ src: ["/assets/chime.mp3"], volume: 0.72 });
const successSfx = new Howl({ src: ["/assets/success.mp3"], volume: 0.9 });

const gifts = [
  {
    id: "flowers",
    name: "Bó Hoa",
    emoji: "💐",
    desc: "Bó hoa tươi kèm thiệp bất ngờ",
    img: "https://png.pngtree.com/png-clipart/20230409/original/pngtree-flower-bouquet-png-image_9039806.png",
    location: {
      title: "Quán cà phê La Vie",
      address: "123 Đường Hạnh Phúc, Quận Yêu Thương",
      time: "19:00, 25/09/2025",
    },
  },
  {
    id: "cake",
    name: "Bánh Kem",
    emoji: "🎂",
    desc: "Bánh kem nhỏ xinh, ngọt như tình yêu",
    img: "https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=1400&q=80",
    location: {
      title: "Nhà hàng Riverside",
      address: "Sảnh Rooftop, 7F River Tower",
      time: "18:30, 25/09/2025",
    },
  },
  {
    id: "picnic",
    name: "Picnic",
    emoji: "🧺",
    desc: "Buổi picnic hoàng hôn cùng nhau",
    img: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1400&q=80",
    location: {
      title: "Công viên Hoa Sắc",
      address: "Ngã ba Yêu Thương, gần hồ lớn",
      time: "16:00, 25/09/2025",
    },
  },
  {
    id: "concert",
    name: "Vé Concert",
    emoji: "🎟️",
    desc: "Đêm nhạc lãng mạn dưới ánh đèn",
    img: "https://png.pngtree.com/png-clipart/20230912/original/pngtree-concert-clipart-vector-png-image_11052305.png",
    location: {
      title: "Nhà hát Ánh Sao",
      address: "Số 10 Đường Âm Nhạc",
      time: "20:00, 25/09/2025",
    },
  },
  {
    id: "jewels",
    name: "Trang sức",
    emoji: "💎",
    desc: "Món quà nhỏ tinh tế",
    img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1400&q=80",
    location: {
      title: "Boutique Petite",
      address: "Số 5, Phố Ngọc",
      time: "19:30, 25/09/2025",
    },
  },
  {
    id: "letter",
    name: "Thư tay",
    emoji: "✉️",
    desc: "Một bức thư viết tay từ anh",
    img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
    location: {
      title: "Nơi gặp gỡ bất ngờ",
      address: "Địa điểm bí mật",
      time: "Theo thỏa thuận",
    },
  },
  {
    id: "perfume",
    name: "Nước hoa",
    emoji: "🌸",
    desc: "Hương thơm dành riêng cho em",
    img: "https://png.pngtree.com/png-vector/20250527/ourmid/pngtree-pink-perfume-bottle-luxury-fragrance-cosmetic-glass-container-elegant-scent-women-png-image_16348778.png",
    location: {
      title: "Shop Perfume",
      address: "Tầng 2, Mall",
      time: "17:00, 25/09/2025",
    },
  },
  {
    id: "photos",
    name: "Bộ ảnh",
    emoji: "📸",
    desc: "Buổi chụp ảnh kỷ niệm",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
    location: {
      title: "Studio Vintage",
      address: "Số 22, Phố Nghệ",
      time: "15:00, 25/09/2025",
    },
  },
];

export default function SurpriseRomanceCompactOptimized() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayPrompt, setAutoplayPrompt] = useState(false);
  const [stage, setStage] = useState("intro");
  const [selectedGift, setSelectedGift] = useState(null);
  const [hearts, setHearts] = useState([]);
  const canvasRef = useRef(null);

  // floating hearts (capped)
  useEffect(() => {
    const t = setInterval(() => {
      setHearts((p) => {
        const next = [
          ...p,
          {
            id: Math.random().toString(36).slice(2),
            left: 6 + Math.random() * 88,
            size: 12 + Math.random() * 20,
            dur: 3 + Math.random() * 2,
          },
        ];
        return next.slice(-8);
      });
    }, 900);
    return () => clearInterval(t);
  }, []);

  // autoplay attempt (client-only)
  useEffect(() => {
    let mounted = true;
    try {
      bgMusic.play();
      if (mounted) setIsPlaying(true);
    } catch (e) {
      setTimeout(() => setAutoplayPrompt(true), 700);
    }
    return () => {
      mounted = false;
      bgMusic.stop();
    };
  }, []);

  // resize-aware canvas
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      const ctx = canvas.getContext("2d");
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const spawnConfetti = (count = 100) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = window.innerWidth;
    const h = window.innerHeight;

    let particles = Array.from({ length: Math.min(180, count) }, () => ({
      x: w / 2 + (Math.random() - 0.5) * (w * 0.9),
      y: h / 3 + Math.random() * 30,
      vx: -2 + Math.random() * 4,
      vy: -6 + Math.random() * 5,
      r: 5 + Math.random() * 7,
      life: 50 + Math.random() * 40,
      color: ["#FFB6C1", "#FFD1DC", "#FDE68A", "#A7F3D0", "#C7B9FF"][
        Math.floor(Math.random() * 5)
      ],
    }));

    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(Date.now() / 300) * 0.4;
        p.y += p.vy;
        p.vy += 0.25;
        p.life -= 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.life % 360) * 0.02);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx.restore();
      });
      particles = particles.filter((p) => p.life > 0 && p.y < h + 100);
      if (particles.length > 0) requestAnimationFrame(anim);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    requestAnimationFrame(anim);
  };

  const handleProceedToGifts = () => {
    chime.play();
    setStage("gifts");
  };

  const handleSelectGift = (g) => {
    chime.play();
    setSelectedGift(g);
    setTimeout(() => setStage("detail"), 160);
  };

  const handleConfirm = async () => {
    successSfx.play();
    spawnConfetti(140);
    setTimeout(() => setStage("thanks"), 700);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      bgMusic.pause();
      setIsPlaying(false);
    } else {
      bgMusic.play();
      setIsPlaying(true);
      setAutoplayPrompt(false);
    }
  };

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-rose-800 via-pink-600 to-violet-800 flex items-start justify-center text-white overflow-hidden">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-30"
      />

      <div className="relative z-40 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-6">
        {/* Left avatar column - fixed width on md+ */}
        <div className="col-span-12 md:col-span-3 flex md:flex-col items-center md:items-start gap-4 md:gap-6">
          <div className="flex items-center gap-3 md:flex-col w-full md:w-auto">
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1545996124-1b9d55a7c2a5?auto=format&fit=crop&w=800&q=80"
                alt="Anh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold">Anh yêu</div>
              <div className="text-xs text-white/80 mt-1">Chuẩn bị bất ngờ</div>
              <button
                onClick={toggleMusic}
                className="mt-3 px-3 py-1 rounded-full bg-white/10 text-xs"
                aria-pressed={isPlaying}
              >
                {isPlaying ? "🔈 Nhạc" : "🎵 Bật nhạc"}
              </button>
            </div>
          </div>

          <div className="ml-auto md:ml-0 md:mt-2 hidden md:block text-xs text-white/70">
            Graphics by Phuc ❤️
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/80">Món quà</div>
              <div className="text-2xl md:text-3xl font-extrabold">
                Bất ngờ của anh
              </div>
            </div>
            <div className="text-xs text-white/60">Surprise · ❤️</div>
          </div>

          {/* Intro or small hero */}
          <AnimatePresence>
            {stage === "intro" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-4 bg-white/5 border border-white/6"
              >
                <div className="text-center md:text-left">
                  <div className="text-lg font-bold">
                    Em à, anh có điều muốn nói...
                  </div>
                  <div className="mt-2 text-sm text-white/80">
                    Cảm ơn em đã luôn ở bên anh. Hôm nay anh dành tặng em một
                    chút bất ngờ — hy vọng em thích.
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                    <button
                      onClick={handleProceedToGifts}
                      className="px-4 py-2 rounded-lg bg-pink-500 text-sm font-semibold shadow-sm"
                    >
                      Xem quà
                    </button>
                    <button
                      onClick={toggleMusic}
                      className="px-3 py-2 rounded-lg bg-white/10 text-sm"
                    >
                      {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* thanks overlay stage */}
          <AnimatePresence>
            {stage === "thanks" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-6"
              >
                <div className="max-w-md bg-black/70 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-2xl font-bold mb-3">Cảm ơn em ❤️</div>
                  <div className="text-sm text-white/80 leading-relaxed">
                    Hiện tại, anh biết ơn từng khoảnh khắc có em bên cạnh. Trong
                    tương lai, anh mong chúng ta sẽ cùng nhau đi qua thật nhiều
                    chặng đường, cùng nhau xây dựng một tình yêu trọn vẹn và bền
                    lâu. Em chính là món quà tuyệt vời nhất trong cuộc đời anh.
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={() => {
                        setStage("intro");
                        setSelectedGift(null);
                      }}
                      className="px-4 py-2 rounded-md bg-pink-500 font-semibold"
                    >
                      💖 Trở về đầu
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gifts grid */}
          <AnimatePresence>
            {stage === "gifts" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3"
              >
                {gifts.map((g) => (
                  <motion.button
                    key={g.id}
                    onClick={() => handleSelectGift(g)}
                    whileHover={{ translateY: -6 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-stretch gap-0 rounded-xl overflow-hidden bg-black/20 border border-white/6 focus:outline-none focus:ring-4 focus:ring-pink-400/30"
                    role="button"
                    tabIndex={0}
                    aria-label={`Xem ${g.name}`}
                  >
                    <div className="w-32 h-24 flex-shrink-0 relative">
                      <img
                        src={g.img}
                        alt={g.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    </div>
                    <div className="p-3 flex-1 text-left">
                      <div className="text-sm font-semibold">
                        {g.emoji} {g.name}
                      </div>
                      <div className="text-xs text-white/70 mt-1 leading-snug">
                        {g.desc}
                      </div>
                      <div className="mt-2 text-2xs text-white/60">
                        Nhấn để xem chi tiết
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detail panel stacked under gifts on small screens */}
          <AnimatePresence>
            {stage === "detail" && selectedGift && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="rounded-2xl p-3 bg-white/5 border border-white/6 mt-2"
              >
                <div className="flex gap-3 items-start">
                  <div className="w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={selectedGift.img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-bold text-lg">
                      {selectedGift.emoji} {selectedGift.name}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {selectedGift.desc}
                    </div>

                    <div className="mt-2 text-sm">
                      Điểm hẹn:{" "}
                      <span className="font-semibold">
                        {selectedGift.location.title}
                      </span>
                    </div>
                    <div className="text-xs text-white/70">
                      {selectedGift.location.address} —{" "}
                      {selectedGift.location.time}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard &&
                            navigator.clipboard.writeText(
                              selectedGift.location.address
                            );
                          chime.play();
                          alert("Đã sao chép địa chỉ!");
                        }}
                        className="px-3 py-1 rounded-md bg-pink-500 text-sm"
                      >
                        📋 Sao chép
                      </button>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Mở chỉ đường (tùy chỉnh URL trong mã)");
                        }}
                        className="px-3 py-1 rounded-md bg-white/10 text-sm"
                      >
                        🗺️ Chỉ đường
                      </a>
                      <button
                        onClick={handleConfirm}
                        className="px-3 py-1 rounded-md bg-white/10 text-sm"
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={() => {
                          setStage("gifts");
                          setSelectedGift(null);
                        }}
                        className="px-3 py-1 rounded-md bg-white/10 text-sm"
                      >
                        ↩️ Quay lại
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column - collapsed on small screens, shows recipient avatar + thank you */}
        <div className="col-span-12 md:col-span-3 hidden md:flex flex-col items-end gap-4">
          <div className="w-32 rounded-xl overflow-hidden border border-white/8 shadow-md">
            <img src="" alt="Em" className="w-full h-40 object-cover" />
            <div className="p-2 text-center text-sm bg-black/25">Em yêu</div>
          </div>

          <div className="text-sm text-white/80 text-right">
            Chúc em một ngày ngọt ngào 💌
          </div>
        </div>
      </div>

      {/* floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 520, opacity: 1 }}
          transition={{ duration: h.dur }}
          style={{ left: `${h.left}%`, fontSize: h.size }}
          className="absolute pointer-events-none text-pink-100 z-40"
        >
          ❤️
        </motion.div>
      ))}

      {/* autoplay prompt */}
      <AnimatePresence>
        {autoplayPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-6 pointer-events-auto"
          >
            <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
              <div>
                <div className="font-semibold">Nhạc nền đã bị chặn</div>
                <div className="text-xs text-white/70">
                  Nhấn để bật nhạc và thưởng thức bất ngờ.
                </div>
              </div>
              <button
                onClick={() => {
                  bgMusic.play();
                  setIsPlaying(true);
                  setAutoplayPrompt(false);
                }}
                className="px-4 py-2 rounded-md bg-pink-500 font-semibold"
              >
                Bật nhạc
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
