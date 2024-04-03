import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { IoAdd } from "react-icons/io5";
// import AddCoursePage from "./AddCoursePage";
import {FcAlphabeticalSortingAz,FcAlphabeticalSortingZa,FcNumericalSorting12,FcNumericalSorting21 } from "react-icons/fc";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

const ManagePaper = () => {
    const [showModal,setShowModal] = useState(false);
    const [search,setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [Data,setData] = useState([
      {
        id : 1,
        subject_name: 'AI(01CT)',
        course_name: 'ICT',
        semester: '1stsemester',
        status: 'Active',
      },
      {
        id : 2,
        subject_name: 'OOP(01OP)',
        course_name: 'CS',
        semester: '1stsemester',
        status: 'Active',
      },
      {
        id : 3,
        subject_name: 'EDCAD(o1ED)',
        course_name: 'ME',
        semester : '2ndsemsester',
        status: 'Active',
      },
      
    ]);

    const handleItemsPerPageChange = (e) => {
      setItemsPerPage(parseInt(e.target.value, 10));
      setCurrentPage(1); 
    };
    
    const [order,setOrder] = useState("ASC");
    const [number,setNumber] = useState("ASC");

    const sorting = (col) => {
      if(order === "ASC")
      {
        const sorted = [...Data].sort((a,b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
        setData(sorted);
        setOrder("DSC");
      }

      if(order === "DSC")
      {
        const sorted = [...Data].sort((a,b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
        setData(sorted);
        setOrder("ASC");
      }
    }

    const sortingNumbers = (col) => {
      if (number === "ASC") {
        const sorted = [...Data].sort((a, b) => a[col] - b[col]);
        setData(sorted);
        setNumber("DSC");
      }
    
      if (number === "DSC") {
        const sorted = [...Data].sort((a, b) => b[col] - a[col]);
        setData(sorted);
        setNumber("ASC");
      }
    };

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    
    const filteredData = Data.filter(item => {
      const searchTerm = search.toLowerCase();
      return searchTerm === '' ||
        item.course_name.toLowerCase().includes(searchTerm) ||
        item.subject_name.toLowerCase().includes(searchTerm) ||
        item.semester.toLowerCase().includes(searchTerm);
    });
    
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    
    return (
      <DefaultLayout>
      
      <Breadcrumb pageName="Manage Paper" />
      <div className="flex justify-normal items-center mb-4">
        <div>
          <button onClick={() => setShowModal(true)} className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
            <IoAdd size={30} />
            Add Paper
          </button>
          {/* {showModal && <AddCoursePage onClose={() => setShowModal(false)} />} */}
        </div>
        <form className="flex items-center ml-100">
          <input
            type="text"
            placeholder="Search by Subject & Course"
            className="max-w-100 border rounded-md focus:outline-none border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex ml-35">
          <label className="mr-2 mt-2">Show entries:</label>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="border rounded-md border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
          
          <thead>              
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th onClick={() => sortingNumbers("id")} className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                <span className="flex items-center gap-1">
                  No
                  {number === 'ASC' ? <FcNumericalSorting21/>  : <FcNumericalSorting12/>}
                </span>
              </th>
              <th onClick={() => sorting("subject_name")} className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                <span className="flex items-center gap-1">
                  Subject
                  {order === 'ASC' ? <FcAlphabeticalSortingZa/>  : <FcAlphabeticalSortingAz/>}
                </span>
              </th>
              <th onClick={() => sorting("course_name")} className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                <span className="flex items-center gap-1">
                  Course
                  {order === 'ASC' ? <FcAlphabeticalSortingZa/>  : <FcAlphabeticalSortingAz/>}
                </span>
              </th>
              <th onClick={() => sorting("course_name")} className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                <span className="flex items-center gap-1">
                  Semester
                  {order === 'ASC' ? <FcAlphabeticalSortingZa/>  : <FcAlphabeticalSortingAz/>}
                </span>
              </th>
              <th onClick={() => sorting("status")} className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                <span className="flex items-center gap-1">
                  Status
                  {order === 'ASC' ? <FcAlphabeticalSortingZa/>  : <FcAlphabeticalSortingAz/>}
                </span>
              </th>
              <th className="min-w-[150px] py-4 px-20 font-medium text-black dark:text-white ">
                Actions
              </th>
            </tr>
          </thead>
            <tbody>
              {currentItems.filter((item) => {
                return search.toLowerCase() === '' ? item : item.course_name.toLowerCase().includes(search) || item.subject_name.toLowerCase().includes(search)}).map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.id}
                    </h5>
                    
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.subject_name}
                    </h5>
 
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.course_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.semester}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        packageItem.status === 'Active'
                          ? 'bg-success text-success'
                          :'bg-danger text-danger'
                      }`}
                    >
                      {packageItem.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      
                      <button className="hover:text-primary">
                      <RiDeleteBinLine color="#FF5733" />
                      </button>
                      <div className="flex flex-row justify-center items-center rounded-full bg-gray-200 border border-gray-400 py-1 px-3 text-sm font-medium">
                        <button className="hover:text-primary">
                          <IoAdd color="#000000" />
                        </button>
                        <span className="ml-2">Manage Unit</span>
                      </div>
                      <button className="hover:text-primary">
                      <MdEdit color="#0000FF" />
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <div className="flex justify-center mt-4">
            {/* Previous Button */}
            <button 
              onClick={() => paginate(currentPage - 1)} 
              className={`mx-1 px-3 py-1 rounded-full focus:outline-none 
                ${currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary text-white hover:bg-opacity-90'}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Pagination Buttons */}
            {[...Array(Math.ceil(Data.length / itemsPerPage)).keys()].map((number) => (
              <button 
                key={number} 
                onClick={() => paginate(number + 1)} 
                className={`mx-1 px-3 py-1 rounded-full focus:outline-none 
                  ${currentPage === number + 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700 hover:bg-opacity-90'}`}
              >
                {number + 1}
              </button>
            ))}

            {/* Next Button */}
            <button 
              onClick={() => paginate(currentPage + 1)} 
              className={`mx-1 px-3 py-1 rounded-full focus:outline-none 
                ${currentPage === Math.ceil(Data.length / itemsPerPage) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary text-white hover:bg-opacity-90'}`}
              disabled={currentPage === Math.ceil(Data.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
      </div>
      </DefaultLayout>
    );
}

export default ManagePaper