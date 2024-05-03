import React, { useContext, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import _ from "lodash";
import { nodeBaseUrl } from "../../js/api.constatnt";
import NumberSorting from "../../components/Tables/NumberSorting";
import StringSorting from "../../components/Tables/StringSorting";
import axios from "axios";
import ContextProviderContext from "../../context/ContextProvider";
import { toast } from "react-toastify";

const SelectSubjectQue = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { setSelectedSubjectData } = useContext(ContextProviderContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(nodeBaseUrl + "/api/subject");
        if (response.status == 200) {
          const subjectsWithSerialNo = response.data.data.map(
            (subject, index) => ({
              ...subject,
              serialNo: index + 1,
            })
          );
          // console.log(subjectsWithSerialNo);
          // setSubjectList(subjectsWithSerialNo);
          setSubjectList([
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
            ...subjectsWithSerialNo,
          ]);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error("Error fetching subjects:" + error);
      }
    };

    fetchSubjects();
  }, []);

  // Functions for pagination, sorting, and searching

  const handleAddSubject = () => {
    navigate("/subject/add-subject");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    const filteredData = subjectList.filter(
      (subject) =>
        (subject.subjectName ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (subject.subjectCode ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (subject.courseName ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (subject.semester.toString() ?? "")
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

  const sortedSubjects = _.orderBy(
    getFilteredData(),
    [sortConfig.key],
    [sortConfig.direction]
  );

  const paginatedSubjects = getPaginatedData(sortedSubjects);

  const getPaginationButtons = () => {
    const totalPages = Math.ceil(sortedSubjects.length / itemsPerPage);
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
    <DefaultLayout>
      <Breadcrumb pageName="Select Subject" />
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={handleAddSubject}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <IoAdd size={30} />
            Add Subject
          </button>
        </div>
        <form
          action="#"
          method="post"
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center mx-8 relative"
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
              <tr className="bg-gray-2 text-left dark:bg-meta-4 h-[60px]">
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
                  onClick={() => handleSort("subjectName")}
                >
                  <span>
                    Subject Name
                    <StringSorting
                      order={
                        sortConfig.key === "subjectName"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("subjectCode")}
                >
                  <span>
                    Subject Code
                    <StringSorting
                      order={
                        sortConfig.key === "subjectCode"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("courseName")}
                >
                  <span>
                    Course
                    <StringSorting
                      order={
                        sortConfig.key === "courseName"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("semester")}
                >
                  <span>
                    Semester
                    <NumberSorting
                      order={
                        sortConfig.key === "semester"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th className="table-td-head">
                  <span className="flex justify-center gap-1">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubjects.map((subject, key) => (
                <tr key={key} className="h-[60px]">
                  <td className="table-td-data">
                    <h5 className="font-medium text-black dark:text-white">
                      {subject.serialNo}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="font-medium text-black dark:text-white">
                      {subject.subjectName}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {subject.subjectCode}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {subject.courseName}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[100px]">
                    <h5 className="text-black dark:text-white">
                      {subject.semester}
                    </h5>
                  </td>
                  <td className="table-td-data px-4">
                    <div className="flex justify-center space-x-3.5">
                      <button
                        className="hover:text-primary inline-flex items-center min-w-max justify-center  rounded-full bg-gray-200 border border-gray-400 py-1 px-3 text-sm font-medium"
                        onClick={() => {
                          setSelectedSubjectData(subject);
                          navigate("/question/select-unit");
                        }}
                      >
                        {/* <MdEdit size={16} /> */}
                        <span className="">Select Unit</span>
                      </button>
                    </div>
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
    </DefaultLayout>
  );
};

export default SelectSubjectQue;
