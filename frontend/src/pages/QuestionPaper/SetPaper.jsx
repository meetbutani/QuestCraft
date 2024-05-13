import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import ProgressSteps from "./ProgressSteps";
import SelectSwitch from "../../components/Forms/SelectSwitch";
import ReactQuill from "react-quill";
import ContextProviderContext from "../../context/ContextProvider";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";
import PaperInfo from "./PaperInfo";
import QuestionSelectTable from "./QuestionSelectTable";
import axios from "axios";
import { nodeBaseUrl } from "../../js/api.constatnt";

const SetPaper = () => {
  const navigate = useNavigate();

  const { selectedSubjectData } = useContext(ContextProviderContext);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    if (!selectedSubjectData) {
      navigate("/question-paper/select-subject");
    } else {
      const fetchQuestions = async (subjectId) => {
        try {
          const response = await axios.get(
            nodeBaseUrl + `/api/question/subjectId/${subjectId}`
          );
          console.log(response.data);
          if (response.status === 200) {
            const questionsWithSerialNo = response.data.data.map(
              (question, index) => ({
                ...question,
                serialNo: index + 1,
              })
            );
            setQuestionList(questionsWithSerialNo);
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };

      fetchQuestions(selectedSubjectData._id);
    }
    // console.log(selectedSubjectData);
  }, [selectedSubjectData, navigate]);

  const [formiksValues, setFormiksValues] = useState({});

  const [currentStep, setCurrentStep] = useState(1);
  const [totalStep, setTotalStep] = useState(0);
  const [lastStep, setLastStep] = useState(false);

  const nextStep = () => {
    if (currentStep < totalStep) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep == totalStep) {
      setLastStep(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setLastStep(false);
    }
  };

  const stepComponentMap = {
    1: (
      <PaperInfo
        key={currentStep}
        formiksData={formiksValues}
        setFormiksValues={setFormiksValues}
        currentStep={currentStep}
        selectedSubjectData={selectedSubjectData}
      />
    ),
    "2Mid": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Mid"}
      />
    ),
    "3Mid": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Mid"}
      />
    ),
    "4Mid": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Mid"}
      />
    ),
    "2Final": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Final"}
      />
    ),
    "3Final": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Final"}
      />
    ),
    "4Final": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Final"}
      />
    ),
    "5Final": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Final"}
      />
    ),
    "6Final": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Final"}
      />
    ),
    "7Final": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Final"}
      />
    ),
    "8Final": (
      <QuestionSelectTable
        questionList={questionList}
        selectedSubjectData={selectedSubjectData}
        currentStep={currentStep}
        type={"Final"}
      />
    ),
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Set Paper" />
      <ProgressSteps
        activeStep={currentStep}
        totalSteps={totalStep}
        setTotalSteps={setTotalStep}
        paperType={formiksValues[1]?.paperType || "Mid"}
      >
        {
          stepComponentMap[
            currentStep +
              (currentStep == 1
                ? ""
                : formiksValues[1]?.values?.paperType || "Mid")
          ]
        }
        <div className="flex justify-between mx-0 my-[-15x] mt-[100px]">
          <button
            className="rounded-[4px] border-0 bg-primary text-white cursor-pointer p-[8px] w-[90px] active:scale-[0.98] disabled:bg-meta-4 disabled:text-white disabled:cursor-not-allowed flex justify-center"
            onClick={prevStep}
            disabled={currentStep < 2}
          >
            Previous
          </button>
          <button
            className="rounded-[4px] border-0 bg-primary text-white cursor-pointer p-[8px] w-[90px] active:scale-[0.98] disabled:bg-meta-4 disabled:text-white disabled:cursor-not-allowed flex justify-center"
            onClick={nextStep}
            disabled={lastStep}
          >
            Next
          </button>
        </div>
      </ProgressSteps>
    </DefaultLayout>
  );
};

export default SetPaper;
