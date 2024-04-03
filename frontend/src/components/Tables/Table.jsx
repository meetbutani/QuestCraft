import React, { useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

const Table = ({ data,SearchingParameter,ActionButtonList})  => {
    const [order,setOrder] = useState("ASC");
    
    const [search,setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const sortingNumbers = (col) => {
        if (order === "ASC") {
          const sorted = [...Data].sort((a, b) => a[col] - b[col]);
          setData(sorted);
          setOrder("DSC");
        }
      
        if (order === "DSC") {
          const sorted = [...Data].sort((a, b) => b[col] - a[col]);
          setData(sorted);
          setOrder("ASC");
        }
      };

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

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); 
      };
      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      
      const filteredData = data.filter(item => {
        return search.toLowerCase() === '' ? true : item[SearchingParameter[0]].toLowerCase().includes(search) || item[SearchingParameter[1]].toLowerCase().includes(search);
      });
      
      
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

      const tableHeaders = Object.keys(data[0]);
  return (
    <>
    
    <div className="flex justify-between items-center mb-4">
        
        
        <form className="flex items-center ml-100">
          <input
            type="text"
            placeholder="Search by Course"
            className="border  rounded-md focus:outline-none border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                {tableHeaders.map((header, index) => (
                  <th key={header} className="py-4 px-4 font-medium text-black dark:text-white" onClick={() => {
                      if (index === 0) {
                        sortingNumbers(header);
                      } else {
                        sorting(header);
                      }
                    }}>
                    {header}
                  </th>
                ))}
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
                {currentItems.map((packageItem, key) => (
                <tr key={key}>
                    {Object.keys(packageItem).map((key) => (
                        <td key={key} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                            {packageItem[key]}
                        </h5>
                        </td>
                    ))}
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {ActionButtonList.map(({Icon,color}, index) => (
                        <button key={index}>
                          <Icon color={color} />
                        </button>
                      ))}
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>

          </table>
          
        </div>
        <div className="flex justify-center mt-4">
            
            <button 
              onClick={() => paginate(currentPage - 1)} 
              className={`mx-1 px-3 py-1 rounded-full focus:outline-none 
                ${currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary text-white hover:bg-opacity-90'}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            
            {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((number) => (
              <button 
                key={number} 
                onClick={() => paginate(number + 1)} 
                className={`mx-1 px-3 py-1 rounded-full focus:outline-none 
                  ${currentPage === number + 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700 hover:bg-opacity-90'}`}
              >
                {number + 1}
              </button>
            ))}

            
            <button 
              onClick={() => paginate(currentPage + 1)} 
              className={`mx-1 px-3 py-1 rounded-full focus:outline-none 
                ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary text-white hover:bg-opacity-90'}`}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
      </div>
      </>
  )
}

export default Table