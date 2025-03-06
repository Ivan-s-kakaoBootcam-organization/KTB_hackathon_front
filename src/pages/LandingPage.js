import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step0 from "../components/Step0";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";

const LandingPage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [grade, setGrade] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 2) {
      navigate("/chat", {
        state: {
          email,
          schoolName,
          grade,
          classNumber,
          studentName,
        },
      });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div
      className="w-full h-[100vh] flex flex-col justify-between items-center bg-gradient-to-br from-[#49AFFE] via-[#ADE0FC] to-[#49AFFE] z-[1]"
      initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
      animate={{
        scale: [1, 14, 1], // 더 크게 확대 & 축소
        rotate: [0, 20, -20, 0], // 회전 각도 증가
        x: [-200, 200, -200], // 좌우 이동 범위 확장
        y: [-150, 150, -150], // 위아래 이동 범위 확장
        opacity: [0.5, 1, 0.5], // 투명도 변화 더욱 확대
        backgroundPosition: [
          "0% 50%",
          "0% 50%",
          "10% 50%",
          "60% 50%",
          "80% 50%",
          "100% 50%",
          "0% 50%",
        ], // 색상 변화 더 빠르게
      }}
      transition={{
        duration: 0.1, // 기존보다 2배 빠르게 (2.5초)
        repeat: Infinity, // 무한 반복
        ease: "easeInOut", // 부드러운 효과
      }}
    >
      {" "}
      {step === 0 && (
        <Step0 email={email} setEmail={setEmail} onNext={() => setStep(1)} />
      )}
      {step === 1 && (
        <Step1
          schoolName={schoolName}
          setSchoolName={setSchoolName}
          grade={grade}
          setGrade={setGrade}
          classNumber={classNumber}
          setClassNumber={setClassNumber}
          onPrev={() => setStep(0)}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          studentName={studentName}
          setStudentName={setStudentName}
          onPrev={() => setStep(1)}
          onNext={handleNextStep}
        />
      )}
    </div>
  );
};

export default LandingPage;
