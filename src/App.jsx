import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./containers/HomeComponent";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="container">
        <Routes>
          <Route path="*" element={<HomeComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
