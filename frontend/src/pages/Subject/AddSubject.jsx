import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { useFormik } from "formik";
import axios from "axios";
import { nodeBaseUrl } from "../../js/api.constatnt";
import * as yup from "yup";
import "../../css/AddUser.css";
import { decryptData } from "../../js/secureData";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";
import { toast } from "react-toastify";

const AddSubject = () => {
  const statusList = ["Active", "Inactive"];

  const validationSchema = yup.object({
    subjectName: yup.string().required("Subject Name is required"),
    subjectCode: yup
      .string()
      .required("Subject Code is required")
      .matches(/^[^ ]+$/, "Subject Code should not contain spaces"),
    courseName: yup.string().required("Course is required"),
    semester: yup
      .number()
      .required("Semester is required")
      .min(1, "Semester must be at least 1")
      .max(10, "Semester cannot exceed 10"),
    status: yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      subjectName: "",
      subjectCode: "",
      courseName: "",
      semester: "",
      status: statusList[0],
    },
    validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    let user = decryptData();
    const response = await axios.post(nodeBaseUrl + "/api/subject", {
      ...values,
      createdBy: user["id"],
      updatedBy: user["id"],
    });
    if (response.status === 200) {
      toast.success(response.data.message);
      formik.resetForm();
    } else {
      toast.error(response.data.message);
      // console.log(response.data);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Subject" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Subject
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5 flex flex-col gap-5">
                <div className="flex flex-row gap-4">
                  <div className="w-1/2">
                    <label className="labelfield">
                      Subject Name <span className="text-meta-1">*</span>
                      <input
                        name="subjectName"
                        value={formik.values.subjectName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Enter Subject Name"
                        className="inputfield"
                      />
                    </label>

                    {formik.touched.subjectName && formik.errors.subjectName ? (
                      <div className="error">{formik.errors.subjectName}</div>
                    ) : null}
                  </div>

                  <div className="w-1/2">
                    <label className="labelfield">
                      Subject Code <span className="text-meta-1">*</span>
                      <input
                        name="subjectCode"
                        value={formik.values.subjectCode}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "subjectCode",
                            e.target.value.toUpperCase()
                          );
                        }}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Enter Subject Code"
                        className="inputfield"
                      />
                    </label>

                    {formik.touched.subjectCode && formik.errors.subjectCode ? (
                      <div className="error">{formik.errors.subjectCode}</div>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-row gap-4">
                  <div className="w-1/2">
                    <label className="labelfield">
                      Course <span className="text-meta-1">*</span>
                      <input
                        name="courseName"
                        value={formik.values.courseName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Enter Course"
                        className="inputfield"
                      />
                    </label>

                    {formik.touched.courseName && formik.errors.courseName ? (
                      <div className="error">{formik.errors.courseName}</div>
                    ) : null}
                  </div>

                  <div className="w-1/2">
                    <label className="labelfield">
                      Semester <span className="text-meta-1">*</span>
                      <input
                        name="semester"
                        value={formik.values.semester}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="number"
                        placeholder="Enter Semester"
                        min="1" // Set minimum value to 1
                        max="10" // Set maximum value to 10
                        className="inputfield"
                      />
                    </label>

                    {formik.touched.semester && formik.errors.semester ? (
                      <div className="error">{formik.errors.semester}</div>
                    ) : null}
                  </div>
                </div>

                <div className="w-full mb-6">
                  <DynamicDropDown
                    name="status"
                    title={"Select Status"}
                    value={formik.values.status}
                    optionlist={statusList}
                    onChange={(e) => {
                      formik.setFieldValue("status", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.status && formik.errors.status ? (
                    <div className="error">{formik.errors.status}</div>
                  ) : null}
                </div>
                <button
                  className="flex flex-row justify-center self-center mt-4.5 w-1/2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddSubject;
