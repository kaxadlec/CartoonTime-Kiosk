import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cartoon } from "../types/cartoon";
import { FaBookmark } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

interface CartoonDetailModalProps {
  cartoon: Cartoon | null;
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  sendMessage: (content: string) => Promise<void>;
  selectedCartoonIndex: number | null;
}

const CartoonDetailModal: React.FC<CartoonDetailModalProps> = ({
  cartoon,
  isOpen,
  onClose,
  activeTab,
  sendMessage,
  selectedCartoonIndex,
}) => {
  const navigate = useNavigate();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // 만화위치 안내 확인 모달 표시 여부

  const handleTrackLocation = async () => {
    if (selectedCartoonIndex !== null) {
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
      // const content = `만화/${tabIndex}/${cartoon.id}`;
      // console.log(selectedCartoonIndex);
      const content = `만화/${tabIndex}/${selectedCartoonIndex}`;
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

  const handleOpenConfirmModal = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmTrackLocation = () => {
    handleTrackLocation();
    setConfirmModalOpen(false); // 확인 모달 닫기
  };

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
              <div className="flex items-center gap-[15vw] max-w-[90%]">
                {/* 만화 이미지 */}
                <div className="w-auto h-auto">
                  <img
                    src={cartoon.imageUrl}
                    alt={cartoon.title}
                    className="w-auto h-full object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* 만화 정보 */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  {/* 만화 제목 */}
                  <h2 className="text-[4vw] font-extrabold mb-[3vw] ">
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
                  <div className="text-[3vw] mb-[3vw] flex items-center justify-between gap-[10vw]">
                    <div>
                      <p className="font-bold mb-[1vw]">위치 </p>
                      <p className="text-gray-700 ">{cartoon.location}</p>
                    </div>
                    <button
                      onClick={handleOpenConfirmModal} // 만화 위치 안내 버튼 클릭 시 확인 모달창 표시
                      className="bg-[#f9b812] text-white font-bold py-[3vw] px-[2vw] rounded-[1vw] text-[3vw] hover:bg-[#e0a50f] transition-colors duration-300 mt-[1vw]"
                    >
                      만화 위치 안내
                    </button>
                  </div>
                  {/* 위치 안내 버튼 추가 */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {confirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-[43vh] h-[28vh] relative bg-[#f4f2ee] rounded-3xl border border-[#7d7c7a] flex flex-col justify-between items-center pt-[6vh] pb-[3vh]">
            <div className="text-center text-black text-[2.3vh] font-bold font-noto tracking-wider">
              <p className="mb-[1vw]">만화 위치 안내를 받으면</p>
              <p>키오스크는 종료됩니다.</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-[7vh] w-full px-[2vh]">
              <button
                onClick={handleConfirmTrackLocation}
                className="w-[25%] h-[6vh] bg-[#f9b812] rounded-[1vh] flex justify-center items-center"
              >
                <div className="text-center text-white text-[2vh] font-bold font-noto">
                  예
                </div>
              </button>
              <button
                onClick={() => setConfirmModalOpen(false)}
                className="w-[25%] h-[6vh] bg-[#f9b812] rounded-[1vh] flex justify-center items-center"
              >
                <div className="text-center text-white text-[2vh] font-bold font-noto">
                  아니오
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartoonDetailModal;
