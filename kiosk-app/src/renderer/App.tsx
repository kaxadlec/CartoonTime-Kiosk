// 메인 React 컴포넌트
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Layout from "./components/Layout";
import Start from "./pages/Start";
import UserVerification from "./pages/UserVerification";
import EnterProcess from "./pages/EnterProcess";
import CartoonRecommendation from "./pages/CartoonRecommendation";
import UserStatus from "./pages/UserStatus";
import CartoonDetails from "./pages/CartoonDetails";
import ExitProcess from "./pages/ExitProcess";
import ExitSuccess from "./pages/ExitSuccess";
import ExitFailure from "./pages/ExitFailure";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/user-verification" element={<UserVerification />} />
              <Route path="/enter-loading" element={<EnterProcess />} />
              <Route
                path="/cartoon-recommendation"
                element={<CartoonRecommendation />}
              />
              <Route path="/user-status" element={<UserStatus />}></Route>
              <Route path="/exit-loading" element={<ExitProcess />} />
              <Route path="/exit-success" element={<ExitSuccess />} />
              <Route path="/exit-failure" element={<ExitFailure />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </RecoilRoot>
  );
};

export default App;
