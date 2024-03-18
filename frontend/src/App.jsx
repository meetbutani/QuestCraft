import "react";

// import "./App.css";
import IntroPage from "./components/IntroPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Layout from "./components/shared/Layout";
import Product from "./components/Product";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/layout" element={<Layout />}>
        <Route path="/layout/dashboard" element={<Dashboard />} />
        <Route path="/layout/product" element={<Product />} /> 
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
