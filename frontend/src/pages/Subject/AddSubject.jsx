import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb'

import DynamicDropDown from '../../components/Forms/DynamicDropDown'

const AddSubject = () => {
  const status = ["Active", "Inactive"];
  const courseList = ["ICT"];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Subject " />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          {/* <!-- Create Subject Paper Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Subject
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5 flex flex-col gap-2">

                <div className="w-full mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Eg. Machine Learning"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject Code <span className="text-meta-1">*</span> 
                  </label>
                  <input
                    type="text"
                    placeholder="Eg 01MLCT"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <DynamicDropDown Title={"Select Course"} optionlist={courseList}/>

                
                <div className="w-full mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Semester <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Semester"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full mb-6">
                  
                  <DynamicDropDown Title={"Select Status"} optionlist={status} />
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
  )
}

export default AddSubject
