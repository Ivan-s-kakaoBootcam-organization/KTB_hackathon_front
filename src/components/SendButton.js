import { motion } from "framer-motion";

const SendButton = ({ text, onClick, disabled }) => {
  return (
    <div className="w-full px-6 mb-8">
      <motion.button
        className={`w-full font-bold py-3 rounded-lg shadow-md transition-all 
          ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black hover:bg-gray-100"}`}
        onClick={onClick}
        disabled={disabled}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {text}
      </motion.button>
    </div>
  );
};

export default SendButton;
