import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DynamicDropDown = ({
  name,
  value,
  onChange,
  title,
  optionlist,
  onBlur,
  defaultOptionTitle,
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div>
      <label className="block text-black dark:text-white">
        {" "}
        {title}{" "}
        <div className="mt-2.5 relative z-20 bg-transparent dark:bg-form-input">
          <select
            name={name}
            value={value}
            onChange={onChange}
            onClick={toggleDropDown}
            onBlur={onBlur}
            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${value !== "" ? "text-black dark:text-white" : ""
              }`}
          >
            {defaultOptionTitle ? (
              <option value="">
                {defaultOptionTitle}
              </option>
            ) : (
              <></>
            )}
            {/* Default option */}
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
      </label>
    </div>
  );
};

export default DynamicDropDown;
