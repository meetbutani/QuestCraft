import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { useFormik } from "formik";
import axios from "axios";
import { nodeBaseUrl } from "../../js/api.constatnt";
import * as yup from "yup";
import { decryptData } from "../../js/secureData";
import "../../css/AddUser.css";
import { useNavigate } from "react-router-dom";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";
import ContextProviderContext from "../../context/ContextProvider";

const EditUnit = () => {
  const statusList = ["Active", "Inactive"];
  const { selectedUnitData, selectedSubjectData } = useContext(
    ContextProviderContext
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedUnitData) {
      navigate("/unit/select-subject");
    }
  }, [selectedUnitData, navigate]);

  const validationSchema = yup.object({
    unitName: yup.string().required("Unit Name is required"),
    unitNo: yup
      .number()
      .required("Unit No. is required")
      .min(1, "Unit No. must be at least 1"),
    status: yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      unitName: selectedUnitData?.unitName ?? "",
      unitNo: selectedUnitData?.unitNo ?? "",
      status: selectedUnitData?.status ?? statusList[0],
    },
    validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    let user = decryptData();
    const response = await axios.put(
      `${nodeBaseUrl}/api/unit/${selectedUnitData?._id}`,
      {
        ...values,
        updatedBy: user["id"],
      }
    );
    if (response.status === 200) {
      console.log(response.data);
      // console.log(response.data.message);
    } else {
      console.log(response.data);
    }
  };

  if (!selectedUnitData) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Subject" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit Unit for {selectedSubjectData?.subjectName} (
                {selectedSubjectData?.subjectCode})
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5 flex flex-col gap-5">
                <div className="w-full">
                  <label className="labelfield">
                    Unit Name <span className="text-meta-1">*</span>
                    <input
                      name="unitName"
                      value={formik.values.unitName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter Unit Name"
                      className="inputfield"
                    />
                  </label>
                  {formik.touched.unitName && formik.errors.unitName ? (
                    <div className="error">{formik.errors.unitName}</div>
                  ) : null}
                </div>
                <div className="w-full">
                  <label className="labelfield">
                    Unit No. <span className="text-meta-1">*</span>
                    <input
                      name="unitNo"
                      value={formik.values.unitNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      min={1}
                      placeholder="Enter Unit No."
                      className="inputfield"
                    />
                  </label>
                  {formik.touched.unitNo && formik.errors.unitNo ? (
                    <div className="error">{formik.errors.unitNo}</div>
                  ) : null}
                </div>
                <div className="w-full">
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditUnit;
