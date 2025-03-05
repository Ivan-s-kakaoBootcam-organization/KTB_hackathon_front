import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

const Step2 = ({ onPrev }) => {
  const [studentName, setStudentName] = useState(""); // 학생 이름 상태 관리
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100vh] flex flex-col bg-white px-6 py-8">
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
        {!studentName && (
          <p className="text-red-500 text-sm mt-1">
            ❗ 학생 이름을 입력해 주세요
          </p>
        )}

        <input
          type="text"
          className="w-full border-b border-gray-400 outline-none mt-2 p-2"
          placeholder="이름 입력"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      {/* 다음 버튼 */}
      <button
        className={`w-full py-3 mt-10 rounded-lg font-bold transition ${
          studentName
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        disabled={!studentName}
        onClick={() => navigate("/chat")} // "/final" 페이지로 이동
      >
        다음
      </button>
    </div>
  );
};

export default Step2;
