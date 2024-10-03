import React, { useState, useEffect } from "react";
import { Cartoon } from "../types/cartoon";

interface CartoonDetailModalProps {
  cartoon: Cartoon | null;
  isOpen: boolean;
  onClose: () => void;
}

const CartoonDetailModal: React.FC<CartoonDetailModalProps> = ({
  cartoon,
  isOpen,
  onClose,
}) => {
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
          <div className="p-[4vw] h-full overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-[3vw] right-[3vw] text-gray-600 hover:text-gray-800 text-[2.5vw]"
            >
              닫기
            </button>
            <div className="flex justify-center items-center h-full pt-[12vw]">
              <div className="flex items-start gap-[10vw] max-w-[90%]">
                <div className="w-1/3 min-w-[20vw] max-w-[30vw]">
                  <img
                    src={cartoon.imageUrl}
                    alt={cartoon.titleKo}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <h2 className="text-[4vw] font-bold mb-[2vw] text-gray-800">
                    {cartoon.titleKo}
                  </h2>
                  <p className="text-[2.5vw] text-gray-700 mb-[1.5vw]">
                    <strong>영문 제목:</strong> {cartoon.titleEn}
                  </p>
                  <p className="text-[2.5vw] text-gray-700 mb-[1.5vw]">
                    <strong>작가:</strong> {cartoon.authorKo}
                  </p>
                  <p className="text-[2.5vw] text-gray-700 mb-[1.5vw]">
                    <strong>장르:</strong>{" "}
                    {cartoon.genres.map((g) => g.genreNameKo).join(", ")}
                  </p>
                  <p className="text-[2.5vw] text-gray-700">
                    <strong>위치:</strong> {cartoon.location}
                  </p>
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
