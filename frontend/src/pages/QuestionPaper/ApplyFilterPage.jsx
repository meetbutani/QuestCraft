import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const ApplyFilterPage = ({ onClose, onApplyFilter, questionList }) => {
  const [marksFilter, setMarksFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [levelFilter, setLevelFilter] = useState([]);

  const uniqueMarks = [
    ...new Set(questionList.map((question) => question.marks)),
  ];
  const uniqueTypes = ["MCQ", "True/False", "Normal"];
  const uniqueLevels = ["Easy", "Medium", "Hard"]; // Assuming you have predefined levels

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterCriteria = {
      marks: marksFilter,
      type: typeFilter,
      level: levelFilter,
    };

    onApplyFilter(filterCriteria);
  };

  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div className="mt-10 flex flex-col gap-5 text-white">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="w-full inline-flex justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Apply Filter
            </h3>
            <IoClose onClick={onClose} size={30} className="cursor-pointer" />
          </div>
          <form
            action="#"
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col py-10 gap-y-10"
          >
            <div className="flex justify-between px-15 gap-10">
              {/* Marks Filter */}
              <div>
                <h4 className="font-medium mb-3">Filter by Marks</h4>
                {uniqueMarks.map((mark, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={mark}
                      onChange={(e) => {
                        const value = e.target.value;
                        setMarksFilter((prev) => {
                          if (prev.includes(value)) {
                            return prev.filter((item) => item !== value);
                          } else {
                            return [...prev, value];
                          }
                        });
                      }}
                      checked={marksFilter.includes(mark)}
                      className="form-checkbox text-primary"
                    />
                    {mark}
                  </label>
                ))}
              </div>
              {/* Type Filter */}
              <div>
                <h4 className="font-medium mb-3">Filter by Type</h4>
                {uniqueTypes.map((type, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={type}
                      onChange={(e) => {
                        const value = e.target.value;
                        setTypeFilter((prev) => {
                          if (prev.includes(value)) {
                            return prev.filter((item) => item !== value);
                          } else {
                            return [...prev, value];
                          }
                        });
                      }}
                      checked={typeFilter.includes(type)}
                      className="form-checkbox text-primary"
                    />
                    {type}
                  </label>
                ))}
              </div>
              {/* Level Filter */}
              <div>
                <h4 className="font-medium mb-3">Filter by Level</h4>
                {uniqueLevels.map((level, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={level}
                      onChange={(e) => {
                        const value = e.target.value;
                        setLevelFilter((prev) => {
                          if (prev.includes(value)) {
                            return prev.filter((item) => item !== value);
                          } else {
                            return [...prev, value];
                          }
                        });
                      }}
                      checked={levelFilter.includes(level)}
                      className="form-checkbox text-primary"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyFilterPage;
