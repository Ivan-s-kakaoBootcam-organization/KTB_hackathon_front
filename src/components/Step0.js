import React, { useState } from "react";
import SendButton from "./SendButton";

const Step0 = ({ email, setEmail, onNext }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (emailValue === "") {
      setValidationMessage("");
      setIsButtonDisabled(true);
    } else if (validateEmail(emailValue)) {
      setIsButtonDisabled(false);
      setValidationMessage("");
    } else {
      setIsButtonDisabled(true);
      setValidationMessage("유효한 이메일 주소를 입력해주세요.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="relative w-full h-[100vh] flex flex-col justify-between items-center p-10">
      {/* 헤더 */}
      <div className="flex flex-col items-start w-full px-4 mt-40">
        <h2
          className="text-8xl font-black tracking-wide"
          style={{ fontFamily: '"Fredoka", sans-serif' }}
        >
          <span className="text-blue-700">M</span>
          <span className="text-white">IN</span>
          <span className="text-blue-700">Z</span>
          <span className="text-white">I</span>
        </h2>
        <p className="text-gray-200 mt-1 w-full px-5.5 text-lg">
          학부모 맞춤 민원 대응 챗봇
        </p>
      </div>

      {/* 이메일 입력 */}
      <div className="w-full px-6">
        <label className="text-white font-semibold text-base">
          선생님 이메일 작성
        </label>
        <input
          type="email"
          className="w-full border-b border-white outline-none mt-2 p-2 bg-transparent text-white"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
        />
        <p
          className={`text-red-400 text-sm mt-1 font-medium h-5 transition-opacity duration-500 ${
            validationMessage ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {validationMessage || ""}
        </p>
      </div>

      {/* 버튼 */}
      <SendButton
        text="시작하기"
        onClick={onNext}
        disabled={isButtonDisabled}
      />
    </div>
  );
};

export default Step0;
