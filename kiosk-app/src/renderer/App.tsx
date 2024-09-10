// 메인 React 컴포넌트
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
      </Routes>
    </Router>
  );
};

export default App;
