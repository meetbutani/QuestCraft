import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { IoAdd } from "react-icons/io5";
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcNumericalSorting12,
  FcNumericalSorting21,
} from "react-icons/fc";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

const ManageQuestion = () => {
  const [Data, setData] = useState([
    {
      id: 1,
      queType: "MCQ",
      queOrg: "What is the capital of France?",
      marks: 1,
      unitId: "Geography",
    },
    {
      id: 2,
      queType: "Fill in the Blanks",
      queOrg: "The atomic number of hydrogen is __.",
      marks: 2,
      unitId: "Chemistry",
    },
    {
      id: 3,
      queType: "Descriptive",
      queOrg: "Write a short essay on the importance of education.",
      marks: 3,
      unitId: "Social Studies",
    },
    {
      id: 4,
      queType: "True or False",
      queOrg: "Water boils at 100 degrees Celsius.",
      marks: 1,
      unitId: "Physics",
    },
    {
      id: 5,
      queType: "Multiple Response",
      queOrg:
        "Which of the following are prime numbers? Select all that apply.",
      marks: 2,
      unitId: "Mathematics",
    },
    {
      id: 6,
      queType: "Matching",
      queOrg: "Match the following countries with their capitals.",
      marks: 3,
      unitId: "Geography",
    },
    {
      id: 7,
      queType: "Short Answer",
      queOrg: "What is the formula for calculating the area of a rectangle?",
      marks: 1,
      unitId: "Mathematics",
    },
    {
      id: 8,
      queType: "Diagram Based",
      queOrg: "Draw the structure of a human heart and label its parts.",
      marks: 2,
      unitId: "Biology",
    },
    {
      id: 9,
      queType: "Mathematical Problem",
      queOrg: "If a train travels at 60 km/h for 2 hours, how far does it go?",
      marks: 2,
      unitId: "Physics",
    },
    {
      id: 10,
      queType: "Discussion",
      queOrg: "Discuss the impact of climate change on global biodiversity.",
      marks: 3,
      unitId: "Environmental Science",
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
    navigate("/question/add-question");
  };

  const filteredData = Data.filter((item) => {
    const searchTerm = search.toLowerCase();
    return (
      searchTerm === "" ||
      item.queType.toLowerCase().includes(searchTerm) ||
      item.queOrg.toLowerCase().includes(searchTerm) ||
      item.unitId.toLowerCase().includes(searchTerm)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Question" />
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <IoAdd size={30} />
            Add Question
          </button>
        </div>
        <form className="flex items-center mx-8 relative">
          <input
            type="text"
            placeholder="Search by Any Field.."
            className="max-w-100 w-60 border rounded-md focus:outline-none border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" // Adjusted px value to accommodate the icon
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <CiSearch className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
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

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 h-[60px]">
                <th
                  onClick={() => handleNumberSorting("id", number)}
                  className="table-td-head"
                >
                  <span>
                    No
                    {number === "ASC" ? (
                      <FcNumericalSorting21 size={22} />
                    ) : (
                      <FcNumericalSorting12 size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("queType", order)}
                  className="table-td-head"
                >
                  <span>
                    Question Type
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("queOrg", order)}
                  className="table-td-head"
                >
                  <span>
                    Question
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>

                <th
                  onClick={() => handleNumberSorting("marks", number)}
                  className="table-td-head"
                >
                  <span>
                    marks
                    {order === "ASC" ? (
                      <FcNumericalSorting21 size={22} />
                    ) : (
                      <FcNumericalSorting12 size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("unitId", order)}
                  className="table-td-head"
                >
                  <span>
                    Unit Name
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>

                <th className="table-td-head">
                  <span className="flex items-center gap-1">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((packageItem, key) => (
                <tr key={key} className="h-[60px]">
                  <td className="table-td-data">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.id}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.queType}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[400px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.queOrg}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.marks}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.unitId}
                    </h5>
                  </td>

                  <td className="table-td-data px-4">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <RiDeleteBinLine color="#FF5733" />
                      </button>
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary">
                          <FaEye color="#000000" />
                        </button>
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

export default ManageQuestion;
