import React, { useState } from "react";
import Step0 from "../components/Step0";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";

const LandingPage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [grade, setGrade] = useState("");
  const [classNumber, setClassNumber] = useState("");

  return (
    <>
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
          email={email}
          schoolName={schoolName}
          grade={grade}
          classNumber={classNumber}
          onPrev={() => setStep(1)}
        />
      )}
    </>
  );
};

export default LandingPage;
