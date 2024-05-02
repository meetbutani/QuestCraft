import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../../layout/DefaultLayout";
import _, { update } from "lodash";
import Breadcrumb from "../../../components/BreadCrumb/BreadCrumb";
import { CiSearch } from "react-icons/ci";
import { IoAdd, IoFilter } from "react-icons/io5";
import { RiSparkling2Fill } from "react-icons/ri";
import { LiaRandomSolid } from "react-icons/lia";
import NumberSorting from "../../../components/Tables/NumberSorting";
import StringSorting from "../../../components/Tables/StringSorting";
import { dataMap } from "../paperData";
// import Checkbox from "../../components/Forms/CheckboxQue";
import { FaCheck } from "react-icons/fa";
import AddQuestionManually from "../AddQuestionManually";
import ApplyFilterPage from "../ApplyFilterPage";
import SelectQuestionRandomly from "../SelectQuestionRandomly";

const SelectQuestionForSectionFFinal = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [Data, setData] = useState([
    {
      id: 1,
      questionName: "What is Machine Learning",
      optionList: ["Hello", "hii", "hee", "asa"],
      difficulty: "Easy",
      unitName: "ML",
      selected: false,
    },
    {
      id: 2,
      questionName: "What is Machine Learning",
      optionList: ["Hello", "hii", "hee", "asa"],
      difficulty: "Easy",
      unitName: "CN",
      selected: false,
    },
    {
      id: 3,
      questionName: "What is Machine Learning",
      optionList: ["Hello", "hii", "hee", "asa"],
      difficulty: "Hard",
      unitName: "DSIP",
      selected: false,
    },
    {
      id: 4,
      questionName: "What is Machine Learning",
      optionList: ["Hello", "hii", "hee", "asa"],
      difficulty: "Moderate",
      unitName: "ML",
      selected: false,
    },
  ]);

  const addQuestion = (question) => {
    setData([...Data, { ...question, id: Data.length + 1 }]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    const filteredData = Data.filter(
      (question) =>
        (question.questionName ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (question.difficulty ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (question.unitName ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    return filteredData;
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

  const sortedUsers = _.orderBy(
    getFilteredData(),
    [sortConfig.key],
    [sortConfig.direction]
  );

  const paginatedUsers = getPaginatedData(sortedUsers);

  const getPaginationButtons = () => {
    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
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

  const [selectedCount, setSelectedCount] = useState(0);
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedCount((prevCount) => prevCount + 1); // Increment selectedCount
  };

  const generateRandomQuestions = (numberOfQuestions) => {
    const randomIndexes = [];
    for (let i = 0; i < numberOfQuestions; i++) {
      const randomIndex = Math.floor(Math.random() * Data.length);
      randomIndexes.push(randomIndex);
    }

    const updatedData = Data.map((item, index) => {
      if (randomIndexes.includes(index)) {
        return { ...item, selected: true };
      }
      return item;
    });

    setData(updatedData);

    setShowRandomModal(false);
    setSelectedCount((prevCount) => prevCount + parseInt(numberOfQuestions));
  };

  const handleCheckboxChange = (e, id) => {
    setSelectedCount((prevCount) =>
      e.target.checked ? prevCount + 1 : prevCount - 1
    );
    let res = [...Data];
    res[id - 1].selected = e.target.checked;
    setData(res);
    console.log(Data);
  };

  const handleApplyFilter = (filterCriteria) => {
    // Apply the filter logic here based on the filter criteria
    const filteredData = Data.filter((item) => {
      // Check if the unitName matches the selected unit in the filter criteria
      const unitMatch =
        filterCriteria.unit === "All" || item.unitName === filterCriteria.unit;
      // Check if the difficulty matches the selected difficulty in the filter criteria
      const difficultyMatch =
        filterCriteria.difficulty === "All" ||
        item.difficulty === filterCriteria.difficulty;
      // Return true if both unit and difficulty match, otherwise false
      return unitMatch && difficultyMatch;
    });

    setFilteredData(filteredData);
    // Close the modal
    setShowFilterModal(false);
  };

  const handleSubmit = () => {
    const selectedQuestions = [];

    Data.forEach((question) => {
      if (question.selected) {
        selectedQuestions.push(question);
        question.selected = false;
      }
    });

    dataMap.sectionF = selectedQuestions;

    // Now 'selectedQuestions' array contains all the selected questions

    console.log("Datamap:", dataMap);
    navigate("/qpaper/set-subject-paper/select-question-for-section-g-final");

    // You can perform further actions with the selected questions here
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Select Question for Section F " />
      <div className="flex justify-center">
        <div className="relative h-2.5 w-full xl:w-3/4 rounded-full bg-stroke dark:bg-strokedark m-10">
          {/* Adjusted positioning for the parent container */}
          <div className="absolute  h-full w-full xl:w-4/4 rounded-full bg-stroke dark:bg-strokedark">
            <div className="absolute left-0 h-full w-6/6 rounded-full bg-primary">
              {/* Adjusted positioning for the pointer */}
              <span className="absolute bottom-full -right-0.5 transform translate-x-1/2 z-10 mb-2 inline-block rounded-sm bg-primary px-2 py-1 text-xs font-bold text-white">
                {/* Adjusted positioning for the triangle */}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 -z-1 h-2 w-2 rotate-45 bg-primary"></span>
                Section:F
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center mb-4 flex-col xl:flex-row ">
        <form
          action="#"
          method="post"
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center mx-8 relative"
        >
          <input
            type="text"
            placeholder="Search by Question Name.."
            value={searchTerm}
            onChange={handleSearchChange}
            className="max-w-120 w-100 border rounded-md focus:outline-none border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <CiSearch className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </form>
        <div className="flex justify-center items-center">
          <div className="max-w-100 w-40 border rounded-md focus:outline-none border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
            {selectedCount == 0
              ? "Select 4 Questions"
              : `${selectedCount} Question Selected `}
          </div>
        </div>

        <button
          onClick={() => setShowFilterModal(true)}
          className="flex flex-row gap-5 max-w-100 w-40 border rounded-md focus:outline-none border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <label>Filter</label>
          <IoFilter size={22} />
        </button>
        {showFilterModal && (
          <ApplyFilterPage
            onClose={() => setShowFilterModal(false)}
            onApplyFilter={handleApplyFilter}
          />
        )}
        <div className="flex">
          <label className="mr-2 mt-2">Show entries:</label>
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
              <tr className="bg-slate-200 text-left dark:bg-meta-4 h-[60px]">
                <th
                  className="table-td-head"
                  onClick={() => handleSort("id")}
                ></th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("questionName")}
                >
                  <span>
                    Question
                    <StringSorting
                      order={
                        sortConfig.key === "firstName"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>

                <th
                  className="table-td-head"
                  onClick={() => handleSort("status")}
                >
                  <span>
                    Diffculty Level
                    <StringSorting
                      order={
                        sortConfig.key === "status" ? sortConfig.direction : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("status")}
                >
                  <span>
                    Unit
                    <StringSorting
                      order={
                        sortConfig.key === "status" ? sortConfig.direction : ""
                      }
                    />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {(filteredData.length > 0 ? filteredData : paginatedUsers).map(
                (question, key) => (
                  <tr key={key} className="h-[60px]">
                    <td className="table-td-data">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={question.selected}
                          // className="sr-only"
                          onChange={(e) => handleCheckboxChange(e, question.id)}
                        />
                      </div>
                    </td>

                    <td className="table-td-data max-w-[200px]">
                      <div className="flex flex-col justify-items-start p-3">
                        <h5 className="font-medium text-black dark:text-white">
                          {question.questionName}
                        </h5>
                        {question.optionList &&
                          question.optionList.length > 0 && (
                            <ul className="list-disc ml-25">
                              {question.optionList.map((option, index) => (
                                <li
                                  key={index}
                                  className="text-gray-600 dark:text-gray-300"
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                    </td>
                    <td className="table-td-data">
                      <h5
                        className={`flex w-fit m-auto rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          question.difficulty === "Easy"
                            ? "bg-success text-success"
                            : question.difficulty === "Moderate"
                              ? "bg-warning text-warning"
                              : "bg-danger text-danger"
                        }`}
                      >
                        {question.difficulty}
                      </h5>
                    </td>
                    <td className="table-td-data max-w-[200px]">
                      <h5 className="font-medium text-black dark:text-white">
                        {question.unitName}
                      </h5>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
          <nav>
            <ul className="inline-flex gap-4">{...getPaginationButtons()}</ul>
          </nav>
        </div>
      </div>
      <div className="flex flex-row p-10 justify-evenly">
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <IoAdd size={30} />
            Add Question Manually
          </button>
          {showModal && (
            <AddQuestionManually
              onClose={handleCloseModal}
              addQuestion={addQuestion}
            />
          )}
        </div>

        <div>
          <button
            onClick={() => setShowRandomModal(true)}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <LiaRandomSolid size={30} />
            Add Question Randomly
          </button>
          {showRandomModal && (
            <SelectQuestionRandomly
              onClose={() => setShowRandomModal(false)}
              generateRandomQuestions={generateRandomQuestions}
            />
          )}
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Confirm
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SelectQuestionForSectionFFinal;
