// 메인 React 컴포넌트
import React, { Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Start from "./pages/Start";
import UserVerification from "./pages/UserVerification";
import RecommendationLoading from "./pages/RecommendationLoading";
import CartoonRecommendation from "./pages/CartoonRecommendation";
import EnterSuccess from "./pages/EnterSuccess";
import ExitSuccess from "./pages/ExitSuccess";
import ExitFailure from "./pages/ExitFailure";
import CartoonDetails from "./pages/CartoonDetails";

// fcmApi 임포트
import { saveMessage } from "./api/fcmApi"; // fcmApi의 경로를 확인하세요

// 전역 타입 선언 추가
declare global {
  interface Window {
    electronAPI?: {
      apiRequest: (params: any) => Promise<any>;
    };
  }
}

const App = () => {
  const sendMessage = async (
    userId: number,
    fcmToken: string,
    content: string
  ) => {
    const senderId = `kiosk`;
    const receiverId = fcmToken;
    await saveMessage(senderId, receiverId, content);
  };

  return (
    <Router>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route
              path="/user-verification"
              element={<UserVerification sendMessage={sendMessage} />}
            />
            <Route
              path="/recommendation-loading"
              element={<RecommendationLoading />}
            />
            <Route
              path="/cartoon-recommendation"
              element={<CartoonRecommendation />}
            />
            <Route path="/enter-success" element={<EnterSuccess />} />
            <Route path="/exit-success" element={<ExitSuccess />} />
            <Route path="/exit-failure" element={<ExitFailure />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
