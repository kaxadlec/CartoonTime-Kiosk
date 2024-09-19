import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full py-[2vh] z-10">
      <div className="w-full flex justify-center items-center">
        <button
          onClick={handleClick}
          className="px-[5vw] py-[2vh] bg-[#f9b812] rounded-[2vw] flex justify-center items-center"
        >
          <span className="text-center text-white text-[3vw] font-bold font-noto tracking-wider">
            메인화면
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomeButton;
