import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to the specified URL
    navigate("/user/add-user");
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-row justify-between border-b border-stroke py-10 px-6.5 dark:border-strokedark">
              <span className="h-10 w-12 mb-10 rounded-full ">
                <GoPerson
                  size={110}
                  className="bg-primary rounded-full text-white"
                />
              </span>
              <div className="flex flex-col">
                <span className="text-3xl">Namra Ravani</span>
                <span className="text-xl text-primary">Admin</span>
              </div>
              <div
                className="inline-flex gap-2 min-w-max justify-center items-center rounded-full bg-gray-200 border border-gray-400 px-3 py-1 text-sm font-medium bg-meta-2 dark:bg-meta-4"
                onClick={handleClick}
                style={{ cursor: "pointer" }} // Add pointer cursor
              >
                <MdEdit />
                <span>Edit Profile</span>
              </div>
            </div>
            <div>
              <div className="p-6.5 flex flex-col gap-5">
                <div className="flex flex-row gap-4">
                  <div className=" flex flex-row justify-between w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Username
                    </label>
                    <label className="mb-2.5 block  text-primary dark:text-white">
                      NamraRavani53
                    </label>
                  </div>
                  <div className=" flex flex-row justify-between w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Password
                    </label>
                    <label className="mb-2.5 block  text-primary dark:text-white">
                      *************************
                    </label>
                  </div>
                </div>

                <div className="flex flex-row gap-5">
                  <div className=" flex flex-row justify-between w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email
                    </label>
                    <label className="mb-2.5 block  text-primary dark:text-white">
                      namraravani8@gmail.com
                    </label>
                  </div>
                  <div className=" flex flex-row justify-between w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      ContactNo
                    </label>
                    <label className="mb-2.5 block  text-primary dark:text-white">
                      +91 9427662325
                    </label>
                  </div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className=" flex flex-row justify-between w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Office Location
                    </label>
                    <label className="mb-2.5 block  text-primary dark:text-white">
                      MA106
                    </label>
                  </div>
                  <div className=" flex flex-row justify-between w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Status
                    </label>
                    <label className="mb-2.5 block  text-primary dark:text-white">
                      Active
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;
