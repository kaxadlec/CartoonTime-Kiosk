import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={handleClick}
        className="px-[4vw] py-[4vw] bg-[#f9b812] rounded-[2vw] flex justify-center items-center"
      >
        <span className="w-[20vw] text-center text-white text-[3vw] font-bold font-noto tracking-wider">
          메인화면
        </span>
      </button>
    </div>
  );
};

export default HomeButton;
