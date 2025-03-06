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
    <div className="w-full h-[100vh] flex flex-col justify-between items-center bg-gradient-to-b from-sky-300 to-sky-200 p-6">
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-start w-full px-6 mt-40">
        <h2 className="text-white text-5xl font-bold">민지(MINzI)</h2>
        <p className="text-grey mt-1 text-lg">학부모 맞춤 민원 대응 챗봇</p>
      </div>

      {/* 이메일 입력 섹션 */}
      <div className="w-full px-6">
        <label className="text-white font-semibold text-base">
          선생님 이메일 작성
        </label>
        {validationMessage && (
          <p className="text-red-500 text-xs mt-1">{validationMessage}</p>
        )}{" "}
        <input
          type="email"
          className="w-full border-b border-white outline-none mt-2 p-2 bg-transparent text-white"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      {/* 시작하기 버튼 */}
      <SendButton
        text="시작하기"
        onClick={onNext}
        disabled={isButtonDisabled}
      />
    </div>
  );
};

export default Step0;
