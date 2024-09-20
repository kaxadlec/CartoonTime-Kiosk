// EnterProcess.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import HomeButton from "../components/HomeButton";

const EnterProcess: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cartoon-recommendation");
  };

  return (
    <div>
      <Title />
      <div onClick={handleClick}>
        <div className="self-stretch p-[0.13vw] flex flex-col justify-center items-center mt-[1vh]">
          <div className="text-center text-black text-[4vw] font-bold  font-noto tracking-normal mb-[1.6vh]">
            오현진님 안녕하세요!
          </div>
          <div className="text-center text-black text-[2vw] font-medium font-noto tracking-normal mb-[20vh]">
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
            당신의 취향에 맞는 만화 추천 중
          </div>
        </div>
      </div>
      <HomeButton />
    </div>
  );
};

export default EnterProcess;
