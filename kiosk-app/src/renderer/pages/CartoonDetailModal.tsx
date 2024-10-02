import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import HomeButton from "../components/HomeButton";

interface CartoonDetails {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  imageUrl: string;
}

const CartoonDetailModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<CartoonDetails | null>(null);

  useEffect(() => {
    // 여기서 실제 API 호출을 통해 만화 상세 정보를 가져와야 합니다.
    // 지금은 더미 데이터를 사용합니다.
    const dummyDetails: CartoonDetails = {
      id: Number(id),
      title: "원피스",
      author: "오다 에이치로",
      genre: "모험",
      description: "해적왕을 꿈꾸는 루피의 모험 이야기",
      imageUrl: "/path/to/onepiece.jpg",
    };
    setDetails(dummyDetails);
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <Title />
      <div className="flex-grow overflow-y-auto px-4 py-6">
        <button
          onClick={handleGoBack}
          className="mb-4 text-yellow-300 hover:text-yellow-700"
        >
          ← 뒤로 가기
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">{details.title}</h2>
        <img
          src={details.imageUrl}
          alt={details.title}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <p className="text-lg mb-2">
          <strong>작가:</strong> {details.author}
        </p>
        <p className="text-lg mb-2">
          <strong>장르:</strong> {details.genre}
        </p>
        <p className="text-lg mb-4">
          <strong>설명:</strong> {details.description}
        </p>
        <button className="w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-600">
          만화 위치 찾기
        </button>
      </div>
      <HomeButton />
    </div>
  );
};

export default CartoonDetails;
