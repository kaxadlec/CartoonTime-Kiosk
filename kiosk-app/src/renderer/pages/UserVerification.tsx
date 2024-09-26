// UserVerification.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserIdFromUWB } from "../utils/uwbUtils";

import { getEntryExitLog } from "../api/entryExitLogApi";
import { postEntry, postExit } from "../api/entryExitPostApi";
import { getUserInfo } from "../api/userInfoApi";
import { postPayment } from "../api/payPostApi"; // 결제 API 추가

import Title from "../components/Title";
import HomeButton from "../components/HomeButton";
import PhoneFrontIcon2 from "../assets/images/png/phone-front-icon-2.png";

interface UserVerificationProps {
  sendMessage: (
    userId: number,
    fcmtoken: string,
    content: string
  ) => Promise<void>;
}

const UserVerification: React.FC<UserVerificationProps> = ({ sendMessage }) => {
  const navigate = useNavigate(); // 페이지 이동 함수
  const [isLoading, setIsLoading] = useState(false); // 로딩 중 여부
  const [error, setError] = useState<string | null>(null);

  const handleEnter = async () => {
    setIsLoading(true); // 로딩 중임을 표시
    setError(null); // 에러 메시지 초기화

    try {
      // UWB로부터 사용자 ID를 가져옴
      let userId: number; // 사용자 ID
      try {
        userId = await getUserIdFromUWB();
        console.log(`UWB로부터 사용자 ID ${userId}를 가져왔습니다.`);
      } catch (uwbError) {
        throw new Error("UWB로부터 사용자 ID를 가져오는데 실패했습니다.");
      }

      // 사용자 정보 조회
      let userInfoResponse;
      try {
        userInfoResponse = await getUserInfo(userId);
        console.log("사용자 정보 조회 결과:", userInfoResponse);
        if (!userInfoResponse.success) {
          throw new Error(userInfoResponse.message || "사용자 정보 조회 실패");
        }
      } catch (userInfoError) {
        throw new Error("사용자 정보 조회에 실패했습니다.");
      }

      // 입퇴실 기록 조회
      let entryExitLogResponse;
      try {
        // 입퇴실 기록 조회
        entryExitLogResponse = await getEntryExitLog(userId);
        console.log("입퇴실 기록 조회 결과:", entryExitLogResponse);
        if (!entryExitLogResponse.success) {
          throw new Error(
            entryExitLogResponse.message || "입퇴실 기록 조회 실패"
          );
        }
      } catch (entriesError) {
        throw new Error("입퇴실 기록 조회에 실패했습니다.");
      }

      // 마지막 입퇴실 기록 조회
      const lastLog =
        entryExitLogResponse.data[entryExitLogResponse.data.length - 1];

      let isCurrentlyCheckedIn; // 현재 입실 상태 확인
      let result; // 입퇴실 처리 결과

      try {
        // 마지막 입퇴실 기록이 없거나 퇴실 처리되었을 경우 입실 처리
        if (!lastLog || lastLog.exitDate !== null) {
          // 입실 처리
          console.log("입실 중..");
          result = await postEntry(userId);
        } else {
          // 퇴실 처리
          console.log("퇴실 중..");

          // 1. 현재 시간과 입실 시간의 차이를 분 단위로 계산
          const entryDate = new Date(lastLog.entryDate);
          const currentDate = new Date();
          const timeDifferenceInMinutes = Math.floor(
            (currentDate.getTime() - entryDate.getTime()) / 60000
          );

          // 2. 결제해야할 금액 계산 (분당 50원)
          const paymentAmount = timeDifferenceInMinutes * 50;
          console.log("결제해야할 금액:", paymentAmount);

          // 3. 현재 잔액과 결제 금액 비교
          // 잔액이 부족하면
          if (userInfoResponse.data.currentMoney < paymentAmount) {
            console.log("잔액 부족: 결제 금액보다 현재 잔액이 적습니다.");

            const currentTime = new Date(); // 현재 시간을 구함 (퇴실하려고 하는 시간)
            const exitFailureUserData: {
              id: number;
              name: string;
              currentMoney: number;
              entryDate: string; // entryDate는 string으로 지정
              exitDate: Date | null; // exitDate는 Date 또는 null을 허용
              attemptedExitTime: Date; // 시도한 퇴실 시간
              fee: number;
            } = {
              id: userId,
              name: userInfoResponse.data.name,
              currentMoney: userInfoResponse.data.currentMoney,
              entryDate: lastLog.entryDate, // string 형식의 날짜
              exitDate: null, // 아직 퇴실하지 않음, 명시적으로 null 설정
              attemptedExitTime: currentTime, // 현재 시간
              fee: paymentAmount, // 결제 금액
            };

            // fcm 메시지 전송 (결제해야할 금액 전송 조건)
            await sendMessage(
              userId,
              userInfoResponse.data.fcmtoken,
              `${exitFailureUserData.fee}원`
            );
            // 실패 페이지로 이동
            navigate("/exit-failure", { state: { user: exitFailureUserData } });

            return; // 퇴실 처리 중단
          }

          // 4. 결제 금액이 충분할 경우 퇴실 처리
          result = await postExit(userId);
        }
        console.log("입/퇴실 처리 결과:", result);

        if (result.success) {
          if (result.message === "입실하셨습니다.") {
            isCurrentlyCheckedIn = true;
            console.log("입실 처리 완료");
            await sendMessage(userId, userInfoResponse.data.fcmtoken, "입퇴실"); // fcm 메시지 전송 (입퇴실이라는 단어 조건)
          } else if (result.message === "퇴실하셨습니다.") {
            isCurrentlyCheckedIn = false;
            console.log("퇴실 처리 완료");
            await sendMessage(userId, userInfoResponse.data.fcmtoken, "입퇴실"); // fcm 메시지 전송 (입퇴실이라는 단어 조건)
          } else {
            console.log("예상치 못한 메시지:", result.message);
            throw new Error("예상치 못한 서버 응답");
          }
        } else {
          throw new Error(result.error || "입/퇴실 처리 실패");
        }
      } catch (checkError) {
        throw new Error("입실 또는 퇴실 처리에 실패했습니다.");
      }

      // 입퇴실 처리 결과에 따라 다음 페이지로 이동
      if (isCurrentlyCheckedIn) {
        const entryUserData = {
          id: userId,
          name: userInfoResponse.data.name,
        };
        navigate("/enter-success", { state: { user: entryUserData } });
      } else {
        // 퇴실 후 결제 처리
        try {
          console.log("결제 중...");
          const paymentResponse = await postPayment(userId, result.data.fee);
          console.log("결제 결과:", paymentResponse);
          if (!paymentResponse.success) {
            throw new Error("결제 실패: " + paymentResponse.message);
          }

          // 결제 성공 시 사용자 정보 출력
          const exitUserData = {
            id: userId,
            name: userInfoResponse.data.name,
            currentMoney: paymentResponse.data.currentMoney,
            entryDate: result.data.entryDate,
            exitDate: result.data.exitDate,
            fee: result.data.fee,
          };

          console.log("퇴실 처리 후 사용자 정보:", exitUserData);
          navigate("/exit-success", { state: { user: exitUserData } });
        } catch (paymentError) {
          console.error("결제 중 오류 발생:", paymentError);
          setError(
            paymentError instanceof Error
              ? paymentError.message
              : "결제 중 알 수 없는 오류가 발생했습니다."
          );
        }
      }
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

  return (
    <div>
      <Title /> {/* Title 컴포넌트 사용 */}
      <div className="mt-[1vh] mb-[10vh]">
        {/* 상단 제목 */}
        <div className="w-full mb-[3vw]">
          <div className="self-stretch p-[0.13vw] flex justify-center items-center">
            <div className="text-center text-black text-[6vw] font-bold font-noto tracking-wide">
              키오스크 인증
            </div>
          </div>
        </div>

        {isLoading ? (
          // 입퇴실 처리 중일 때
          <div className="w-full mb-[3vw] flex flex-col items-center justify-center h-[60vw]">
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
              잠시만 기다려주세요.
            </div>
          </div>
        ) : (
          // 입퇴실 처리 중이 아닐 때
          <>
            <div className="w-full mb-[3vw] flex flex-col items-center justify-center h-[60vw]">
              {/* 안내 문구 */}
              <div className="self-stretch p-[0.13vw]">
                <div className="text-center text-black text-[3.5vw] font-medium font-noto tracking-normal">
                  앱에서 로그인 후<br />
                  키오스크 가까이에서 <br />
                  휴대폰을 뒤집어주세요.
                </div>
              </div>
              {/* 이미지 */}
              <div>
                <img
                  src={PhoneFrontIcon2}
                  alt="PhoneFrontIcon2"
                  className="w-[50vw] h-auto"
                />
              </div>
            </div>
            <HomeButton />
          </>
        )}

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

        {/* 입퇴실임시버튼 */}
        <div className="w-full flex justify-center items-center gap-[5vw] mt-[5vh]">
          <button
            onClick={handleEnter}
            disabled={isLoading}
            className="px-[5vw] py-[2vh] bg-neutral-700 rounded-[2vw] text-white text-[4vw] font-bold font-noto"
          >
            UWB 통신 전 임시 입퇴실 버튼
          </button>
        </div>

        {/* 에러 메시지 표시 */}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default UserVerification;
