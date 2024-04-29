import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import Dashboard from "./pages/Dashboard/Dashboard";
import SubjectPaper from "./pages/QPG/SubjectPaper";
import ManageSubject from "./pages/Subject/ManageSubject";
import AddSubject from "./pages/Subject/AddSubject";
import AddUnitPage from "./pages/Unit/AddUnitPage";
import ManageQuestion from "./pages/Question/ManageQuestion";
import AddQuestion from "./pages/Question/AddQuestion";
import SetUnitPaper from "./pages/QPG/SetUnitPaper";
import ManagePaper from "./pages/QPG/ManagePaper";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ManageUnit from "./pages/Unit/ManageUnit";
import PreUnitPage from "./pages/Unit/PreUnitPage";
import PreQuestionPage from "./pages/Question/PreQuestionPage";
import AddUser from "./pages/User/AddUser";
import AddRole from "./pages/Role/AddRole";
import ManageUsers from "./pages/User/ManageUsers";
import ManageRole from "./pages/Role/ManageRole";
import ProfilePage from "./pages/Profile/ProfilePage";
import { PermissionGuard } from "./components/PermissionGuard";
import EditUserDetails from "./pages/User/EditUserDetails";
import ShowUserDetails from "./pages/User/ShowUserDetails";
import UserContext, { UserProvider } from "./context/UserContext";
import EditRole from "./pages/Role/EditRoleDetails";
import { RoleProvider } from "./context/RoleContext";
import SelectQuestionPage from "./pages/QPG/SelectQuestionPage";

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    // --------------------- Auth Routes -----------------------
    <Routes>
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Sign In" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Sign Up" />
            <SignUp />
          </>
        }
      />
      {/* // --------------------- Dashboard Route ----------------------- */}
      <Route
        index
        element={
          <>
            <PageTitle title="Questcraft Dashboard" />
            <Dashboard />
          </>
        }
      />
      {/* // --------------------- QPG Route ----------------------- */}
      <Route
        path="/qpaper/set-subject-paper"
        element={
          <>
            <PageTitle title="Set Subject Paper" />
            <SubjectPaper />
          </>
        }
      />
      <Route
        path="/qpaper/set-unit-paper"
        element={
          <>
            <PageTitle title="Add Subject" />
            <SetUnitPaper />
          </>
        }
      />
      <Route
        path="/qpaper/manage-paper"
        element={
          <>
            <PageTitle title="Add Subject" />
            <ManagePaper />
          </>
        }
      />
      <Route
        path="/qpaper/set-subject-paper/select-question"
        element={
          <>
            <PageTitle title="Select Questions" />
            <SelectQuestionPage />
          </>
        }
      />
      {/* // --------------------- Subject Route ----------------------- */}

      <Route
        path="/subject/add-subject"
        element={
          <>
            <PageTitle title="Add Subject" />
            <AddSubject />
          </>
        }
      />

      <Route
        path="/subject/manage_subject"
        element={
          <>
            <PageTitle title="Manage Subject" />
            <ManageSubject />
          </>
        }
      />

      {/* // --------------------- Unit Route ----------------------- */}

      <Route
        path="/unit/add-unit"
        element={
          <>
            <PageTitle title="Add Unit" />
            <AddUnitPage />
          </>
        }
      />

      <Route
        path="/unit/manage_unit"
        element={
          <>
            <PageTitle title="Manage Unit" />
            <ManageUnit />
          </>
        }
      />
      <Route
        path="/unit/pre-unit-page"
        element={
          <>
            <PageTitle title="Pre Unit Page" />
            <PreUnitPage />
          </>
        }
      />

      {/* // --------------------- Question Route ----------------------- */}

      <Route
        path="/question/add-question"
        element={
          <>
            <PageTitle title="Manage Question" />
            <AddQuestion />
          </>
        }
      />

      <Route
        path="/question/manage-question"
        element={
          <>
            <PageTitle title="Manage Question" />
            <ManageQuestion />
          </>
        }
      />
      <Route
        path="/question/pre-question-page"
        element={
          <>
            <PageTitle title="Manage Question" />
            <PreQuestionPage />
          </>
        }
      />
      {/* // ------------------------------------ user Routes ---------------------------- */}
      <Route
        path="/user/add-user"
        element={
          <>
            <PageTitle title="Add User" />
            <PermissionGuard requiredPermission={"createUser"}>
              <AddUser />
            </PermissionGuard>
          </>
        }
      />
      <Route
        path="/user/manage-users"
        element={
          <>
            <PageTitle title="Manage Users" />
            <UserProvider>
              <ManageUsers />
            </UserProvider>
          </>
        }
      />
      <Route
        path="/user/user-details"
        element={
          <>
            <PageTitle title="User Details" />
            <UserProvider>
              <ShowUserDetails />
            </UserProvider>
          </>
        }
      />
      <Route
        path="/user/edit-user-details"
        element={
          <>
            <PageTitle title="Edit User Details" />
            <UserProvider>
              <EditUserDetails />
            </UserProvider>
          </>
        }
      />
      {/* // ------------------------------------ Role Routes ---------------------------- */}
      <Route
        path="/role/add-role"
        element={
          <>
            <PageTitle title="Add User" />
            <AddRole />
          </>
        }
      />
      <Route
        path="/role/manage-role"
        element={
          <>
            <PageTitle title="Manage Role" />
            <RoleProvider>
              <ManageRole />
            </RoleProvider>
          </>
        }
      />
      <Route
        path="/role/edit-role-details"
        element={
          <>
            <PageTitle title="Edit Role Details" />
            <RoleProvider>
              <EditRole />
            </RoleProvider>
          </>
        }
      />

      {/* --------------------------------------Profile Route----------------------------- */}
      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="Profile " />
            <ProfilePage />
          </>
        }
      />
    </Routes>
  );
}

export default App;
