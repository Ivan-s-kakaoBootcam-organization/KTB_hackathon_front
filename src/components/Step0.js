import React, { useState } from "react";

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
    <div className="w-full h-[100vh] flex flex-col justify-between items-center bg-gradient-to-b from-orange-400 to-orange-500 p-6">
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-start w-full px-6 mt-40">
        <h2 className="text-white text-5xl font-bold">다르미</h2>
        <p className="text-blue-200 mt-1 text-lg">학부모 문의 사항 챗봇</p>
      </div>

      {/* 이메일 입력 섹션 */}
      <div className="w-full px-6">
        <label className="text-white font-semibold text-lg">
          선생님 이메일 작성
        </label>
        {validationMessage && (
          <p className="text-red-500 text-sm mt-1">{validationMessage}</p>
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
      <div className="w-full px-6 mb-8">
        <button
          className="w-full bg-white text-black font-bold py-3 rounded-lg shadow-md"
          onClick={onNext} // 부모 컴포넌트에서 전달된 onNext 실행
          disabled={isButtonDisabled}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Step0;
