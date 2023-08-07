import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
