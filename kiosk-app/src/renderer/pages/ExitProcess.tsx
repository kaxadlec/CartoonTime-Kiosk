// pages/ExitProcess.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const ExitProcess: React.FC = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isClicked) {
        navigate("/exit-success");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isClicked, navigate]);

  const handleClick = () => {
    setIsClicked(true);
    navigate("/exit-failure");
  };

  return (
    <div>
      <Title />
      <div onClick={handleClick}>
        <div className="self-stretch p-[0.13vw] flex flex-col justify-center items-center mt-[1vh]">
          <div className="text-center text-black text-[4vw] font-bold font-noto tracking-normal mb-[1.6vh]">
            오현진님 안녕히가세요.
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
            퇴실 진행 중 입니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitProcess;
