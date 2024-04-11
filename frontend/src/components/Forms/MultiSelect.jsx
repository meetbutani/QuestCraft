import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MultiSelect = ({ optionsList, title }) => {
  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownRef.current || !trigger.current) return;
      if (!show || dropdownRef.current.contains(target) || trigger.current.contains(target))
        return;
      setShow(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [show]);

  const toggleDropdown = () => {
    setShow(!show);
  };

  const selectOption = (index) => {
    const newSelected = [...selected];
    const optionValue = optionsList[index].value;
    if (newSelected.includes(optionValue)) {
      newSelected.splice(newSelected.indexOf(optionValue), 1);
    } else {
      newSelected.push(optionValue);
    }
    setSelected(newSelected);
  };

  return (
    <div className="relative z-50">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {title}
      </label>
      <div>
        <div className="flex flex-col items-center">
          <div ref={trigger} onClick={toggleDropdown} className="w-full">
            {/* Display selected options */}
            <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
              <div className="flex flex-auto flex-wrap gap-3">
                {selected.map((optionValue) => (
                  <div
                    key={optionValue}
                    className="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                  >
                    <div className="max-w-full flex-initial">
                      {optionsList.find((option) => option.value === optionValue)?.text}
                    </div>
                    <div className="flex flex-auto flex-row-reverse">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          selectOption(optionsList.findIndex((option) => option.value === optionValue));
                        }}
                        className="cursor-pointer pl-2 hover:text-danger"
                      >
                        <IoClose/>
                      </div>
                    </div>
                  </div>
                ))}
                {selected.length === 0 && (
                  <div className="flex-1">
                    <input
                      placeholder="Select an option"
                      className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                      value=""
                      readOnly
                    />
                  </div>
                )}
              </div>
              <div className="flex w-8 items-center py-1 pl-1 pr-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown();
                  }}
                  className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                >
                  <IoIosArrowDown/>
                </button>
              </div>
            </div>
          </div>
          {/* Dropdown content */}
          <div className="w-full px-4">
            <div
              className={`max-h-select absolute top-full left-0 z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ${show ? "" : "hidden"}`}
              ref={dropdownRef}
            >
              <div className="flex w-full flex-col">
                {optionsList.map((option, index) => (
                  <div key={index}>
                    <div
                      className={`w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark`}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectOption(index);
                      }}
                    >
                      <div
                        className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ${
                          selected.includes(option.value) ? "border-primary" : ""
                        }`}
                      >
                        <div className="flex w-full items-center">
                          <div className="mx-2 leading-6">
                            {option.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
