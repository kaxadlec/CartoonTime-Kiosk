import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cartoon } from "../types/cartoon";
import { getRecommendedComics } from "../api/userComicsGetApi";
import { getTodayComics } from "../api/todayComicsGetApi";
import { getAllComics } from "../api/allComicsGetApi";
import {
  saveMessage,
  listenForMessages,
  removeMessageListener,
} from "../api/fcmApi";

import CartoonDetailModal from "./CartoonDetailModal";

import HomeButton from "../components/HomeButton";
import { MdLocationOn, MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const CartoonRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const [recommendations, setRecommendations] = useState<Cartoon[]>([]);
  const [activeTab, setActiveTab] = useState<string>("user");
  const [selectedLocation, setselectedLocation] = useState<string | null>(null);
  const [selectedCartoonId, setSelectedCartoonId] = useState<number | null>(
    null
  );
  const [selectedCartoonIndex, setSelectedCartoonIndex] = useState<
    number | null
  >(null); // 선택된 만화의 인덱스

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여지는 만화 리스트의 인덱스
  const [selectedCartoon, setSelectedCartoon] = useState<Cartoon | null>(null); // 선택된 만화 정보
  const [isModalOpen, setIsModalOpen] = useState(false); // 만화디테일 모달창 표시 여부
  const [showNotification, setShowNotification] = useState(false); // 처음화면 돌아가겠냐고 알림창 표시 여부

  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );
  const [animating, setAnimating] = useState(false);

  // activeTab이 변경될 때마다 API 호출
  useEffect(() => {
    const fetchComics = async () => {
      try {
        if (activeTab === "user" && user?.id) {
          const comics = await getRecommendedComics(user.id);
          setRecommendations(comics);
        } else if (activeTab === "today") {
          const comics = await getTodayComics();
          setRecommendations(comics);
        } else if (activeTab === "bestseller") {
          const comics = await getAllComics();
          setRecommendations(comics);
        }
      } catch (error) {
        console.error("만화 정보 조회 실패:", error);
      }
    };

    fetchComics();
  }, [activeTab, user]);

  useEffect(() => {
    console.log("메시지 리스너 설정 시작");

    const setupMessageListener = async () => {
      try {
        await listenForMessages(handleMessageReceived);
        console.log("메시지 리스너가 성공적으로 설정되었습니다.");
      } catch (error) {
        console.error("메시지 리스너 설정 중 오류 발생:", error);
      }
    };

    setupMessageListener();

    return () => {
      console.log("메시지 리스너 제거 시작");
      removeMessageListener();
      console.log("메시지 리스너가 제거되었습니다.");
    };
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트/언마운트 시에만 실행

  const handleCartoonClick = (cartoon: Cartoon) => {
    const cartoonIndex = recommendations.findIndex(
      (item) => item.id === cartoon.id
    );
    setSelectedCartoonIndex(cartoonIndex);
    setselectedLocation(cartoon.location);
    setSelectedCartoon(cartoon);
    setSelectedCartoonId(cartoon.id);
    setIsModalOpen(true);
  };

  // 만화 선택하여 위치추적하겠다는 메시지 전송 함수
  const sendMessage = async (content: string) => {
    try {
      await saveMessage("kiosk", user.token, content);
      // console.log(user.token);
      console.log("앱에서 위치추적 요구 메시지 전송:", content);
      navigate("/"); // 메시지 전송 성공 시 홈 화면으로 이동
    } catch (error) {
      console.error("앱에서 위치추적 요구 메시지 전송 실패:", error);
      throw error;
    }
  };

  const handleMessageReceived = async (message: any) => {
    console.log("만화추천 앱에서 실행 중 메시지 수신: ", message);
    if (message.content === "kioskskip") {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/"); // 홈 화면으로 이동
      }, 3000); // 3초 후 홈 화면으로 이동
    }
  };

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case "user":
        return "⚡ 사용자 취향 만화 ⚡";
      case "bestseller":
        return "🏆 베스트셀러 만화 🏆";
      case "today":
        return "🌟 오늘의 추천 만화 🌟";
      default:
        return "⚡ 사용자 취향 만화 ⚡";
    }
  };

  const getActiveTabSubtitle = () => {
    switch (activeTab) {
      case "user":
        return `${user.name}님의 취향을 바탕으로 추천한 만화 리스트입니다.`;
      case "bestseller":
        return "베스트셀러 만화 리스트입니다.";
      case "today":
        return "오늘의 추천 만화 리스트입니다.";
      default:
        return "";
    }
  };

  const getVisibleCartoons = () => {
    if (!recommendations || recommendations.length === 0) {
      return [];
    }
    const visibleCartoons = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % recommendations.length;
      visibleCartoons.push(recommendations[index]);
    }
    return visibleCartoons;
  };

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recommendations.length - 1 : prevIndex - 1
    );
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* 만화추천서비스 앱에서 실행했을경우 */}
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#F4F2EE] px-[7vw] py-[5vw] rounded-lg shadow-lg">
            <p className="text-[3vw] font-bold text-center mb-[4vw]">
              만화추천 서비스를 앱에서 실행중입니다.
            </p>
            <p className="text-[3vw] font-bold text-center">
              처음화면으로 돌아갑니다.
            </p>
          </div>
        </div>
      )}

      {/* 토글 버튼 */}
      <div className="flex justify-center w-full mt-[3vh]">
        <div className="h-[7vh] px-[1vw] py-[1vh] bg-[#f8dd65] rounded-[2.5vw] flex items-center justify-between mb-[1vh] w-4/5">
          <div
            className={`w-[25vw] h-[6vh] p-[1vw] ${
              activeTab === "user" ? "bg-[#fbb832]" : ""
            } rounded-[2vw] justify-center items-center flex cursor-pointer`}
            onClick={() => setActiveTab("user")}
          >
            <div
              className={`text-center ${
                activeTab === "user"
                  ? "text-[#333333] font-bold"
                  : "text-[#555555] font-normal"
              } text-[2.8vw] font-noto`}
            >
              사용자 취향 만화
            </div>
          </div>
          <div
            className={`w-[25vw] h-[6vh] p-[1vw] ${
              activeTab === "bestseller" ? "bg-[#fbb832]" : ""
            } rounded-[2vw] justify-center items-center flex cursor-pointer`}
            onClick={() => setActiveTab("bestseller")}
          >
            <div
              className={`text-center ${
                activeTab === "bestseller"
                  ? "text-[#333333] font-bold"
                  : "text-[#555555] font-normal"
              } text-[2.8vw] font-noto`}
            >
              베스트셀러 만화
            </div>
          </div>
          <div
            className={`w-[25vw] h-[6vh] p-[1vw] ${
              activeTab === "today" ? "bg-[#fbb832]" : ""
            } rounded-[2vw] justify-center items-center flex cursor-pointer`}
            onClick={() => setActiveTab("today")}
          >
            <div
              className={`text-center ${
                activeTab === "today"
                  ? "text-[#333333] font-bold"
                  : "text-[#555555] font-normal"
              } text-[2.8vw] font-noto`}
            >
              오늘의 추천 만화
            </div>
          </div>
        </div>
      </div>

      {/* 만화 위치 제목 */}
      <div className="relative w-full h-[4vh] mt-[1vh]">
        <div className="absolute left-[5vw] top-0 bottom-0 w-[1vw] bg-[#f9b812]"></div>
        <div className="w-full h-full flex justify-start items-center pl-[9vw]">
          <div className="text-black text-[3vw] font-bold font-noto">
            만화 위치 안내
          </div>
        </div>
      </div>

      {/* 만화위치 섹터 */}
      <div className="flex flex-col items-center mt-[7vh] ml-[1vw]">
        <div className="flex justify-center gap-[6vw] mb-[4vh]">
          {["A", "B", "C"].map((letter, index) => (
            <div key={letter} className="relative w-[4vh] h-[8vh]">
              {/* 만화 위치 표시 */}
              <div className="absolute inset-0 bg-[#f9b812] border border-black flex justify-center items-center">
                <div className="text-center text-black text-[2vh] font-bold font-noto">
                  {letter}
                </div>
                {selectedLocation === letter && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MdLocationOn className="w-[5vh] h-[5vh] text-red-600 animate-pulse" />
                  </div>
                )}
              </div>

              {/* 키오스크 위치를 A 위치에 상대적으로 배치 */}
              {letter === "A" && (
                <div className="absolute -left-[6vh] -top-[5vh] w-[4vh] h-[4vh] bg-gray-500 border border-black flex justify-center items-center">
                  <div className="text-center text-white text-[1vh] font-bold font-noto">
                    Kiosk
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-[6vw] ml-[5vw]">
          {["D", "E", "F"].map((letter) => (
            <div key={letter} className="relative w-[4vh] h-[8vh]">
              <div className="absolute inset-0 bg-[#f9b812] border border-black flex justify-center items-center">
                <div className="text-center text-black text-[2vh] font-bold font-noto">
                  {letter}
                </div>
                {selectedLocation === letter && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MdLocationOn className="w-[5vh] h-[5vh] text-red-600 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단제목 */}
      <div className="justify-center items-center gap-[2vw] flex mt-[5vh]">
        <div className="w-[20vw] h-[0px] border-[0.2vh] border-[#dedbdb]"></div>
        <div className="w-[50vw] text-center text-black text-[4vw] font-bold font-noto tracking-widest">
          {getActiveTabTitle()}
        </div>
        <div className="w-[20vw] h-[0px] border-[0.2vh] border-[#dedbdb]"></div>
      </div>

      {/* 하단 부제목 */}
      <div className="mt-[2vh]">
        <div className="text-center text-black text-[3vw] font-bold font-noto">
          {getActiveTabSubtitle()}
        </div>
      </div>

      {/* 만화 리스트 */}
      <div className="relative w-full px-[5vw]">
        {recommendations && recommendations.length > 0 ? (
          <>
            {/* 좌측 화살표: 오늘의 추천 만화가 3개 이하일 때 숨기기 */}
            {!(activeTab === "today" && recommendations.length <= 3) && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 text-[8vw] z-10"
              >
                <MdNavigateBefore />
              </button>
            )}

            <div className="flex justify-center items-center overflow-hidden mt-[4vh] w-full">
              <div className="flex gap-[4vw]" style={{ width: "85vw" }}>
                {getVisibleCartoons().map((cartoon) => (
                  <div
                    key={cartoon.id}
                    className={`flex-none flex-col justify-center items-center gap-[1vh] flex w-[25vw] h-auto cursor-pointer rounded-[1vw] p-[1vw] shadow-md transition-shadow duration-300 ${
                      selectedCartoonId === cartoon.id
                        ? "border-[0.4vw] border-[#f9b812]"
                        : "border border-gray-300"
                    }`}
                    onClick={() => handleCartoonClick(cartoon)}
                  >
                    <div className="w-full h-[20vh] relative overflow-hidden">
                      <img
                        className="absolute inset-0 w-full h-full object-cover rounded-[1vw] shadow"
                        src={cartoon.imageUrl}
                        alt={cartoon.title}
                      />
                    </div>

                    <div className="w-full text-center text-black text-[2.6vw] font-bold font-noto line-clamp-2">
                      {cartoon.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 우측 화살표: 오늘의 추천 만화가 3개 이하일 때 숨기기 */}
            {!(activeTab === "today" && recommendations.length <= 3) && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 text-[8vw] z-10"
              >
                <MdNavigateNext />
              </button>
            )}
          </>
        ) : (
          <div className="text-center flex items-center flex-col font-noto mt-[20vw]">
            만화 정보를 불러오는 중입니다...
          </div>
        )}
      </div>
      <HomeButton />
      <CartoonDetailModal
        cartoon={selectedCartoon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        sendMessage={sendMessage}
        selectedCartoonIndex={selectedCartoonIndex} // 인덱스 전달
      />
    </div>
  );
};

export default CartoonRecommendation;
