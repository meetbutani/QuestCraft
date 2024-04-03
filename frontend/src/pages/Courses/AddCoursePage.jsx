import React from 'react'
import { IoClose } from "react-icons/io5";
import SelectCourse from '../../components/Forms/SelectCourse';
import DynamicDropDown from '../../components/Forms/DynamicDropDown';

const AddCoursePage = ({onClose}) => {
  const semesterlist = (["1st Semester","2nd Semester","3rd Semester"])
  const status = (["Active","Inactive"])
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-5 text-white' style={{ width: '50%' }}>
            <div className='px-180'>
            <IoClose onClick={onClose} size={30}/>
            </div>
            <div className="flex flex-col gap-9">
          
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Course
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
              <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Course Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="course_name"
                    placeholder="Enter The Course Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                <DynamicDropDown Title={"Select Semester"} optionlist={semesterlist} />
                  
                </div>

                <div className="mb-4.5">
                <DynamicDropDown Title={"Select Status"} optionlist={status} />
                </div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
    </div>
  )
}

export default AddCoursePage