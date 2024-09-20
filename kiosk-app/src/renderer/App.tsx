// 메인 React 컴포넌트
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Start from "./pages/Start";
import UserVerification from "./pages/UserVerification";
import EnterProcess from "./pages/EnterProcess";
import CartoonRecommendation from "./pages/CartoonRecommendation";
import CartoonDetails from "./pages/CartoonDetails";
import ExitProcess from "./pages/ExitProcess";
import ExitSuccess from "./pages/ExitSuccess";
import ExitFailure from "./pages/ExitFailure";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/user-verification" element={<UserVerification />} />
          <Route path="/enter-loading" element={<EnterProcess />} />
          <Route
            path="/cartoon-recommendation"
            element={<CartoonRecommendation />}
          />
          <Route path="/exit-loading" element={<ExitProcess />} />
          <Route path="/exit-success" element={<ExitSuccess />} />
          <Route path="/exit-failure" element={<ExitFailure />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
