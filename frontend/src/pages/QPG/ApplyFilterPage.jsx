import React from "react";
import { IoClose } from "react-icons/io5";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";

const ApplyFilterPage = ({ onClose, onApplyFilter }) => {
  const unitList = ["ML", "CN", "Hello"];
  const difficultyLevelList = ["Easy", "Moderate", "Hard"];

  const handleSubmit = () => {
    // Get selected filter criteria
    const selectedUnit = document.querySelector(
      'input[name="unit"]:checked'
    )?.value;
    const selectedDifficulty = document.querySelector(
      'input[name="difficultyLevel"]:checked'
    )?.value;

    // Construct filter criteria object
    const filterCriteria = {
      unit: selectedUnit || "All",
      difficulty: selectedDifficulty || "All",
    };

    // Call the onApplyFilter function passed from the parent component
    onApplyFilter(filterCriteria);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div
        className="mt-10 flex flex-col gap-5 text-white"
        style={{ width: "50%" }}
      >
        <div className="px-180">
          <IoClose onClick={onClose} size={30} />
        </div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Apply Filter
              </h3>
            </div>
            <form action="#">
              <div className="flex justify-between px-30 py-10">
                {/* Unit List */}
                <div>
                  <h4 className="font-medium mb-3">Select Unit</h4>
                  <div className="flex flex-col">
                    {unitList.map((unit, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="unit"
                          value={unit}
                          className="form-checkbox text-primary"
                        />
                        {unit}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Difficulty Level List */}
                <div>
                  <h4 className="font-medium mb-3">Select Diffculty</h4>
                  <div className="flex flex-col">
                    {difficultyLevelList.map((level, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="difficultyLevel"
                          value={level}
                          className="form-checkbox text-primary"
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyFilterPage;
