import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import ProductsComponent from "./containers/ProductsComponent";
import StockComponent from "./containers/StockComponent";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="container">
        <Routes>
          <Route path="*" element={<ProductsComponent />} />
          <Route path="/products" element={<ProductsComponent />} />
          <Route path="/stock" element={<StockComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
