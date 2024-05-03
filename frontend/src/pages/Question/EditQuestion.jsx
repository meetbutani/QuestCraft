import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { nodeBaseUrl } from "../../js/api.constatnt";
import { decryptData } from "../../js/secureData";
import ContextProviderContext from "../../context/ContextProvider";
import "../../css/AddUser.css";
import { useNavigate } from "react-router-dom";
import { IoAdd, IoRemove } from "react-icons/io5";
import { toast } from "react-toastify";

const EditQuestion = () => {
  const { selectedQuestionData } = useContext(ContextProviderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedQuestionData) {
      navigate("/question/select-subject");
    }
  }, [selectedQuestionData, navigate]);

  const questionTypes = ["Normal", "MCQ", "True/False"];
  const questionLevels = ["EASY", "MEDIUM", "HARD"];

  const [options, setOptions] = useState(
    selectedQuestionData?.mcqOptionsOrg || [""]
  );

  const [translatedOptions, setTranslatedOptions] = useState(
    selectedQuestionData?.mcqOptionsTrans || [""]
  );

  const [translatedQuestion, setTranslatedQuestion] = useState(
    selectedQuestionData?.queTrans || ""
  );

  const validationSchema = yup.object({
    questionType: yup.string().required("Question Type is required"),
    question: yup.string().required("Question is required"),
    marks: yup
      .number()
      .required("Marks is required")
      .min(1, "Marks must be at least 1"),
    level: yup.string().notOneOf([""]).required("Level is required"),
  });

  const formik = useFormik({
    initialValues: {
      questionType: selectedQuestionData?.queType || "Normal",
      question: selectedQuestionData?.queOrg || "",
      marks: selectedQuestionData?.marks || "",
      answer: selectedQuestionData?.answer || "",
      level: selectedQuestionData?.level || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    let user = decryptData();
    const response = await axios.put(
      nodeBaseUrl + `/api/question/${selectedQuestionData._id}`,
      {
        queType: values.questionType,
        queOrg: values.question,
        queTrans: translatedQuestion,
        answer: values.answer,
        mcqOptionsOrg: options,
        mcqOptionsTrans: translatedOptions,
        marks: values.marks,
        level: values.level,
        updatedBy: user["id"],
      }
    );
    if (response.status === 200) {
      // console.log(response.data);
      toast.success(response.data.message);
    } else {
      // console.log(response.data);
      toast.error(response.data.message);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, ""]); // Add a new empty option
    setTranslatedOptions([...translatedOptions, ""]); // Add a new empty translated option
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index)); // Remove the option at the specified index
    setTranslatedOptions(translatedOptions.filter((_, i) => i !== index)); // Remove the translated option at the specified index
  };

  const translateText = async (text, targetLanguage) => {};

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Question" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          {/* <!-- Edit Question Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit Question
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5 flex flex-col gap-5">
                {/* Question Type, Marks, and Level */}
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <DynamicDropDown
                      name="questionType"
                      title="Select Question Type"
                      value={formik.values.questionType}
                      optionlist={questionTypes}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.questionType &&
                    formik.errors.questionType ? (
                      <div className="error">{formik.errors.questionType}</div>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <label className="labelfield">
                      Marks <span className="text-meta-1">*</span>
                      <input
                        name="marks"
                        value={formik.values.marks}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="number"
                        min={1}
                        placeholder="Enter Marks"
                        className="inputfield"
                      />
                    </label>
                    {formik.touched.marks && formik.errors.marks ? (
                      <div className="error">{formik.errors.marks}</div>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <DynamicDropDown
                      name="level"
                      title="Select Level"
                      defaultOptionTitle={"Select Level"}
                      value={formik.values.level}
                      optionlist={questionLevels}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.level && formik.errors.level ? (
                      <div className="error">{formik.errors.level}</div>
                    ) : null}
                  </div>
                </div>

                {/* Question */}
                <div className="w-full">
                  <label className="labelfield">
                    Question <span className="text-meta-1">*</span>
                    <input
                      name="question"
                      value={formik.values.question}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter Question"
                      className="inputfield"
                    />
                  </label>
                  {formik.touched.question && formik.errors.question ? (
                    <div className="error">{formik.errors.question}</div>
                  ) : null}

                  {/* Input for translated question */}
                  <input
                    type="text"
                    placeholder={`Translated Question`}
                    value={translatedQuestion}
                    onChange={(e) => setTranslatedQuestion(e.target.value)}
                    className="mt-4 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* MCQ Options */}
                {formik.values.questionType === "MCQ" && (
                  <>
                    <div className="w-full flex items-center">
                      <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Options
                        </label>
                        <div className="flex flex-col">
                          {options.map((option, index) => (
                            <div
                              key={index + "org"}
                              className="flex items-center mb-2 gap-4"
                            >
                              {/* Original Option */}
                              <input
                                type="text"
                                placeholder={`Enter Option ${index + 1}`}
                                value={option}
                                onChange={(e) =>
                                  setOptions(
                                    options.map((item, i) =>
                                      i === index ? e.target.value : item
                                    )
                                  )
                                }
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />

                              {/* Remove Option Button */}
                              {options.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveOption(index)}
                                  className="ml-4 flex flex-shrink-0 rounded-full bg-meta-1 h-12 w-12 justify-center items-center text-white hover:bg-opacity-90"
                                >
                                  <IoRemove size={42} />
                                </button>
                              )}
                              {/* Add Option Button */}
                              {index === options.length - 1 && (
                                <button
                                  type="button"
                                  onClick={handleAddOption}
                                  className="ml-4 flex flex-shrink-0 rounded-full bg-primary h-12 w-12 justify-center items-center text-white hover:bg-opacity-90"
                                >
                                  <IoAdd fontSize={42} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* MCQ Options */}
                {formik.values.questionType === "MCQ" && (
                  <>
                    <div className="w-full flex items-center">
                      <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Translated Options
                        </label>
                        <div className="flex flex-col">
                          {translatedOptions.map((transoption, index) => (
                            <input
                              type="text"
                              placeholder={`Translated Option ${index + 1}`}
                              value={transoption}
                              onChange={(e) =>
                                setTranslatedOptions(
                                  translatedOptions.map((item, i) =>
                                    i === index ? e.target.value : item
                                  )
                                )
                              }
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-2"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Answer */}
                <div className="w-full">
                  <label className="labelfield">
                    Answer <span className="text-meta-1">*</span>
                    <textarea
                      name="answer"
                      value={formik.values.answer}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter Answer"
                      rows={10}
                      className="inputfield min-h-[100px]"
                    />
                  </label>
                  {/* {formik.touched.answer && formik.errors.answer ? (
                    <div className="error">{formik.errors.answer}</div>
                  ) : null} */}
                </div>

                <div className="flex flex-row justify-center gap-4">
                  {/* Submit Button */}
                  <button
                    className="flex flex-row justify-center self-center mt-4.5 w-1/2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditQuestion;
