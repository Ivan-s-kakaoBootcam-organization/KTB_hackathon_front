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
    <div className="w-full h-[100vh] flex flex-col justify-between items-center bg-[#ADE0FC] p-6 relative overflow-hidden">
      {/* 왼쪽 위 동그라미 */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#49AFFE]/80 to-[#49AFFE]/30 blur-md animate-float-normal"></div>
      
      {/* 오른쪽 아래 동그라미 */}
      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-[#49AFFE]/80 to-[#49AFFE]/30 blur-md animate-float-reverse"></div>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-start w-full px-6 mt-40 relative z-10">
        <h2 className="text-white text-5xl font-bold">다르미</h2>
        <p className="text-blue-200 mt-1 text-lg">학부모 문의 사항 챗봇</p>
      </div>

      {/* 이메일 입력 섹션 */}
      <div className="w-full px-6 relative z-10">
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
      <div className="w-full px-6 mb-8 relative z-10">
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
