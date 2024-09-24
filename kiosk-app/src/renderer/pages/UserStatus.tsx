// components/UserStatus.tsx

import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userStatusSelector } from "../store/userState";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";

const UserStatus: React.FC = () => {
  const userStatus = useRecoilValue(userStatusSelector);
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/enter-loading");
  };

  if (!userStatus) {
    return <div>Loading user status...</div>;
  }

  return (
    <div className="flex justify-center flex-col items-center gap-8 p-6">
      <h1 className="text-4xl font-bold mb-4">사용자 상태</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <p className="font-bold text-xl mb-2">사용자 ID:</p>
          <p className="text-gray-700 text-lg">{userStatus.id}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl mb-2">이름:</p>
          <p className="text-gray-700 text-lg">
            {userStatus.name || "이름 없음"}
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl mb-2">현재 잔액:</p>
          <p className="text-gray-700 text-lg">
            {userStatus.currentMoney !== null
              ? `${userStatus.currentMoney.toLocaleString()}원`
              : "정보 없음"}
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl mb-2">입실 상태:</p>
          <p
            className={`text-lg ${
              userStatus.isCurrentlyCheckedIn
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {userStatus.isCurrentlyCheckedIn ? "입실 중" : "퇴실 상태"}
          </p>
        </div>
      </div>
      <button
        onClick={handleEnter}
        className="px-[5vw] py-[2vh] bg-[#f9b812] rounded-[2vw] text-white text-[4vw] font-bold font-noto hover:bg-[#e0a610] transition-colors"
      >
        만화 추천 받기
      </button>

      <HomeButton />
    </div>
  );
};

export default UserStatus;
