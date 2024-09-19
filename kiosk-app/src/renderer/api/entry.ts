import axios from "axios";

// API의 기본 URL 설정
const API_BASE_URL = "https://your-api-base-url.com";

// 입실 처리를 하는 함수
export const checkIn = async (userId: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/entry/${userId}`);
    return response.data;
  } catch (error) {
    console.error("입실 처리 실패");
    throw error;
  }
};

// 퇴실 처리를 하는 함수
export const checkOut = async (userId: number) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/entry/${userId}/exit`
    );
    return response.data;
  } catch (error) {
    console.error("퇴실 처리 실패");
    throw error;
  }
};
