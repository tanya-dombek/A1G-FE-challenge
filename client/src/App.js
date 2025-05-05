import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/success" element={<SuccessPage />}/>
      </Routes>
    </div>
  );
}

  export default App;