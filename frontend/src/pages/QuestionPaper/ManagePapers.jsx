import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import _ from "lodash";
import { nodeBaseUrl } from "../../js/api.constatnt";
import NumberSorting from "../../components/Tables/NumberSorting";
import StringSorting from "../../components/Tables/StringSorting";
import DeleteDialog from "../../components/Modals/DeleteDialog";
import axios from "axios";
import ContextProviderContext from "../../context/ContextProvider";
import { toast } from "react-toastify";
import { PermissionGuard } from "../../components/PermissionGuard";

const ManagePapers = () => {
  const { setSelectedPaperData } = useContext(ContextProviderContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        // console.log(selectedSubjectData);
        const response = await axios.get(nodeBaseUrl + "/api/paper");
        console.log(response.data);
        if (response.status == 200) {
          const papersWithSerialNo = response.data.data.map((paper, index) => ({
            ...paper,
            serialNo: index + 1,
          }));
          console.log(papersWithSerialNo);
          // setPaperList(papersWithSerialNo);
          setPaperList([
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
            ...papersWithSerialNo,
          ]);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
        toast.error("Error fetching units:" + error);
      }
    };

    fetchPapers();
  }, []);

  const [paperList, setPaperList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState({
    paperName: "",
    id: "",
  });

  // Functions for pagination, sorting, and searching

  const handleSetPaper = () => {
    navigate("/question-paper/select-subject");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    const filteredData = paperList.filter(
      (paper) =>
        (paper.paperName ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.paperType ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.courseType ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.courseName ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.subjectName ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.subjectCode ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.date.toString() ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.marks.toString() ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.createdBy.username ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (paper.updatedBy.username ?? "")
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

  const sortedPapers = _.orderBy(
    getFilteredData(),
    [sortConfig.key],
    [sortConfig.direction]
  );

  const paginatedPapers = getPaginatedData(sortedPapers);

  const getPaginationButtons = () => {
    const totalPages = Math.ceil(sortedPapers.length / itemsPerPage);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "delete-dialog-backdrop") {
        handleDeleteCancel();
      }
    };

    if (isDeleteDialogOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDeleteDialogOpen]);

  const handleDeleteClick = (id, paper) => {
    // Show the delete dialog
    setIsDeleteDialogOpen(true);
    setSelectedPaper({ id: id, queOrg: paper });
  };

  const handleDeleteConfirm = async () => {
    // console.log(selectedRole)
    try {
      const response = await axios.delete(
        nodeBaseUrl + "/api/paper/" + selectedPaper.id
      );
      if (response.status === 200) {
        // Remove the deleted user from the user list
        // console.log(response.data);
        toast.success(response.data.message);
        setPaperList(
          paperList.filter((paper) => paper._id !== selectedPaper.id)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }

    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    // Close the delete dialog
    setIsDeleteDialogOpen(false);
    setSelectedUnit({ queOrg: "", id: "" });
  };

  const [deletePermission, setDeletePermission] = useState(false);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Paper" />
      <div className="flex justify-between items-center mb-4">
        <PermissionGuard
          requiredPermission={"GenerateDelete"}
          setVariable={setDeletePermission}
        />
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          title={"Delete Paper"}
          description={
            "Are you sure want to delete paper <b>'" +
            selectedPaper.paperName +
            "'</b>."
          }
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
        <div>
          <button
            onClick={handleSetPaper}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <IoAdd size={30} />
            Set Paper
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
                  onClick={() => handleSort("paperName")}
                >
                  <span>
                    Paper Name
                    <StringSorting
                      order={
                        sortConfig.key === "paperName"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("paperType")}
                >
                  <span>
                    Paper Type
                    <StringSorting
                      order={
                        sortConfig.key === "paperType"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("courseType")}
                >
                  <span>
                    Course Type
                    <StringSorting
                      order={
                        sortConfig.key === "courseType"
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
                    Course Name
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
                  onClick={() => handleSort("date")}
                >
                  <span>
                    Paper Date
                    <StringSorting
                      order={
                        sortConfig.key === "date" ? sortConfig.direction : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("totalMarks")}
                >
                  <span>
                    Total Marks
                    <NumberSorting
                      order={
                        sortConfig.key === "totalMarks"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("createdBy")}
                >
                  <span>
                    Created By
                    <StringSorting
                      order={
                        sortConfig.key === "createdBy"
                          ? sortConfig.direction
                          : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("updatedBy")}
                >
                  <span>
                    Updated By
                    <StringSorting
                      order={
                        sortConfig.key === "updatedBy"
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
              {paginatedPapers.map((paper, key) => (
                <tr key={key} className="h-[60px]">
                  <td className="table-td-data">
                    <h5 className="font-medium text-black dark:text-white">
                      {paper.serialNo}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[300px]">
                    <h5 className="font-medium text-black dark:text-white">
                      {paper.paperName}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="font-medium text-black dark:text-white">
                      {paper.paperType}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {paper.courseType}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {paper.subjectId.subjectName}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {paper.subjectId.subjectCode}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {paper.date.toString()}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {paper.totalMarks.toString()}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {paper.createdBy.username}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {paper.updatedBy.username}
                    </h5>
                  </td>

                  <td className="table-td-data px-4">
                    <div className="flex justify-center space-x-3.5">
                      {deletePermission && (
                        <button
                          onClick={() =>
                            handleDeleteClick(paper._id, paper.paperName)
                          }
                          className="hover:text-primary"
                        >
                          <RiDeleteBinLine color="#FF5733" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedPaperData(paper);
                          navigate("/question-paper/show-paper");
                        }}
                        className="hover:text-primary"
                      >
                        <FaEye color="#000000" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPaperData(paper);
                          navigate("/question-paper/edit-paper-details");
                        }}
                        className="hover:text-primary"
                      >
                        <MdEdit color="#0000FF" />
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

export default ManagePapers;
