import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";

const AddQuestionManually = ({ onClose, addQuestion }) => {
  const [options, setOptions] = useState([""]);
  const difficultyLvlList = ["Easy", "Moderate", "Hard"];
  const unitList = ["ML", "CN", "Hello"];
  const handleAddOption = () => {
    setOptions([...options, ""]); // Add a new empty option
  };

  const navigate = useNavigate();

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index)); // Remove the option at the specified index
  };

  const validationSchema = yup.object().shape({
    question: yup.string().required("Question is required"),

    // Dynamically define validation for each option
    options: yup.array().of(yup.string().required("Option is required")),
  });

  const formik = useFormik({
    initialValues: {
      question: "",
      options: options.map(() => ""),
      difficultyLvl: difficultyLvlList[0],
      unitName: unitList[0], // Initialize options with empty strings
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);

    toast.success("Question Added successfully", {
      position: "bottom-right",
      hideProgressBar: true,
    });

    addQuestion({
      questionName: values.question,
      optionList: values.options.filter((option) => option !== ""), // Filter out empty options
      difficulty: values.difficultyLvl, // You can set the difficulty and unitName as needed
      unitName: values.unit,
      selected: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div
        className="mt-10 flex flex-col gap-5 text-white"
        style={{ width: "50%" }}
      >
        <div className="px-180">
          <IoClose onClick={onClose} size={30} />
        </div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Question
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5  overflow-y-auto max-h-96">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Question type
                  </label>
                  <input
                    type="course_name"
                    value={"MCQ"}
                    placeholder="Enter The Course Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    disabled
                  />
                </div>

                <div className="w-full flex items-center">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      MCQ
                    </label>
                    <div className="flex flex-col">
                      <input
                        name="question"
                        type="text"
                        value={formik.values.question}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Eg. Machine Learning"
                        className="mb-5 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {formik.touched.question && formik.errors.question ? (
                        <div className="error">{formik.errors.question}</div>
                      ) : null}
                      {options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            name={`options[${index}]`}
                            placeholder={`Option ${index + 1}`}
                            value={formik.values.options[index]} // Use formik values for each option
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.errors.options && formik.touched.options && formik.errors.options[index] && formik.touched.options[index] ? "border-red-500" : ""}`}
                          />
                          {options.length > 1 && (
                            <button
                              onClick={() => handleRemoveOption(index)}
                              className="ml-4 flex-shrink-0 rounded bg-danger py-3 px-6 font-medium text-white hover:bg-opacity-90"
                            >
                              Remove
                            </button>
                          )}
                          {index === options.length - 1 && (
                            <button
                              onClick={handleAddOption}
                              className="ml-4 flex-shrink-0 rounded bg-primary py-3 px-6 font-medium text-white hover:bg-opacity-90"
                            >
                              Add Option
                            </button>
                          )}
                          {formik.errors.options &&
                            formik.touched.options &&
                            formik.errors.options[index] &&
                            formik.touched.options[index] && (
                              <div className="text-red-500">
                                {formik.errors.options[index]}
                              </div> // Display validation error message
                            )}
                        </div>
                      ))}
                    </div>
                    <div className="mb-4.5">
                      <DynamicDropDown
                        name="difficultyLvl"
                        title={"Select Difficulty"}
                        value={formik.values.difficultyLvl}
                        optionlist={difficultyLvlList}
                        onChange={(e) => {
                          formik.setFieldValue("difficultyLvl", e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="mb-4.5">
                      <DynamicDropDown
                        name="unitName"
                        title={"Select Unit"}
                        value={formik.values.unitName}
                        optionlist={unitList}
                        onChange={(e) => {
                          formik.setFieldValue("unitName", e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionManually;
