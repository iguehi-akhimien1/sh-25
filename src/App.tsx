import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Features from "./Features";
import GroceryList from "./GroceryList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/grocery-list" element={<GroceryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
