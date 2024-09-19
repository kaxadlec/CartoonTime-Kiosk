// UserVerification.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import HomeButton from "../components/HomeButton";
import PhoneFrontIcon2 from "../assets/images/png/phone-front-icon-2.png";

const UserVerification = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/recommendation-loading");
  };

  return (
    <div onClick={handleClick}>
      <Title /> {/* Title 컴포넌트 사용 */}
      <div className="mt-[1vh] mb-[10vh]">
        {/* 상단 문구 */}
        <div className="w-full flex flex-col justify-start items-start gap-[3vw]">
          <div className="self-stretch p-[0.13vw] flex justify-center items-center">
            <div className="text-center text-black text-[6vw] font-bold font-noto tracking-wide">
              키오스크 인증
            </div>
          </div>
          <div className="self-stretch p-[0.13vw] flex justify-center items-center">
            <div className="text-center text-black text-[3.5vw] font-medium font-noto tracking-normal">
              앱에서 로그인 후<br />
              키오스크 가까이에서 <br />
              휴대폰을 뒤집어주세요.
            </div>
          </div>
        </div>
        {/* 이미지 */}
        <div className="flex flex-col items-center">
          <div className="mb-[0.5vh]">
            <img
              src={PhoneFrontIcon2}
              alt="PhoneFrontIcon2"
              className="w-[50vw] h-auto"
            />
          </div>
        </div>
        {/* 하단 문구 */}
        <div className="w-full h-[14.79vw] p-[0.13vw] flex justify-center items-center">
          <div className="w-full text-center text-[3vw] font-bold font-noto tracking-wide">
            <span className="text-black">Cartoon Time에서는 </span>
            <span className="text-[#f9b812] font-black">UWB</span>
            <span className="text-black">
              {" "}
              기술을 이용하여
              <br />{" "}
            </span>
            <span className="text-[#f9b812] font-black">
              간편 본인 인증/결제
            </span>
            <span className="text-black">와 </span>
            <span className="text-[#f9b812] font-black">
              만화책 위치찾기 서비스
            </span>
            <span className="text-black">를 제공합니다.</span>
          </div>
        </div>
      </div>
      <HomeButton />
    </div>
  );
};

export default UserVerification;
