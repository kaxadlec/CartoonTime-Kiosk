// components/UserStatus.tsx

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Title from "../components/Title";

const EnterSuccess: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cartoon-recommendation", { state: { user: user } });
    }, 4000); // 4초 후 이동

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate, user]);

  if (!user) {
    return <div>유저 불러오는 중</div>;
  }

  return (
    <div>
      <Title />
      <div>
        <div className="self-stretch p-[0.13vw] flex flex-col justify-center items-center mt-[1vh]">
          <div className="text-center text-black text-[5vw] font-bold font-noto tracking-normal mb-[1.6vh]">
            {`${user.name}님 안녕하세요! 입실이 완료되었습니다.`}
          </div>
          <div className="text-center text-black text-[3vw] font-medium font-noto tracking-normal mb-[20vh]">
            Cartoon Time은 당신에게 <br />
            고민이 필요없는 휴식시간을 제공합니다.
          </div>
          {/* 로딩 애니메이션 */}
          <div className="mb-[10vh]">
            <svg
              className="loading-spinner"
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" />
            </svg>
          </div>
          <div className="text-center text-black text-[4.5vw] font-bold font-noto tracking-wide">
            당신의 취향에 맞는 만화 추천 중입니다.
          </div>
        </div>
      </div>
      <HomeButton />
    </div>
  );
};

export default EnterSuccess;
