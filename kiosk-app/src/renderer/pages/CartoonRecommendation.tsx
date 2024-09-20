import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import HomeButton from "../components/HomeButton";

interface Cartoon {
  id: number;
  title: string;
  author: string;
  genre: string;
  imageUrl: string;
}

const CartoonRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Cartoon[]>([]);
  const [activeTab, setActiveTab] = useState<string>("user");

  useEffect(() => {
    // 여기서 실제 API 호출을 통해 추천 만화 목록을 가져와야 합니다.
    // 지금은 더미 데이터를 사용합니다.
    const dummyRecommendations: Cartoon[] = [
      {
        id: 1,
        title: "주술회전",
        author: "작가1",
        genre: "모험",
        imageUrl: "../assets/images/jpg/sample1.jpg",
      },
      {
        id: 2,
        title: "하이큐",
        author: "작가2",
        genre: "장르2",
        imageUrl: "../assets/images/jpg/sample2.jpg",
      },
      {
        id: 3,
        title: "슬램덩크",
        author: "이노우에 타케히코",
        genre: "스포츠",
        imageUrl: "../assets/images/jpg/sample3.jpg",
      },
      {
        id: 4,
        title: "괴수 8호",
        author: "작가4",
        genre: "장르4",
        imageUrl: "../assets/images/jpg/sample4.jpg",
      },
    ];
    setRecommendations(dummyRecommendations);
  }, []);

  const handleCartoonClick = (id: number) => {
    navigate(`/cartoon-details/${id}`);
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
        return "오현진님의 취향을 바탕으로 추천한 만화 리스트입니다.";
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
            만화 위치
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
      <div className="flex justify-center items-center gap-[2vw] mt-[3vh] ">
        {recommendations.slice(0, 4).map((cartoon) => (
          <div
            key={cartoon.id}
            className="flex-col justify-center items-center gap-[2vh] flex w-[20vw]"
          >
            <div className="w-full aspect-[6/9] relative overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-[1vw] shadow"
                src={cartoon.imageUrl}
                alt={cartoon.title}
              />
            </div>

            <div className="w-full text-center text-black text-[3vw] font-bold font-noto">
              {cartoon.title}
            </div>
          </div>
        ))}
      </div>

      <HomeButton />
    </div>
  );
};

export default CartoonRecommendation;
