// pages/ExitSuccess.tsx

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { saveMessage } from "../api/fcmApi"; // fcmApi에서 saveMessage 함수를 import

// 날짜 변환 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// 이용시간 계산 함수
const calculateUsageTimeFromFormattedStrings = (
  entryDateStr: string,
  exitDateStr: string
) => {
  // 문자열을 Date 객체로 변환 (형식: YYYY-MM-DD HH:mm)
  const entry = new Date(entryDateStr);
  const exit = new Date(exitDateStr);

  const differenceInMs = exit.getTime() - entry.getTime(); // 밀리초 차이
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60)); // 분 단위로 변환

  const hours = Math.floor(differenceInMinutes / 60); // 시간
  const minutes = differenceInMinutes % 60; // 분

  // 최소 1분으로 표시하거나 1분 미만일 경우 처리
  if (hours === 0 && minutes === 0) {
    return `1분`;
  }

  // 기본적인 시간과 분 출력
  return `${hours}시간 ${minutes}분`;
};

const ExitSuccess: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const [timeLeft, setTimeLeft] = useState(10); // 10초 타이머 초기값

  // 페이지가 렌더링된 후 10초 뒤에 자동으로 홈으로 이동
  // 타이머를 설정하는 useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000); // 1초마다 업데이트

    if (timeLeft === 0) {
      navigate("/"); // 타이머가 0이 되면 홈으로 이동
    }

    // 컴포넌트가 언마운트되면 타이머를 정리
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  // 안드로이드 폰에 퇴실 메시지 전송
  useEffect(() => {
    const sendExitMessage = async () => {
      if (user) {
        try {
          await saveMessage("kiosk", user.fcmToken, "입퇴실");
          console.log("퇴실 메시지 전송 완료");
        } catch (error) {
          console.error("퇴실 메시지 전송 실패:", error);
        }
      }
    };

    sendExitMessage();
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      {/* 상단 문구 */}
      <div className="flex mt-[18vw] text-3xl font-bold font-noto">
        {`${user.name}님 좋은 시간 보내셨나요?`}
      </div>

      {/* 중단 영수증 */}
      <div className="w-[53vw] mt-[12vw] px-[3vw] pt-[3vh] pb-[6vh] bg-white rounded-xl shadow-lg flex flex-col justify-center items-center gap-[3vh]">
        <div className="w-10/12 text-center text-[6vw] font-normal mb-[1vh] font-kaushan">
          <span className="text-[#f9b812]">Ca</span>
          <span className="text-black">rtoon </span>
          <span className="text-[#f9b812]">Ti</span>
          <span className="text-black">me</span>
        </div>
        <div className="w-10/12 flex justify-between items-center">
          <div className="text-left text-black text-[3.5vw] font-bold font-noto">
            이용시간
          </div>
          <div className="text-right text-black text-[3.5vw] font-bold font-noto">
            {calculateUsageTimeFromFormattedStrings(
              formatDate(user.entryDate),
              formatDate(user.exitDate)
            )}
          </div>
        </div>
        <div className="w-10/12 pt-[2vh] pb-[2vh] border-t border-b border-[#c9c9c8]">
          <div className="w-full flex justify-between items-center mb-[1vh]">
            <div className="text-left text-black text-[3vw] font-normal font-noto">
              입실시간
            </div>
            <div className="text-right text-black text-[2.5vw] font-normal font-noto">
              {formatDate(user.entryDate)}
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="w-[40%] text-left text-black text-[3vw] font-normal font-noto">
              퇴실시간
            </div>
            <div className="w-[60%] text-right text-black text-[2.5vw] font-normal font-noto">
              {formatDate(user.exitDate)}
            </div>
          </div>
        </div>
        <div className="w-10/12 flex justify-between items-center mt-[0.1vh]">
          <div className="w-[40%] text-left text-black text-[3vw] font-bold font-noto">
            결제 포인트
          </div>
          <div className="w-[60%] text-right text-black text-[3.5vw] font-bold font-noto">
            {user.fee}
          </div>
        </div>
      </div>

      {/* 하단 홈버튼 */}
      <div className="fixed bottom-0 left-0 w-full py-[2vh] z-10">
        {/* 10초 뒤에 처음화면으로 넘어갑니다 문구 */}
        <div className="w-full flex justify-center items-center mb-[2vh]">
          <span className="text-center text-black text-[3vw] font-bold font-noto">
            {`${timeLeft}초 뒤에 처음화면으로 넘어갑니다.`}
          </span>
        </div>

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
