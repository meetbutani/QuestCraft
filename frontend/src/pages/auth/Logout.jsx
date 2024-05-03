import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../components/Modals/DeleteDialog";
import DefaultLayout from "../../layout/DefaultLayout";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    // Perform logout action here, such as deleting user data from local storage
    localStorage.removeItem("user"); // Example: Deleting user data from local storage
    navigate("/auth/signin");
  };

  const handleLogoutCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <DefaultLayout>
        <DeleteDialog
          isOpen={true}
          title={"Logout"}
          description={"Are you sure you want to logout?"}
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
          buttonName={"Logout"}
        />
      </DefaultLayout>
    </>
  );
};

export default Logout;
