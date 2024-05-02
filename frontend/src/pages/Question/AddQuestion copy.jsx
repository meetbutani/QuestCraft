import React, { useRef, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AddQuestion = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState(""); // State to manage the selected question type
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [options, setOptions] = useState([""]);
  const inputRef = useRef(null);

  const handleAddOption = () => {
    setOptions([...options, ""]); // Add a new empty option
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index)); // Remove the option at the specified index
  };

  const handleAddBlank = () => {
    if (inputRef.current) {
      const { selectionStart, selectionEnd } = inputRef.current;
      const textBeforeCursor = blankText.slice(0, selectionStart);
      const textAfterCursor = blankText.slice(selectionEnd);
      const updatedText = `${textBeforeCursor}_______________${textAfterCursor}`;
      setBlankText(updatedText);
      // Move cursor to the end of the inserted text
      inputRef.current.selectionStart = inputRef.current.selectionEnd =
        textBeforeCursor.length + 15;
      inputRef.current.focus(); // Focus on the input field
    }
  };

  const question_type = [
    "------------Select Question Type---------",
    "MCQ",
    "True or False",
    "Fill in the blanks",
    "Descriptive",
  ];

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const changeQuestionType = (value) => {
    setSelectedQuestionType(value);
    setIsDropDownOpen(false); // Close dropdown when option is selected
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Question" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          {/* <!-- Create Subject Paper Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Question
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {" "}
                    {"Select Question Type "}{" "}
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={selectedQuestionType}
                      onChange={(e) => changeQuestionType(e.target.value)}
                      onClick={toggleDropDown} // Toggle dropdown on click
                      onBlur={() => setIsDropDownOpen(false)} // Close dropdown when focus is lost
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        selectedQuestionType ? "text-black dark:text-white" : ""
                      }`}
                    >
                      {question_type.map((option, index) => (
                        <option
                          key={index}
                          value={option}
                          disabled={option === ""}
                          className="text-body dark:text-bodydark"
                        >
                          {option}
                        </option>
                      ))}
                    </select>

                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      {isDropDownOpen ? (
                        <IoIosArrowUp className="text-primary" />
                      ) : (
                        <IoIosArrowDown className="text-primary" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="w-full mb-6">
                
                  {selectedQuestionType === "MCQ" && (
                    <div className="w-full flex items-center">
                      <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                          MCQ
                        </label>
                        <div className="flex flex-col">
                          <input
                            type="text"
                            placeholder="Eg. Machine Learning"
                            className="mb-5 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                              <input
                                type="text"
                                placeholder={`Option ${index + 1}`}
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
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedQuestionType === "True or False" && (
                    <div className="w-full gap-5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        True or False
                      </label>
                      <input
                        type="text"
                        placeholder="Eg. Supervised Learning Comes Under Machine Learning ?"
                        className="mb-5 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  )}
                </div>
                {selectedQuestionType === "Fill in the blanks" && (
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Fill in the Blank
                    </label>
                    <div className="flex flex-row">
                      <input
                        type="text"
                        placeholder="Eg. Supervised Learning Comes Under Machine Learning ?"
                        className="mb-5 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <button
                        onClick={handleAddBlank}
                        className="ml-4 flex-shrink-0 rounded bg-primary py-3 px-6 font-medium text-white hover:bg-opacity-90"
                      >
                        Add Blank
                      </button>
                    </div>
                  </div>
                )}
                {selectedQuestionType === "Descriptive" && (
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Descriptive
                    </label>
                    <input
                      type="text"
                      placeholder="Eg. Supervised Learning Comes Under Machine Learning ?"
                      className="mb-5 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}

                <div className="w-full mb-8">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Enter Weightage
                  </label>
                  <input
                    type="number"
                    placeholder="Eg 2"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button className="flex flex-row items-center w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddQuestion;
