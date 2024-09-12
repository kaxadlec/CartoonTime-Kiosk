// Start.tsx
import React from "react";
import comicIcon from "../assets/images/png/comic-icon.png";
import handTouchIcon from "../assets/images/png/hand-touch-icon.png";
import phoneBackIcon from "../assets/images/png/phone-back-icon.png";
import phoneFrontIcon from "../assets/images/png/phone-front-icon.png";

const Start: React.FC = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-kioskBackground">
      <div className="flex flex-col items-center mb-[6vh]">
        <div className="flex flex-col items-center mb-[4vh]">
          <h1 className="text-[11vw] font-medium text-center mt-[2vh] mb-[0.1vh] font-kaushan tracking-wide">
            <span className="text-[#f9b812]">Ca</span>rtoon{" "}
            <span className="text-[#f9b812]">Ti</span>me
          </h1>
          <div className="w-[80vw] h-[4.16vh] justify-center items-center gap-[0.1vw] inline-flex">
            <div className="w-[12vw] h-[0px] border-2 border-[#cdc8c8]"></div>
            <div className="w-[37.03vw] text-center text-black text-[2.5vw] font-bold font-noto tracking-wide">
              만화와 소중했던 그 시간들
            </div>
            <div className="w-[12vw] h-[0px] border-2 border-[#cdc8c8]"></div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-[0.5vh]">
            <img src={comicIcon} alt="comicIcon" className="w-[50vw] h-auto" />
          </div>
          <div className="mb-[2vh]">
            <img
              src={handTouchIcon}
              alt="handTouchIcon"
              className="w-[10vw] h-auto"
            />
          </div>
          <div className="text-center text-black text-[5vw] font-semibold font-noto tracking-normal">
            화면을 터치해서 시작하기
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-[11vw] w-full mb-[10vh]">
        <div className="relative w-[32vw] h-[36vw] px-[0.15vw] pt-[5vw] rounded-[1.5vw] border-[0.7vw] border-[#f6cf6c] flex-col justify-center items-center gap-[0.3125vw] inline-flex">
          {/* step1 박스제목*/}
          <div className="absolute -top-[5vw] left-1/2 transform -translate-x-1/2">
            <div className="w-[15vw] h-[10vw] bg-[#f9b812] rounded-2xl shadow-lg flex items-center justify-center">
              <div className="text-center text-black text-[4vw] font-medium font-grover -tracking-normal">
                STEP1
              </div>
            </div>
          </div>
          {/* 첫 번째 박스 내용 */}
          <div className="h-[7vw] p-[0.13vw] justify-center items-center gap-[0.13vw] inline-flex">
            <div className="w-[27vw] text-center">
              <span className="text-black text-[2.5vw] font-bold font-noto tracking-normal">
                Cartoon Time 앱에서{" "}
              </span>
              <span className="text-[#f9b812] text-[2.5vw] font-bold font-noto tracking-wide">
                로그인
              </span>
            </div>
          </div>
        </div>
        <div className="relative w-[32vw] h-[36vw] px-[0.15vw] pt-[5vw] rounded-[1.5vw] border-[0.7vw] border-[#f6cf6c] flex-col justify-center items-center gap-[0.3125vw] inline-flex">
          {/* step2 박스제목*/}
          <div className="absolute -top-[5vw] left-1/2 transform -translate-x-1/2">
            <div className="w-[15vw] h-[10vw] bg-[#f9b812] rounded-2xl shadow-lg flex items-center justify-center">
              <div className="text-center text-black text-[4vw] font-medium font-grover -tracking-normal">
                STEP2
              </div>
            </div>
          </div>
          {/* 두 번째 박스 내용 */}
          <div className="h-[7vw] p-[0.13vw] justify-center items-center gap-[0.13vw] inline-flex">
            <div>
              <img src={phoneBackIcon} alt="phoneBackIcon" />
              <img src={phoneFrontIcon} alt="phoneFrontIcon" />
            </div>
            <div className="w-[24vw] text-center">
              <span className="text-black text-[2.5vw] font-bold font-noto tracking-normal">
                키오스크 가까이에서{" "}
              </span>
              <span className="text-[#f9b812] text-[2.5vw] font-bold font-noto tracking-wide">
                휴대폰 돌려서 뒤집기
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
