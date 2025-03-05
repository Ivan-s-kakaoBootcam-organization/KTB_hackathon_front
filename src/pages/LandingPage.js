import React, { useState } from "react";
import Chat from "./ChatPage"
const LandingPage = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && (
        <div className="w-full h-[100vh] flex flex-col justify-between items-center bg-gradient-to-b from-orange-400 to-orange-500 p-6">
          {/* 상단 로고 */}
          <div className="w-full flex justify-center mt-8">
            <h1 className="text-white text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl font-bold">C</span> Chatbox
            </h1>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="flex flex-col items-start w-full px-6">
            <h2 className="text-white text-5xl font-bold">다르미</h2>
            <p className="text-blue-200 mt-1 text-lg">학부모 문의 사항 챗봇</p>
          </div>

          {/* 이메일 입력 섹션 */}
          <div className="w-full px-6">
            <label className="text-white font-semibold text-lg">
              선생님 이메일 작성
            </label>
            <p className="text-red-500 text-sm mt-1">🔴 헬퍼 텍스트</p>
            <div className="border-b border-white w-full mt-2"></div>
          </div>

          {/* 시작하기 버튼 */}
          <div className="w-full px-6 mb-8">
            <button
              className="w-full bg-white text-black font-bold py-3 rounded-lg shadow-md"
              onClick={() => setStep(1)}
            >
              시작하기
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <Chat></Chat>
      )}
    </>
  );
};

export default LandingPage;
