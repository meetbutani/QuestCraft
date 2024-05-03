import React, { useContext, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { javaBaseUrl } from "../../js/api.constatnt";
import DeleteDialog from "../../components/Modals/DeleteDialog";
import _ from "lodash";
import NumberSorting from "../../components/Tables/NumberSorting";
import StringSorting from "../../components/Tables/StringSorting";
import axios from "axios";
import ContextProviderContext from "../../context/ContextProvider";
import { toast } from "react-toastify";

const ManageRole = () => {
  const [roleList, setRoleList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState({ roleId: "", id: "" });

  const { setSelectedRoleData } = useContext(ContextProviderContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(javaBaseUrl + "/api/role");
        if (response.status == 200) {
          const rolesData = response.data.data;
          const rolesArray = Object.values(rolesData);
          const rolesWithAccessStr = rolesArray.map((role) => ({
            ...role,
            accessStr: role.accessList.join(", "),
          }));
          // console.log(rolesWithAccessStr);
          // setRoleList(rolesWithAccessStr);
          setRoleList([
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
            ...rolesWithAccessStr,
          ]);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Error fetching roles:" + error);
      }
    };

    fetchRoles();
  }, []);

  // Functions for pagination, sorting, and searching

  const handleAddRole = () => {
    navigate("/role/add-role");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    const filteredData = roleList.filter(
      (role) =>
        (role.roleId ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (role.accessStr ?? "").toLowerCase().includes(searchTerm.toLowerCase())
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

  const sortedRoles = _.orderBy(
    getFilteredData(),
    [sortConfig.key],
    [sortConfig.direction]
  );

  const paginatedRoles = getPaginatedData(sortedRoles);

  const getPaginationButtons = () => {
    const totalPages = Math.ceil(sortedRoles.length / itemsPerPage);
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

  const handleDeleteClick = (id, roleId) => {
    // Show the delete dialog
    setIsDeleteDialogOpen(true);
    setSelectedRole({ id: id, roleId: roleId });
  };

  const handleDeleteConfirm = async () => {
    // console.log(selectedRole)
    try {
      const response = await axios.delete(
        javaBaseUrl + "/api/role/" + selectedRole.id
      );
      if (response.status === 200) {
        // Remove the deleted user from the user list
        setRoleList(
          roleList.filter((role) => role.roleId !== selectedRole.roleId)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }

    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    // Close the delete dialog
    setIsDeleteDialogOpen(false);
    setSelectedRole({ roleId: "", id: "" });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Role" />
      <div className="flex justify-between items-center mb-4">
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          title={"Delete User"}
          description={
            "Are you sure want to delete user with Role ID <b>'" +
            selectedRole.roleId +
            "'</b>."
          }
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
        <div>
          <button
            onClick={handleAddRole}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <IoAdd size={30} />
            Add Role
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
              <tr className="bg-slate-200 text-left dark:bg-meta-4 h-[60px]">
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
                  onClick={() => handleSort("roleId")}
                >
                  <span>
                    Role ID
                    <StringSorting
                      order={
                        sortConfig.key === "roleId" ? sortConfig.direction : ""
                      }
                    />
                  </span>
                </th>
                <th
                  className="table-td-head"
                  onClick={() => handleSort("accessStr")}
                >
                  <span>
                    Access List
                    <StringSorting
                      order={
                        sortConfig.key === "accessStr"
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
                    Status
                    <StringSorting
                      order={
                        sortConfig.key === "status" ? sortConfig.direction : ""
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
              {paginatedRoles.map((role, key) => (
                <tr key={key} className="h-[60px]">
                  <td className="table-td-data">
                    <h5 className="font-medium text-black dark:text-white">
                      {role.serialNo}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[100px]">
                    <h5 className="text-black dark:text-white">
                      {role.roleId}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[250px] py-4">
                    <h5
                      className="text-black dark:text-white"
                      style={{ whiteSpace: "wrap" }}
                    >
                      {role.accessStr}
                    </h5>
                  </td>
                  <td className="table-td-data">
                    <h5
                      className={`flex w-fit m-auto rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        role.status === "Active"
                          ? "bg-success text-success"
                          : "bg-danger text-danger"
                      }`}
                    >
                      {role.status}
                    </h5>
                  </td>

                  <td className="table-td-data px-4">
                    <div className="flex justify-center space-x-3.5">
                      <button
                        onClick={() => handleDeleteClick(role.id, role.roleId)}
                        className="hover:text-primary"
                      >
                        <RiDeleteBinLine color="#FF5733" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRoleData(role);
                          navigate(`/role/edit-role-details`);
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

export default ManageRole;
