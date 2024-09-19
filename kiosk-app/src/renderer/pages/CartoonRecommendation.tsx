// RecommendationLoading.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import HomeButton from "../components/HomeButton";

const CartoonRecommendation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Title />

      <HomeButton />
    </div>
  );
};

export default CartoonRecommendation;
