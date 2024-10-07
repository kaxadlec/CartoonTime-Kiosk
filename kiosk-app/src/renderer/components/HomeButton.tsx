import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full py-[2vh] z-10">
        <div className="w-full flex justify-center items-center">
          <button
            onClick={handleClick}
            className="px-[3vw] py-[1.7vh] bg-[#f9b812] rounded-[2vw] flex flew-row gap-[2.5vw] justify-center items-center"
          >
            <IoHomeSharp className="text-[5vw] text-white" />
            <span className="text-center text-white text-[3.5vw] font-bold font-noto tracking-wider">
              처음으로
            </span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="w-[43vh] h-[28vh] relative bg-[#f4f2ee] rounded-3xl border border-[#7d7c7a] flex flex-col justify-between items-center pt-[8vh] pb-[3vh]">
            <div className="text-center text-black text-[2.5vh] font-bold font-noto tracking-wider">
              처음으로 돌아가시겠습니까?
            </div>
            <div className="flex flex-row justify-center items-center gap-[10vh] w-full px-[2vh]">
              <button
                onClick={handleConfirm}
                className="w-[25%] h-[6vh] bg-[#f9b812] rounded-[1vh] flex justify-center items-center"
              >
                <div className="text-center text-white text-[2vh] font-bold font-noto">
                  예
                </div>
              </button>
              <button
                onClick={handleCancel}
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

export default HomeButton;
