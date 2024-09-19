import axios from "axios";

// API의 기본 URL 설정
const API_BASE_URL = "https://your-api-base-url.com";

// 입퇴실 기록을 조회하는 함수
export const getEntries = async (userId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/entries/all/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("입퇴실 기록 조회 실패");
    throw error;
  }
};
