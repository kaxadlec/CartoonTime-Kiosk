import axios from "axios";

// 환경 변수를 통해 mock 데이터 사용 여부 결정
const useMock = true;
const API_BASE_URL = "https://your-api-base-url.com";

// 유저 정보를 조회하는 함수 (실제 API 또는 mock 데이터)
export const getUserInfo = async (userId: number) => {
  if (useMock) {
    return mockGetUserInfo(userId); // mock 데이터를 사용
  }
  return realGetUserInfo(userId); // 실제 API 요청
};

// 실제 API 유저 정보 조회 함수
export const realGetUserInfo = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ct/user/${userId}`);

    // 응답 성공 시 처리
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      error: null,
    };
  } catch (error: any) {
    console.error("유저 정보 조회 실패", error);

    // 에러 발생 시 처리
    return {
      success: false,
      message: "유저 정보 조회에 실패했습니다.",
      data: null,
      error: error.response?.data?.error || {
        code: error.response?.status || 500,
        details: error.message,
      },
    };
  }
};

// Mock 유저 정보 조회 함수
export const mockGetUserInfo = async (userId: number) => {
  // Mock 데이터 지연 시뮬레이션 (필요한 경우)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 예시로 userId가 6인 경우에 대한 mock 데이터 반환
  if (userId === 6) {
    return {
      success: true,
      message: "유저 조회에 성공했습니다.",
      data: {
        id: 6,
        username: "01022222222",
        name: "rirkd",
        currentMoney: 1000000,
        roles: ["USER"],
      },
      error: null,
    };
  } else {
    // 존재하지 않는 유저 ID에 대한 처리 (필요한 경우)
    return {
      success: false,
      message: "유저 정보 조회에 실패했습니다.",
      data: null,
      error: {
        code: 404,
        details: "User not found",
      },
    };
  }
};
