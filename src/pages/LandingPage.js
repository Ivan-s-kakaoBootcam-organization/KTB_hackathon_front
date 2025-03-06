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
    <div className="w-full h-[100vh] flex flex-col justify-between items-center bg-gradient-to-b from-sky-300 to-sky-200 p-6">
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
