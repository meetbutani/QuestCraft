import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";
import "../../css/AddUser.css";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { javaBaseUrl } from "../../js/api.constatnt";
import { toLowerCase, toTitleCase } from "../../js/utils";
import { json } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordShowHideBtn from "../Auth/PasswordShowHideBtn";

const AddUser = () => {
  const statusList = ["Active", "Inactive"];
  const [roleList, setRoleList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const getRoles = async () => {
      const response = await axios.get(javaBaseUrl + "/api/role/active");
      if (response.status == 200) {
        setRoleList(response.data);
      } else {
        toast.error("Error fetching roles.");
      }
    };

    getRoles();
  }, []);

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("First Name is required")
      .transform(toTitleCase)
      .matches(
        /^[a-zA-Z]+$/,
        "First Name should not contain spaces or special characters"
      ),
    lastName: yup
      .string()
      .required("Last Name is required")
      .matches(
        /^[a-zA-Z]+$/,
        "Last Name should not contain spaces or special characters"
      ),
    username: yup
      .string()
      .required("Username is required")
      .matches(
        /^\w+$/,
        "Username should not contain spaces or special characters except '_'"
      ),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(/^\S+@\S+\.\S+$/, "Email should not contain spaces"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^[^ ]+$/, "Password should not contain spaces"),
    contactNo: yup
      .string()
      .matches(/^\d+$/, "Contact No should only contain digits")
      .min(10, "Contact No must be at least 10 characters")
      .max(15, "Contact No can't exceed 15 characters")
      .optional(),
    officeLocation: yup.string().optional(),
    roleId: yup.string().notOneOf([""]).required("Role is required"),
    status: yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      contactNo: "",
      officeLocation: "",
      roleId: "",
      status: statusList[0],
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    const response = await axios.post(
      javaBaseUrl + "/api/user/register",
      values
    );
    if (response.status == 200) {
      // console.log(response.data);
      toast.success(response.data.message);
      formik.resetForm();
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add User" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add User
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5 flex flex-col gap-5">
                <div className="flex flex-row gap-4">
                  <div className="w-1/2">
                    <label className="labelfield">
                      First Name
                      <input
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "firstName",
                            toTitleCase(e.target.value)
                          );
                        }}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Enter First Name"
                        className="inputfield"
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="error">{formik.errors.firstName}</div>
                      ) : null}
                    </label>
                  </div>
                  <div className="w-1/2">
                    <label className="labelfield">
                      Last Name
                      <input
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "lastName",
                            toTitleCase(e.target.value)
                          );
                        }}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Enter Last Name"
                        className="inputfield"
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="error">{formik.errors.lastName}</div>
                      ) : null}
                    </label>
                  </div>
                </div>

                <div className="w-full">
                  <label className="labelfield">
                    Username
                    <input
                      name="username"
                      value={formik.values.username}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "username",
                          e.target.value.toLowerCase()
                        );
                      }}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter Username"
                      className="inputfield"
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div className="error">{formik.errors.username}</div>
                    ) : null}
                  </label>
                </div>
                <div className="w-full">
                  <label className="labelfield">
                    Email
                    <input
                      name="email"
                      value={formik.values.email}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "email",
                          e.target.value.toLowerCase()
                        );
                      }}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter Email"
                      className="inputfield"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </label>
                </div>
                <div className="w-full">
                  <label className="labelfield">
                    Password
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Password"
                        className="inputfield"
                      />
                      <span className="absolute right-4 top-6">
                        <PasswordShowHideBtn
                          width={"22px"}
                          fill={"#b1b9c5"}
                          id={"pass1"}
                          onClickPassShowHide={() => handlePasswordVisibility()}
                        />
                      </span>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </label>
                </div>
                <div className="w-full">
                  <label className="labelfield">
                    Contact Number
                    <input
                      name="contactNo"
                      value={formik.values.contactNo}
                      onChange={(e) => {
                        formik.setFieldValue("contactNo", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter Contact Number"
                      className="inputfield"
                    />
                    {formik.touched.contactNo && formik.errors.contactNo ? (
                      <div className="error">{formik.errors.contactNo}</div>
                    ) : null}
                  </label>
                </div>
                <div className="w-full">
                  <label className="labelfield">
                    Office Location
                    <input
                      name="officeLocation"
                      value={formik.values.officeLocation}
                      onChange={(e) => {
                        formik.setFieldValue("officeLocation", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter Office Location"
                      className="inputfield"
                    />
                    {formik.touched.officeLocation &&
                    formik.errors.officeLocation ? (
                      <div className="error">
                        {formik.errors.officeLocation}
                      </div>
                    ) : null}
                  </label>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="w-1/2">
                    <DynamicDropDown
                      name="roleId"
                      value={formik.values.roleId}
                      title={"Select Role"}
                      defaultOptionTitle={"Select User Role"}
                      optionlist={roleList}
                      onChange={(e) => {
                        formik.setFieldValue("roleId", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.roleId && formik.errors.roleId ? (
                      <div className="error">{formik.errors.roleId}</div>
                    ) : null}
                  </div>
                  <div className="w-1/2">
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

export default AddUser;
