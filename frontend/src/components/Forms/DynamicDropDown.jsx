import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DynamicDropDown = ({ Title, optionlist }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const changeTextColor = (value) => {
    setSelectedOption(value);
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {" "}
        {Title}{" "}
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => changeTextColor(e.target.value)}
          onClick={toggleDropDown} // Toggle dropdown on click
          onBlur={() => setIsDropDownOpen(false)} // Close dropdown when focus is lost
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          {optionlist.map((option, index) => (
            <option
              key={index}
              value={option}
              disabled={option === ""}
              className="text-body dark:text-bodydark"
            >
              {option}
            </option>
          ))}
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          {isDropDownOpen ? (
            <IoIosArrowUp className="text-primary" />
          ) : (
            <IoIosArrowDown className="text-primary" />
          )}
        </span>
      </div>
    </div>
  );
};

export default DynamicDropDown;
