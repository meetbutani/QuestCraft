import "react";

// import "./App.css";
import IntroPage from "./components/IntroPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<IntroPage />} />
        <Route path="/register" element={<IntroPage />} />
      </Routes>
    </Router>
  );
}

export default App;
