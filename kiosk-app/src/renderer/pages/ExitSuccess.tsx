// pages/ExitSuccess.tsx

import React from "react";
import HomeButton from "../components/HomeButton";
import { useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

const ExitSuccess: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">
      {/* 상단 문구 */}
      <div className="flex mt-20 text-3xl font-bold font-noto">
        오현진님 좋은 시간 보내셨나요?{" "}
      </div>

      {/* 중단 영수증 */}
      <div className="w-[60vw] max-w-[825px] mt-10 px-[1vw] py-[6vh] bg-white rounded-[20px] shadow flex-col justify-center items-center gap-[5vh] inline-flex">
        <div className="h-[7vh] p-2.5 justify-center items-center gap-2.5 inline-flex">
          <div className="w-full text-center">
            <span className="text-[#f9b812] text-[7vw] font-normal font-kaushan tracking-[0.1em]">
              Ca
            </span>
            <span className="text-black text-[7vw] font-normal font-kaushan tracking-[0.1em]">
              rtoon{" "}
            </span>
            <span className="text-[#f9b812] text-[7vw] font-normal font-kaushan tracking-[0.1em]">
              Ti
            </span>
            <span className="text-black text-[7vw] font-normal font-kaushan tracking-[0.1em]">
              me
            </span>
          </div>
        </div>
        <div className="w-full justify-between items-center inline-flex">
          <div className="w-[45%] text-center text-black text-[6vw] font-bold font-noto tracking-widest">
            이용시간
          </div>
          <div className="w-[45%] text-center text-black text-[6vw] font-bold font-noto tracking-widest">
            1시간 1분
          </div>
        </div>
        <div className="w-full pt-9 pb-[35px] bg-white border-t-4 border-[#c9c9c8] justify-center items-center inline-flex">
          <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start inline-flex">
            <div className="w-full justify-between items-center inline-flex mb-4">
              <div className="w-[45%] text-center text-black text-[4.5vw] font-normal font-noto tracking-wider">
                입실시간
              </div>
              <div className="w-[50%] text-center text-black text-[3.5vw] font-normal font-noto tracking-wide">
                2024-08-29 12:31
              </div>
            </div>
            <div className="w-full justify-between items-center inline-flex">
              <div className="w-[45%] text-center text-black text-[4.5vw] font-normal font-noto tracking-wider">
                퇴실시간
              </div>
              <div className="w-[50%] text-center text-black text-[3.5vw] font-normal font-noto tracking-wide">
                2024-08-29 13:32
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[0px] border-4 border-[#c9c9c8]"></div>
        <div className="w-full justify-between items-center inline-flex">
          <div className="w-[45%] text-center text-black text-[4.5vw] font-normal font-noto tracking-wider">
            Total
          </div>
          <div className="w-[45%] text-center text-black text-[4.5vw] font-normal font-noto tracking-wider">
            10000 원
          </div>
        </div>
      </div>

      {/* 하단 홈버튼 */}
      <div className="fixed bottom-0 left-0 w-full py-[2vh] z-10">
        <div className="w-full flex justify-center items-center">
          <button
            onClick={handleClick}
            className="px-[3vw] py-[1.7vh] bg-[#f9b812] rounded-[2vw] flex flew-row gap-[2.5vw] justify-center items-center"
          >
            <IoHomeSharp className="text-[5vw] text-white" />
            <span className="text-center text-white text-[3.5vw] font-bold font-noto tracking-wider">
              처음으로
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitSuccess;
