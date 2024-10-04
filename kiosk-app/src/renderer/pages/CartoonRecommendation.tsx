import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Cartoon } from "../types/cartoon";
import { getRecommendedComics } from "../api/userComicsGetApi";
import CartoonDetailModal from "./CartoonDetailModal";

import HomeButton from "../components/HomeButton";
import { MdLocationOn } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const CartoonRecommendation: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [recommendations, setRecommendations] = useState<Cartoon[]>([]);
  const [activeTab, setActiveTab] = useState<string>("user");
  const [selectedLocation, setselectedLocation] = useState<string | null>(null);
  const [selectedCartoonId, setSelectedCartoonId] = useState<number | null>(
    null
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCartoon, setSelectedCartoon] = useState<Cartoon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        // 사용자 ID 기반으로 만화 정보 불러오기
        if (user && user.id) {
          const comics = await getRecommendedComics(user.id); // 사용자 ID를 기반으로 만화 불러오기
          console.log(comics);
          setRecommendations(comics);
        }
      } catch (error) {
        console.error("사용자 만화 정보 조회 실패:", error);
        // 에러 처리 로직 추가
      }
    };

    fetchComics();
  }, [user]);

  const handleCartoonClick = (cartoon: Cartoon) => {
    setselectedLocation(cartoon.location);
    setSelectedCartoon(cartoon);
    setIsModalOpen(true);
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
        return "현재 가장 인기 있는 만화 리스트입니다.";
      case "today":
        return "오늘의 특별 추천 만화 리스트입니다.";
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
    <div className="flex flex-col h-full w-full">
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
      {/* <div className="flex justify-center items-start gap-[10vw] px-[10vw] mt-[4vh]">
        <div className="flex gap-[9vw]">
          {[
            ["A", "B", "C"],
            ["D", "E", "F"],
            ["G", "H"],
          ].map((column, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-center gap-[0.5vh]"
            >
              {column.map((letter) => (
                <div key={letter} className="relative w-[4vh] h-[8vh]">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[8vh] h-[4vh] bg-[#f9b812] border border-black flex justify-center items-center -rotate-90">
                    <div className="transform rotate-90 text-center text-black text-[2vh] font-bold font-noto">
                      {letter}
                    </div>
                    {selectedLocation === letter && (
                      <div className="absolute inset-0 flex items-center justify-end">
                        <MdLocationOn className="w-[5vh] h-[5vh] text-red-600 animate-pulse rotate-90" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div> */}

      {/* 만화위치 섹터 */}
      <div className="flex flex-col items-center mt-[5vh] -ml-[15vw]">
        <div className="flex justify-center gap-[6vw] mb-[4vh]">
          {["A", "B", "C"].map((letter) => (
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
        <div className="absolute right-[20vh] top-[15vh] w-[4vh] h-[4vh] bg-gray-500 border border-black flex justify-center items-center">
          <div className="text-center text-white text-[1vh] font-bold font-noto">
            Kiosk
          </div>
        </div>
      </div>

      {/* 하단제목 */}
      <div className="justify-center items-center gap-[2vw] flex mt-[7vh]">
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
            {/* 좌측 화살표 */}
            <button
              onClick={scrollRight}
              className="absolute left-0 top-1/2 text-[8vw]"
            >
              <MdNavigateBefore />
            </button>

            <div className="flex justify-center items-center overflow-hidden mt-[4vh] w-full">
              <div className="flex gap-[4vw]" style={{ width: "85vw" }}>
                {getVisibleCartoons().map((cartoon, index) => (
                  <div
                    key={index}
                    className={`flex-none flex-col justify-center items-center gap-[1vh] flex w-[25vw] h-auto cursor-pointer rounded-[1vw] p-[1vw] shadow-md transition-shadow duration-300 ${
                      selectedCartoon && selectedCartoon.title === cartoon.title
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

            {/* 우측 화살표 */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 text-[8vw]"
            >
              <MdNavigateNext />
            </button>
          </>
        ) : (
          <div className="text-center font-noto">
            만화 정보를 불러오는 중입니다...
          </div>
        )}
      </div>
      <HomeButton />
      <CartoonDetailModal
        cartoon={selectedCartoon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CartoonRecommendation;
