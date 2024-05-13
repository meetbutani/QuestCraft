import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { decryptData } from "../js/secureData";
import DefaultLayout from "../layout/DefaultLayout";

export const PermissionGuard = ({
  requiredPermission,
  children,
  setVariable,
}) => {
  // Check if the user has the required permission
  const hasPermission = checkPermission(requiredPermission);

  useEffect(() => {
    if (setVariable != null) {
      hasPermission ? setVariable(true) : setVariable(false);
    }
  }, [hasPermission]);

  if (setVariable != null) {
    return <></>;
  } else {
    return hasPermission ? children : <NoAccess />;
  }
};

const checkPermission = (requiredPermission) => {
  return decryptData()?.accessList?.includes(requiredPermission) ?? false;
};

const NoAccess = () => {
  return (
    <DefaultLayout>
      <div className="flex justify-center items-center">
        <div className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:py-15">
          <span className="mx-auto inline-block">
            <svg
              width="150"
              height="150"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.1"
                width="60"
                height="60"
                rx="30"
                fill="#DC2626"
              ></rect>
              <path
                d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
                stroke="#DC2626"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
          <h3 className="mt-5.5 pb-2 text-3xl font-bold text-black dark:text-white ">
            {"No Access"}
          </h3>
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: "You don't have permission to access this page.",
            }}
          ></p>
        </div>
      </div>
    </DefaultLayout>
  );
};
