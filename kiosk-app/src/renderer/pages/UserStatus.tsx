// components/UserStatus.tsx

import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userStatusSelector } from "../store/userState";
import { useNavigate } from "react-router-dom";

const UserStatus: React.FC = () => {
  const userStatus = useRecoilValue(userStatusSelector);

  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/enter-loading");
  };

  useEffect(() => {
    console.log("User Status:", userStatus);
  }, [userStatus]);

  if (!userStatus) {
    return <div>Loading user status...</div>;
  }

  return (
    <div className="flex justify-center flex-col gap-8">
      <div className="text-4xl">
        <p>User ID: {userStatus.userId}</p>
      </div>
      <button
        onClick={handleEnter}
        className="px-[5vw] py-[2vh] bg-[#f9b812] rounded-[2vw] text-white text-[4vw] font-bold font-noto"
      >
        만화추천
      </button>
    </div>
  );
};

export default UserStatus;
