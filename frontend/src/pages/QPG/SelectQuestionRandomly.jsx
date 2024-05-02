import React from "react";
import { IoClose } from "react-icons/io5";
import * as yup from "yup";
import { useFormik } from "formik";

const SelectQuestionRandomly = ({
  onClose,

  generateRandomQuestions,
}) => {
  const validationSchema = yup.object().shape({
    randomnofield: yup
      .number()
      .typeError("Please enter a valid number")
      .required("Please enter the number of questions")
      .positive("Please enter a positive number")
      .integer("Please enter a whole number"),
  });

  const formik = useFormik({
    initialValues: {
      randomnofield: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    console.log(values.randomnofield);
    generateRandomQuestions(values.randomnofield);

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
                Select the no of Random Question
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col justify-between px-30 py-10">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Enter no of question that ypu need to generate randomly{" "}
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="randomnofield"
                    value={formik.values.randomnofield}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="eg 5"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Add Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectQuestionRandomly;
