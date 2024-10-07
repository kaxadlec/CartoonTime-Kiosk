import React, { useState, useEffect } from "react";
import { Cartoon } from "../types/cartoon";
import { FaBookmark } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

interface CartoonDetailModalProps {
  cartoon: Cartoon | null;
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  sendMessage: (content: string) => Promise<void>;
}

const CartoonDetailModal: React.FC<CartoonDetailModalProps> = ({
  cartoon,
  isOpen,
  onClose,
  activeTab,
  sendMessage,
}) => {
  const handleTrackLocation = async () => {
    if (cartoon) {
      let tabIndex = "0";
      switch (activeTab) {
        case "bestseller":
          tabIndex = "1";
          break;
        case "today":
          tabIndex = "2";
          break;
        default:
          tabIndex = "0";
      }
      const content = `만화/${tabIndex}/${cartoon.id}`;
      try {
        await sendMessage(content);
        // console.log("위치 추적 메시지 전송 완료:", content);
      } catch (error) {
        console.error("위치 추적 메시지 전송 실패:", error);
      }
    }
  };

  const [animationClass, setAnimationClass] = useState(
    "translate-y-full opacity-0"
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        setAnimationClass("translate-y-0 opacity-100");
      }, 10);
    } else {
      setAnimationClass("translate-y-full opacity-0");
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  return (
    <>
      {/* Semi-transparent overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ${
          isOpen ? "bg-opacity-10" : "bg-opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-[#F4F2EE] rounded-t-3xl shadow-lg transform transition-all duration-500 ease-out ${animationClass}`}
        style={{ height: "40vh" }}
      >
        {cartoon && (
          <div className="h-full overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-[1vw] right-[3vw] text-[8.5vw] text-[#f9b812]"
            >
              <FaWindowClose />
            </button>
            <div className="absolute top-[-0.5vw] left-[4vw] text-[8vw] text-[#f9b812]">
              <FaBookmark />
            </div>
            <div className="flex justify-center items-center h-full pt-[1vw] font-noto">
              <div className="flex items-start gap-[15vw] max-w-[90%]">
                {/* 만화 이미지 */}
                <div className="w-[34vw] h-auto">
                  <img
                    src={cartoon.imageUrl}
                    alt={cartoon.title}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* 만화 정보 */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  {/* 만화 제목 */}
                  <h2 className="text-[4vw] font-extrabold mb-[6vw] ">
                    {cartoon.title}
                  </h2>

                  {/* 만화 작가 */}
                  <div className="text-[3vw] mb-[3vw]">
                    <p className="font-bold mb-[1vw]">작가 </p>
                    <p className="text-gray-700 ">{cartoon.author}</p>
                  </div>
                  {/* 만화 장르 */}
                  <div className="text-[3vw] mb-[3vw]">
                    <p className="font-bold mb-[1vw]">장르 </p>
                    <div className="flex flex-nowrap gap-[1.5vw]">
                      {cartoon.genres.map((g) => (
                        <span
                          key={g.genreNameKo}
                          className="bg-gray-300 px-[1vw] py-[0.5vw] rounded-xl whitespace-nowrap text-gray-700"
                        >
                          {g.genreNameKo}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* 만화 위치 */}
                  <div className="text-[3vw] mb-[3vw]">
                    <p className="font-bold mb-[1vw]">위치 </p>
                    <p className="text-gray-700 ">{cartoon.location}</p>
                  </div>
                  {/* 위치 추적 버튼 추가 */}
                  <button
                    onClick={handleTrackLocation}
                    className="bg-[#f9b812] text-white font-bold py-[2vw] px-[4vw] rounded-full text-[3vw] mt-[2vw] hover:bg-[#e0a50f] transition-colors duration-300"
                  >
                    만화 위치 추적하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartoonDetailModal;
