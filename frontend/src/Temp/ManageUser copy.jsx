import React, { useEffect, useState } from "react";
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
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import axios from "axios";
import { javaBaseUrl } from "../../js/api.constatnt";
import _ from "lodash";

const AllUsers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(javaBaseUrl + "/api/user");
      if (response.status == 200) {
        console.log(response.data);
        setUserList(response.data);
      }
    };

    getAllUsers();
  }, []);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const [order, setOrder] = useState("DSC");
  const [number, setNumber] = useState("DSC");

  // const handleSorting = (col, sortOrder) => {
  //   const sortedData = [...userList].sort((a, b) => {
  //     if (sortOrder === "ASC") {
  //       return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
  //     } else {
  //       return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
  //     }
  //   });
  //   setUserList(sortedData);
  //   setOrder(sortOrder === "ASC" ? "DSC" : "ASC");
  // };

  // const handleNumberSorting = (col, sortOrder) => {
  //   const sortedData = [...userList].sort((a, b) => {
  //     if (sortOrder === "ASC") {
  //       return a[col] - b[col];
  //     } else {
  //       return b[col] - a[col];
  //     }
  //   });
  //   setUserList(sortedData);
  //   setNumber(sortOrder === "ASC" ? "DSC" : "ASC");
  // };

  const handleSorting = (col, sortOrder) => {
    const sortedData = _.orderBy(userList, [col], [sortOrder]);
    setUserList(sortedData);
    setOrder(sortOrder === "ASC" ? "DSC" : "ASC");
  };

  const handleNumberSorting = (col, sortOrder) => {
    const sortedData = _.orderBy(
      userList,
      [col],
      [sortOrder === "ASC" ? "asc" : "desc"]
    );
    setUserList(sortedData);
    setNumber(sortOrder === "ASC" ? "DSC" : "ASC");
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = () => {
    navigate("/user/add-user");
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const result = userList.filter((user) => {
      const searchTerm = search.toLowerCase();
      return (
        searchTerm === "" ||
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.contactNo.toLowerCase().includes(searchTerm) ||
        user.officeLocation.toLowerCase().includes(searchTerm) ||
        user.status.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(result);
    setCurrentPage(1);
  }, [search, userList]);

  // const filteredData = userList.filter((item) => {
  //   const searchTerm = search.toLowerCase();
  //   return (
  //     searchTerm === "" ||
  //     item.firstName.toLowerCase().includes(searchTerm) ||
  //     item.lastName.toLowerCase().includes(searchTerm) ||
  //     item.username.toLowerCase().includes(searchTerm) ||
  //     item.email.toLowerCase().includes(searchTerm) ||
  //     item.role.toLowerCase().includes(searchTerm) ||
  //     item.contactNo.toLowerCase().includes(searchTerm) ||
  //     item.officeLocation.toLowerCase().includes(searchTerm) ||
  //     item.status.toLowerCase().includes(searchTerm)
  //   );
  // });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Users" />
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <IoAdd size={30} />
            Add User
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
                  onClick={() => handleSorting("firstName", order)}
                  className="table-td-head"
                >
                  <span>
                    First Name
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("lastName", order)}
                  className="table-td-head"
                >
                  <span>
                    Last Name
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("username", order)}
                  className="table-td-head"
                >
                  <span>
                    Username
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("email", order)}
                  className="table-td-head"
                >
                  <span>
                    email
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("role", order)}
                  className="table-td-head"
                >
                  <span>
                    Role
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("contactNo", order)}
                  className="table-td-head"
                >
                  <span>
                    Contact No
                    {order === "ASC" ? (
                      <FcNumericalSorting21 size={22} />
                    ) : (
                      <FcNumericalSorting12 size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("officeLocation", order)}
                  className="table-td-head"
                >
                  <span>
                    Office location
                    {order === "ASC" ? (
                      <FcNumericalSorting21 size={22} />
                    ) : (
                      <FcNumericalSorting12 size={22} />
                    )}
                  </span>
                </th>
                <th
                  onClick={() => handleSorting("status", order)}
                  className="table-td-head"
                >
                  <span>
                    Status
                    {order === "ASC" ? (
                      <FcAlphabeticalSortingZa size={22} />
                    ) : (
                      <FcAlphabeticalSortingAz size={22} />
                    )}
                  </span>
                </th>

                <th className="table-td-head">
                  <span className="flex justify-center gap-1">Actions</span>
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
                      {packageItem.firstName}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.lastName}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.username}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[200px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.email}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[100px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.roleId}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[100px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.contactNo ?? "-"}
                    </h5>
                  </td>
                  <td className="table-td-data max-w-[100px]">
                    <h5 className="text-black dark:text-white">
                      {packageItem.officeLocation ?? "-"}
                    </h5>
                  </td>
                  <td className="table-td-data">
                    <h5
                      className={`flex w-fit m-auto rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        packageItem.status === "Active"
                          ? "bg-success text-success"
                          : "bg-danger text-danger"
                      }`}
                    >
                      {packageItem.status}
                    </h5>
                  </td>

                  <td className="table-td-data px-4">
                    <div className="flex justify-center space-x-3.5">
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
          {[...Array(Math.ceil(userList.length / itemsPerPage)).keys()].map(
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
                    ${currentPage === Math.ceil(userList.length / itemsPerPage) ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-primary text-white hover:bg-opacity-90"}`}
            disabled={currentPage === Math.ceil(userList.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AllUsers;
