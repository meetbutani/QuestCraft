import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "../common/Loader";
import PageTitle from "../components/PageTitle";
import Dashboard from "../pages/Dashboard/Dashboard";
import SubjectPaper from "../pages/QPG/SubjectPaper";
import ManageSubject from "../pages/Subject/ManageSubject";
import AddSubject from "../pages/Subject/AddSubject";
import AddUnit from "../pages/Unit/AddUnit";
import ManageQuestion from "../pages/Question/ManageQuestion";
import AddQuestion from "../pages/Question/AddQuestion";
import SetUnitPaper from "../pages/QPG/SetUnitPaper";
import ManagePaper from "../pages/QPG/ManagePaper";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import ManageUnit from "../pages/Unit/ManageUnit";
import SelectSubjectUnit from "../pages/Unit/SelectSubjectUnit";
import PreQuestionPage from "../pages/Question/PreQuestionPage";
import AddUser from "../pages/User/AddUser";
import AddRole from "../pages/Role/AddRole";
import ManageUsers from "../pages/User/ManageUsers";
import ManageRole from "../pages/Role/ManageRole";
import ProfilePage from "../pages/Profile/ProfilePage";
import { PermissionGuard } from "../components/PermissionGuard";
import EditUserDetails from "../pages/User/EditUserDetails";
import ShowUserDetails from "../pages/User/ShowUserDetails";
import { UserProvider } from "../context/UserContext";
import EditRole from "../pages/Role/EditRoleDetails";
import { RoleProvider } from "../context/RoleContext";
import SelectQuestionPage from "../pages/QPG/SelectQuestionPage";
import { SubjectProvider } from "../context/SubjectContext";
import EditSubject from "../pages/Subject/EditSubjectDetails";
import { UnitProvider } from "../context/UnitContext";
import EditUnit from "../pages/Unit/EditUnitDetails";
import SelectSubjectQue from "../pages/Question/SelectSubjectQue";
import SelectUnitQue from "../pages/Question/SelectUnitQue";
import ShowQuestion from "../pages/Question/ShowQuestion";
import EditQuestion from "../pages/Question/EditQuestion";
import { QuestionProvider } from "../context/QuestionContext";

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
      {/* <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Sign Up" />
            <SignUp />
          </>
        }
      /> */}
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
        path="/subject/manage-subject"
        element={
          <>
            <PageTitle title="Manage Subject" />
            <SubjectProvider>
              <ManageSubject />
            </SubjectProvider>
          </>
        }
      />
      <Route
        path="/subject/edit-subject-details"
        element={
          <>
            <PageTitle title="Edit Subject Details" />
            <SubjectProvider>
              <EditSubject />
            </SubjectProvider>
          </>
        }
      />

      {/* // --------------------- Unit Route ----------------------- */}

      <Route
        path="/unit/add-unit"
        element={
          <>
            <PageTitle title="Add Unit" />
            <UnitProvider>
              <AddUnit />
            </UnitProvider>
          </>
        }
      />

      <Route
        path="/unit/manage-unit"
        element={
          <>
            <PageTitle title="Manage Unit" />
            <UnitProvider>
              <ManageUnit />
            </UnitProvider>
          </>
        }
      />
      <Route
        path="/unit/select-subject"
        element={
          <>
            <PageTitle title="Select Subject" />
            <UnitProvider>
              <SelectSubjectUnit />
            </UnitProvider>
          </>
        }
      />
      <Route
        path="/unit/edit-unit-details"
        element={
          <>
            <PageTitle title="Edit Unit Details" />
            <UnitProvider>
              <EditUnit />
            </UnitProvider>
          </>
        }
      />

      {/* // --------------------- Question Route ----------------------- */}

      <Route
        path="/question/add-question"
        element={
          <>
            <PageTitle title="Add Question" />
            <QuestionProvider>
              <AddQuestion />
            </QuestionProvider>
          </>
        }
      />

      <Route
        path="/question/manage-question"
        element={
          <>
            <PageTitle title="Manage Question" />
            <QuestionProvider>
              <ManageQuestion />
            </QuestionProvider>
          </>
        }
      />
      <Route
        path="/question/select-subject"
        element={
          <>
            <PageTitle title="Select Subject" />
            <QuestionProvider>
              <SelectSubjectQue />
            </QuestionProvider>
          </>
        }
      />
      <Route
        path="/question/select-unit"
        element={
          <>
            <PageTitle title="Select Unit" />
            <QuestionProvider>
              <SelectUnitQue />
            </QuestionProvider>
          </>
        }
      />
      <Route
        path="/question/show-question"
        element={
          <>
            <PageTitle title="Show Question Details" />
            <QuestionProvider>
              <ShowQuestion />
            </QuestionProvider>
          </>
        }
      />
      <Route
        path="/question/edit-question-details"
        element={
          <>
            <PageTitle title="Edit Question Details" />
            <QuestionProvider>
              <EditQuestion />
            </QuestionProvider>
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
