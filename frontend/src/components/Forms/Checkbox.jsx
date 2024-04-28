import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Checkbox = ({ question, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onToggle(question, !isChecked);
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="checkbox"
        id="checkboxLabelTwo"
        className="sr-only"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div
        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
          isChecked ? "border-primary bg-gray" : "border-gray dark:bg-transparent"
        }`}
      >
        <FaCheck />
      </div>
    </div>
  );
};

export default Checkbox;
