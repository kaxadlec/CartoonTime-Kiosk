// 메인 React 컴포넌트
import React, { Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { getAuth, signInAnonymously } from "firebase/auth";

import Layout from "./components/Layout";
import Start from "./pages/Start";
import UserVerification from "./pages/UserVerification";
import CartoonRecommendation from "./pages/CartoonRecommendation";
import EnterSuccess from "./pages/EnterSuccess";
import ExitSuccess from "./pages/ExitSuccess";
import ExitFailure from "./pages/ExitFailure";

// fcmApi 임포트
import { saveMessage } from "./api/fcmApi";

// 전역 타입 선언 추가
declare global {
  interface Window {
    electronAPI?: {
      apiRequest: (params: any) => Promise<any>;
    };
  }
}

const App = () => {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        setUid(user.uid);
        console.log(`${user.uid} 익명으로 로그인되었습니다.`);
      })
      .catch((error) => {
        console.error("익명 로그인 실패:", error);
      });
  }, []);

  const sendMessage = async (
    userId: number,
    fcmtoken: string,
    content: string
  ) => {
    const senderId = `kiosk`;
    const receiverId = fcmtoken;
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
