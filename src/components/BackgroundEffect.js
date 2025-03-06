import { motion } from "framer-motion";

const BackgroundEffect = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 z-[1]"
      initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
      animate={{
        scale: [1, 1.1, 1], // 확대 & 축소 효과
        rotate: [0, 5, -5, 0], // 회전 효과
        x: [-40, 40, -40], // 좌우 이동
        y: [-30, 30, -30], // 위아래 이동
        opacity: [0.8, 1, 0.8], // 투명도 변화
        backgroundPosition: ["0% 50%", "50% 50%", "100% 50%", "0% 50%"], // 색상 변화
      }}
      transition={{
        duration: 100, // 애니메이션 지속 시간
        repeat: Infinity, // 무한 반복
        ease: "easeInOut", // 부드러운 효과
      }}
    />
  );
};

export default BackgroundEffect;
