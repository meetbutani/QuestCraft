import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";

const CardDataStats = ({ title, total, icon: IconComponent, navigateTo }) => {
  const navigate = useNavigate(); // Initialize navigate function from useNavigate

  const handleClick = () => {
    // Navigate to the specified URL
    navigate(navigateTo);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-row justify-between">
        <div className="text-title-xl mt-7 text-primary">{total}</div>
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {IconComponent && (
            <IconComponent className="text-primary" size={40} />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-xl font-bold">{title}</span>
        </div>

        <div
          className="inline-flex gap-2 min-w-max justify-center items-center rounded-full bg-gray-200 border border-gray-400 py-1 px-3 text-sm font-medium bg-meta-2 dark:bg-meta-4"
          onClick={handleClick} // Add onClick event handler
          style={{ cursor: "pointer" }} // Add pointer cursor
        >
          <span className="ml-2">More Info</span>
          <IoArrowForwardOutline />
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
