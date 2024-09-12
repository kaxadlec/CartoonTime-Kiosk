import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import HomeButton from "../components/HomeButton";

const UserVerification = () => {
  return (
    <div>
      <Title /> {/* Title 컴포넌트 사용 */}
      {/* 유저 인증 관련 나머지 내용 */}
      <div className="mt-[10vh] mb-[10vh]">
        {/* 여기에 유저 인증 폼이나 다른 내용을 추가하세요 */}
        <h2 className="flex text-center text-[7vw] font-bold">
          사용자 인증 화면입니다.
        </h2>
        {/* 추가 인증 로직 */}
      </div>
      <HomeButton />
    </div>
  );
};

export default UserVerification;
