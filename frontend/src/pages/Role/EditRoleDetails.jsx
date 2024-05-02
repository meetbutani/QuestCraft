import React, { useState, useContext, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";
import "../../css/AddUser.css";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { javaBaseUrl } from "../../js/api.constatnt";
import { useNavigate } from "react-router-dom";
import RoleContext from "../../context/RoleContext";
import Checkbox from "../../components/Forms/Checkbox";
import { toUpper } from "lodash";

const EditRole = () => {
  const [access, setAccess] = useState({});
  const { selectedRoleData } = useContext(RoleContext);
  const statusList = ["Active", "Inactive"];
  const navigate = useNavigate();

  const optionsList = {
    User: "User Module",
    Role: "Role Module",
    Subject: "Subject Module",
    Unit: "Unit Module",
    Question: "Question Module",
    Generate: "Question Paper Generator Module",
  };

  useEffect(() => {
    if (!selectedRoleData) {
      navigate("/role/manage-role"); // Redirect if no role is selected
    } else {
      setAccess(generateAccessState(selectedRoleData.accessList));
    }
  }, [selectedRoleData, navigate]);

  const generateAccessState = (accessList) => {
    const initialState = {
      User: [],
      Role: [],
      Subject: [],
      Unit: [],
      Question: [],
      Generate: [],
    };
    accessList.forEach((accessItem) => {
      const [module, accessLevel] = accessItem.split(/(?=[A-Z])/); // Split access item into module and access level
      initialState[module].push(accessLevel);
    });
    return initialState;
  };

  const validationSchema = yup.object({
    roleId: yup.string().notOneOf([""]).required("Role ID is required"),
    status: yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      roleId: selectedRoleData?.roleId || "",
      status: selectedRoleData?.status || statusList[0],
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleAccessChange = (module, accessLevel) => {
    setAccess((prevAccess) => {
      const updatedAccess = { ...prevAccess };
      if (accessLevel === "Read") {
        updatedAccess[module] = ["Read"];
      } else if (accessLevel === "Create") {
        updatedAccess[module] = ["Read", "Create"];
      } else if (accessLevel === "Update") {
        updatedAccess[module] = ["Read", "Create", "Update"];
      } else if (accessLevel === "Delete") {
        updatedAccess[module] = ["Read", "Create", "Update", "Delete"];
      } else {
        updatedAccess[module] = [];
      }
      return updatedAccess;
    });
  };

  const handleSubmit = async (values) => {
    const accessList = Object.entries(access).reduce(
      (acc, [module, accessLevels]) => {
        const moduleAccessList = accessLevels.map(
          (level) => `${module}${level}`
        );
        return [...acc, ...moduleAccessList];
      },
      []
    );

    const response = await axios.put(javaBaseUrl + `/api/role`, {
      ...values,
      accessList: accessList,
      id: selectedRoleData?.id,
    });
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Role" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit Role
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5 flex flex-col gap-5">
                <div className="flex flex-row gap-4">
                  <div className="w-1/2">
                    <label className="labelfield">
                      Role ID
                      <input
                        name="roleId"
                        value={formik.values.roleId}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "roleId",
                            toUpper(e.target.value)
                          );
                        }}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Enter Role ID"
                        className="inputfield"
                      />
                      {formik.touched.roleId && formik.errors.roleId ? (
                        <div className="error">{formik.errors.roleId}</div>
                      ) : null}
                    </label>
                  </div>

                  <div className="w-1/2">
                    <DynamicDropDown
                      name="status"
                      title={"Select Status"}
                      value={formik.values.status}
                      optionlist={statusList}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.status && formik.errors.status ? (
                      <div className="error">{formik.errors.status}</div>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-wrap gap-y-6">
                  {Object.entries(access).map(([module, accessLevels]) => (
                    <div key={module} className="w-1/3 pr-4 min-w-[335px]">
                      <div className="flex items-center mb-3">
                        Access for {optionsList[module]}
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        {["Read", "Create", "Update", "Delete"].map(
                          (accessLevel) => (
                            <div key={accessLevel}>
                              <Checkbox
                                label={accessLevel}
                                checked={accessLevels?.includes(accessLevel)}
                                onChange={(e) =>
                                  handleAccessChange(
                                    module,
                                    e.target.checked ? accessLevel : "None"
                                  )
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="flex flex-row justify-center self-center mt-4.5 w-1/2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
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

export default EditRole;
