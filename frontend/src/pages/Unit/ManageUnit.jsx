import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcNumericalSorting12,
  FcNumericalSorting21,
} from "react-icons/fc";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { useNavigate } from "react-router-dom";
const ManageUnit = () => {
  const [Data, setData] = useState([
    {
      id: 1,
      unitName: "Machine Learning",
      subjectCode: "01AICT",
      status: "Active",
      createdBy: "Namra Ravani",
      updatedBy: "Meet Butani",
    },
    {
      id: 2,
      unitName: "Machine Learning",
      subjectCode: "01AICT",
      status: "Active",
      createdBy: "Namra Ravani",
      updatedBy: "Meet Butani",
    },
    {
      id: 3,
      unitName: "Machine Learning",
      subjectCode: "01AICT",
      status: "Active",
      createdBy: "Namra Ravani",
      updatedBy: "Meet Butani",
    },
    {
      id: 4,
      unitName: "Machine Learning",
      subjectCode: "01AICT",
      status: "Active",
      createdBy: "Namra Ravani",
      updatedBy: "Meet Butani",
    },
  ]);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const [order, setOrder] = useState("ASC");
  const [number, setNumber] = useState("ASC");

  const handleSorting = (col, sortOrder) => {
    const sortedData = [...Data].sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      } else {
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      }
    });
    setData(sortedData);
    setOrder(sortOrder === "ASC" ? "DSC" : "ASC");
  };

  const handleNumberSorting = (col, sortOrder) => {
    const sortedData = [...Data].sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[col] - b[col];
      } else {
        return b[col] - a[col];
      }
    });
    setData(sortedData);
    setNumber(sortOrder === "ASC" ? "DSC" : "ASC");
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = () => {
    navigate("/subject/add-subject-unit");
  };

  const filteredData = Data.filter((item) => {
    const searchTerm = search.toLowerCase();
    const unitNameLower = item.unitName.toLowerCase();
    const subjectCodeLower = item.subjectCode.toLowerCase();
    const statusLower = item.status.toLowerCase();

    return (
      searchTerm === "" ||
      unitNameLower.includes(searchTerm) ||
      subjectCodeLower.includes(searchTerm) ||
      courseNameLower.includes(searchTerm) ||
      semesterLower.includes(searchTerm) ||
      statusLower.includes(searchTerm)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Unit" />
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <IoAdd size={30} />
            Add Unit
          </button>
        </div>
        <form className="flex items-center mx-8">
          <input
            type="text"
            placeholder="Search by Any Field"
            className="max-w-100 w-60 border rounded-md focus:outline-none border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex">
          <label className="mr-2 mt-2">Show entries:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded-md border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5  pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th
                  onClick={() => handleNumberSorting("id", number)}
                  className="min-w-[100px] font-medium text-black dark:text-white xl:pl-4 "
                >
                  <span className="flex items-center gap-1">
                    No
                    {number === "ASC" ? (
                      <FcNumericalSorting21 />
                    ) : (
                      <FcNumericalSorting12 />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("unitName", order)}
                  className="min-w-[160px] font-medium text-black dark:text-white xl:pl-12"
                >
                  <span className="flex items-center gap-1">
                    Unit
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa />
                    ) : (
                      <FcAlphabeticalSortingAz />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("subjectCode", order)}
                  className="min-w-[160px] font-medium text-black dark:text-white"
                >
                  <span className="flex items-center gap-1">
                    Subject Code
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa />
                    ) : (
                      <FcAlphabeticalSortingAz />
                    )}
                  </span>
                </th>

                <th
                  onClick={() => handleSorting("status", order)}
                  className="min-w-[100px] font-medium text-black dark:text-white"
                >
                  <span className="flex items-center gap-1">
                    Status
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa />
                    ) : (
                      <FcAlphabeticalSortingAz />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("createdBy", order)}
                  className="min-w-[120px] font-medium text-black dark:text-white"
                >
                  <span className="flex items-center gap-1">
                    Created By
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa />
                    ) : (
                      <FcAlphabeticalSortingAz />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("updatedBy", order)}
                  className="min-w-[120px] font-medium text-black dark:text-white"
                >
                  <span className="flex items-center gap-1">
                    Updated By
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa />
                    ) : (
                      <FcAlphabeticalSortingAz />
                    )}
                  </span>
                </th>
                <th className="min-w-[250px] pl-10 font-medium text-black dark:text-white xl:p-10 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark xl:pl-4">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.unitName}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-6">
                    <p className="text-black dark:text-white">
                      {packageItem.subjectCode}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5  dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        packageItem.status === "Active"
                          ? "bg-success text-success"
                          : "bg-danger text-danger"
                      }`}
                    >
                      {packageItem.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.createdBy}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.updatedBy}
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
                        <span className="ml-2">Manage Question</span>
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
                ${currentPage === 1 ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-primary text-white hover:bg-opacity-90"}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Pagination Buttons */}
          {[...Array(Math.ceil(Data.length / itemsPerPage)).keys()].map(
            (number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className={`mx-1 px-3 py-1 rounded-full focus:outline-none 
                  ${currentPage === number + 1 ? "bg-primary text-white" : "bg-gray-300 text-gray-700 hover:bg-opacity-90"}`}
              >
                {number + 1}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`mx-1 px-3 py-1 rounded-full focus:outline-none 
                ${currentPage === Math.ceil(Data.length / itemsPerPage) ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-primary text-white hover:bg-opacity-90"}`}
            disabled={currentPage === Math.ceil(Data.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ManageUnit;
