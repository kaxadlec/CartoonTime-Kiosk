// UserVerification.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms";
import { getUserIdFromUWB } from "../utils/uwbUtils";

import { getEntries } from "../api/entryLog";
import { checkIn, checkOut } from "../api/entry";

import Title from "../components/Title";
import HomeButton from "../components/HomeButton";
import PhoneFrontIcon2 from "../assets/images/png/phone-front-icon-2.png";

const UserVerification = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnter = async () => {
    setIsLoading(true); // 로딩 중임을 표시
    setError(null); // 에러 메시지 초기화

    try {
      let userId: number; // 사용자 ID
      try {
        // UWB로부터 사용자 ID를 가져옴
        userId = await getUserIdFromUWB();
      } catch (uwbError) {
        throw new Error("UWB로부터 사용자 ID를 가져오는데 실패했습니다.");
      }

      let entriesResponse; // 입퇴실 기록 조회 응답
      try {
        // 입퇴실 기록 조회
        entriesResponse = await getEntries(userId);
      } catch (entriesError) {
        throw new Error("입퇴실 기록 조회에 실패했습니다.");
      }

      if (!entriesResponse.success) {
        throw new Error(entriesResponse.message || "입퇴실 기록 조회 실패");
      }

      // 마지막 입퇴실 기록 조회
      const lastEntry = entriesResponse.data[entriesResponse.data.length - 1];
      let result;
      try {
        // 마지막 입퇴실 기록이 없거나 퇴실 처리되었을 경우 입실 처리
        if (!lastEntry || lastEntry.exitDate !== null) {
          // 입실 처리
          result = await checkIn(userId);
        } else {
          // 퇴실 처리
          result = await checkOut(userId);
        }
      } catch (checkError) {
        throw new Error("입실 또는 퇴실 처리에 실패했습니다.");
      }

      // API 호출 결과에 따라 사용자 상태 업데이트
      setUserState({
        id: userId,
        name: result.userName || "",
        currentMoney: result.currentMoney || null,
        isCurrentlyCheckedIn: result.isCheckedIn,
      });

      // 처리 완료 후 다음 페이지로 이동
      navigate("/user-status");
    } catch (error) {
      console.error("입퇴실 처리 중 오류 발생:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    navigate("/exit-loading");
  };

  return (
    <div>
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

        {/* 입실/퇴실 버튼 */}
        <div className="w-full flex justify-center items-center gap-[5vw] mt-[5vh]">
          <button
            onClick={handleEnter}
            disabled={isLoading}
            className="px-[5vw] py-[2vh] bg-[#f9b812] rounded-[2vw] text-white text-[4vw] font-bold font-noto"
          >
            {/* 입실임시버튼 */}
            {isLoading ? "처리 중..." : "입실임시버튼"}
          </button>
          <button
            onClick={handleExit}
            className="px-[5vw] py-[2vh] bg-[#f9b812] rounded-[2vw] text-white text-[4vw] font-bold font-noto"
          >
            퇴실임시버튼
          </button>
        </div>

        {/* 에러 메시지 표시 */}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
      <HomeButton />
    </div>
  );
};

export default UserVerification;
