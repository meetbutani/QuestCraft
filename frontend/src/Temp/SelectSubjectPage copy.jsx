import React from "react";

import DynamicDropDown from "../components/Forms/DynamicDropDown";
import DefaultLayout from "../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";

const SelectSubjectPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/unit/manage-unit");
  };

  const subjectList = ["AI", "AWT", "AJ"];

  return (
    <DefaultLayout>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div
          className="mt-10 flex flex-col gap-5 text-white"
          style={{ width: "50%" }}
        >
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Select Subject for which you need to manage Unit
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <DynamicDropDown
                      Title={"Subject"}
                      optionlist={subjectList}
                    />
                  </div>

                  <div className="mb-4.5">
                    {/* <DynamicDropDown Title={"Select Status"} optionlist={status} /> */}
                  </div>
                  <button
                    onClick={handleClick}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SelectSubjectPage;
