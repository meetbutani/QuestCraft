import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import "../../css/AddUser.css";
import { useNavigate } from "react-router-dom";
import ContextProviderContext from "../../context/ContextProvider";

const ShowUserDetails = () => {
  const { selectedUserData } = useContext(ContextProviderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedUserData) {
      navigate("/user/manage-users");
    }
  }, [selectedUserData, navigate]);

  if (!selectedUserData) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Details" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                User Details
              </h3>
            </div>
            <div className="p-6.5 flex flex-col gap-5">
              <div className="flex flex-row gap-4">
                <div className="w-1/2">
                  <label className="labelfield">
                    First Name
                    <input
                      value={selectedUserData?.firstName ?? "-"}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
                <div className="w-1/2">
                  <label className="labelfield">
                    Last Name
                    <input
                      value={selectedUserData?.lastName ?? "-"}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-1/2">
                  <label className="labelfield">
                    Username
                    <input
                      value={selectedUserData?.username ?? "-"}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
                <div className="w-1/2">
                  <label className="labelfield">
                    Email
                    <input
                      value={selectedUserData?.email ?? "-"}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-1/2">
                  <label className="labelfield">
                    Contact No.
                    <input
                      value={selectedUserData?.contactNo ?? "-"}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
                <div className="w-1/2">
                  <label className="labelfield">
                    Office Location
                    <input
                      value={selectedUserData?.officeLocation ?? "-"}
                      className="inputfield"
                      disabled
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-1/2">
                  <label className="labelfield">
                    Role ID
                    <input
                      name="roleId"
                      value={selectedUserData?.roleId ?? "-"}
                      disabled
                      type="text"
                      placeholder="Select Role"
                      className="inputfield"
                    />
                  </label>
                </div>
                <div className="w-1/2">
                  <label className="labelfield">
                    Status
                    <input
                      name="status"
                      value={selectedUserData?.status ?? "-"}
                      disabled
                      type="text"
                      placeholder="Select Status"
                      className="inputfield"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ShowUserDetails;
