import React, { useState, useEffect } from "react";
import { Cartoon } from "../types/cartoon";
import { FaBookmark } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

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
                <div className="w-1/3 min-w-[20vw] max-w-[30vw]">
                  <img
                    src={cartoon.imageUrl}
                    alt={cartoon.titleKo}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <h2 className="text-[4vw] font-extrabold mb-[6vw] ">
                    {cartoon.titleKo}
                  </h2>

                  <div className="text-[3vw] mb-[3vw]">
                    <p className="font-medium mb-[1vw]">작가 </p>
                    <p className="text-gray-700 ">{cartoon.authorKo}</p>
                  </div>
                  <div className="text-[3vw] mb-[4vw]">
                    <p className="font-medium mb-[1vw]">장르 </p>
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
