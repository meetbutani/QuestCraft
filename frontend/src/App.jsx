import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ContextProvider from "../../context/ContextProvider";
import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import Dashboard from "./pages/Dashboard/Dashboard";
import SubjectPaper from "./pages/QPG/SubjectPaper";
import ManageSubject from "./pages/Subject/ManageSubject";
import AddSubject from "./pages/Subject/AddSubject";
import AddUnit from "./pages/Unit/AddUnit";
import ManageQuestion from "./pages/Question/ManageQuestion";
import AddQuestion from "./pages/Question/AddQuestion";
import SetUnitPaper from "./pages/QPG/SetUnitPaper";
import ManagePaper from "./pages/QPG/ManagePaper";
import SignIn from "./pages/auth/SignIn";
import ManageUnit from "./pages/Unit/ManageUnit";
import SelectSubjectUnit from "./pages/Unit/SelectSubjectUnit";
import AddUser from "./pages/User/AddUser";
import AddRole from "./pages/Role/AddRole";
import ManageUsers from "./pages/User/ManageUsers";
import ManageRole from "./pages/Role/ManageRole";
import ProfilePage from "./pages/Profile/ProfilePage";
import { PermissionGuard } from "./components/PermissionGuard";
import EditUserDetails from "./pages/User/EditUserDetails";
import ShowUserDetails from "./pages/User/ShowUserDetails";
import EditRole from "./pages/Role/EditRoleDetails";
import EditSubject from "./pages/Subject/EditSubjectDetails";
import EditUnit from "./pages/Unit/EditUnitDetails";
import SelectQuestionForSectionA from "./pages/QPG/MidSemPaper/SelectQuestionForSectionA";
import SelectQuestionForSectionB from "./pages/QPG/MidSemPaper/SelectQuestionForSectionB";
import SelectQuestionForSectionC from "./pages/QPG/MidSemPaper/SelectQuestionForSectionC";
import MidSemPaper from "./pages/QPG/MidSemPaper/MidSemPaper";
import SelectQuestionForSectionAFinal from "./pages/QPG/FinalSemPaper/SelectQuestionForSectionAFinal";
import SelectQuestionForSectionBFinal from "./pages/QPG/FinalSemPaper/SelectQuestionForSectionBFinal";
import SelectQuestionForSectionCFinal from "./pages/QPG/FinalSemPaper/SelectQuestionForSectionCFinal";
import SelectQuestionForSectionDFinal from "./pages/QPG/FinalSemPaper/SelectQuestionForSectionDFinal";
import SelectQuestionForSectionEFinal from "./pages/QPG/FinalSemPaper/SelectQuestionForSectionEFinal";
import SelectQuestionForSectionFFinal from "./pages/QPG/FinalSemPaper/SelectQuestionForSectionFFinal";
import SelectQuestionForSectionGFinal from "./pages/QPG/FinalSemPaper/SelectQuestionForSectionGFinal";
import { ContextProvider } from "./context/ContextProvider";
import SelectSubjectQue from "./pages/Question/SelectSubjectQue";
import SelectUnitQue from "./pages/Question/SelectUnitQue";
import ShowQuestion from "./pages/Question/ShowQuestion";
import EditQuestion from "./pages/Question/EditQuestion";
import Logout from "./pages/auth/Logout";

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
        path="/logout"
        element={
          <>
            <PageTitle title="Logout" />
            <Logout />
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
      {/*------------------------------------ Mid Sem paper Route -------------------------- */}
      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-a"
        element={
          <>
            <PageTitle title="Select Questions For Section A" />
            <SelectQuestionForSectionA />
          </>
        }
      />
      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-b"
        element={
          <>
            <PageTitle title="Select Questions For Section B" />
            <SelectQuestionForSectionB />
          </>
        }
      />

      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-c"
        element={
          <>
            <PageTitle title="Select Questions For Section C" />
            <SelectQuestionForSectionC />
          </>
        }
      />

      <Route
        path="/qpaper/set-subject-paper/generate-pdf"
        element={
          <>
            <PageTitle title="Generate PDF" />
            <MidSemPaper />
          </>
        }
      />
      {/*------------------------------------ Final Sem paper Route -------------------------- */}
      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-a-final"
        element={
          <>
            <PageTitle title="Select Questions For Section A" />
            <SelectQuestionForSectionAFinal />
          </>
        }
      />

      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-b-final"
        element={
          <>
            <PageTitle title="Select Questions For Section b" />
            <SelectQuestionForSectionBFinal />
          </>
        }
      />
      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-c-final"
        element={
          <>
            <PageTitle title="Select Questions For Section C" />
            <SelectQuestionForSectionCFinal />
          </>
        }
      />
      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-d-final"
        element={
          <>
            <PageTitle title="Select Questions For Section D" />
            <SelectQuestionForSectionDFinal />
          </>
        }
      />
      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-e-final"
        element={
          <>
            <PageTitle title="Select Questions For Section E" />
            <SelectQuestionForSectionEFinal />
          </>
        }
      />
      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-f-final"
        element={
          <>
            <PageTitle title="Select Questions For Section F" />
            <SelectQuestionForSectionFFinal />
          </>
        }
      />
      <Route
        path="/qpaper/set-subject-paper/select-question-for-section-g-final"
        element={
          <>
            <PageTitle title="Select Questions For Section G" />
            <SelectQuestionForSectionGFinal />
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
            <ContextProvider>
              <ManageSubject />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/subject/edit-subject-details"
        element={
          <>
            <PageTitle title="Edit Subject Details" />
            <ContextProvider>
              <EditSubject />
            </ContextProvider>
          </>
        }
      />

      {/* // --------------------- Unit Route ----------------------- */}

      <Route
        path="/unit/add-unit"
        element={
          <>
            <PageTitle title="Add Unit" />
            <ContextProvider>
              <AddUnit />
            </ContextProvider>
          </>
        }
      />

      <Route
        path="/unit/manage-unit"
        element={
          <>
            <PageTitle title="Manage Unit" />
            <ContextProvider>
              <ManageUnit />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/unit/select-subject"
        element={
          <>
            <PageTitle title="Select Subject" />
            <ContextProvider>
              <SelectSubjectUnit />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/unit/edit-unit-details"
        element={
          <>
            <PageTitle title="Edit Unit Details" />
            <ContextProvider>
              <EditUnit />
            </ContextProvider>
          </>
        }
      />

      {/* // --------------------- Question Route ----------------------- */}

      <Route
        path="/question/add-question"
        element={
          <>
            <PageTitle title="Add Question" />
            <ContextProvider>
              <AddQuestion />
            </ContextProvider>
          </>
        }
      />

      <Route
        path="/question/manage-question"
        element={
          <>
            <PageTitle title="Manage Question" />
            <ContextProvider>
              <ManageQuestion />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/question/select-subject"
        element={
          <>
            <PageTitle title="Select Subject" />
            <ContextProvider>
              <SelectSubjectQue />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/question/select-unit"
        element={
          <>
            <PageTitle title="Select Unit" />
            <ContextProvider>
              <SelectUnitQue />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/question/show-question"
        element={
          <>
            <PageTitle title="Show Question Details" />
            <ContextProvider>
              <ShowQuestion />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/question/edit-question-details"
        element={
          <>
            <PageTitle title="Edit Question Details" />
            <ContextProvider>
              <EditQuestion />
            </ContextProvider>
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
            <ContextProvider>
              <ManageUsers />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/user/user-details"
        element={
          <>
            <PageTitle title="User Details" />
            <ContextProvider>
              <ShowUserDetails />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/user/edit-user-details"
        element={
          <>
            <PageTitle title="Edit User Details" />
            <ContextProvider>
              <EditUserDetails />
            </ContextProvider>
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
            <ContextProvider>
              <ManageRole />
            </ContextProvider>
          </>
        }
      />
      <Route
        path="/role/edit-role-details"
        element={
          <>
            <PageTitle title="Edit Role Details" />
            <ContextProvider>
              <EditRole />
            </ContextProvider>
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
