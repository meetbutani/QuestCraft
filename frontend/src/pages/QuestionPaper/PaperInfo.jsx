import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import SelectSwitch from "../../components/Forms/SelectSwitch";
import ReactQuill from "react-quill";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";

const PaperInfo = ({
  formiksData,
  setFormiksValues,
  currentStep,
  selectedSubjectData,
}) => {
  const validationSchema = yup.object({
    paperType: yup.string().required("Paper Type is required"),
    paperName: yup.string().required("Paper Name is required"),
    deptName: yup.string().required("Department Name is required"),
    progName: yup.string().required("Program Name is required"),
    specName: yup.string().required("Specialization Name is required"),
    semester: yup.string().required("Semester is required"),
    subjectName: yup.string().required("Subject Name is required"),
    subjectCode: yup.string().required("Subject Code is required"),
    date: yup.date().required("Date is required"),
    totalTime: yup.string().required("Total Time is required"),
    totalMarks: yup.number().required("Total Marks is required"),
    translate: yup.boolean().required("Translation option is required"),
    instructions: yup.string().required("Instructions are required"),
  });

  let formik = useFormik({
    initialValues: {
      paperType: "Mid",
      paperName: "",
      deptName: "",
      progName: "",
      specName: selectedSubjectData?.courseName ?? "",
      semester: selectedSubjectData?.semester ?? "",
      subjectName: selectedSubjectData?.subjectName ?? "",
      subjectCode: selectedSubjectData?.subjectCode ?? "",
      date: "",
      totalTime: "",
      totalMarks: "",
      translate: false,
      instructions: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    // Handle form submission here
    toast.success("Paper Info saved.");
    updateFormiks();
  };

  useEffect(() => {
    if (formiksData[currentStep] != undefined) {
      const temp = formiksData[currentStep];
      formik.setValues(temp);
      setFormiksValues({ ...formiksData, [currentStep]: temp });
    } else {
      updateFormiks();
    }
  }, []);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const updateFormiks = () => {
    setFormiksValues({
      ...formiksData,
      [currentStep]: formik.values,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 px-15">
      <div className="flex flex-col gap-9">
        {/* Create Paper Form */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Paper Info
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-6.5">
              {/* Paper Type */}
              <div className="mb-4.5">
                <DynamicDropDown
                  name="paperType"
                  title="Select Paper Type"
                  value={formik.values.paperType}
                  optionlist={["Mid", "Final", "Custom"]}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormiksValues({
                      ...formiksData,
                      [currentStep]: {
                        ...formik.values,
                        paperType: e.target.value,
                      },
                    });
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.paperType && formik.errors.paperType ? (
                  <div className="error">{formik.errors.paperType}</div>
                ) : null}
              </div>
              {/* Paper Name */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Paper Name
                </label>
                <input
                  type="text"
                  name="paperName"
                  value={formik.values.paperName}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="Enter Paper Name (e.g., Mid Sem Exam)"
                  className={`inputfield ${formik.touched.paperName && formik.errors.paperName ? "error" : ""}`}
                />
                {formik.touched.paperName && formik.errors.paperName ? (
                  <div className="error">{formik.errors.paperName}</div>
                ) : null}
              </div>
              {/* Division or Department Name */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Division or Department Name
                </label>
                <input
                  type="text"
                  name="deptName"
                  value={formik.values.deptName}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="Enter Division or Department Name (e.g., Faculty of Technology)"
                  className={`inputfield ${formik.touched.deptName && formik.errors.deptName ? "error" : ""}`}
                />
                {formik.touched.deptName && formik.errors.deptName ? (
                  <div className="error">{formik.errors.deptName}</div>
                ) : null}
              </div>
              {/* Program Name */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Program Name
                </label>
                <input
                  type="text"
                  name="progName"
                  value={formik.values.progName}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="Enter Program Name (e.g., B.Tech)"
                  className={`inputfield ${formik.touched.progName && formik.errors.progName ? "error" : ""}`}
                />
                {formik.touched.progName && formik.errors.progName ? (
                  <div className="error">{formik.errors.progName}</div>
                ) : null}
              </div>
              {/* Specialization Name */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Specialization Name
                </label>
                <input
                  type="text"
                  name="specName"
                  value={formik.values.specName}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="Enter Specialization Name (e.g., Information and Communication Technology)"
                  className={`inputfield ${formik.touched.specName && formik.errors.specName ? "error" : ""}`}
                />
                {formik.touched.specName && formik.errors.specName ? (
                  <div className="error">{formik.errors.specName}</div>
                ) : null}
              </div>
              {/* Semester */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Semester
                </label>
                <input
                  type="number"
                  name="semester"
                  value={formik.values.semester}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="Enter Semester"
                  className={`inputfield ${formik.touched.semester && formik.errors.semester ? "error" : ""}`}
                />
                {formik.touched.semester && formik.errors.semester ? (
                  <div className="error">{formik.errors.semester}</div>
                ) : null}
              </div>
              {/* Subject Name */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subjectName"
                  value={formik.values.subjectName}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="Enter Subject Name"
                  className={`inputfield ${formik.touched.subjectName && formik.errors.subjectName ? "error" : ""}`}
                />
                {formik.touched.subjectName && formik.errors.subjectName ? (
                  <div className="error">{formik.errors.subjectName}</div>
                ) : null}
              </div>
              {/* Subject Code */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Subject Code
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  value={formik.values.subjectCode}
                  placeholder="Enter Subject Code"
                  className={`inputfield ${formik.touched.subjectCode && formik.errors.subjectCode ? "error" : ""}`}
                  disabled
                />
              </div>
              {/* Date */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="DD/MM/YYYY"
                  className={`inputfield ${formik.touched.date && formik.errors.date ? "error" : ""}`}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="error">{formik.errors.date}</div>
                ) : null}
              </div>
              {/* Total Time */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Total Time
                </label>
                <input
                  type="text"
                  name="totalTime"
                  value={formik.values.totalTime}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="Total Time"
                  className={`inputfield ${formik.touched.totalTime && formik.errors.totalTime ? "error" : ""}`}
                />
                {formik.touched.totalTime && formik.errors.totalTime ? (
                  <div className="error">{formik.errors.totalTime}</div>
                ) : null}
              </div>
              {/* Total Marks */}
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Total Marks
                </label>
                <input
                  type="number"
                  name="totalMarks"
                  value={formik.values.totalMarks}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updateFormiks();
                  }}
                  placeholder="Enter Total Marks"
                  className={`inputfield ${formik.touched.totalMarks && formik.errors.totalMarks ? "error" : ""}`}
                />
                {formik.touched.totalMarks && formik.errors.totalMarks ? (
                  <div className="error">{formik.errors.totalMarks}</div>
                ) : null}
              </div>
              {/* Translate */}
              <div className="mb-4.5 flex items-center">
                <label className="mr-2">Translate Paper:</label>
                <SelectSwitch
                  enabled={formik.values.translate}
                  setEnabled={(value) =>
                    formik.setFieldValue("translate", value)
                  }
                  option1="No"
                  option2="Yes"
                />
              </div>
              {/* Description */}
              <label className="mb-4 block text-black dark:text-white">
                Instructions:
              </label>
              <ReactQuill
                className="h-50 mb-30"
                modules={module}
                placeholder="Enter Instructions for paper"
                theme="snow"
                value={formik.values.instructions}
                onChange={(content, delta, source, editor) => {
                  // const value = editor.getContents();
                  formik.setFieldValue("instructions", content);
                }}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  updateFormiks();
                }}
              />
              <div className="flex justify-center mt-4.5">
                <button
                  type="submit"
                  // disabled={!formik.isValid}
                  className="flex flex-row items-center self-center justify-center w-1/2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaperInfo;
