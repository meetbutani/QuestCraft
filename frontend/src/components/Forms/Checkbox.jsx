import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            className="sr-only"
            onChange={onChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              checked && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span className={`opacity-0 ${checked && "!opacity-100"}`}>
              <FaCheck size={12} color="#3056D3" />
            </span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
