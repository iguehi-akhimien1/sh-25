import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.tsx";
import Features from "./Features";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
