import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard/Dashboard';

import SubjectPaper from './pages/QPG/SubjectPaper';
import CoursePage from './pages/Courses/CoursePage';
import ManageSubject from './pages/Subject/ManageSubject';
import AddSubject from './pages/Subject/AddSubject';
import AddUnitPage from './pages/Unit/AddUnitPage';
import ManageQuestion from './pages/Question/ManageQuestion';
import AddQuestion from './pages/Question/AddQuestion';
import SetUnitPaper from './pages/QPG/SetUnitPaper';
import ManagePaper from './pages/QPG/ManagePaper';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

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
    <Routes>
      <Route
        path='/auth/signin'
        element={
          <>
            <PageTitle title="Sign In" />
            <SignIn />
          </>
        }
      />
      <Route
        path='/auth/signup'
        element={
          <>
            <PageTitle title="Sign Up" />
            <SignUp />
          </>
        }
      />
      <Route
        index
        element={
          <>
            <PageTitle title="Questcraft Dashboard" />
            <Dashboard />
          </>
        }
      />
      <Route
        path='/qpaper/set-subject-paper'
        element={
          <>
            <PageTitle title="Set Subject Paper" />
            <SubjectPaper />
          </>
        }
      />

      <Route
        path='/qpaper/set-unit-paper'
        element={
          <>
            <PageTitle title="Add Subject" />
            <SetUnitPaper />
          </>
        }
      />

      <Route
        path='/qpaper/manage-paper'
        element={
          <>
            <PageTitle title="Add Subject" />
            <ManagePaper />
          </>
        }
      />

      <Route
        path='/courses'
        element={
          <>
            <PageTitle title="Courses" />
            <CoursePage />
          </>
        }
      />

      <Route
        path='/subject/add-subject'
        element={
          <>
            <PageTitle title="Add Subject" />
            <AddSubject />
          </>
        }
      />

      <Route
        path='/subject/add-subject-unit'
        element={
          <>
            <PageTitle title="Add Unit" />
            <AddUnitPage />
          </>
        }
      />

      <Route
        path='/question/add-question'
        element={
          <>
            <PageTitle title="Manage Question" />
            <AddQuestion />
          </>
        }
      />


      <Route
        path='/subject/manage_subject'
        element={
          <>
            <PageTitle title="Manage Subject" />
            <ManageSubject />
          </>
        }
      />

      <Route
        path='/question/set-question'
        element={
          <>
            <PageTitle title="Manage Question" />
            <ManageQuestion />
          </>
        }
      />

      <Route
        path='/question/manage-question'
        element={
          <>
            <PageTitle title="Manage Question" />
            <ManageQuestion />
          </>
        }
      />
    </Routes>
  );
}

export default App;
