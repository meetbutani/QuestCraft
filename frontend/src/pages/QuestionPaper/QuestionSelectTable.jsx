import React, { useState, useEffect } from "react";
import _ from "lodash";
import NumberSorting from "../../components/Tables/NumberSorting";
import StringSorting from "../../components/Tables/StringSorting";
import { IoAdd, IoFilter } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import ApplyFilterPage from "./ApplyFilterPage";

const QuestionSelectTable = ({
  selectedSubjectData,
  questionList,
  currentStep,
  type,
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [marksFilter, setMarksFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const handleCheckboxChange = (event, question) => {
    if (event.target.checked) {
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q._id !== question._id)
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  //   const getFilteredData = () => {
  //     const filteredData = questionList.filter(
  //       (question) =>
  //         (question.serialNo.toString() ?? "")
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         (question.queOrg ?? "")
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         (question.queType ?? "")
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         (question.level ?? "")
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         (question.marks.toString() ?? "")
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         (question.unitName ?? "")
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase())
  //     );
  //     return filteredData;
  //   };

  const getFilteredData = () => {
    return questionList.filter(
      (question) =>
        ((question.serialNo.toString() ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          (question.queOrg ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (question.queType ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (question.level ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (question.marks.toString() ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (question.unitName ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (marksFilter ? question.marks === parseInt(marksFilter) : true) &&
        (typeFilter
          ? question.queType.toLowerCase() === typeFilter.toLowerCase()
          : true) &&
        (levelFilter
          ? question.level.toLowerCase() === levelFilter.toLowerCase()
          : true)
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const sortedQuestions = _.orderBy(
    getFilteredData(),
    [sortConfig.key],
    [sortConfig.direction]
  );

  const paginatedQuestions = getPaginatedData(sortedQuestions);

  const getPaginationButtons = () => {
    const totalPages = Math.ceil(sortedQuestions.length / itemsPerPage);
    const buttons = [];

    // Show first button
    if (currentPage > 3) {
      buttons.push(
        <li key={1}>
          <button
            onClick={() => handlePageChange(1)}
            className={`px-3 py-2 leading-tight text-gray-500 rounded-md hover:text-white dark:bg-meta-4 dark:text-white hover:bg-primary dark:hover:bg-primary dark:hover:text-white ${currentPage === 1 ? "bg-primary text-white dark:bg-primary dark:border-primary" : ""}`}
          >
            1
          </button>
        </li>
      );
    }

    // Show previous button
    if (currentPage > 4) {
      buttons.push(
        <li key="prev">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-2 leading-tight text-gray-500 rounded-md hover:text-white dark:bg-meta-4 dark:text-white hover:bg-primary dark:hover:bg-primary dark:hover:text-white`}
          >
            ...
          </button>
        </li>
      );
    }

    // Show current page and adjacent pages
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 leading-tight text-gray-500 rounded-md hover:text-white dark:bg-meta-4 dark:text-white hover:bg-primary dark:hover:bg-primary dark:hover:text-white ${currentPage === i ? "bg-primary text-white dark:bg-primary dark:border-primary" : ""}`}
          >
            {i}
          </button>
        </li>
      );
    }

    // Show next button
    if (currentPage < totalPages - 3) {
      buttons.push(
        <li key="next">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-2 leading-tight text-gray-500 rounded-md hover:text-white dark:bg-meta-4 dark:text-white hover:bg-primary dark:hover:bg-primary dark:hover:text-white`}
          >
            ...
          </button>
        </li>
      );
    }

    // Show last button
    if (currentPage < totalPages - 2) {
      buttons.push(
        <li key={totalPages}>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-2 leading-tight text-gray-500 rounded-md hover:text-white dark:bg-meta-4 dark:text-white hover:bg-primary dark:hover:bg-primary dark:hover:text-white ${currentPage === totalPages ? "bg-primary text-white dark:bg-primary dark:border-primary" : ""}`}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return buttons;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-10">
        <div>
          <button
            // onClick={handleAddQuestion}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <IoAdd size={30} />
            Add Question
          </button>
        </div>
        <form
          action="#"
          method="post"
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center relative"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="max-w-100 w-60 border rounded-md focus:outline-none border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" // Adjusted px value to accommodate the icon
          />

          <CiSearch className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </form>

        <button
          onClick={() => setShowFilterModal(true)}
          className="flex flex-row gap-5 max-w-100 border rounded-md focus:outline-none border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <label>Filter</label>
          <IoFilter size={22} />
        </button>
        {showFilterModal && (
          <ApplyFilterPage
            questionList={questionList}
            onClose={() => setShowFilterModal(false)}
            onApplyFilter={(filterCriteria) => {
              // Update filter state variables with the applied filter criteria
              setMarksFilter(filterCriteria.marks);
              setTypeFilter(filterCriteria.type);
              setLevelFilter(filterCriteria.level);
              // Close the filter modal
              setShowFilterModal(false);
            }}
          />
        )}

        <div className="flex items-center gap-4">
          <label>Show entries:</label>
          <select
            className="border rounded-md border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 h-[60px]">
                <th></th> {/* Checkbox column */}
                <th
                  className="table-td-head"
                  onClick={() => handleSort("serialNo")}
                >
                  <span>
                    No
                    <NumberSorting
                      order={
                        sortConfig.key === "serialNo"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("queOrg")}
                >
                  <span>
                    Question
                    <StringSorting
                      order={
                        sortConfig.key === "queOrg" ? sortConfig.direction : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("marks")}
                >
                  <span>
                    Marks
                    <NumberSorting
                      order={
                        sortConfig.key === "marks" ? sortConfig.direction : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("queType")}
                >
                  <span>
                    Type
                    <StringSorting
                      order={
                        sortConfig.key === "queType" ? sortConfig.direction : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("level")}
                >
                  <span>
                    Level
                    <StringSorting
                      order={
                        sortConfig.key === "level" ? sortConfig.direction : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("unitName")}
                >
                  <span>
                    Unit Name
                    <StringSorting
                      order={
                        sortConfig.key === "unitName"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedQuestions.map((question, index) => (
                <tr key={index} className="h-[60px]">
                  <td className="table-td-data">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, question)}
                      checked={selectedQuestions.some(
                        (q) => q._id === question._id
                      )}
                    />
                  </td>
                  <td className="table-td-data">
                    <h5 className="font-medium text-black dark:text-white">
                      {question.serialNo}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[300px]">
                    <h5 className="font-medium text-black dark:text-white">
                      {question.queOrg}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="font-medium text-black dark:text-white">
                      {question.marks}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {question.queType}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {question.level}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {question.unitId.unitName}
                    </h5>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-4">
          <nav>
            <ul className="inline-flex gap-4">{...getPaginationButtons()}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default QuestionSelectTable;
