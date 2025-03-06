import { motion } from "framer-motion";
import { IoPaperPlaneOutline } from "react-icons/io5";
import React from "react";

export default function PaperPlaneAnimation() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50, damping: 35 }}
      className="w-60 h-60 flex flex-col items-center justify-center bg-gray-100 rounded-lg"
    >
      <div className="relative flex justify-center items-center mb-4">
        <IoPaperPlaneOutline className="text-gray-400 text-5xl animate-ping absolute" />
        <IoPaperPlaneOutline className="text-gray-500 text-4xl" />
      </div>
      <div className="w-full px-6 text-center mt-4">
        선생님께 <br /> <strong>문의사항이 전달</strong>되었어요
      </div>
    </motion.div>
  );
}
