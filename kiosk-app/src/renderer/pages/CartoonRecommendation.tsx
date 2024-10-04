import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllComics } from "../api/allComicsGetApi";
import { Cartoon } from "../types/cartoon";
import CartoonDetailModal from "./CartoonDetailModal";

import HomeButton from "../components/HomeButton";
import { MdLocationOn } from "react-icons/md";

const CartoonRecommendation: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [recommendations, setRecommendations] = useState<Cartoon[]>([]);
  const [activeTab, setActiveTab] = useState<string>("user");
  const [selectedLocation, setselectedLocation] = useState<string | null>(null);
  const [selectedCartoonId, setSelectedCartoonId] = useState<number | null>(
    null
  );

  const [selectedCartoon, setSelectedCartoon] = useState<Cartoon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const comics = await getAllComics();
        console.log(comics);
        setRecommendations(comics);
      } catch (error) {
        console.error("만화 정보 조회 실패:", error);
        // 에러 처리 로직 추가 (예: 에러 메시지 표시)
      }
    };

    fetchComics();
  }, []);

  const handleCartoonClick = (cartoon: Cartoon) => {
    setselectedLocation(cartoon.location);
    setSelectedCartoonId(cartoon.id);
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
      <div className="flex justify-center items-start gap-[10vw] px-[10vw] mt-[4vh]">
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
      </div>

      {/* 하단제목 */}
      <div className="justify-center items-center gap-[2vw] flex mt-[6vh]">
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

      {/* 만화 목록 */}
      <div className="flex justify-center items-center gap-[2.6vw] mt-[4vh] flex-wrap">
        {recommendations.slice(0, 4).map((cartoon) => (
          <div
            key={cartoon.id}
            className={`flex-col justify-center items-center gap-[2vh] flex w-[20vw] cursor-pointer rounded-[1vw] p-[1vw] shadow-md transition-shadow duration-300 ${
              selectedCartoonId === cartoon.id
                ? "border-[0.4vw] border-[#f9b812]"
                : "border border-gray-300"
            }`}
            onClick={() => handleCartoonClick(cartoon)}
          >
            <div className="w-full aspect-[6/9] relative overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-[1vw] shadow"
                src={cartoon.imageUrl}
                alt={cartoon.titleKo}
              />
            </div>

            <div className="w-full text-center text-black text-[3vw] font-bold font-noto">
              {cartoon.titleKo}
            </div>
          </div>
        ))}
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
