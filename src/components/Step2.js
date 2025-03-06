import React from "react";
import SendButton from "./SendButton";

const Step2 = ({ studentName, setStudentName, onPrev, onNext }) => {
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col bg-tranparent px-6 py-8">
        {/* 뒤로 가기 버튼 */}
        <button className="text-2xl absolute top-14 left-4" onClick={onPrev}>
          ←
        </button>

        {/* 제목 */}
        <h2 className="text-2xl font-bold text-black mt-40">
          학생의 이름을 입력 해주세요
        </h2>

        {/* 학생 이름 입력 */}
        <div className="mt-6">
          <label className="text-green-600 font-bold text-lg">학생 이름</label>
          {/* 헬퍼 텍스트 (부드럽게 사라지고 위치 유지) */}
          <p
            className={`text-red-500 text-sm mt-1 font-medium h-5 transition-opacity duration-500 ${studentName ? "opacity-0 invisible" : "opacity-100 visible"}`}
          >
            ❗ 학생 이름을 입력해 주세요
          </p>

          <input
            type="text"
            className="w-full border-b border-gray-400 bg-transparent outline-none mt-2 p-2"
            placeholder="이름 입력"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        {/* 다음 버튼 */}
        <div className="mt-20">
          <SendButton text="다음" onClick={onNext} disabled={!studentName} />
        </div>
      </div>
    </>
  );
};

export default Step2;
