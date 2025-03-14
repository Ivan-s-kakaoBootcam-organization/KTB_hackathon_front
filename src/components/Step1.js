import React from "react";
import SendButton from "./SendButton";

const Step1 = ({
  schoolName,
  setSchoolName,
  grade,
  setGrade,
  classNumber,
  setClassNumber,
  onPrev,
  onNext,
}) => {
  // 입력값이 모두 채워져야 버튼 활성화
  const isFormValid = schoolName && grade && classNumber;

  return (
    <div className="w-full h-[100vh] flex flex-col bg-transparent px-6 py-8">
      {/* 뒤로 가기 버튼 */}
      <button className="text-2xl absolute top-14 left-50" onClick={onPrev}>
        ←
      </button>

      {/* 제목 */}
      <h2 className="text-2xl font-bold text-black mt-40">
        학적 정보를 입력 해주세요
      </h2>

      {/* 학교 이름*/}
      <div className="mt-8">
        <label className="text-[#313C70] font-bold text-lg">학교 이름</label>
        <select
          className={`w-full border-b border-gray-400 outline-none mt-1 p-2 bg-transparent ${schoolName ? "text-black" : "text-gray-400"}`}
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        >
          <option value="" disabled>
            학교 이름 선택
          </option>
          <option value="이도 초등학교">이도 초등학교</option>
          <option value="도남 초등학교">도남 초등학교</option>
          <option value="오라 초등학교">오라 초등학교</option>
        </select>
      </div>

      {/* 학년 & 반 (두 개 나란히 배치) */}
      <div className="mt-6 flex justify-between">
        <div className="w-[48%]">
          <label className="text-[#313C70] font-bold text-lg">학년</label>
          <select
            className={`w-full border-b border-gray-400 outline-none mt-1 p-2 bg-transparent ${grade ? "text-black" : "text-gray-400"}`}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="" disabled>
              학년 선택
            </option>
            {[...Array(6)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}학년
              </option>
            ))}
          </select>
        </div>

        <div className="w-[48%]">
          <label className="text-[#313C70] font-bold text-lg">반</label>
          <select
            className={`w-full border-b border-gray-400 outline-none mt-1 p-2 bg-transparent ${classNumber ? "text-black" : "text-gray-400"}`}
            value={classNumber}
            onChange={(e) => setClassNumber(e.target.value)}
          >
            <option value="" disabled>
              반 선택
            </option>
            {[...Array(6)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}반
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="mt-20">
        <SendButton text="다음" onClick={onNext} disabled={!isFormValid} />
      </div>
    </div>
  );
};

export default Step1;
