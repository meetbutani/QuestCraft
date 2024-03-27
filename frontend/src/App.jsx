import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard/Dashboard';

import SubjectPaper from './pages/QPG/SubjectPaper';
import CoursePage from './pages/Courses/CoursePage';

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
    <>
      <Routes>
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
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {/* <Calendar /> */}
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
          path='/courses'
          element={
            <>
              <PageTitle title="Courses" />
              <CoursePage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
