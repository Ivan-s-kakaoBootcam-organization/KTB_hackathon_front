import React from "react";

const SendButton = ({ text, onClick, disabled }) => {
  return (
    <div className="w-full px-6 mb-8">
      <button
        className="w-full bg-white text-black font-bold py-3 rounded-lg shadow-md"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default SendButton;
