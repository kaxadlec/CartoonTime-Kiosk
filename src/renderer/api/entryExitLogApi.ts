import { EntryExitLog } from "../types/user";
import axios from "axios";

// 환경 변수를 통해 mock 데이터 사용 여부 결정
const useMock = false;

// 모의 데이터 생성 함수
const generateMockData = (userId: number): EntryExitLog[] => {
  const now = new Date();
  return [
    {
      userId: userId,
      entryDate: new Date(now.getTime() - 60000).toISOString(), // 1분 전
      exitDate: now.toISOString(),
      fee: 50,
    },
    {
      userId: userId,
      entryDate: new Date(now.getTime() - 3600000).toISOString(), // 1시간 전
      exitDate: new Date(now.getTime() - 3540000).toISOString(), // 59분 전
      fee: 50,
    },
    {
      userId: userId,
      entryDate: new Date(now.getTime() - 7200000).toISOString(), // 2시간 전
      exitDate: null, // 아직 퇴실하지 않은 상태
      fee: 0,
    },
  ];
};

// 입퇴실 기록을 조회하는 함수
export const getEntryExitLog = async (userId: number) => {
  if (useMock) {
    return {
      success: true,
      message: "입퇴실 기록 조회에 성공했습니다.",
      data: generateMockData(userId),
      error: null,
    };
  }

  try {
    const response = await window.electronAPI.apiRequest({
      method: "GET",
      endpoint: `/ct/entries/all/${userId}`,
    });
    return response;
  } catch (error: any) {
    console.error("입퇴실 기록 조회 실패", error);
    return {
      success: false,
      message: "입퇴실 기록 조회에 실패했습니다.",
      data: [],
      error: error.response?.data?.error || {
        code: error.response?.status || 500,
        details: error.message,
      },
    };
  }
};

// Response 예시
// {
//   "success": true,
//   "message": "입퇴실 기록 조회에 성공했습니다.",
//   "data": [
//       {
//           "userId": 1,
//           "entryDate": "2024-09-10T10:48:27.588837",
//           "exitDate": "2024-09-10T10:48:32.835407",
//           "fee": 50
//       },
//       {
//           "userId": 1,
//           "entryDate": "2024-09-10T10:48:37.376652",
//           "exitDate": "2024-09-10T10:48:39.466967",
//           "fee": 50
//       }
//   ],
//   "error": null
// }
