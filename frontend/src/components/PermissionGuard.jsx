import React from "react";
import { Route } from "react-router-dom";
import { decryptData } from "../js/secureData";

export const PermissionGuard = ({ requiredPermission, children }) => {
  // Check if the user has the required permission
  const hasPermission = checkPermission(requiredPermission);
  return hasPermission ? children : <NoAccess />;
};

const checkPermission = (requiredPermission) => {
  return decryptData()?.accessList?.includes(requiredPermission) ?? false;
};

const NoAccess = () => {
  return <div>You don't have permission to access this page.</div>;
};
