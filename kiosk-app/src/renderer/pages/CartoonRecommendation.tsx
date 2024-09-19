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
      // 추가 더미 데이터...
    ];
    setRecommendations(dummyRecommendations);
  }, []);

  const handleCartoonClick = (id: number) => {
    navigate(`/cartoon-details/${id}`);
  };

  return (
    <div className="flex flex-col h-full">
      <Title />
      <div className="flex-grow overflow-y-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-center mb-6">추천 만화</h2>
        <div className="grid grid-cols-2 gap-4">
          {recommendations.map((cartoon) => (
            <div
              key={cartoon.id}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCartoonClick(cartoon.id)}
            >
              <img
                src={cartoon.imageUrl}
                alt={cartoon.title}
                className="w-full h-80 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">{cartoon.title}</h3>
              <p className="text-sm text-gray-600">{cartoon.author}</p>
              <p className="text-xs text-gray-500">{cartoon.genre}</p>
            </div>
          ))}
        </div>
      </div>
      <HomeButton />
    </div>
  );
};

export default CartoonRecommendation;
