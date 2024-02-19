import "react";

// import "./App.css";
import IntroPage from "./components/IntroPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<IntroPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
