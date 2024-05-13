import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import "../../css/custom.css";

const ProgressSteps = ({
  activeStep,
  totalSteps,
  setTotalSteps,
  children,
  paperType,
}) => {
  const [steps, setSteps] = useState([{ label: "Header Details", step: 1 }]);

  useEffect(() => {
    // Reset steps before appending new steps
    setSteps([{ label: "Header Details", step: 1 }]);
    let newSteps = [];

    if (paperType === "Mid") {
      setTotalSteps(4);
      newSteps = [
        { label: "Question 1", step: 2 },
        { label: "Question 2", step: 3 },
        { label: "Question 3", step: 4 },
      ];
    } else if (paperType === "Final") {
      setTotalSteps(9);
      for (let i = 1; i <= 8; i++) {
        newSteps.push({ label: `Question ${i}`, step: i + 1 });
      }
    } else if (paperType === "Custom") {
      setTotalSteps(2);
      newSteps = [{ label: "Custom Format", step: 2 }];
    }

    // Append new steps
    setSteps((prevSteps) => [...prevSteps, ...newSteps]);
  }, [paperType]);

  let width = "0%";

  useEffect(() => {
    width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;
    document.documentElement.style.setProperty("--progress-width", width);
  }, [activeStep, totalSteps]);

  return (
    <div className="w-full py-[16px] mx-0 my-auto">
      <div className="px-[100px] h-[80px] mb-10">
        <div className="step-progress-step-container">
          {steps.map(({ step, label }) => (
            <div className="relative z-1" key={step}>
              <div
                className={`w-[40px] h-[40px] rounded-[50%] dark:bg-black bg-white border-[3px] border-solid ${activeStep >= step ? "border-primary" : "border-meta-4"} ease-in flex justify-center items-center`}
              >
                {activeStep > step ? (
                  <div className="text-[26px] font-semibold text-primary">
                    <FaCheck size={20} />
                  </div>
                ) : (
                  <div className="text-[19px] text-primary max-sm:text-[16px]">
                    {step}
                  </div>
                )}
              </div>
              <div className="absolute top-[66px] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="text-[19px] text-primary max-sm:text-[16px] w-[130px] flex justify-center"
                  key={step}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProgressSteps;
