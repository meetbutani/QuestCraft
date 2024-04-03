import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

import Breadcrumb from '../../components/BreadCrumb/BreadCrumb';
import SelectCourse from '../../components/Forms/SelectCourse';
import DynamicDropDown from '../../components/Forms/DynamicDropDown';

const SubjectPaper = () => {
  const optionlist = (["AddOption","AddOption2","AddOption3"])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Set Subject Paper" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Create Subject Paper Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Question Paper
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Paper name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Paper Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white font-bold">
                      Subject Details
                    </label>
                    <div className='flex flex-row xl:flex-col'>
                        <div className='flex flex-col xl:flex-row gap-3'>
                            <label className="mb-2.5 block text-black dark:text-white">
                            Subject :- 
                            </label>
                            <label className="mb-2.5 block text-black dark:text-white">
                            Entered Subject Will be Displayed Here 
                            </label>
                        </div>
                        <div className='flex flex-col xl:flex-row gap-3'>
                            <label className="mb-2.5 block text-black dark:text-white">
                            Course Details :- 
                            </label>
                            <label className="mb-2.5 block text-black dark:text-white">
                            Entered Course Will be Displayed Here 
                            </label>
                        </div>
                    </div>
                    
                  </div>
                </div>

                <div className=' flex flex-col gap-4  xl:flex-row'>
                  <div className="w-full xl:w-1/2">
                  <DynamicDropDown Title={"Select Status"} optionlist={optionlist} />
                    
                  </div>
                  <div className="w-full xl:w-1/2">
                  <DynamicDropDown Title={"Select Status"} optionlist={optionlist} />
                    
                  </div>
                </div>

                <div className=' flex flex-col gap-4  xl:flex-row'>
                <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Time Allowance
                    </label>
                    <input
                      type="text"
                      placeholder="Enter The Time"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Total Given Questions
                    </label>
                    <input
                      type="text"
                      placeholder="Total Questions will be displayed here"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className=' flex flex-col gap-4  xl:flex-row'>
                  <div className="w-full xl:w-1/2">
                  <DynamicDropDown Title={"Select Status"} optionlist={optionlist} />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Total Marks
                    </label>
                    <input
                      type="text"
                      placeholder="Total Marks Will Be Displayed Here"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                

                <table className="table-fixed w-full border-spacing-2 border border-gray-300">
                  <thead>
                    <tr>
                      <th className="w-3/4 px-4 py-2">Unit Name</th>
                      <th className="w-1/4 px-4 py-2" colSpan="2">Question Bank</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">Choose the most appropriate option in each of the following question</td>
                      <td className="w-1/6 px-4 py-2">23</td>
                      <td className=" w-5/6 px-4 py-2">
                        <input type="number" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Answer The Following Questions in Short</td>
                      <td className="w-1/6 px-4 py-2">10</td>
                      <td className=" w-5/6 px-4 py-2">
                        <input type="number" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Answer The Following Questions in Brief</td>
                      <td className="w-1/6 px-4 py-2">20</td>
                      <td className=" w-5/6 px-4 py-2">
                        <input type="number" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Answer The Following Questions in Eassy Form</td>
                      <td className="w-1/6 px-4 py-2">11</td>
                      <td className=" w-5/6 px-4 py-2">
                        <input type="number" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Answer The Following Statements in True or False</td>
                      <td className="w-1/6 px-4 py-2">20</td>
                      <td className=" w-5/6 px-4 py-2">
                        <input type="number" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-2">Fill In the Blanks with Suitable Words</td>
                      <td className="w-1/6 px-4 py-2">20</td>
                      <td className=" w-5/6 px-4 py-2">
                        <input type="number" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                      </td>
                    </tr>
                    
                  </tbody>
                </table>

                <div className="mb-6 m-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Question Paper Description
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Write Your Description Here"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
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
  );
};

export default SubjectPaper;
