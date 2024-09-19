// 메인 React 컴포넌트
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Start from "./pages/Start";
import UserVerification from "./pages/UserVerification";
import RecommendationLoading from "./pages/RecommendationLoading";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/user-verification" element={<UserVerification />} />
          <Route
            path="/recommendation-loading"
            element={<RecommendationLoading />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
