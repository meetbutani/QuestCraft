import React from "react";

const SelectSwitch = ({ enabled, setEnabled, option1, option2, id }) => {
  return (
    <div className="flex items-center">
      <span
        className={`labelfield mr-2 ${!enabled? "text-primary dark:text-primary" : ""}`}
      >
        {option1}
      </span>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center relative"
      >
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          onChange={() => {
            setEnabled(!enabled);
          }}
          checked={enabled}
        />
        <span className="block h-8 w-14 rounded-full bg-black"></span>
        <span
          className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
            enabled? "translate-x-full" : ""
          }`}
        ></span>
      </label>
      <span
        className={`labelfield ml-2 ${enabled? "text-primary dark:text-primary" : ""}`}
      >
        {option2}
      </span>
    </div>
  );
};

export default SelectSwitch;