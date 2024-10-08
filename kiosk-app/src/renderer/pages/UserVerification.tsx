// UserVerification.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getEntryExitLog } from "../api/entryExitLogApi";
import { postEntry, postExit } from "../api/entryExitPostApi";
import { getUserInfo } from "../api/userInfoApi";
import { postPayment } from "../api/payPostApi"; // 결제 API 추가
// fcmApi 임포트
import {
  saveMessage,
  listenForMessages,
  removeMessageListener,
} from "../api/fcmApi";

import Title from "../components/Title";
import HomeButton from "../components/HomeButton";
import VerificationIcon from "../assets/images/png/verification-icon.png";

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
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const hasRun = useRef(false); // useEffect가 최초 실행됐는지 여부
  const [isMessageSending, setIsMessageSending] = useState(false);

  useEffect(() => {
    const sendBleServerOnMessage = async () => {
      if (hasRun.current) return; // 이미 실행됐다면 return
      hasRun.current = true; // 실행 표시

      setIsMessageSending(true);
      setError(null);
      try {
        await saveMessage("kiosk", "module", "bleServerOn");
        console.log("bleServerOn 요청 전송 완료");
      } catch (error) {
        console.error("BLE 서버 켜기 메시지 전송 실패:", error);
        setError("bleServerOn 요청 실패");
      } finally {
        // 메시지 전송의 성공 여부와 상관없이, 메시지 전송 상태를 false로 설정하여 전송이 완료되었음을 명확히 합니다
        setIsMessageSending(false);
      }
    };

    sendBleServerOnMessage(); // BLE 서버 켜기 메시지 전송 함수 호출
    listenForMessages(handleMessageReceived); // 메시지 리스닝 시작

    return () => {
      // cleanup 로직이 필요하다면 여기에 작성
      removeMessageListener(); // 메시지 리스닝 종료
    };
  }, []);

  // 메시지 수신 시 처리 함수
  const handleMessageReceived = async (message: any) => {
    console.log("새 메시지 수신: ", message);
    if (message.content && !isNaN(message.content)) {
      const receivedUserId = message.content;
      console.log("module, firebase에서 수신한 userId:", receivedUserId);
      // setUserId(receivedUserId);
      await handleUserVerification(receivedUserId);
    }
  };

  // 임시 입퇴실 버튼 클릭 시
  const handleButtonClick = () => {
    handleUserVerification(3).catch((error) => {
      console.error("User verification failed:", error);
      setError("사용자 확인에 실패했습니다.");
    });
  };

  const handleUserVerification = async (receivedUserId: number) => {
    setIsLoading(true); // 로딩 중임을 표시
    setError(null); // 에러 메시지 초기화

    try {
      // 사용자 정보 조회
      let userInfoResponse;
      try {
        userInfoResponse = await getUserInfo(receivedUserId);
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
        entryExitLogResponse = await getEntryExitLog(receivedUserId);
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
          result = await postEntry(receivedUserId);
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
              id: receivedUserId,
              name: userInfoResponse.data.name,
              currentMoney: userInfoResponse.data.currentMoney,
              entryDate: lastLog.entryDate, // string 형식의 날짜
              exitDate: null, // 아직 퇴실하지 않음, 명시적으로 null 설정
              attemptedExitTime: currentTime, // 현재 시간
              fee: paymentAmount, // 결제 금액
            };

            // fcm 메시지 전송 (결제해야할 금액 전송 조건)
            await sendMessage(
              receivedUserId,
              userInfoResponse.data.fcmtoken,
              `${exitFailureUserData.fee}원`
            );

            // 실패 페이지로 이동
            navigate("/exit-failure", { state: { user: exitFailureUserData } });

            return; // 퇴실 처리 중단
          }

          // 4. 결제 금액이 충분할 경우 퇴실 처리
          result = await postExit(receivedUserId);
        }
        console.log("입/퇴실 처리 결과:", result);

        if (result.success) {
          if (result.message === "입실하셨습니다.") {
            isCurrentlyCheckedIn = true;
            console.log("입실 처리 완료");
            // fcm 메시지 전송 (입퇴실이라는 단어 조건)
            await sendMessage(
              receivedUserId,
              userInfoResponse.data.fcmtoken,
              "입퇴실"
            );
          } else if (result.message === "퇴실하셨습니다.") {
            isCurrentlyCheckedIn = false;
            console.log("퇴실 처리 완료");
            // fcm 메시지 전송 (입퇴실이라는 단어 조건)
            await sendMessage(
              receivedUserId,
              userInfoResponse.data.fcmtoken,
              "입퇴실"
            );
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
          id: receivedUserId,
          name: userInfoResponse.data.name,
          token: userInfoResponse.data.fcmtoken,
        };
        navigate("/enter-success", { state: { user: entryUserData } });
      } else {
        // 퇴실 후 결제 처리
        try {
          console.log("결제 중...");
          const paymentResponse = await postPayment(
            receivedUserId,
            result.data.fee
          );
          console.log("결제 결과:", paymentResponse);
          if (!paymentResponse.success) {
            throw new Error("결제 실패: " + paymentResponse.message);
          }

          // 결제 성공 시 사용자 정보 출력
          const exitUserData = {
            id: receivedUserId,
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
      {/* 상단 제목 */}
      <div className="fixed top-[15vh] left-0 right-0 w-full z-20">
        <div className="text-center text-black text-[6vw] font-bold font-noto tracking-wide">
          키오스크 인증
        </div>
      </div>
      {/* 로딩 중일 때와 아닐 때의 화면 구성 */}
      <div className="mt-[18vh] mb-[10vh]">
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
            <div className="w-full mb-[10vw] flex flex-col items-center justify-center h-[60vw]">
              {/* 안내 문구 */}
              <div className="self-stretch p-[0.13vw]">
                <div className="text-center text-black text-[3.5vw] font-medium font-noto tracking-normal">
                  앱에서 로그인 후<br />
                  키오스크 가까이에서 <br />
                  휴대폰을 뒤집어주세요.
                </div>
              </div>
              {/* 이미지 */}
              <div className="mt-[10vw]">
                <img
                  src={VerificationIcon}
                  alt="KioskVerification"
                  className="w-auto h-[60vw]"
                />
              </div>
            </div>
            <HomeButton />
          </>
        )}
      </div>
      {/* 하단 문구 */}
      <div className="fixed bottom-[12vh] left-0 right-0 w-full z-20">
        <div className="mx-auto text-center text-[3vw] font-bold font-noto tracking-wide px-4">
          <span className="text-black">Cartoon Time에서는 </span>
          <span className="text-[#f9b812] font-black">UWB</span>
          <span className="text-black">
            {" "}
            기술을 이용하여
            <br />{" "}
          </span>
          <span className="text-[#f9b812] font-black">간편 본인 인증/결제</span>
          <span className="text-black">와 </span>
          <span className="text-[#f9b812] font-black">
            만화책 위치찾기 서비스
          </span>
          <span className="text-black">를 제공합니다.</span>
        </div>
      </div>
      {/* 입퇴실임시버튼 */}
      <div className="w-full flex justify-center items-center gap-[5vw] mt-[3vh]">
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          className="px-[2vw] py-[1vh] bg-neutral-700 rounded-[2vw] text-white text-[3vw] font-bold font-noto z-50"
        >
          임시 입퇴실 버튼
        </button>
      </div>
      {/* 에러 메시지 표시 */}
      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default UserVerification;
