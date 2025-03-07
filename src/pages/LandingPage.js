import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Step0 from "../components/Step0";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import { motion } from "framer-motion";
import TeacherImage from "../assets/images/Teacher.png";
import LogoImage from "../assets/images/Logo.png";
import "./LandingPage.css";

const LandingPage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [grade, setGrade] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [showStep0, setShowStep0] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStep0(true);
    }, 5000); // 5초 후에 step0 표시

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (email) {
      setShowIndicators(true);
    }
  }, [email]);

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

  useEffect(() => {
    console.log("step", step);
  }, [step]);

  return (
    <div className="w-full h-[100vh] flex flex-col justify-between items-center bg-gradient-to-br from-[#49AFFE] via-[#ADE0FC] to-[#49AFFE] z-[1] animate-bg-shake">
      {!showStep0 && (
        <>
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, delay: 6 }}
            className="absolute bottom-[-130px] w-full flex justify-center z-20"
          >
            <img src={TeacherImage} alt="Loading" className="transform" />
          </motion.div>
          <motion.div
            initial={{ y: "50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 3, delay: 1.3 }}
            className="flex justify-center items-center h-[70%] z-10"
          >
            <img src={LogoImage} alt="Logo" className="" />
            {/* 로고 크기 조정 */}
          </motion.div>
        </>
      )}
      {/* 인디케이터 */}
      {showIndicators && (
        <div className="flex items-center justify-center absolute top-14 left-1/2 transform -translate-x-1/2 flex gap-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-700 ease-in-out ${
                index === step
                  ? "w-5 h-2 bg-blue-500 scale-150"
                  : "w-2 h-2 bg-gray-300 scale-100"
              }`}
            ></div>
          ))}
        </div>
      )}
      {showStep0 && step === 0 && (
        <>
          <Step0 email={email} setEmail={setEmail} onNext={() => setStep(1)} />
        </>
      )}
      {step === 1 && (
        <>
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
        </>
      )}
      {step === 2 && (
        <>
          <Step2
            studentName={studentName}
            setStudentName={setStudentName}
            onPrev={() => setStep(1)}
            onNext={handleNextStep}
          />
        </>
      )}
    </div>
  );
};

export default LandingPage;
