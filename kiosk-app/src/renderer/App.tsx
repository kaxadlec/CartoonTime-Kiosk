// 메인 React 컴포넌트
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import { apiBaseUrlState } from "./store/atoms";

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

// 전역 타입 선언 추가
declare global {
  // 전역 객체 window에 electronAPI 속성 추가
  interface Window {
    electronAPI?: {
      updateEnv: (callback: (event: any, value: any) => void) => void;
    };
  }
}

const AppContent = () => {
  // API_BASE_URL 상태를 저장하는 atom의 setter 함수
  const apiBaseUrl = useRecoilValue(apiBaseUrlState);
  const setApiBaseUrl = useSetRecoilState(apiBaseUrlState);

  // API_BASE_URL을 렌더러 프로세스에서 받아와 Recoil 상태에 저장
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.updateEnv((event, env) => {
        console.log("env API_BASE_URL:", env.API_BASE_URL);
        setApiBaseUrl(env.API_BASE_URL);
      });
    } else {
      console.error("window.electronAPI 객체가 존재하지 않습니다.");
    }
  }, [setApiBaseUrl]);

  useEffect(() => {
    console.log("Recoil 안의 apiBaseUrl:", apiBaseUrl);
  }, [apiBaseUrl]);

  return (
    <Router>
      <Layout>
        <Suspense fallback={null}>
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
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
};

export default App;
