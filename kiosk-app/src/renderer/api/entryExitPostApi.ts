import axios from "axios";

const useMock = false;

// 입실 처리 함수 (실제 API 또는 mock 데이터)
export const postEntry = async (userId: number, API_BASE_URL: string) => {
  if (useMock) {
    return mockEntry(userId);
  }
  return realEntry(userId, API_BASE_URL);
};

// 퇴실 처리 함수 (실제 API 또는 mock 데이터)
export const postExit = async (userId: number, API_BASE_URL: string) => {
  if (useMock) {
    return mockExit(userId);
  }
  return realExit(userId, API_BASE_URL);
};

// 실제 입실 처리 함수
export const realEntry = async (userId: number, API_BASE_URL: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/entry/${userId}`);
    return response.data;
  } catch (error) {
    console.error("입실 처리 실패", error);
    throw error;
  }
};

// 실제 퇴실 처리 함수
export const realExit = async (userId: number, API_BASE_URL: string) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/entry/${userId}/exit`
    );
    return response.data;
  } catch (error) {
    console.error("퇴실 처리 실패", error);
    throw error;
  }
};

// Mock 입실 처리 함수
export const mockEntry = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "입실 처리에 성공했습니다.",
    data: {
      userId: userId,
      entryDate: new Date().toISOString(),
      exitDate: null,
      fee: null,
    },
    error: null,
  };
};

// Mock 퇴실 처리 함수
export const mockExit = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "퇴실 처리에 성공했습니다.",
    data: {
      userId: userId,
      entryDate: "2024-09-10T10:49:51.471128",
      exitDate: new Date().toISOString(),
      fee: 500,
    },
    error: null,
  };
};
